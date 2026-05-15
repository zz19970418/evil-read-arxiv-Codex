const http = require("http");
const fs = require("fs");
const path = require("path");
const net = require("net");
const tls = require("tls");
const { spawn, spawnSync } = require("child_process");

const WEB_ROOT = __dirname;
const VAULT_ROOT = path.resolve(WEB_ROOT, "..");
const PUBLIC_ROOT = path.join(WEB_ROOT, "public");
const AI_QUEUE_DIR = path.join(WEB_ROOT, "ai-queue");
const AI_RESULTS_DIR = path.join(WEB_ROOT, "ai-results");
const LOCAL_CONFIG_FILE = path.join(WEB_ROOT, "config.local.json");

function readLocalConfig() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

const LOCAL_CONFIG = readLocalConfig();

function configValue(envName, keys, fallback = "") {
  if (process.env[envName]) return process.env[envName];
  for (const key of keys) {
    if (LOCAL_CONFIG[key]) return String(LOCAL_CONFIG[key]);
  }
  return fallback;
}

for (const [envName, configKey] of [
  ["OPENAI_API_KEY", "openaiApiKey"],
  ["OPENAI_MODEL", "openaiModel"],
  ["OPENAI_BASE_URL", "openaiBaseUrl"],
  ["OPENAI_TRANSPORT", "openaiTransport"],
  ["HTTPS_PROXY", "httpsProxy"],
  ["HTTP_PROXY", "httpProxy"],
  ["ALL_PROXY", "allProxy"],
]) {
  if (!process.env[envName] && LOCAL_CONFIG[configKey]) {
    process.env[envName] = String(LOCAL_CONFIG[configKey]);
  }
}

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const LOG_FILE = path.join(WEB_ROOT, "server-runtime.log");
const AI_MODEL = configValue("OPENAI_MODEL", ["openaiModel", "model"], "gpt-4.1-mini");
const OPENAI_BASE_URL = configValue("OPENAI_BASE_URL", ["openaiBaseUrl", "baseUrl"], "https://api.openai.com/v1").replace(/\/+$/, "");
const OPENAI_TRANSPORT = configValue("OPENAI_TRANSPORT", ["openaiTransport", "transport"], "auto");
const OPENAI_ENDPOINT = configValue("OPENAI_ENDPOINT", ["openaiEndpoint", "endpoint"], "");
const OPENAI_PROXY = configValue("OPENAI_PROXY", ["openaiProxy", "proxy"], "")
  || process.env.HTTPS_PROXY
  || process.env.HTTP_PROXY
  || process.env.ALL_PROXY
  || "";
let lastAiStatus = {
  ok: null,
  at: null,
  transport: null,
  error: null,
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".md": "text/markdown; charset=utf-8",
};

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line, "utf8");
  } catch {
    // Best-effort local diagnostics only.
  }
}

process.on("uncaughtException", (error) => {
  log(`uncaughtException: ${error.stack || error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  log(`unhandledRejection: ${error?.stack || error}`);
  process.exit(1);
});

process.on("exit", (code) => {
  log(`exit: ${code}`);
});

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

function sendJson(res, status, data) {
  send(res, status, JSON.stringify(data, null, 2));
}

function cleanError(error) {
  return String(error?.cause?.message || error?.message || error || "unknown error").slice(0, 500);
}

function sendText(res, status, text) {
  send(res, status, text, "text/plain; charset=utf-8");
}

function safeReadJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function safeReadText(file, fallback = "") {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return fallback;
  }
}

function isInsideVault(file) {
  const rel = path.relative(VAULT_ROOT, file);
  return rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function latestRunStatus() {
  const root = path.join(VAULT_ROOT, "30_confpapers");
  const files = walk(root).filter((file) => path.basename(file) === "run-status.json");
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

function latestDailyNote() {
  const root = path.join(VAULT_ROOT, "10_Daily");
  const files = walk(root).filter((file) => file.endsWith(".md") && !file.endsWith("_linked.md"));
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

function paperNoteFiles() {
  return walk(path.join(VAULT_ROOT, "20_Research", "Papers"))
    .filter((file) => file.endsWith(".md") && path.basename(file) !== "image-index.md")
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

function vaultRelative(file) {
  return path.relative(VAULT_ROOT, file).replace(/\\/g, "/");
}

function fileUrl(file) {
  return `/api/file?path=${encodeURIComponent(vaultRelative(file))}`;
}

function mediaFiles(folder) {
  const imageDirs = ["images", "figures", "figure"]
    .map((name) => path.join(folder, name))
    .filter((dir) => fs.existsSync(dir) && fs.statSync(dir).isDirectory());
  const imageRoots = imageDirs.length ? imageDirs : [folder];
  const seen = new Set();
  const imageFiles = [];
  for (const root of imageRoots) {
    for (const file of walk(root)) {
      if (!/\.(png|jpe?g|webp|gif)$/i.test(file)) continue;
      if (seen.has(file)) continue;
      seen.add(file);
      imageFiles.push(file);
    }
  }
  const images = imageFiles
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .sort()
    .slice(0, 24)
    .map((file) => ({
      name: path.basename(file),
      path: vaultRelative(file),
      url: fileUrl(file),
      fileUrl: `file:///${file.replace(/\\/g, "/").replace(/^([A-Za-z]):/, "$1:")}`,
      sourceDir: path.basename(path.dirname(file)),
    }));
  const pdf = walk(folder).find((file) => /\.pdf$/i.test(file));
  return {
    images,
    imageCount: images.length,
    localPdf: pdf ? {
      name: path.basename(pdf),
      path: vaultRelative(pdf),
      url: fileUrl(pdf),
      fileUrl: `file:///${pdf.replace(/\\/g, "/").replace(/^([A-Za-z]):/, "$1:")}`,
    } : null,
  };
}

function mtimeIso(file) {
  try {
    return fs.statSync(file).mtime.toISOString();
  } catch {
    return "";
  }
}

function pathDate(fileOrFolder) {
  const normalized = fileOrFolder.replace(/\\/g, "/");
  return normalized.match(/20_Research\/Papers\/(\d{4}-\d{2}-\d{2})/)?.[1]
    || normalized.match(/30_confpapers\/(\d{4}-\d{2}-\d{2})/)?.[1]
    || "";
}

