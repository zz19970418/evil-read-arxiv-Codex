const fs = require("fs");
const path = require("path");

const DEFAULT_FIELDS = "title,abstract,authors,year,venue,citationCount,influentialCitationCount,externalIds,openAccessPdf,url,fieldsOfStudy";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const item = argv[i];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function decodeXml(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripTags(text) {
  return decodeXml(text.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termMatches(text, term) {
  const lower = text.toLowerCase();
  const needle = term.toLowerCase();
  if (!needle) return false;
  if (/^[a-z0-9]+$/i.test(needle) && needle.length <= 4) {
    return new RegExp(`(^|[^a-z0-9])${escapeRegex(needle)}([^a-z0-9]|$)`, "i").test(text);
  }
  return lower.includes(needle);
}

function isGenericGateTerm(term) {
  return ["ai", "ml", "dl"].includes(term.toLowerCase());
}

function slugify(text, maxLen = 56) {
  return text
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, maxLen)
    .replace(/-+$/g, "") || "paper";
}

function yamlList(text, key) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `${key}:`);
  if (start < 0) return [];
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^\S/.test(line) && !line.startsWith("-")) break;
    const match = line.match(/^\s*-\s+["']?(.+?)["']?\s*$/);
    if (match) out.push(match[1].replace(/["']$/g, ""));
  }
  return out;
}

function yamlScalar(text, key, fallback = null) {
  const match = text.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  if (!match) return fallback;
  const value = match[1].trim();
  if (value === "null") return null;
  return value.replace(/^["']|["']$/g, "");
}

function yamlNumber(text, key, fallback) {
  const match = text.match(new RegExp(`^\\s*${key}:\\s*([0-9.]+)\\s*$`, "m"));
  return match ? Number(match[1]) : fallback;
}

function loadConfig(file) {
  const text = readText(file);
  return {
    language: yamlScalar(text, "language", "zh"),
    apiKey: yamlScalar(text, "semantic_scholar_api_key", null),
    keywords: yamlList(text, "keywords"),
    excludeKeywords: yamlList(text, "exclude_keywords"),
    maxS2Requests: yamlNumber(text, "max_s2_requests", 60),
    s2IntervalSeconds: yamlNumber(text, "s2_interval_seconds", 12),
    topN: yamlNumber(text, "top_n", 10),
    analyzeTopN: yamlNumber(text, "analyze_top_n", 3),
  };
}

function venueKey(conf) {
  const map = {
    CVPR: "cvpr",
    ICCV: "iccv",
    ECCV: "eccv",
  };
  return map[conf.toUpperCase()] || conf.toLowerCase();
}

function dblpUrl(conf, year) {
  const key = venueKey(conf);
  return `https://dblp.org/db/conf/${key}/${key}${year}.xml`;
}

async function fetchText(url, cacheFile, options = {}) {
  if (cacheFile && fs.existsSync(cacheFile)) return readText(cacheFile);
  const res = await fetch(url, options);
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} for ${url}`);
    err.status = res.status;
    err.body = text.slice(0, 300);
    throw err;
  }
  if (cacheFile) {
    ensureDir(path.dirname(cacheFile));
    fs.writeFileSync(cacheFile, text, "utf8");
  }
  return text;
}

function parseDblpInproceedings(xml, conf, year) {
  const papers = [];
  const blocks = xml.match(/<inproceedings[\s\S]*?<\/inproceedings>/g) || [];
  for (const block of blocks) {
    const title = stripTags((block.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
    if (!title) continue;
    const authors = [...block.matchAll(/<author[^>]*>([\s\S]*?)<\/author>/g)].map((m) => stripTags(m[1]));
    const ees = [...block.matchAll(/<ee[^>]*>([\s\S]*?)<\/ee>/g)].map((m) => stripTags(m[1]));
    const url = stripTags((block.match(/<url>([\s\S]*?)<\/url>/) || [])[1] || "");
    papers.push({
      title: title.replace(/\.$/, ""),
      authors,
      year,
      conference: conf.toUpperCase(),
      venue: `${conf.toUpperCase()} ${year}`,
      dblpUrl: url ? `https://dblp.org/rec/${url.replace(/^db\//, "conf/")}` : dblpUrl(conf, year),
      links: ees,
      openAccessUrl: ees.find((x) => x.includes("openaccess.thecvf.com")) || null,
      doiUrl: ees.find((x) => x.includes("doi.org")) || null,
    });
  }
  return papers;
}

function hasAny(text, terms) {
  return terms.filter((term) => termMatches(text, term));
}

function stageOneFilter(papers, keywords, excludes, focusTerms) {
  const titleTerms = [...new Set([...keywords, ...focusTerms])];
  return papers
    .map((paper) => {
      const matched = hasAny(paper.title, titleTerms);
      const excluded = hasAny(paper.title, excludes);
      return { ...paper, matchedTitleKeywords: matched, excludedKeywords: excluded };
    })
    .filter((paper) => {
      const hasSpecificMatch = paper.matchedTitleKeywords.some((term) => !isGenericGateTerm(term));
      return paper.excludedKeywords.length === 0 && hasSpecificMatch;
    });
}

async function enrichWithCvf(paper, cacheDir) {
  if (!paper.openAccessUrl || !paper.openAccessUrl.includes("openaccess.thecvf.com")) return paper;
  try {
    const cacheFile = path.join(cacheDir, "cvf", `${slugify(paper.title, 80)}.html`);
    const html = await fetchText(paper.openAccessUrl, cacheFile);
    const absMatch = html.match(/<div id="abstract"[^>]*>([\s\S]*?)<\/div>/i);
    const abstract = absMatch ? stripTags(absMatch[1]) : null;
    const pdfMatch = html.match(/href="([^"]+?\.pdf)"/i);
    let pdfUrl = null;
    if (pdfMatch) {
      pdfUrl = pdfMatch[1].startsWith("http")
        ? pdfMatch[1]
        : new URL(pdfMatch[1], paper.openAccessUrl).toString();
    }
    return { ...paper, abstract: abstract || paper.abstract || null, pdfUrl: pdfUrl || paper.pdfUrl || null };
  } catch (error) {
    return { ...paper, cvfError: error.message };
  }
}

