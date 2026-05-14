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
    imageCount: images.length,
    localPdf: pdf ? {
      name: path.basename(pdf),
      path: path.relative(VAULT_ROOT, pdf).replace(/\\/g, "/"),
      url: fileUrl(pdf),
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

function line(text, regex) {
  return text.match(regex)?.[1]?.trim() || "";
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

for (const file of paperNoteFiles().slice(0, 20)) {
  papers.push(fromPaperNote(file));
}

const totalImages = papers.reduce((sum, paper) => sum + (paper.imageCount || paper.images?.length || 0), 0);

const data = {
  generatedAt: new Date().toISOString(),
  stats: {
    confCandidates: run.status?.totalDblp ?? 0,
    confFiltered: run.status?.filtered ?? 0,
    confRateLimited: Boolean(run.status?.s2RateLimited),
    localNotes: paperNoteFiles().length,
    totalImages,
    latestConfRun: runFile ? path.relative(VAULT_ROOT, runFile).replace(/\\/g, "/") : null,
  },
  runFile: runFile ? path.relative(VAULT_ROOT, runFile).replace(/\\/g, "/") : null,
  papers,
};

fs.writeFileSync(OUT_FILE, `window.EVIL_READ_ARXIV_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
console.log(`Wrote ${OUT_FILE}`);
