const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const WEB_ROOT = __dirname;
const VAULT_ROOT = path.resolve(WEB_ROOT, "..");
const PUBLIC_ROOT = path.join(WEB_ROOT, "public");
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const LOG_FILE = path.join(WEB_ROOT, "server-runtime.log");

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
  const files = walk(root).filter((file) => file.endsWith(".md"));
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

function paperNoteFiles() {
  return walk(path.join(VAULT_ROOT, "20_Research", "Papers"))
    .filter((file) => file.endsWith(".md") && path.basename(file) !== "image-index.md")
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

function fileUrl(file) {
  return `file:///${file.replace(/\\/g, "/").replace(/^([A-Za-z]):/, "$1:")}`;
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
      path: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
      url: fileUrl(file),
      sourceDir: path.basename(path.dirname(file)),
    }));
  const pdf = walk(folder).find((file) => /\.pdf$/i.test(file));
  return {
    images,
    localPdf: pdf ? {
      name: path.basename(pdf),
      path: path.relative(VAULT_ROOT, pdf).replace(/\\/g, "/"),
      url: fileUrl(pdf),
    } : null,
  };
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
      localPdf: media.localPdf,
    });
  }
  return index;
}

function extractLine(text, regex) {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
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
    images: media.images,
    localPdf: media.localPdf,
  };
}

function loadPapers() {
  const papers = [];
  const runFile = latestRunStatus();
  const analysisIndex = confAnalysisIndex();
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
        localPdf: analysis?.localPdf || null,
      });
    }
  }
  for (const file of paperNoteFiles().slice(0, 20)) {
    papers.push(fromPaperNote(file));
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

function loadStats() {
  const conf = latestRunStatus();
  const confData = conf ? safeReadJson(conf, {}) : {};
  return {
    confCandidates: confData.status?.totalDblp ?? 0,
    confFiltered: confData.status?.filtered ?? 0,
    confRateLimited: Boolean(confData.status?.s2RateLimited),
    localNotes: paperNoteFiles().length,
    latestDailyNote: latestDailyNote() ? path.relative(VAULT_ROOT, latestDailyNote()).replace(/\\/g, "/") : null,
    latestConfRun: conf ? path.relative(VAULT_ROOT, conf).replace(/\\/g, "/") : null,
  };
}

function loadMarkdownByQuery(url) {
  const rel = new URL(url, "http://localhost").searchParams.get("path") || "";
  const full = path.resolve(VAULT_ROOT, rel);
  if (!full.startsWith(VAULT_ROOT) || !fs.existsSync(full)) return null;
  return safeReadText(full);
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
  if (url.pathname === "/api/markdown") {
    const md = loadMarkdownByQuery(req.url);
    return md === null ? sendJson(res, 404, { error: "Not found" }) : send(res, 200, md, "text/markdown; charset=utf-8");
  }
  if (url.pathname === "/api/conf-papers" && req.method === "POST") {
    return runConfPapers(await parseBody(req), res);
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