async function enrichWithS2(paper, config, cacheDir, status) {
  if (status.s2RateLimited || status.s2Requests >= config.maxS2Requests) return paper;
  const cacheFile = path.join(cacheDir, "s2", `${slugify(paper.title, 100)}.json`);
  if (fs.existsSync(cacheFile)) {
    try {
      const cached = JSON.parse(readText(cacheFile));
      return mergeS2(paper, cached);
    } catch {
      // Ignore corrupt cache and refetch.
    }
  }
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(paper.title)}&limit=1&fields=${encodeURIComponent(DEFAULT_FIELDS)}`;
  const headers = {};
  if (config.apiKey) headers["x-api-key"] = config.apiKey;
  try {
    status.s2Requests++;
    const res = await fetch(url, { headers });
    const body = await res.text();
    if (res.status === 429) {
      status.s2RateLimited = true;
      return paper;
    }
    if (!res.ok) return { ...paper, s2Error: `HTTP ${res.status}` };
    ensureDir(path.dirname(cacheFile));
    fs.writeFileSync(cacheFile, body, "utf8");
    const json = JSON.parse(body);
    const hit = (json.data || [])[0] || null;
    return hit ? mergeS2(paper, hit) : paper;
  } catch (error) {
    status.s2Error = error.message;
    return paper;
  }
}

function mergeS2(paper, hit) {
  return {
    ...paper,
    s2Url: hit.url || paper.s2Url || null,
    abstract: hit.abstract || paper.abstract || null,
    citationCount: hit.citationCount ?? paper.citationCount ?? 0,
    influentialCitationCount: hit.influentialCitationCount ?? paper.influentialCitationCount ?? 0,
    externalIds: hit.externalIds || paper.externalIds || {},
    openAccessPdf: hit.openAccessPdf || paper.openAccessPdf || null,
    pdfUrl: paper.pdfUrl || hit.openAccessPdf?.url || null,
    fieldsOfStudy: hit.fieldsOfStudy || paper.fieldsOfStudy || [],
  };
}

function scorePaper(paper, keywords, focusTerms) {
  const title = paper.title.toLowerCase();
  const abstract = paper.abstract || "";
  const allTerms = [...new Set([...keywords, ...focusTerms])];
  let relevanceRaw = 0;
  const matched = [];
  for (const term of allTerms) {
    const generic = isGenericGateTerm(term);
    const isFocus = focusTerms.includes(term);
    if (termMatches(title, term)) {
      relevanceRaw += generic ? 2 : (isFocus ? 14 : 8);
      matched.push(term);
    } else if (termMatches(abstract, term)) {
      relevanceRaw += generic ? 1 : (isFocus ? 7 : 4);
      matched.push(term);
    }
  }
  const matchedLower = matched.map((x) => x.toLowerCase());
  if (matchedLower.includes("oct") || matchedLower.includes("octa") || matchedLower.includes("optical coherence tomography")) {
    relevanceRaw += 8;
  }
  if (matchedLower.includes("ophthalmic") || matchedLower.includes("ophthalmology") || title.includes("oph")) {
    relevanceRaw += 8;
  }
  if (matchedLower.includes("ai") && matched.length === 1) {
    relevanceRaw = Math.min(relevanceRaw, 4);
  }
  const relevance = Math.min(40, relevanceRaw);
  const citations = paper.citationCount || 0;
  const influential = paper.influentialCitationCount || 0;
  const popularity = Math.min(40, Math.log10(citations + 1) * 18 + Math.log10(influential + 1) * 8);
  const quality = paper.conference === "ECCV" ? 19.6 : 20;
  return {
    relevance: Math.round(relevance * 10) / 10,
    popularity: Math.round(popularity * 10) / 10,
    quality: Math.round(quality * 10) / 10,
    total: Math.round((relevance + popularity + quality) * 10) / 10,
    matchedKeywords: [...new Set([...(paper.matchedTitleKeywords || []), ...matched])],
  };
}

function zhTitle(title) {
  const replacements = [
    [/segmentation/i, "分割"],
    [/classification/i, "分类"],
    [/detection/i, "检测"],
    [/foundation model/i, "基础模型"],
    [/vision-language/i, "视觉语言"],
    [/optical coherence tomography|OCT/i, "OCT"],
    [/retinal/i, "视网膜"],
    [/medical image/i, "医学图像"],
  ];
  const hits = replacements.filter(([re]) => re.test(title)).map(([, zh]) => zh);
  return hits.length ? `${[...new Set(hits)].join(" / ")}相关顶会论文：${title}` : `顶会论文：${title}`;
}

function summaryFor(paper) {
  if (paper.abstract) {
    const sentence = paper.abstract.split(/(?<=[.!?])\s+/)[0];
    return sentence.length > 220 ? `${sentence.slice(0, 220)}...` : sentence;
  }
  return "DBLP 已收录该顶会论文；Semantic Scholar 当前受限或未提供摘要，需要后续结合论文 PDF 进一步分析。";
}

function chineseRecommendationSummary(paper) {
  const title = paper.title.toLowerCase();
  const matched = (paper.score?.matchedKeywords || []).map((x) => x.toLowerCase());
  if (title.includes("oct") || title.includes("optical coherence tomography") || matched.includes("oct") || matched.includes("octa")) {
    return "这篇论文直接涉及 OCT/OCTA 或光学相干断层成像，优先关注其数据来源、成像任务、跨设备泛化和是否能转化为设备端算法模块。";
  }
  if (title.includes("ophthalm") || matched.includes("ophthalmology") || matched.includes("ophthalmic")) {
    return "这篇论文直接涉及眼科 AI，建议重点查看其图像模态、临床任务、标注来源和与真实设备数据的距离。";
  }
  if (matched.some((x) => x.includes("medical image segmentation"))) {
    return "这篇论文关注医学图像分割，可作为 OCT/眼底图像分割、跨中心泛化和少标注训练的算法参考。";
  }
  if (matched.some((x) => x.includes("vision-language"))) {
    return "这篇论文关注视觉语言模型，可作为眼科图文检索、报告生成、医学问答或多模态预训练的参考。";
  }
  if (matched.some((x) => x.includes("anomaly detection"))) {
    return "这篇论文关注异常检测，可作为 OCT 异常筛查、设备质控或少标注病灶发现的间接方法参考。";
  }
  if (matched.some((x) => x.includes("foundation model"))) {
    return "这篇论文关注基础模型，可作为眼科模型预训练、迁移学习和跨域泛化的方法储备。";
  }
  return "这篇论文来自指定顶会主会，和配置关键词存在匹配；建议阅读全文后判断是否值得进入详细分析。";
}

function chineseAbstractPrompt(paper) {
  if (!paper.abstract) return "当前未获得英文摘要。需要下载 PDF 后补充中文摘要翻译。";
  return [
    "请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：",
    "",
    `> ${paper.abstract}`,
  ].join("\n");
}

function whyWorthReading(paper) {
  const points = [];
  if ((paper.score?.matchedKeywords || []).length) points.push(`标题或摘要命中：${paper.score.matchedKeywords.slice(0, 6).join(", ")}。`);
  if (paper.abstract) points.push("已从开放页面或 Semantic Scholar 获取摘要，可进行进一步方法和实验分析。");
  if (paper.pdfUrl) points.push("存在可访问 PDF，后续可以提取图片并生成详细笔记。");
  if (!points.length) points.push("来自指定顶会主会议程，适合作为相关方向的候选论文继续筛选。");
  return points;
}

function makeLinks(paper) {
  const links = [];
  if (paper.openAccessUrl) links.push(`[CVF](${paper.openAccessUrl})`);
  if (paper.s2Url) links.push(`[Semantic Scholar](${paper.s2Url})`);
  if (paper.pdfUrl) links.push(`[PDF](${paper.pdfUrl})`);
  if (paper.doiUrl) links.push(`[DOI](${paper.doiUrl})`);
  return links.join(" | ") || "--";
}

function writeRecommendation(outDir, papers, status, scope) {
  ensureDir(outDir);
  const file = path.join(outDir, "conference-paper-recommendations.md");
  const lines = [];
  lines.push("---");
  lines.push('tags: ["llm-generated", "conference-paper-recommendation"]');
  lines.push('source: "DBLP + Semantic Scholar/CVF fallback"');
  lines.push(`date: "${scope.date}"`);
  lines.push("---", "");
  lines.push(`# ${scope.date} 顶会论文推荐`, "");
  lines.push("## 今日概览", "");
  lines.push(`本次检索范围为 **${scope.conferences.join("/")} ${scope.year}**，主题聚焦 **${scope.focus}**。共从 DBLP 获取 ${status.totalDblp} 篇候选，标题轻筛后保留 ${status.filtered} 篇，最终推荐前 ${papers.length} 篇。`);
  if (status.s2RateLimited) lines.push("");
  if (status.s2RateLimited) lines.push("> Semantic Scholar 当前返回 429，本次已停止继续请求，评分中的热门度主要依赖缓存或置为低权重；推荐仍基于 DBLP 主会议论文和标题/摘要相关性生成。");
  if (status.missingVenues.length) lines.push(`\n未获取到主会记录：${status.missingVenues.join(", ")}。`);
  lines.push("", "## 推荐论文", "");
  papers.forEach((paper, index) => {
    lines.push(`### ${index + 1}. ${paper.title}`);
    lines.push(`**中文题名**: ${zhTitle(paper.title)}`);
    lines.push(`- **会议/年份**: ${paper.venue}`);
    lines.push(`- **作者**: ${paper.authors?.length ? paper.authors.slice(0, 8).join(", ") + (paper.authors.length > 8 ? " 等" : "") : "--"}`);
    lines.push(`- **链接**: ${makeLinks(paper)}`);
    lines.push(`- **综合评分**: ${paper.score.total}`);
    lines.push(`- **评分构成**: 相关性 ${paper.score.relevance}/40，热门度 ${paper.score.popularity}/40，质量 ${paper.score.quality}/20`);
    lines.push(`- **匹配关键词**: ${paper.score.matchedKeywords.length ? paper.score.matchedKeywords.join(", ") : "--"}`);
    lines.push("");
    lines.push(`**中文一句话总结**: ${chineseRecommendationSummary(paper)}`);
    lines.push("");
    lines.push("**为什么值得看**:");
    for (const point of whyWorthReading(paper)) lines.push(`- ${point}`);
    lines.push("");
  });
  fs.writeFileSync(file, lines.join("\n"), "utf8");
  return file;
}