function confAnalysisIndex() {
  const index = new Map();
  for (const metaFile of walk(path.join(VAULT_ROOT, "30_confpapers")).filter((file) => path.basename(file) === "metadata.json")) {
    const meta = safeReadJson(metaFile, null);
    const noteFile = path.join(path.dirname(metaFile), "note.md");
    if (!meta?.title || !fs.existsSync(noteFile)) continue;
    const media = mediaFiles(path.dirname(metaFile));
    index.set(meta.title.toLowerCase(), {
      path: path.relative(VAULT_ROOT, noteFile).replace(/\\/g, "/"),
      folder: path.relative(VAULT_ROOT, path.dirname(metaFile)).replace(/\\/g, "/"),
      images: media.images,
      imageCount: media.imageCount,
      localPdf: media.localPdf,
      modifiedAt: mtimeIso(noteFile),
      date: pathDate(noteFile),
    });
  }
  return index;
}

function confNotePapers() {
  return walk(path.join(VAULT_ROOT, "30_confpapers"))
    .filter((file) => path.basename(file) === "note.md")
    .map((file) => {
      const folder = path.dirname(file);
      const meta = safeReadJson(path.join(folder, "metadata.json"), {}) || {};
      const markdown = safeReadText(file);
      const media = mediaFiles(folder);
      const title = meta.title || extractLine(markdown, /^#\s+(.+)$/m) || path.basename(folder);
      return {
        id: `conf-note-${safeId(path.relative(VAULT_ROOT, folder))}`,
        source: "conf-papers",
        title,
        zhTitle: inferZhTitle(title),
        venue: meta.venue || meta.conference || "Conference Paper",
        score: meta.score?.total ?? null,
        matchedKeywords: meta.score?.matchedKeywords || meta.matchedKeywords || [],
        summary: inferChineseSummary(meta.title ? meta : { title }),
        authors: meta.authors || [],
        pdfUrl: meta.pdfUrl,
        openAccessUrl: meta.openAccessUrl,
        doiUrl: meta.doiUrl,
        abstract: meta.abstract || "",
        analysisPath: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
        analysisFolder: path.relative(VAULT_ROOT, folder).replace(/\\/g, "/"),
        images: media.images,
        imageCount: media.imageCount,
        localPdf: media.localPdf,
        folder: path.relative(VAULT_ROOT, folder).replace(/\\/g, "/"),
        date: pathDate(file),
        modifiedAt: mtimeIso(file),
      };
    });
}

function paperAnalysisIndex() {
  const index = new Map();
  for (const file of paperNoteFiles()) {
    const text = safeReadText(file);
    const title = extractLine(text, /^#\s+(.+)$/m) || path.basename(file, ".md");
    const media = mediaFiles(path.dirname(file));
    const item = {
      path: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
      folder: path.relative(VAULT_ROOT, path.dirname(file)).replace(/\\/g, "/"),
      images: media.images,
      imageCount: media.imageCount,
      localPdf: media.localPdf,
      modifiedAt: mtimeIso(file),
      date: pathDate(file),
    };
    const key = title.toLowerCase();
    if (!index.has(key)) index.set(key, []);
    index.get(key).push(item);
  }
  return index;
}

function findAnalysis(index, title, preferredDate = "") {
  const items = index.get(String(title || "").toLowerCase()) || [];
  if (!items.length) return null;
  return items.find((item) => item.date === preferredDate) || items[0];
}

function extractLine(text, regex) {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function dailyField(section, name) {
  return extractLine(section, new RegExp(`^- \\*\\*${name}\\*\\*:\\s*(.+)$`, "m"));
}

function parseAuthors(value) {
  if (!value || value === "--") return [];
  return value.replace(/,?\s*等\s*\d+\s*人$/, "").split(/[,、]/).map((x) => x.trim()).filter(Boolean);
}

function parseDailyRecommendations(file, analysisIndex) {
  if (!file) return [];
  const text = safeReadText(file);
  const preferredDate = file.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
  return text.split(/\n---\n/).map((section, idx) => {
    const heading = section.match(/^### \[\[([^|\]]+)\|(.+?)\]\]/m);
    if (!heading) return null;
    const title = heading[2].trim();
    const links = dailyField(section, "链接");
    const analysis = findAnalysis(analysisIndex, title, preferredDate);
    const arxiv = links.match(/\[arXiv\]\((https?:\/\/[^)]+)\)/)?.[1] || "";
    const pdf = links.match(/PDF:\s*(https?:\/\/\S+)/)?.[1] || "";
    const score = Number(dailyField(section, "推荐分")) || null;
    const matchedKeywords = dailyField(section, "匹配关键词").split(",").map((x) => x.trim()).filter(Boolean);
    const summary = extractLine(section, /^\*\*一句话总结\*\*:\s*(.+)$/m)
      || extractLine(section, /^\*\*中文摘要翻译\*\*:\s*(.+)$/m)
      || "来自最新日报推荐，点击查看详情。";
    const abstract = extractLine(section, /^\*\*原始摘要\*\*:\s*([\s\S]+)$/m).split(/\n---\n/)[0].trim();
    return {
      id: `daily-${idx}`,
      source: "daily-recommendation",
      title,
      zhTitle: extractLine(section, /^\*\*中文题名\*\*:\s*(.+)$/m),
      venue: "Daily Recommendation",
      score,
      matchedKeywords,
      summary,
      authors: parseAuthors(dailyField(section, "作者")),
      pdfUrl: pdf,
      openAccessUrl: arxiv,
      abstract,
      analysisPath: analysis?.path || null,
      analysisFolder: analysis?.folder || null,
      analysisMarkdown: analysis ? safeReadText(path.join(VAULT_ROOT, analysis.path)) : null,
      images: analysis?.images || [],
      imageCount: analysis?.imageCount || analysis?.images?.length || 0,
      localPdf: analysis?.localPdf || null,
      folder: analysis?.folder || path.relative(VAULT_ROOT, path.dirname(file)).replace(/\\/g, "/"),
      date: pathDate(file) || file.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "",
      modifiedAt: analysis?.modifiedAt || mtimeIso(file),
      dailyPath: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
    };
  }).filter(Boolean);
}

function fromPaperNote(file) {
  const text = safeReadText(file);
  const media = mediaFiles(path.dirname(file));
  const title = extractLine(text, /^#\s+(.+)$/m) || path.basename(file, ".md");
  const zhTitle = extractLine(text, /^\*\*中文题名\*\*:\s*(.+)$/m);
  const summary = extractLine(text, /^(?:\*\*一句话总结\*\*:|##\s+摘要中文翻译\s*\n+)([\s\S]{0,260})/m)
    .replace(/\n+/g, " ")
    .trim();
  return {
    id: Buffer.from(path.relative(VAULT_ROOT, file)).toString("base64url"),
    source: "paper-note",
    title,
    zhTitle,
    venue: "Local Note",
    score: null,
    matchedKeywords: [],
    summary: summary || "本地论文笔记，点击查看详情。",
    path: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
    folder: path.relative(VAULT_ROOT, path.dirname(file)).replace(/\\/g, "/"),
    date: pathDate(file),
    modifiedAt: mtimeIso(file),
    images: media.images,
    imageCount: media.imageCount,
    localPdf: media.localPdf,
  };
}

function loadPapers() {
  const papers = [];
  const runFile = latestRunStatus();
  const analysisIndex = confAnalysisIndex();
  const localAnalysisIndex = paperAnalysisIndex();
  const dailyFile = latestDailyNote();
  const dailyPapers = parseDailyRecommendations(dailyFile, localAnalysisIndex);
  papers.push(...dailyPapers);
  if (runFile) {
    const run = safeReadJson(runFile, {});
    for (const [idx, paper] of (run.topPapers || []).entries()) {
      const analysis = analysisIndex.get(String(paper.title || "").toLowerCase()) || null;
      papers.push({
        id: `conf-${idx}`,
        source: "conf-papers",
        title: paper.title,
        zhTitle: inferZhTitle(paper.title),
        venue: paper.venue || `${paper.conference || ""} ${paper.year || ""}`.trim(),
        score: paper.score?.total ?? null,
        matchedKeywords: paper.score?.matchedKeywords || paper.matchedTitleKeywords || [],
        summary: inferChineseSummary(paper),
        authors: paper.authors || [],
        pdfUrl: paper.pdfUrl,
        openAccessUrl: paper.openAccessUrl,
        doiUrl: paper.doiUrl,
        abstract: paper.abstract || "",
        analysisPath: analysis?.path || null,
        analysisFolder: analysis?.folder || null,
        images: analysis?.images || [],
        imageCount: analysis?.imageCount || analysis?.images?.length || 0,
        localPdf: analysis?.localPdf || null,
        folder: analysis?.folder || "",
        date: analysis?.date || pathDate(runFile || ""),
        modifiedAt: analysis?.modifiedAt || mtimeIso(runFile || ""),
      });
    }
  }
  const paperKey = (paper) => `${paper.source}:${paper.date || ""}:${String(paper.title || "").toLowerCase()}`;
  const seenPaperKeys = new Set(papers.map(paperKey));
  for (const file of paperNoteFiles()) {
    const note = fromPaperNote(file);
    const key = paperKey(note);
    if (!seenPaperKeys.has(key)) {
      papers.push(note);
      seenPaperKeys.add(key);
    }
  }
  for (const note of confNotePapers()) {
    const key = paperKey(note);
    if (!seenPaperKeys.has(key)) {
      papers.push(note);
      seenPaperKeys.add(key);
    }
  }
  return { runFile: runFile ? path.relative(VAULT_ROOT, runFile).replace(/\\/g, "/") : null, papers };
}

function inferZhTitle(title) {
  if (/OCT to OCTA/i.test(title)) return "OCT 到 OCTA 三维图像转换";
  if (/Blood Flow Speed/i.test(title)) return "基于 OCTA 图像的血流速度估计";
  if (/BIOMEDICA/i.test(title)) return "开放生物医学图像-图注数据集与视觉语言模型";
  if (/anomaly/i.test(title)) return `异常检测相关论文：${title}`;
  if (/medical image segmentation/i.test(title)) return `医学图像分割相关论文：${title}`;
  if (/vision-language/i.test(title)) return `视觉语言模型相关论文：${title}`;
  if (/foundation model/i.test(title)) return `基础模型相关论文：${title}`;
  return title;
}

function inferChineseSummary(paper) {
  const title = paper.title || "";
  if (/OCT to OCTA/i.test(title)) return "从三维 OCT 推断三维 OCTA，重点关注血管结构转换和 OCTA 数据增强。";
  if (/Blood Flow Speed/i.test(title)) return "从 OCTA 图像估计血流速度，把结构成像推进到功能定量。";
  if (/BIOMEDICA/i.test(title)) return "从开放科学文献构建大规模生物医学图文数据集，并训练视觉语言模型。";
  if (/medical image segmentation/i.test(title)) return "医学图像分割方向，可作为 OCT/眼底分割和跨域泛化的算法参考。";
  if (/anomaly/i.test(title)) return "异常检测方向，可作为 OCT 异常筛查或设备质控的间接参考。";
  if (/vision-language/i.test(title)) return "视觉语言模型方向，可用于图文检索、报告生成和医学问答方法储备。";
  return "来自本地推荐结果，点击查看摘要、链接和详细信息。";
}

function compactPaper(paper) {
  return {
    id: paper.id,
    title: paper.title,
    zhTitle: paper.zhTitle,
    summary: paper.summary,
    abstract: paper.abstract,
    matchedKeywords: paper.matchedKeywords || [],
    score: paper.score,
    source: paper.source,
  };
}

function localAiSummary(paper, lang = "zh") {
  const text = [paper.summary, paper.abstract].filter(Boolean).join(" ");
  const sentences = text.replace(/\s+/g, " ").split(/(?<=[.!?。！？])\s+/).filter(Boolean);
  const main = sentences.slice(0, 2).join(" ") || paper.summary || paper.title;
  const keywords = (paper.matchedKeywords || []).slice(0, 5).join(", ") || "OCT, ophthalmology AI";
  if (lang === "en") {
    return {
      main: main || "No abstract is available.",
      innovation: `Likely relevance is driven by ${keywords}; read the method and validation sections to confirm novelty.`,
      source: "local-fallback",
    };
  }
  return {
    main: main || "暂无摘要，建议打开论文原文核对。",
    innovation: `可能的创新点集中在 ${keywords} 相关方向；建议重点核对方法设计、数据来源和外部验证。`,
    source: "local-fallback",
  };
}

function localDeepAnalysis(paper, lang = "zh") {
  const base = localAiSummary(paper, lang);
  if (lang === "en") {
    return {
      contribution: base.main,
      innovation: base.innovation,
      method: "Inspect the model/data pipeline, input modalities, validation split, and cross-device generalization.",
      results: "Use reported metrics, ablations, external validation, and failure cases as the reading anchors.",
      source: "local-fallback",
    };
  }
  return {
    contribution: base.main,
    innovation: base.innovation,
    method: "重点查看模型/算法流程、输入模态、数据集划分、设备来源和跨设备泛化设置。",
    results: "优先提取核心指标、消融实验、外部验证和失败案例；如果缺少这些内容，产品化可信度需要打折。",
    source: "local-fallback",
  };
}

function semanticScore(paper, query) {
  const terms = String(query || "").toLowerCase().split(/[\s,，;；]+/).filter(Boolean);
  if (!terms.length) return 0;
  const haystack = [
    paper.title,
    paper.zhTitle,
    paper.summary,
    paper.abstract,
    ...(paper.matchedKeywords || []),
  ].join(" ").toLowerCase();
  return terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
}

async function callCodex(prompt, { lang = "zh", maxTokens = 1200 } = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    lastAiStatus = { ok: false, at: new Date().toISOString(), transport: null, error: "OPENAI_API_KEY is not set" };
    return null;
  }
  const system = lang === "en"
    ? "You are a precise ophthalmology and medical imaging research assistant. Return compact JSON only."
    : "你是严谨的眼科和医学影像论文助手。只返回紧凑 JSON，不要返回 Markdown。";
  const data = await requestOpenAi({ system, prompt, maxTokens }, apiKey);
  const text = data.output_text
    || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n").trim()
    || data.choices?.[0]?.message?.content?.trim()
    || "";
  try {
    return JSON.parse(text);
  } catch {
    return { text, source: "codex-openai" };
  }
}
async function requestOpenAi(payload, apiKey) {
  const preferChat = OPENAI_ENDPOINT === "chat" || /ghostapi/i.test(OPENAI_BASE_URL);
  const chatBody = JSON.stringify({
    model: AI_MODEL,
    max_tokens: payload.maxTokens,
    temperature: 0.2,
    messages: [
      { role: "system", content: payload.system },
      { role: "user", content: payload.prompt },
    ],
  });
  const responsesBody = JSON.stringify({
    model: AI_MODEL,
    max_output_tokens: payload.maxTokens,
    temperature: 0.2,
    input: [
      { role: "system", content: payload.system },
      { role: "user", content: payload.prompt },
    ],
  });
  const requests = preferChat
    ? [{ endpoint: "chat", url: `${OPENAI_BASE_URL}/chat/completions`, body: chatBody }, { endpoint: "responses", url: `${OPENAI_BASE_URL}/responses`, body: responsesBody }]
    : [{ endpoint: "responses", url: `${OPENAI_BASE_URL}/responses`, body: responsesBody }, { endpoint: "chat", url: `${OPENAI_BASE_URL}/chat/completions`, body: chatBody }];
  const errors = [];
  for (const request of requests) {
    try {
      return await requestOpenAiOnce(request, apiKey, errors);
    } catch (error) {
      errors.push(`${request.endpoint}: ${cleanError(error)}`);
      if (!/404|not found|unsupported|unknown endpoint|responses/i.test(cleanError(error))) break;
    }
  }
  const combined = errors.join(" | ");
  lastAiStatus = { ok: false, at: new Date().toISOString(), transport: OPENAI_TRANSPORT, error: combined };
  throw new Error(combined);
}

async function requestOpenAiOnce(request, apiKey, errors) {
  if (OPENAI_PROXY && OPENAI_TRANSPORT !== "fetch" && OPENAI_TRANSPORT !== "curl") {
    try {
      const data = await postViaHttpProxyAbsolute(request.url, request.body, apiKey, OPENAI_PROXY);
      lastAiStatus = { ok: true, at: new Date().toISOString(), transport: `proxy-http:${request.endpoint}`, error: null };
      return data;
    } catch (error) {
      errors.push(`${request.endpoint}/proxy-http: ${cleanError(error)}`);
      try {
        const data = await postViaHttpConnectProxy(request.url, request.body, apiKey, OPENAI_PROXY);
        lastAiStatus = { ok: true, at: new Date().toISOString(), transport: `proxy-connect:${request.endpoint}`, error: null };
        return data;
      } catch (connectError) {
        errors.push(`${request.endpoint}/proxy-connect: ${cleanError(connectError)}`);
      }
    }
  }
  if (OPENAI_TRANSPORT !== "curl") {
    try {
      const response = await fetch(request.url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${apiKey}`,
        },
        body: request.body,
      });
      if (!response.ok) throw new Error(`OpenAI ${response.status}: ${(await response.text()).slice(0, 300)}`);
      const data = await response.json();
      lastAiStatus = { ok: true, at: new Date().toISOString(), transport: `fetch:${request.endpoint}`, error: null };
      return data;
    } catch (error) {
      errors.push(`${request.endpoint}/fetch: ${cleanError(error)}`);
      if (OPENAI_TRANSPORT === "fetch") throw error;
    }
  }
  try {
    const curlArgs = [
      "-sS",
      "--connect-timeout", "20",
      "--max-time", "90",
      request.url,
      "-H", "Content-Type: application/json",
      "-H", `Authorization: Bearer ${apiKey}`,
      "-d", request.body,
    ];
    if (OPENAI_PROXY) {
      curlArgs.splice(5, 0, "--proxy", OPENAI_PROXY);
    }
    const result = await runProcess("curl.exe", curlArgs, { timeoutMs: 100000 });
    const data = JSON.parse(result.stdout || "{}");
    if (data.error) throw new Error(`OpenAI ${data.error.code || ""}: ${data.error.message || JSON.stringify(data.error)}`);
    lastAiStatus = { ok: true, at: new Date().toISOString(), transport: `curl:${request.endpoint}`, error: null };
    return data;
  } catch (error) {
    errors.push(`${request.endpoint}/curl: ${cleanError(error)}`);
    throw error;
  }
}

function postViaHttpConnectProxy(targetUrl, body, apiKey, proxyUrl) {
  return new Promise((resolve, reject) => {
    const target = new URL(targetUrl);
    const proxy = new URL(proxyUrl);
    const proxyPort = Number(proxy.port || (proxy.protocol === "https:" ? 443 : 80));
    const socket = net.connect(proxyPort, proxy.hostname);
    let settled = false;
    let buffer = Buffer.alloc(0);
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      if (error) reject(error);
      else resolve(value);
    };
    const timer = setTimeout(() => finish(new Error("proxy-connect timeout")), 90000);
    socket.on("error", finish);
    socket.once("connect", () => {
      const auth = proxy.username ? `Proxy-Authorization: Basic ${Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString("base64")}\r\n` : "";
      socket.write(`CONNECT ${target.hostname}:443 HTTP/1.1\r\nHost: ${target.hostname}:443\r\n${auth}\r\n`);
    });
    socket.on("data", function onConnect(chunk) {
      buffer = Buffer.concat([buffer, chunk]);
      const marker = buffer.indexOf("\r\n\r\n");
      if (marker < 0) return;
      socket.off("data", onConnect);
      const header = buffer.slice(0, marker).toString("utf8");
      if (!/^HTTP\/1\.[01] 200/i.test(header)) {
        return finish(new Error(`proxy CONNECT failed: ${header.split("\r\n")[0] || header}`));
      }
      const secure = tls.connect({ socket, servername: target.hostname });
      let response = Buffer.alloc(0);
      secure.on("error", finish);
      secure.once("secureConnect", () => {
        const request = [
          `POST ${target.pathname}${target.search} HTTP/1.1`,
          `Host: ${target.hostname}`,
          "Content-Type: application/json",
          `Content-Length: ${Buffer.byteLength(body)}`,
          `Authorization: Bearer ${apiKey}`,
          "Connection: close",
          "",
          body,
        ].join("\r\n");
        secure.write(request);
      });
      secure.on("data", (data) => response = Buffer.concat([response, data]));
      secure.on("end", () => {
        const raw = response.toString("utf8");
        const split = raw.indexOf("\r\n\r\n");
        if (split < 0) return finish(new Error(`invalid OpenAI response: ${raw.slice(0, 160) || response.toString("base64").slice(0, 160)}`));
        const head = raw.slice(0, split);
        let payload = raw.slice(split + 4);
        const status = Number(head.match(/^HTTP\/\d\.\d\s+(\d+)/)?.[1] || 0);
        if (/transfer-encoding:\s*chunked/i.test(head)) payload = decodeChunked(payload);
        let data;
        try { data = JSON.parse(payload); }
        catch { return finish(new Error(`invalid OpenAI JSON: ${payload.slice(0, 200)}`)); }
        if (status < 200 || status >= 300 || data.error) {
          return finish(new Error(`OpenAI ${status}: ${data.error?.message || payload.slice(0, 300)}`));
        }
        finish(null, data);
      });
    });
  });
}

function postViaHttpProxyAbsolute(targetUrl, body, apiKey, proxyUrl) {
  return new Promise((resolve, reject) => {
    const proxy = new URL(proxyUrl);
    const proxyPort = Number(proxy.port || 80);
    const socket = net.connect(proxyPort, proxy.hostname);
    let response = Buffer.alloc(0);
    let settled = false;
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      if (error) reject(error);
      else resolve(value);
    };
    const timer = setTimeout(() => finish(new Error("proxy-http timeout")), 90000);
    socket.on("error", finish);
    socket.once("connect", () => {
      const target = new URL(targetUrl);
      const auth = proxy.username ? `Proxy-Authorization: Basic ${Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString("base64")}\r\n` : "";
      const request = [
        `POST ${targetUrl} HTTP/1.1`,
        `Host: ${target.hostname}`,
        "Content-Type: application/json",
        `Content-Length: ${Buffer.byteLength(body)}`,
        `Authorization: Bearer ${apiKey}`,
        auth.trimEnd(),
        "Connection: close",
        "",
        body,
      ].filter((line) => line !== "").join("\r\n");
      socket.write(`${request}\r\n`);
    });
    socket.on("data", (data) => response = Buffer.concat([response, data]));
    socket.on("end", () => {
      try {
        finish(null, parseHttpJsonResponse(response));
      } catch (error) {
        finish(error);
      }
    });
  });
}

function parseHttpJsonResponse(response) {
  const raw = response.toString("utf8");
  const split = raw.indexOf("\r\n\r\n");
  if (split < 0) throw new Error(`invalid OpenAI response: ${raw.slice(0, 160) || response.toString("base64").slice(0, 160)}`);
  const head = raw.slice(0, split);
  let payload = raw.slice(split + 4);
  const status = Number(head.match(/^HTTP\/\d\.\d\s+(\d+)/)?.[1] || 0);
  if (/transfer-encoding:\s*chunked/i.test(head)) payload = decodeChunked(payload);
  let data;
  try { data = JSON.parse(payload); }
  catch { throw new Error(`invalid OpenAI JSON: ${payload.slice(0, 200)}`); }
  if (status < 200 || status >= 300 || data.error) {
    throw new Error(`OpenAI ${status}: ${data.error?.message || payload.slice(0, 300)}`);
  }
  return data;
}

function decodeChunked(value) {
  let index = 0;
  let out = "";
  while (index < value.length) {
    const lineEnd = value.indexOf("\r\n", index);
    if (lineEnd < 0) break;
    const size = parseInt(value.slice(index, lineEnd), 16);
    if (!size) break;
    const start = lineEnd + 2;
    out += value.slice(start, start + size);
    index = start + size + 2;
  }
  return out || value;
}

function aiStatus() {
  return {
    provider: "openai",
    model: AI_MODEL,
    baseUrl: OPENAI_BASE_URL,
    endpoint: OPENAI_ENDPOINT || (/ghostapi/i.test(OPENAI_BASE_URL) ? "chat" : "auto"),
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    transport: OPENAI_TRANSPORT,
    proxy: {
      HTTPS_PROXY: Boolean(process.env.HTTPS_PROXY),
      HTTP_PROXY: Boolean(process.env.HTTP_PROXY),
      ALL_PROXY: Boolean(process.env.ALL_PROXY),
      OPENAI_PROXY: Boolean(OPENAI_PROXY),
    },
    last: lastAiStatus,
  };
}

async function testOpenAiStatus() {
  if (!process.env.OPENAI_API_KEY) {
    lastAiStatus = { ok: false, at: new Date().toISOString(), transport: null, error: "OPENAI_API_KEY is not set" };
    return aiStatus();
  }
  try {
    await callCodex("Return JSON: {\"ok\":true}", { lang: "en", maxTokens: 80 });
  } catch {
    // lastAiStatus already contains the useful error.
  }
  return aiStatus();
}

async function handleAiSummaries(body, res) {
  const lang = body.lang || "zh";
  const papers = (Array.isArray(body.papers) ? body.papers : (body.papers ? [body.papers] : [])).slice(0, 20);
  const fallback = papers.map((paper) => ({ id: paper.id, ...localAiSummary(paper, lang) }));
  try {
    const ai = await callCodex(`${lang === "en" ? "Summarize" : "请摘要"} these papers as JSON array with id, main, innovation:\n${JSON.stringify(papers.map(compactPaper))}`, { lang });
    if (Array.isArray(ai)) return sendJson(res, 200, { source: "codex-openai", summaries: ai });
  } catch (error) {
    log(`OpenAI summary fallback: ${error.message}`);
  }
  return sendJson(res, 200, { source: "local-fallback", reason: lastAiStatus.error, summaries: fallback });
}

async function handleDeepAnalysis(body, res) {
  const lang = body.lang || "zh";
  const paper = body.paper || {};
  const fallback = localDeepAnalysis(paper, lang);
  try {
    const ai = await callCodex(`${lang === "en" ? "Analyze" : "请分析"} this paper as JSON with contribution, innovation, method, results:\n${JSON.stringify(compactPaper(paper))}`, { lang });
    if (ai && typeof ai === "object") return sendJson(res, 200, { source: "codex-openai", analysis: ai });
  } catch (error) {
    log(`OpenAI deep fallback: ${error.message}`);
  }
  return sendJson(res, 200, { source: "local-fallback", reason: lastAiStatus.error, analysis: fallback });
}

async function searchArxivLight(query, lang = "zh") {
  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending`;
  const response = await fetch(url, { headers: { "user-agent": "evil-read-arxiv-web/0.1" } });
  if (!response.ok) throw new Error(`arXiv ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match, idx) => {
    const entry = match[1];
    const get = (tag) => entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.replace(/\s+/g, " ").trim() || "";
    const title = get("title");
    const abstract = get("summary");
    const id = get("id");
    const published = get("published");
    return {
      id: `arxiv-search-${idx}-${Buffer.from(id).toString("base64url").slice(0, 10)}`,
      source: "arxiv-search",
      title,
      zhTitle: title,
      venue: "arXiv Search",
      score: null,
      matchedKeywords: String(query).split(/\s+/).filter(Boolean).slice(0, 5),
      summary: lang === "en" ? abstract.slice(0, 360) : `arXiv 重新搜索结果：${abstract.slice(0, 260)}`,
      abstract,
      authors: [...entry.matchAll(/<name>(.*?)<\/name>/g)].map((x) => x[1]),
      openAccessUrl: id,
      pdfUrl: id.replace("/abs/", "/pdf/"),
      images: [],
      imageCount: 0,
      date: published.slice(0, 10),
      modifiedAt: published,
    };
  });
}

async function handleInterestSearch(body, res) {
  const query = body.query || "";
  const lang = body.lang || "zh";
  const mode = body.mode || "semantic";
  if (mode === "arxiv") {
    try {
      return sendJson(res, 200, { source: "arxiv", papers: await searchArxivLight(query, lang) });
    } catch (error) {
      log(`arXiv light search failed: ${error.message}`);
    }
  }
  const papers = loadPapers().papers
    .map((paper) => ({ paper, semanticScore: semanticScore(paper, query) }))
    .filter((item) => item.semanticScore > 0)
    .sort((a, b) => b.semanticScore - a.semanticScore)
    .slice(0, 20)
    .map((item) => ({ ...item.paper, semanticScore: item.semanticScore }));
  return sendJson(res, 200, { source: "local-semantic", papers });
}

function loadStats() {
  const conf = latestRunStatus();
  const confData = conf ? safeReadJson(conf, {}) : {};
  const { papers } = loadPapers();
  return {
    confCandidates: confData.status?.totalDblp ?? 0,
    confFiltered: confData.status?.filtered ?? 0,
    confRateLimited: Boolean(confData.status?.s2RateLimited),
    localNotes: paperNoteFiles().length,
    dailyRecommendations: papers.filter((paper) => paper.source === "daily-recommendation").length,
    totalImages: papers.reduce((sum, paper) => sum + (paper.imageCount || paper.images?.length || 0), 0),
    latestDailyNote: latestDailyNote() ? path.relative(VAULT_ROOT, latestDailyNote()).replace(/\\/g, "/") : null,
    latestConfRun: conf ? path.relative(VAULT_ROOT, conf).replace(/\\/g, "/") : null,
  };
}

function loadData() {
  const paperData = loadPapers();
  return {
    generatedAt: new Date().toISOString(),
    stats: loadStats(),
    runFile: paperData.runFile,
    papers: paperData.papers,
  };
}

function loadMarkdownByQuery(url) {
  const rel = new URL(url, "http://localhost").searchParams.get("path") || "";
  const full = path.resolve(VAULT_ROOT, rel);
  if (!isInsideVault(full) || !fs.existsSync(full)) return null;
  return safeReadText(full);
}

function sendVaultFile(url, res) {
  const rel = new URL(url, "http://localhost").searchParams.get("path") || "";
  const full = path.resolve(VAULT_ROOT, rel);
  if (!isInsideVault(full) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    return sendJson(res, 404, { error: "Not found" });
  }
  const ext = path.extname(full).toLowerCase();
  send(res, 200, fs.readFileSync(full), MIME[ext] || "application/octet-stream");
}

function safeId(value) {
  return String(value || "item").replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120) || "item";
}

function compactPaperForQueue(paper = {}) {
  return {
    id: paper.id,
    title: paper.title,
    zhTitle: paper.zhTitle,
    authors: paper.authors || [],
    venue: paper.venue,
    date: paper.date,
    summary: paper.summary,
    abstract: paper.abstract,
    matchedKeywords: paper.matchedKeywords || [],
    openAccessUrl: paper.openAccessUrl,
    pdfUrl: paper.pdfUrl,
    path: paper.path,
    analysisPath: paper.analysisPath,
    images: (paper.images || []).slice(0, 12).map((image) => ({
      name: image.name,
      path: image.path,
      sourceDir: image.sourceDir,
    })),
  };
}

function createCodexQueueTask(body) {
  fs.mkdirSync(AI_QUEUE_DIR, { recursive: true });
  const type = ["deep", "interest"].includes(body.type) ? body.type : "summary";
  const papers = (Array.isArray(body.papers) ? body.papers : (body.paper ? [body.paper] : [])).filter(Boolean);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const id = `${stamp}-${type}-${safeId(papers[0]?.id || body.query || papers[0]?.title)}`;
  const task = {
    id,
    type,
    lang: body.lang || "zh",
    status: "queued",
    createdAt: new Date().toISOString(),
    query: body.query || "",
    mode: body.mode || "",
    papers: papers.map(compactPaperForQueue),
    instructions: type === "interest"
      ? "Select and rank the most relevant papers for the query. Generate JSON object: {source:\"codex-bridge\", summaries:[{id,main,innovation,source:\"codex-bridge\"}]}"
      : type === "deep"
      ? "Generate JSON object: {analysis:{contribution,innovation,method,results}, source:\"codex-bridge\"}"
      : "Generate JSON object: {summaries:[{id,main,innovation,source:\"codex-bridge\"}]}",
  };
  fs.writeFileSync(path.join(AI_QUEUE_DIR, `${id}.json`), JSON.stringify(task, null, 2), "utf8");
  return task;
}

function loadCodexResult(taskId) {
  const file = path.join(AI_RESULTS_DIR, `${safeId(taskId)}.json`);
  if (!fs.existsSync(file)) return null;
  return safeReadJson(file, null);
}

function listCodexQueue() {
  fs.mkdirSync(AI_QUEUE_DIR, { recursive: true });
  fs.mkdirSync(AI_RESULTS_DIR, { recursive: true });
  const tasks = walk(AI_QUEUE_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => safeReadJson(file, null))
    .filter(Boolean)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return tasks.map((task) => ({
    ...task,
    result: loadCodexResult(task.id),
  }));
}

function runConfPapers(body, res) {
  const year = String(body.year || "2025");
  const conf = String(body.conference || "CVPR");
  const focus = String(body.focus || "OCT AI");
  const script = path.join(VAULT_ROOT, "conf-papers", "scripts", "search_conf_papers.js");
  const child = spawn(process.execPath, [
    script,
    "--vault", VAULT_ROOT,
    "--config", path.join(VAULT_ROOT, "99_System", "Config", "conf-papers.yaml"),
    "--year", year,
    "--conferences", conf,
    "--focus", focus,
    "--topN", "10",
    "--analyzeTopN", "3",
  ], { cwd: VAULT_ROOT });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => stdout += chunk);
  child.stderr.on("data", (chunk) => stderr += chunk);
  child.on("close", (code) => {
    sendJson(res, code === 0 ? 200 : 500, { code, stdout, stderr });
  });
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function findPythonCommand() {
  const candidates = [
    { command: "python", args: ["--version"] },
    { command: "py", args: ["-3", "--version"] },
    { command: "python3", args: ["--version"] },
  ];
  return candidates.find((candidate) => {
    const result = spawnSync(candidate.command, candidate.args, { windowsHide: true, encoding: "utf8" });
    return !result.error && result.status === 0;
  }) || candidates[0];
}

function runProcessCallback(command, args, options, done) {
  const child = spawn(command, args, {
    cwd: options.cwd || VAULT_ROOT,
    windowsHide: true,
  });
  let stdout = "";
  let stderr = "";
  const timer = setTimeout(() => {
    child.kill();
    done(new Error(`${command} timeout`), { stdout, stderr, code: -1 });
  }, options.timeoutMs || 300000);
  child.stdout.on("data", (chunk) => stdout += chunk);
  child.stderr.on("data", (chunk) => stderr += chunk);
  child.on("error", (error) => {
    clearTimeout(timer);
    done(error, { stdout, stderr, code: -1 });
  });
  child.on("close", (code) => {
    clearTimeout(timer);
    done(code === 0 ? null : new Error(`${command} exited ${code}`), { stdout, stderr, code });
  });
}

function runSkill(body, res) {
  const skill = String(body.skill || "");
  const query = String(body.query || "").trim();
  const selectedPaper = body.paper || null;
  const py = findPythonCommand();
  const pythonCommand = py.command;
  const pythonPrefix = py.command === "py" ? ["-3"] : [];

  if (skill === "conf-papers") {
    return runConfPapers(body, res);
  }

  if (skill === "paper-search") {
    const terms = query || "OCT AI";
    const args = ["-n", "-i", terms, path.join(VAULT_ROOT, "20_Research", "Papers"), "-g", "*.md"];
    return runProcessCallback("rg", args, { cwd: VAULT_ROOT, timeoutMs: 30000 }, (error, result) => {
      const lines = (result.stdout || "").split(/\r?\n/).filter(Boolean).slice(0, 20);
      sendJson(res, 200, {
        mode: "direct",
        status: error && !lines.length ? "no-results" : "completed",
        message: lines.length ? `本地笔记搜索完成，找到 ${lines.length} 条匹配。` : "本地笔记搜索完成，没有找到匹配结果。",
        stdout: lines.join("\n"),
        stderr: result.stderr,
      });
    });
  }

  if (skill === "start-my-day") {
    const targetDate = todayStamp();
    const skillDir = path.join(VAULT_ROOT, "start-my-day");
    const configPath = path.join(VAULT_ROOT, "99_System", "Config", "research_interests.yaml");
    const filteredJson = path.join(skillDir, "arxiv_filtered.json");
    const dailyNote = path.join(VAULT_ROOT, "10_Daily", `${targetDate}论文推荐.md`);
    const searchArgs = [
      ...pythonPrefix,
      path.join(skillDir, "scripts", "search_arxiv.py"),
      "--config", configPath,
      "--output", filteredJson,
      "--max-results", "50",
      "--top-n", "10",
      "--categories", "eess.IV,cs.CV,cs.AI,cs.LG,physics.optics",
      "--target-date", targetDate,
      "--cache-dir", path.join(skillDir, ".cache"),
      "--cache-ttl-hours", "72",
      "--arxiv-mode", "auto",
      "--arxiv-max-retries", "1",
      "--fallback-sources", "europe_pmc,pubmed,crossref",
      "--fallback-top-k", "20",
      "--s2-request-limit", "25",
      "--s2-max-queries", "3",
      "--s2-interval", "20",
    ];
    return runProcessCallback(pythonCommand, searchArgs, { cwd: skillDir, timeoutMs: 420000 }, (searchError, searchResult) => {
      if (searchError) {
        return sendJson(res, 500, {
          mode: "direct",
          status: "failed",
          message: "每日推荐检索失败。",
          stdout: searchResult.stdout,
          stderr: searchResult.stderr || searchError.message,
        });
      }
      const noteArgs = [
        ...pythonPrefix,
        path.join(skillDir, "scripts", "generate_daily_note.py"),
        "--input", filteredJson,
        "--output", dailyNote,
        "--top-n", "10",
      ];
      runProcessCallback(pythonCommand, noteArgs, { cwd: skillDir, timeoutMs: 120000 }, (noteError, noteResult) => {
        if (noteError) {
          return sendJson(res, 500, {
            mode: "direct",
            status: "failed",
            message: "每日推荐已完成检索，但生成笔记失败。",
            stdout: `${searchResult.stdout}\n${noteResult.stdout}`,
            stderr: noteResult.stderr || noteError.message,
          });
        }
        sendJson(res, 200, {
          mode: "direct",
          status: "completed",
          message: "每日论文推荐已生成。",
          outputs: [path.relative(VAULT_ROOT, dailyNote), path.relative(VAULT_ROOT, filteredJson)],
          stdout: `${searchResult.stdout}\n${noteResult.stdout}`,
          stderr: `${searchResult.stderr}\n${noteResult.stderr}`.trim(),
        });
      });
    });
  }

  if (skill === "paper-analyze" || skill === "extract-paper-images") {
    const paper = selectedPaper || (query ? { id: safeId(query), title: query } : null);
    const task = createCodexQueueTask({
      type: "deep",
      lang: body.lang || "zh",
      paper,
      query,
      mode: skill,
    });
    return sendJson(res, 200, {
      mode: "codex-queue",
      status: "queued",
      message: `${skill} 暂时还没有独立后端脚本，已加入 Codex 半自动队列。`,
      nextStep: "回到 Codex 对话输入：处理 AI 队列。",
      outputs: [path.join("web", "ai-queue", `${task.id}.json`)],
      task,
    });
  }

  sendJson(res, 400, { status: "failed", message: `未知技能：${skill}` });
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd || VAULT_ROOT,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`${command} timeout`));
    }, options.timeoutMs || 60000);
    child.stdout.on("data", (chunk) => stdout += chunk);
    child.stderr.on("data", (chunk) => stderr += chunk);
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${command} exited ${code}: ${stderr || stdout}`));
    });
  });
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); }
      catch { resolve({}); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname === "/api/papers") return sendJson(res, 200, loadPapers());
  if (url.pathname === "/api/stats") return sendJson(res, 200, loadStats());
  if (url.pathname === "/api/data") return sendJson(res, 200, loadData());
  if (url.pathname === "/api/ai/status") {
    const withTest = url.searchParams.get("test") === "1";
    return sendJson(res, 200, withTest ? await testOpenAiStatus() : aiStatus());
  }
  if (url.pathname === "/api/codex-queue") {
    if (req.method === "GET") return sendJson(res, 200, { tasks: listCodexQueue() });
    if (req.method === "POST") return sendJson(res, 200, { task: createCodexQueueTask(await parseBody(req)) });
  }
  if (url.pathname === "/api/markdown") {
    const md = loadMarkdownByQuery(req.url);
    return md === null ? sendJson(res, 404, { error: "Not found" }) : send(res, 200, md, "text/markdown; charset=utf-8");
  }
  if (url.pathname === "/api/file") {
    return sendVaultFile(req.url, res);
  }
  if (url.pathname === "/api/conf-papers" && req.method === "POST") {
    return runConfPapers(await parseBody(req), res);
  }
  if (url.pathname === "/api/skills/run" && req.method === "POST") {
    return runSkill(await parseBody(req), res);
  }
  if (url.pathname === "/api/ai/summaries" && req.method === "POST") {
    return handleAiSummaries(await parseBody(req), res);
  }
  if (url.pathname === "/api/ai/deep-analysis" && req.method === "POST") {
    return handleDeepAnalysis(await parseBody(req), res);
  }
  if (url.pathname === "/api/search-interest" && req.method === "POST") {
    return handleInterestSearch(await parseBody(req), res);
  }

  let filePath = url.pathname === "/" ? path.join(PUBLIC_ROOT, "index.html") : path.join(PUBLIC_ROOT, url.pathname);
  filePath = path.resolve(filePath);
  if (!filePath.startsWith(PUBLIC_ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_ROOT, "index.html");
  }
  const ext = path.extname(filePath).toLowerCase();
  send(res, 200, fs.readFileSync(filePath), MIME[ext] || "application/octet-stream");
});

server.on("error", (error) => {
  log(`server error: ${error.stack || error.message}`);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  log(`listening: http://${HOST}:${PORT}`);
  console.log(`evil-read-arxiv web running at http://${HOST}:${PORT}`);
});
