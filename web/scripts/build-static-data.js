const fs = require("fs");
const path = require("path");

const WEB_ROOT = path.resolve(__dirname, "..");
const VAULT_ROOT = path.resolve(WEB_ROOT, "..");
const OUT_FILE = path.join(WEB_ROOT, "public", "data.js");

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function readText(file, fallback = "") {
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
  const files = walk(path.join(VAULT_ROOT, "30_confpapers"))
    .filter((file) => path.basename(file) === "run-status.json")
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

function latestDailyNote() {
  const files = walk(path.join(VAULT_ROOT, "10_Daily"))
    .filter((file) => file.endsWith(".md") && !file.endsWith("_linked.md"))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
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
    const meta = readJson(metaFile, null);
    const noteFile = path.join(path.dirname(metaFile), "note.md");
    if (!meta?.title || !fs.existsSync(noteFile)) continue;
    const media = mediaFiles(path.dirname(metaFile));
    index.set(meta.title.toLowerCase(), {
      path: path.relative(VAULT_ROOT, noteFile).replace(/\\/g, "/"),
      markdown: readText(noteFile),
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
      const meta = readJson(path.join(folder, "metadata.json"), {}) || {};
      const markdown = readText(file);
      const media = mediaFiles(folder);
      const title = meta.title || extractLine(markdown, /^#\s+(.+)$/m) || path.basename(folder);
      return {
        id: `conf-note-${path.relative(VAULT_ROOT, folder).replace(/[^a-zA-Z0-9._-]+/g, "-")}`,
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
        analysisMarkdown: markdown,
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
    const text = readText(file);
    const title = line(text, /^#\s+(.+)$/m) || path.basename(file, ".md");
    const media = mediaFiles(path.dirname(file));
    const item = {
      path: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
      markdown: text,
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

function line(text, regex) {
  return text.match(regex)?.[1]?.trim() || "";
}

function dailyField(section, name) {
  return line(section, new RegExp(`^- \\*\\*${name}\\*\\*:\\s*(.+)$`, "m"));
}

function parseAuthors(value) {
  if (!value || value === "--") return [];
  return value.replace(/,?\s*等\s*\d+\s*人$/, "").split(/[,、]/).map((x) => x.trim()).filter(Boolean);
}

function parseDailyRecommendations(file, analysisIndex) {
  if (!file) return [];
  const text = readText(file);
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
    const summary = line(section, /^\*\*一句话总结\*\*:\s*(.+)$/m)
      || line(section, /^\*\*中文摘要翻译\*\*:\s*(.+)$/m)
      || "来自最新日报推荐，点击查看详情。";
    const abstract = line(section, /^\*\*原始摘要\*\*:\s*([\s\S]+)$/m).split(/\n---\n/)[0].trim();
    return {
      id: `daily-${idx}`,
      source: "daily-recommendation",
      title,
      zhTitle: line(section, /^\*\*中文题名\*\*:\s*(.+)$/m),
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
      analysisMarkdown: analysis?.markdown || null,
      images: analysis?.images || [],
      imageCount: analysis?.imageCount || analysis?.images?.length || 0,
      localPdf: analysis?.localPdf || null,
      folder: analysis?.folder || path.relative(VAULT_ROOT, path.dirname(file)).replace(/\\/g, "/"),
      date: pathDate(file) || file.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "",
      modifiedAt: analysis?.modifiedAt || mtimeIso(file),
      dailyPath: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
      markdown: section.trim(),
    };
  }).filter(Boolean);
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

function fromPaperNote(file) {
  const text = readText(file);
  const media = mediaFiles(path.dirname(file));
  const title = line(text, /^#\s+(.+)$/m) || path.basename(file, ".md");
  const zhTitle = line(text, /^\*\*中文题名\*\*:\s*(.+)$/m);
  return {
    id: Buffer.from(path.relative(VAULT_ROOT, file)).toString("base64url"),
    source: "paper-note",
    title,
    zhTitle,
    venue: "Local Note",
    score: null,
    matchedKeywords: [],
    summary: "本地论文笔记，点击查看详情。",
    path: path.relative(VAULT_ROOT, file).replace(/\\/g, "/"),
    folder: path.relative(VAULT_ROOT, path.dirname(file)).replace(/\\/g, "/"),
    date: pathDate(file),
    modifiedAt: mtimeIso(file),
    markdown: text,
    images: media.images,
    imageCount: media.imageCount,
    localPdf: media.localPdf,
  };
}

const runFile = latestRunStatus();
const run = runFile ? readJson(runFile, {}) : {};
const papers = [];
const analysisIndex = confAnalysisIndex();
const localAnalysisIndex = paperAnalysisIndex();
const dailyFile = latestDailyNote();
const dailyPapers = parseDailyRecommendations(dailyFile, localAnalysisIndex);
papers.push(...dailyPapers);

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
    analysisMarkdown: analysis?.markdown || null,
    images: analysis?.images || [],
    imageCount: analysis?.imageCount || analysis?.images?.length || 0,
    localPdf: analysis?.localPdf || null,
    folder: analysis?.folder || "",
    date: analysis?.date || pathDate(runFile || ""),
    modifiedAt: analysis?.modifiedAt || mtimeIso(runFile || ""),
  });
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

const totalImages = papers.reduce((sum, paper) => sum + (paper.imageCount || paper.images?.length || 0), 0);

const data = {
  generatedAt: new Date().toISOString(),
  stats: {
    confCandidates: run.status?.totalDblp ?? 0,
    confFiltered: run.status?.filtered ?? 0,
    confRateLimited: Boolean(run.status?.s2RateLimited),
    localNotes: paperNoteFiles().length,
    dailyRecommendations: dailyPapers.length,
    totalImages,
    latestDailyNote: dailyFile ? path.relative(VAULT_ROOT, dailyFile).replace(/\\/g, "/") : null,
    latestConfRun: runFile ? path.relative(VAULT_ROOT, runFile).replace(/\\/g, "/") : null,
  },
  runFile: runFile ? path.relative(VAULT_ROOT, runFile).replace(/\\/g, "/") : null,
  papers,
};

fs.writeFileSync(OUT_FILE, `window.EVIL_READ_ARXIV_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
console.log(`Wrote ${OUT_FILE}`);