function writeDetailedNotes(outDir, papers, analyzeTopN) {
  const created = [];
  papers.slice(0, analyzeTopN).forEach((paper, idx) => {
    if (!paper.pdfUrl && !paper.externalIds?.ArXiv) return;
    const folder = path.join(outDir, `${String(idx + 1).padStart(2, "0")}-${slugify(paper.title, 48)}`);
    ensureDir(path.join(folder, "images"));
    const metadata = { ...paper };
    fs.writeFileSync(path.join(folder, "metadata.json"), JSON.stringify(metadata, null, 2), "utf8");
    const note = [
      "---",
      'tags: ["llm-generated", "conference-paper-analysis"]',
      `source: "${paper.venue}"`,
      "---",
      "",
      `# ${paper.title}`,
      "",
      `**中文题名**: ${zhTitle(paper.title)}`,
      "",
      "## 摘要中文翻译",
      "",
      chineseAbstractPrompt(paper),
      "",
      "## 要点提炼",
      "",
      paper.abstract ? "待阅读 PDF 后补充中文要点。请至少提炼研究问题、方法创新、实验数据、关键结果和产品启发。" : "待获得摘要或 PDF 后补充。",
      "",
      "## 研究背景与动机",
      "",
      "该论文来自指定顶会主会，且命中本次 OCT / 眼科 AI 主题筛选词。具体临床或仪器背景需结合全文进一步确认。",
      "",
      "## 方法概述和架构",
      "",
      "当前自动检索阶段仅获得题名、作者、会议和可用摘要/PDF 链接。若需要完整方法拆解，应继续读取 PDF 正文。",
      "",
      "## 实验结果分析",
      "",
      "待从 PDF 正文提取实验设置、数据集、指标和对比结果。",
      "",
      "## 研究价值评估",
      "",
      `推荐评分：${paper.score.total}。相关性 ${paper.score.relevance}/40，热门度 ${paper.score.popularity}/40，质量 ${paper.score.quality}/20。`,
      "",
      "## 优势和局限性",
      "",
      "- 优势：来自顶级会议，且与当前主题关键词匹配。",
      "- 局限：Semantic Scholar 受限时，引用数和摘要可能不完整。",
      "",
      "## 与已有本地论文的关系",
      "",
      "可与 `20_Research/Papers` 中的 OCT、眼科 AI、VLM、分割和异常检测论文进行主题对照。",
      "",
      "## 后续阅读问题",
      "",
      "- 是否使用真实眼科 OCT / 眼底 / 临床数据？",
      "- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？",
      "- 是否提供开源代码、模型或数据集？",
      "",
      "## 图片索引",
      "",
      "尚未下载 PDF 提取图片。可在网络稳定后补充 `paper.pdf` 和 `images/`。",
      "",
      "## 链接",
      "",
      `- PDF: ${paper.pdfUrl || "--"}`,
      `- Semantic Scholar: ${paper.s2Url || "--"}`,
      `- DBLP/CVF: ${paper.openAccessUrl || paper.dblpUrl || "--"}`,
      "",
      "## 英文原文摘要",
      "",
      `> ${paper.abstract || "未获取到英文摘要。"}`,
    ].join("\n");
    fs.writeFileSync(path.join(folder, "note.md"), note, "utf8");
    created.push(folder);
  });
  return created;
}

async function main() {
  const args = parseArgs(process.argv);
  const vault = path.resolve(args.vault || process.cwd());
  const configPath = path.resolve(vault, args.config || "99_System/Config/conf-papers.yaml");
  const config = loadConfig(configPath);
  const year = Number(args.year || 2025);
  const conferences = String(args.conferences || "CVPR,ICCV,ECCV").split(",").map((x) => x.trim()).filter(Boolean);
  const focus = args.focus || "OCT ophthalmic AI";
  const focusTerms = focus.split(/[,，\s]+/).map((x) => x.trim()).filter(Boolean);
  const topN = Number(args.topN || config.topN || 10);
  const analyzeTopN = Number(args.analyzeTopN || config.analyzeTopN || 3);
  const date = args.date || new Date().toISOString().slice(0, 10);
  const cacheDir = path.resolve(vault, "conf-papers/.cache");
  const outDir = path.resolve(vault, `30_confpapers/${date}`);
  const status = { totalDblp: 0, filtered: 0, s2Requests: 0, s2RateLimited: false, missingVenues: [] };

  let all = [];
  for (const conf of conferences) {
    const url = dblpUrl(conf, year);
    const cacheFile = path.join(cacheDir, "dblp", `${conf.toUpperCase()}-${year}.xml`);
    try {
      const xml = await fetchText(url, cacheFile);
      const papers = parseDblpInproceedings(xml, conf, year);
      status.totalDblp += papers.length;
      all = all.concat(papers);
    } catch (error) {
      status.missingVenues.push(`${conf.toUpperCase()} ${year} (${error.status || error.message})`);
    }
  }

  let filtered = stageOneFilter(all, config.keywords, config.excludeKeywords, focusTerms);
  status.filtered = filtered.length;

  filtered = filtered
    .map((paper) => ({ ...paper, roughScore: scorePaper(paper, config.keywords, focusTerms).total }))
    .sort((a, b) => b.roughScore - a.roughScore);

  const cvfLimit = Math.min(filtered.length, 100);
  for (let i = 0; i < cvfLimit; i++) filtered[i] = await enrichWithCvf(filtered[i], cacheDir);

  const s2Limit = Math.min(filtered.length, config.maxS2Requests);
  for (let i = 0; i < s2Limit; i++) {
    filtered[i] = await enrichWithS2(filtered[i], config, cacheDir, status);
    if (status.s2RateLimited) break;
    if (config.s2IntervalSeconds > 0 && i < s2Limit - 1) {
      await new Promise((resolve) => setTimeout(resolve, config.s2IntervalSeconds * 1000));
    }
  }

  const scored = filtered.map((paper) => ({ ...paper, score: scorePaper(paper, config.keywords, focusTerms) }))
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, topN);

  ensureDir(outDir);
  const recommendationFile = writeRecommendation(outDir, scored, status, {
    date,
    year,
    conferences,
    focus,
  });
  const detailFolders = writeDetailedNotes(outDir, scored, analyzeTopN);
  fs.writeFileSync(path.join(outDir, "run-status.json"), JSON.stringify({ status, recommendationFile, detailFolders, topPapers: scored }, null, 2), "utf8");
  console.log(JSON.stringify({ recommendationFile, detailFolders, status, count: scored.length }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
