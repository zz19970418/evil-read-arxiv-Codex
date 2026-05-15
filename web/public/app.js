const state = {
  papers: [],
  selected: null,
  query: "",
  source: "all",
  date: "all",
  asset: "all",
  status: "all",
  sort: "score",
  view: "comfortable",
  marks: {},
  folders: {},
  feedback: [],
  aiSummaries: {},
  lang: "zh",
  dataMode: "static",
  refreshTimer: null,
};

const $ = (id) => document.getElementById(id);
const MARKS_KEY = "evil-read-arxiv.paperMarks.v1";
const FOLDERS_KEY = "evil-read-arxiv.folders.v1";
const FEEDBACK_KEY = "evil-read-arxiv.feedback.v1";
const AI_SUMMARY_KEY = "evil-read-arxiv.aiSummaries.v1";
const LANG_KEY = "evil-read-arxiv.lang.v1";

function loadMarks() {
  try {
    state.marks = JSON.parse(localStorage.getItem(MARKS_KEY) || "{}");
    state.folders = JSON.parse(localStorage.getItem(FOLDERS_KEY) || "{}");
    state.feedback = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
    state.aiSummaries = JSON.parse(localStorage.getItem(AI_SUMMARY_KEY) || "{}");
    state.lang = localStorage.getItem(LANG_KEY) || "zh";
  } catch {
    state.marks = {};
    state.folders = {};
    state.feedback = [];
    state.aiSummaries = {};
  }
}

function saveMarks() {
  localStorage.setItem(MARKS_KEY, JSON.stringify(state.marks));
}

function saveFolders() {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(state.folders));
}

function saveFeedback() {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(state.feedback));
}

function saveAiSummaries() {
  localStorage.setItem(AI_SUMMARY_KEY, JSON.stringify(state.aiSummaries));
}

function t(zh, en) {
  return state.lang === "en" ? en : zh;
}

function paperMark(id) {
  return state.marks[id] || { status: "unread", starred: false };
}

function setPaperMark(id, patch) {
  state.marks[id] = { ...paperMark(id), ...patch };
  saveMarks();
  renderList();
  renderDetail();
}

function folderForPaper(id) {
  return state.folders[id] || "";
}

function setPaperFolder(id, folder) {
  if (folder) state.folders[id] = folder;
  else delete state.folders[id];
  saveFolders();
  renderList();
  renderDetail();
}

function addFeedback(id, value) {
  state.feedback.push({ id, value, at: new Date().toISOString() });
  saveFeedback();
  renderDetail();
}

function statusLabel(value) {
  return {
    unread: "未读",
    reading: "在读",
    done: "已读",
    hidden: "暂不关注",
  }[value] || "未读";
}

function sourceLabel(value) {
  return {
    "daily-recommendation": "今日推荐",
    "conf-papers": "顶会",
    "paper-note": "本地笔记",
    "arxiv-search": "arXiv 搜索",
  }[value] || value || "未知";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function assetUrl(asset) {
  if (!asset) return "";
  if (location.protocol === "file:" && asset.fileUrl) return asset.fileUrl;
  return asset.url || asset.fileUrl || "";
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}

function dateKey(value) {
  if (!value) return "";
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  return String(value).match(/\d{4}-\d{2}-\d{2}/)?.[0] || "";
}

function paperDate(paper) {
  return paper.date || dateKey(paper.modifiedAt) || "";
}

function markdownSections(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const sections = [];
  let current = { title: "正文", body: [] };
  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (current.body.join("\n").trim()) sections.push(current);
      current = { title: match[1].trim(), body: [] };
    } else {
      current.body.push(line);
    }
  }
  if (current.body.join("\n").trim()) sections.push(current);
  return sections;
}

function renderInlineMarkdown(markdown) {
  return escapeHtml(markdown)
    .replace(/!\[\[([^\]]+)\]\]/g, '<span class="inline-image-ref">$1</span>')
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '<span class="wiki-ref">$2</span>')
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="wiki-ref">$1</span>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/^###\s+(.+)$/gm, "<strong>$1</strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n-\s+/g, "\n• ")
    .replace(/\n/g, "<br>");
}

function firstSectionLine(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(markdown || "").match(new RegExp(`## ${escaped}\\n+([\\s\\S]*?)(?=\\n## |$)`));
  return match ? match[1].trim() : "";
}

function extractBullets(text, limit = 4) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, ""))
    .slice(0, limit);
}

function compactText(value, max = 360) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function readingBrief(paper) {
  const markdown = paper.analysisMarkdown || paper.markdown || "";
  const value = firstSectionLine(markdown, "研究价值评估");
  const limits = firstSectionLine(markdown, "优势和局限性");
  const questions = extractBullets(firstSectionLine(markdown, "下一步精读问题"), 4);
  const relation = extractBullets(firstSectionLine(markdown, "与你的方向的关系"), 4);
  return { value, limits, questions, relation };
}

function renderReadingBrief(paper) {
  const brief = readingBrief(paper);
  if (!brief.value && !brief.limits && !brief.questions.length && !brief.relation.length) return "";
  return `
    <section id="briefBlock">
      <h3>阅读简报</h3>
      <div class="brief-grid">
        ${brief.value ? `<div class="brief-card"><span>研究价值</span><p>${renderInlineMarkdown(compactText(brief.value))}</p></div>` : ""}
        ${brief.limits ? `<div class="brief-card"><span>优势与局限</span><p>${renderInlineMarkdown(compactText(brief.limits))}</p></div>` : ""}
        ${brief.relation.length ? `<div class="brief-card"><span>与你方向的关系</span><ul>${brief.relation.map((x) => `<li>${renderInlineMarkdown(x)}</li>`).join("")}</ul></div>` : ""}
        ${brief.questions.length ? `<div class="brief-card"><span>精读问题</span><ul>${brief.questions.map((x) => `<li>${renderInlineMarkdown(x)}</li>`).join("")}</ul></div>` : ""}
      </div>
    </section>
  `;
}

function renderMarkdownSections(markdown) {
  const sections = markdownSections(markdown);
  return `<div class="section-stack">${
    sections.map((section, index) => `
      <details class="note-section" ${index < 2 ? "open" : ""}>
        <summary>${escapeHtml(section.title)}</summary>
        <div class="markdown">${renderInlineMarkdown(section.body.join("\n").trim())}</div>
      </details>
    `).join("")
  }</div>`;
}

function renderImages(images = []) {
  if (!images.length) {
    return `<div class="image-empty">这篇论文还没有提取到图片。</div>`;
  }
  return `
    <div class="image-grid">
      ${images.map((image, index) => `
        <button class="image-tile" type="button" data-image-index="${index}">
          <img src="${escapeHtml(assetUrl(image))}" alt="${escapeHtml(image.name)}" loading="lazy" />
          <span>${escapeHtml(image.sourceDir ? `${image.sourceDir} / ${image.name}` : image.name)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function paperHasAnalysis(paper) {
  return Boolean(paper.analysisMarkdown || paper.analysisPath || (paper.source === "paper-note" && paper.markdown));
}

function paperImageCount(paper) {
  return paper.imageCount || paper.images?.length || 0;
}

function paperHasAsset(paper, asset) {
  if (asset === "analysis") return paperHasAnalysis(paper);
  if (asset === "images") return paperImageCount(paper) > 0;
  if (asset === "localPdf") return Boolean(paper.localPdf);
  if (asset === "onlinePdf") return Boolean(paper.pdfUrl || paper.openAccessUrl || paper.doiUrl);
  if (asset === "favorite") return Boolean(folderForPaper(paper.id));
  return true;
}

function updateDateFilter() {
  const select = $("dateFilter");
  const current = state.date;
  const dates = [...new Set(state.papers.map(paperDate).filter(Boolean))].sort().reverse();
  select.innerHTML = `<option value="all">全部日期</option>` + dates.map((date) => `<option value="${escapeHtml(date)}">${escapeHtml(date)}</option>`).join("");
  select.value = dates.includes(current) ? current : "all";
  state.date = select.value;
}

function paperSearchText(paper) {
  return [
    paper.title,
    paper.zhTitle,
    paper.summary,
    paper.abstract,
    paper.venue,
    paper.date,
    paper.folder,
    paper.analysisFolder,
    ...(paper.authors || []),
    ...(paper.matchedKeywords || []),
  ].join(" ").toLowerCase();
}

function filteredPapers() {
  const q = state.query.trim().toLowerCase();
  const items = state.papers.filter((paper) => {
    if (state.source !== "all" && paper.source !== state.source) return false;
    if (state.date !== "all" && paperDate(paper) !== state.date) return false;
    if (!paperHasAsset(paper, state.asset)) return false;
    const mark = paperMark(paper.id);
    if (state.status === "starred" && !mark.starred) return false;
    if (["unread", "reading", "done", "hidden"].includes(state.status) && mark.status !== state.status) return false;
    if (!q) return true;
    return paperSearchText(paper).includes(q);
  });
  return items.sort(comparePapers);
}

function currentQueue() {
  return filteredPapers();
}

function selectedQueueIndex() {
  return currentQueue().findIndex((paper) => paper.id === state.selected?.id);
}

function comparePapers(a, b) {
  if (state.sort === "title") return String(a.title || "").localeCompare(String(b.title || ""));
  if (state.sort === "images") return (b.imageCount || 0) - (a.imageCount || 0) || compareByScore(a, b);
  if (state.sort === "recent") return (Date.parse(b.modifiedAt || b.date || 0) || 0) - (Date.parse(a.modifiedAt || a.date || 0) || 0);
  return compareByScore(a, b);
}

function compareByScore(a, b) {
  return preferenceAdjustedScore(b) - preferenceAdjustedScore(a) || String(a.title || "").localeCompare(String(b.title || ""));
}

function preferenceAdjustedScore(paper) {
  let score = Number(paper.score) || 0;
  if (state.feedback.length < 10) return score;
  const likedTerms = feedbackTerms("like");
  const dislikedTerms = feedbackTerms("dislike");
  const text = paperSearchText(paper);
  for (const term of likedTerms) if (text.includes(term)) score += 0.4;
  for (const term of dislikedTerms) if (text.includes(term)) score -= 0.5;
  return score;
}

function feedbackTerms(value) {
  const ids = new Set(state.feedback.filter((item) => item.value === value).map((item) => item.id));
  const terms = [];
  for (const paper of state.papers) {
    if (!ids.has(paper.id)) continue;
    terms.push(...(paper.matchedKeywords || []));
    terms.push(...String(paper.title || "").toLowerCase().split(/\W+/).filter((x) => x.length > 3).slice(0, 4));
  }
  return [...new Set(terms.map((x) => String(x).toLowerCase()).filter(Boolean))].slice(0, 16);
}

async function getJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function loadAll() {
  if (location.protocol === "file:") {
    loadStatic();
    return;
  }
  try {
    await loadLive();
  } catch (error) {
    if (window.EVIL_READ_ARXIV_DATA) {
      loadStatic();
      showDataMode(`API 不可用，已切换静态快照：${error.message}`);
      return;
    }
    throw error;
  }
}

async function loadLive() {
  state.dataMode = "live";
  const [stats, data] = await Promise.all([getJson(`/api/stats?t=${Date.now()}`), getJson(`/api/papers?t=${Date.now()}`)]);
  renderStats(stats);
  const previousId = state.selected?.id;
  state.papers = data.papers || [];
  state.selected = state.papers.find((paper) => paper.id === previousId) || state.papers[0] || null;
  updateDateFilter();
  renderList();
  renderDetail();
  showDataMode(`实时模式 · ${formatFullTime(new Date())}`);
}

function configureAutoRefresh() {
  if (state.refreshTimer) {
    clearInterval(state.refreshTimer);
    state.refreshTimer = null;
  }
  const toggle = $("autoRefreshToggle");
  if (location.protocol === "file:" || !toggle?.checked) return;
  state.refreshTimer = setInterval(() => {
    loadLive().catch((error) => showDataMode(`实时刷新失败：${error.message}`));
  }, 30000);
}

function loadStatic() {
  state.dataMode = "static";
  const data = window.EVIL_READ_ARXIV_DATA;
  renderStats(data.stats || {});
  const previousId = state.selected?.id;
  state.papers = data.papers || [];
  state.selected = state.papers.find((paper) => paper.id === previousId) || state.papers[0] || null;
  updateDateFilter();
  renderList();
  renderDetail();
  showDataMode(`静态快照 · ${data.generatedAt ? formatFullTime(data.generatedAt) : "未标注时间"}`);
}

async function loadStats() {
  const stats = await getJson("/api/stats");
  renderStats(stats);
}

function renderStats(stats) {
  const foldersCount = Object.keys(state.folders).length;
  const feedbackCount = state.feedback.length;
  $("stats").innerHTML = [
    stat(stats.dailyRecommendations, "今日推荐"),
    stat(stats.confCandidates, "DBLP 候选"),
    stat(stats.confFiltered, "标题筛选保留"),
    stat(stats.localNotes, "本地论文笔记"),
    stat(foldersCount, "收藏论文"),
    stat(feedbackCount, "偏好反馈"),
  ].join("");
}

function countImages() {
  return state.papers.reduce((sum, paper) => sum + (paper.imageCount || paper.images?.length || 0), 0);
}

function markCounts(papers = state.papers) {
  return papers.reduce((acc, paper) => {
    const mark = paperMark(paper.id);
    acc[mark.status] = (acc[mark.status] || 0) + 1;
    if (mark.starred) acc.starred += 1;
    return acc;
  }, { unread: 0, reading: 0, done: 0, hidden: 0, starred: 0 });
}

function stat(value, label) {
  return `<div class="stat"><b>${escapeHtml(value ?? 0)}</b><span>${escapeHtml(label)}</span></div>`;
}

function formatFullTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "");
  return date.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function showDataMode(text) {
  const el = $("dataMode");
  if (el) el.textContent = text;
}

async function loadPapers() {
  const data = await getJson("/api/papers");
  state.papers = data.papers || [];
  state.selected = state.papers[0] || null;
  updateDateFilter();
  renderList();
  renderDetail();
}

function renderList() {
  const papers = filteredPapers();
  if (papers.length && !papers.some((paper) => paper.id === state.selected?.id)) {
    state.selected = papers[0];
  }
  if (!papers.length) {
    state.selected = null;
  }
  const counts = markCounts(papers);
  const total = state.papers.length;
  $("resultCount").textContent = `${papers.length}/${total} 篇 · 未读 ${counts.unread} · 在读 ${counts.reading} · 已读 ${counts.done}`;
  $("paperList").className = `paper-list ${state.view === "compact" ? "compact-list" : ""}`;
  $("paperList").innerHTML = papers.map((paper) => {
    const mark = paperMark(paper.id);
    const title = paper.zhTitle && paper.zhTitle !== paper.title ? paper.zhTitle : paper.title;
    const thumb = paper.images?.[0];
    const sourceDot = paper.source === "conf-papers" ? "conf-dot" : paper.source === "daily-recommendation" ? "daily-dot" : "note-dot";
    return `
      <button class="paper-item ${state.selected?.id === paper.id ? "active" : ""} ${mark.status === "hidden" ? "muted-item" : ""}" data-id="${escapeHtml(paper.id)}">
        <div class="item-layout">
          ${thumb ? `<span class="item-thumb"><img src="${escapeHtml(assetUrl(thumb))}" alt="" loading="lazy" /></span>` : `<span class="item-thumb empty-thumb">${escapeHtml(sourceLabel(paper.source)).slice(0, 2)}</span>`}
          <div class="item-body">
            <div class="item-head">
              <span class="source-dot ${sourceDot}"></span>
              <h3>${escapeHtml(title)}</h3>
            </div>
            <p>${escapeHtml(paper.title)}</p>
          </div>
        </div>
        <div class="badge-row">
          <span class="badge accent">${escapeHtml(paper.venue || sourceLabel(paper.source))}</span>
          ${paperDate(paper) ? `<span class="badge">${escapeHtml(paperDate(paper))}</span>` : ""}
          ${paper.score == null ? "" : `<span class="badge">评分 ${escapeHtml(paper.score)}</span>`}
          <span class="badge">${escapeHtml(statusLabel(mark.status))}</span>
          ${mark.starred ? `<span class="badge star">重点</span>` : ""}
          ${paperHasAnalysis(paper) ? `<span class="badge ok">详析</span>` : ""}
          ${paper.localPdf ? `<span class="badge ok">本地 PDF</span>` : ""}
          ${folderForPaper(paper.id) ? `<span class="badge star">${escapeHtml(folderForPaper(paper.id))}</span>` : ""}
          ${paperImageCount(paper) ? `<span class="badge">${escapeHtml(paperImageCount(paper))} 图</span>` : ""}
          ${(paper.matchedKeywords || []).slice(0, 3).map((x) => `<span class="badge">${escapeHtml(x)}</span>`).join("")}
        </div>
      </button>
    `;
  }).join("") || `<div class="empty-state"><p>没有匹配的论文。</p></div>`;

  document.querySelectorAll(".paper-item").forEach((item) => {
    item.addEventListener("click", () => {
      state.selected = state.papers.find((paper) => paper.id === item.dataset.id);
      renderList();
      renderDetail();
    });
  });
  updateQuickChips();
}

function renderDetail() {
  const paper = state.selected;
  if (!paper) {
    $("detailPanel").innerHTML = `<div class="empty-state"><h2>选择一篇论文</h2><p>左侧列表会展示最近生成的顶会推荐和本地论文笔记。</p></div>`;
    return;
  }

  const links = [
    paper.openAccessUrl && `<a href="${escapeHtml(paper.openAccessUrl)}" target="_blank" rel="noreferrer">CVF / 页面</a>`,
    paper.pdfUrl && `<a href="${escapeHtml(paper.pdfUrl)}" target="_blank" rel="noreferrer">在线 PDF</a>`,
    paper.localPdf && `<a href="${escapeHtml(assetUrl(paper.localPdf))}" target="_blank" rel="noreferrer">本地 PDF</a>`,
    paper.doiUrl && `<a href="${escapeHtml(paper.doiUrl)}" target="_blank" rel="noreferrer">DOI</a>`,
  ].filter(Boolean).join("");
  const analysisButton = paper.analysisMarkdown || paper.analysisPath
    ? `<button class="text-button note-link" id="loadAnalysisBtn">查看详细中文笔记</button>`
    : "";
  const mark = paperMark(paper.id);
  const authors = (paper.authors || []).slice(0, 8).join("、");
  const imageCount = paperImageCount(paper);
  const heroImage = paper.images?.[0];
  const queue = currentQueue();
  const queueIndex = selectedQueueIndex();
  const queueText = queueIndex >= 0 ? `${queueIndex + 1} / ${queue.length}` : `1 / 1`;
  const aiSummary = state.aiSummaries[paper.id];
  const feedbackSummary = preferenceSummary();

  $("detailPanel").innerHTML = `
    <article class="paper-detail">
      <div class="detail-top-actions">
        <button class="text-button" id="prevPaperBtn" ${queueIndex <= 0 ? "disabled" : ""}>上一篇</button>
        <span>${escapeHtml(queueText)}</span>
        <button class="text-button" id="nextPaperBtn" ${queueIndex < 0 || queueIndex >= queue.length - 1 ? "disabled" : ""}>下一篇</button>
      </div>
      ${heroImage ? `<button class="detail-hero-image" type="button" data-image-index="0"><img src="${escapeHtml(assetUrl(heroImage))}" alt="${escapeHtml(heroImage.name)}" loading="lazy" /><span>${escapeHtml(heroImage.name)}</span></button>` : ""}
      <div class="detail-kicker">${escapeHtml(sourceLabel(paper.source))} · ${escapeHtml(paper.venue || "未标注来源")}</div>
      <h2>${escapeHtml(paper.title)}</h2>
      ${paper.zhTitle && paper.zhTitle !== paper.title ? `<p class="zh-title">${escapeHtml(paper.zhTitle)}</p>` : ""}
      <div class="fact-grid">
        <div><span>综合评分</span><b>${escapeHtml(paper.score ?? "--")}</b></div>
        <div><span>图片</span><b>${escapeHtml(imageCount)}</b></div>
        <div><span>详析</span><b>${paperHasAnalysis(paper) ? "有" : "无"}</b></div>
        <div><span>状态</span><b>${escapeHtml(statusLabel(mark.status))}</b></div>
        <div><span>日期</span><b>${escapeHtml(paperDate(paper) || formatDate(paper.modifiedAt) || "--")}</b></div>
      </div>
      <div class="meta-row">
        ${authors ? `<span>${escapeHtml(authors)}</span>` : ""}
        ${paper.folder ? `<span>${escapeHtml(paper.folder)}</span>` : ""}
      </div>
      <div class="badge-row keyword-row">
        ${(paper.matchedKeywords || []).map((x) => `<span class="badge accent">${escapeHtml(x)}</span>`).join("")}
      </div>
      <div class="action-row">
        <button class="text-button ${mark.status === "reading" ? "selected-action" : ""}" data-status-action="reading">在读</button>
        <button class="text-button ${mark.status === "done" ? "selected-action" : ""}" data-status-action="done">已读</button>
        <button class="text-button ${mark.status === "hidden" ? "selected-action danger-action" : ""}" data-status-action="hidden">暂不关注</button>
        <button class="text-button ${mark.starred ? "selected-action star-action" : ""}" id="starBtn">${mark.starred ? "取消重点" : "标为重点"}</button>
        <button class="text-button" id="aiSummaryBtn">AI 智能摘要</button>
        <button class="text-button" id="deepDiveBtn">深入了解</button>
        <button class="text-button" id="codexQueueBtn">交给 Codex</button>
        <button class="text-button" id="codexResultBtn">加载 Codex 结果</button>
      </div>
      <div class="action-row compact-actions">
        <button class="text-button" data-feedback="like">喜欢</button>
        <button class="text-button" data-feedback="neutral">一般</button>
        <button class="text-button danger-action" data-feedback="dislike">不感兴趣</button>
        <select id="folderSelect" class="folder-select">
          <option value="">未收藏</option>
          <option value="待读">待读</option>
          <option value="OCT">OCT</option>
          <option value="AI">AI</option>
          <option value="仪器">仪器</option>
          <option value="重要">重要</option>
        </select>
      </div>
      ${feedbackSummary ? `<div class="preference-box">${escapeHtml(feedbackSummary)}</div>` : ""}
      <nav class="detail-nav">
        <a href="#summaryBlock">摘要</a>
        <a href="#aiBlock">AI</a>
        ${renderReadingBrief(paper) ? `<a href="#briefBlock">简报</a>` : ""}
        <a href="#imageBlock">图片</a>
        ${paper.abstract ? `<a href="#abstractBlock">英文摘要</a>` : ""}
        <a href="#markdownBox">笔记</a>
      </nav>
      <section id="summaryBlock">
        <h3>中文摘要</h3>
        <div class="summary-box">${escapeHtml(paper.summary || "暂无中文摘要。")}</div>
      </section>
      <section id="aiBlock">
        <h3>AI 智能摘要</h3>
        <div class="ai-box" id="aiBox">${renderAiSummary(aiSummary)}</div>
      </section>
      ${renderReadingBrief(paper)}
      ${links ? `<div class="link-row">${links}</div>` : ""}
      ${paper.analysisFolder ? `<p class="status">详细笔记目录：${escapeHtml(paper.analysisFolder)}</p>` : ""}
      <div class="action-row">
        ${analysisButton}
        ${paper.path ? `<button class="text-button note-link" id="loadNoteBtn">查看本地 Markdown</button>` : ""}
      </div>
      <section id="imageBlock">
        <h3>论文图片</h3>
        ${renderImages(paper.images)}
      </section>
      ${paper.abstract ? `<section id="abstractBlock"><h3>英文摘要</h3><div class="abstract-box">${escapeHtml(paper.abstract)}</div></section>` : ""}
      <section id="markdownBox"></section>
    </article>
  `;

  document.querySelectorAll("[data-status-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.statusAction;
      setPaperMark(paper.id, { status: paperMark(paper.id).status === next ? "unread" : next });
    });
  });

  $("starBtn")?.addEventListener("click", () => setPaperMark(paper.id, { starred: !paperMark(paper.id).starred }));
  $("aiSummaryBtn")?.addEventListener("click", () => generateAiSummary([paper]));
  $("deepDiveBtn")?.addEventListener("click", () => generateDeepDive(paper));
  $("codexQueueBtn")?.addEventListener("click", () => enqueueCodexTask(paper, "deep"));
  $("codexResultBtn")?.addEventListener("click", () => loadCodexResults(paper));
  $("folderSelect").value = folderForPaper(paper.id);
  $("folderSelect")?.addEventListener("change", (event) => setPaperFolder(paper.id, event.target.value));
  document.querySelectorAll("[data-feedback]").forEach((btn) => {
    btn.addEventListener("click", () => addFeedback(paper.id, btn.dataset.feedback));
  });

  $("prevPaperBtn")?.addEventListener("click", () => selectQueuePaper(queueIndex - 1));
  $("nextPaperBtn")?.addEventListener("click", () => selectQueuePaper(queueIndex + 1));

  document.querySelectorAll("[data-image-index]").forEach((tile) => {
    tile.addEventListener("click", () => openImageModal(paper.images[Number(tile.dataset.imageIndex)]));
  });

  $("loadAnalysisBtn")?.addEventListener("click", async () => {
    if (paper.analysisMarkdown) {
      $("markdownBox").innerHTML = `<h3>详细中文笔记</h3>${renderMarkdownSections(paper.analysisMarkdown)}`;
      return;
    }
    const btn = $("loadAnalysisBtn");
    btn.textContent = "读取中...";
    const res = await fetch(`/api/markdown?path=${encodeURIComponent(paper.analysisPath)}`);
    const text = await res.text();
    $("markdownBox").innerHTML = `<h3>详细中文笔记</h3>${renderMarkdownSections(text)}`;
    btn.textContent = "查看详细中文笔记";
  });

  $("loadNoteBtn")?.addEventListener("click", async () => {
    if (paper.markdown) {
      $("markdownBox").innerHTML = `<h3>本地 Markdown</h3>${renderMarkdownSections(paper.markdown)}`;
      return;
    }
    const btn = $("loadNoteBtn");
    btn.textContent = "读取中...";
    const res = await fetch(`/api/markdown?path=${encodeURIComponent(paper.path)}`);
    const text = await res.text();
    $("markdownBox").innerHTML = `<h3>本地 Markdown</h3>${renderMarkdownSections(text)}`;
    btn.textContent = "查看本地 Markdown";
  });
}

function renderAiSummary(summary) {
  if (!summary) return `<span class="muted-text">点击 AI 智能摘要生成主要内容和创新点。</span>`;
  if (summary.analysis) {
    const a = summary.analysis;
    return `
      <div><b>核心贡献</b><p>${escapeHtml(a.contribution || "--")}</p></div>
      <div><b>创新点</b><p>${escapeHtml(a.innovation || "--")}</p></div>
      <div><b>方法概要</b><p>${escapeHtml(a.method || "--")}</p></div>
      <div><b>关键结果</b><p>${escapeHtml(a.results || "--")}</p></div>
      <small>${escapeHtml([summary.source, summary.reason].filter(Boolean).join(" | "))}</small>
    `;
  }
  return `
    <div><b>主要内容</b><p>${escapeHtml(summary.main || "--")}</p></div>
    <div><b>创新点</b><p>${escapeHtml(summary.innovation || "--")}</p></div>
    <small>${escapeHtml([summary.source, summary.reason].filter(Boolean).join(" | "))}</small>
  `;
}

async function generateAiSummary(papers) {
  if (state.dataMode === "static") {
    papers.forEach((paper) => state.aiSummaries[paper.id] = localClientSummary(paper));
    saveAiSummaries();
    renderDetail();
    return;
  }
  const res = await getJson("/api/ai/summaries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang: state.lang, papers }),
  });
  for (const item of res.summaries || []) {
    item.source = res.source || item.source;
    item.reason = res.reason || item.reason;
    state.aiSummaries[item.id] = item;
  }
  saveAiSummaries();
  renderDetail();
}

async function generateBatchSummaries() {
  const papers = currentQueue().slice(0, 10);
  if (!papers.length) return;
  const btn = $("batchSummaryBtn");
  btn.disabled = true;
  btn.textContent = "生成中...";
  try {
    await generateAiSummary(papers);
  } finally {
    btn.disabled = false;
    btn.textContent = "批量摘要";
  }
}

async function generateDeepDive(paper) {
  if (state.dataMode === "static") {
    state.aiSummaries[paper.id] = { analysis: localClientDeepDive(paper), source: "local-static" };
    saveAiSummaries();
    renderDetail();
    return;
  }
  const res = await getJson("/api/ai/deep-analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang: state.lang, paper }),
  });
  state.aiSummaries[paper.id] = { analysis: res.analysis, source: res.source, reason: res.reason };
  saveAiSummaries();
  renderDetail();
}

async function enqueueCodexTask(paper, type = "deep") {
  if (state.dataMode === "static") {
    alert("Codex 队列需要用 node web/server.js 启动实时模式。");
    return;
  }
  const btn = $("codexQueueBtn");
  btn.disabled = true;
  btn.textContent = "已加入队列";
  try {
    const res = await getJson("/api/codex-queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, lang: state.lang, paper }),
    });
    state.aiSummaries[paper.id] = {
      source: "codex-queued",
      main: "已写入 Codex 半自动队列。回到 Codex 对话里输入：处理 AI 队列。",
      innovation: `任务文件：web/ai-queue/${res.task.id}.json`,
    };
    saveAiSummaries();
    renderDetail();
  } finally {
    btn.disabled = false;
    btn.textContent = "交给 Codex";
  }
}

async function loadCodexResults(paper) {
  if (state.dataMode === "static") return;
  const res = await getJson("/api/codex-queue");
  const task = (res.tasks || []).find((item) => item.papers?.some((queued) => queued.id === paper.id) && item.result);
  if (!task) {
    state.aiSummaries[paper.id] = {
      source: "codex-pending",
      main: "还没有找到 Codex 结果。",
      innovation: "回到 Codex 对话里输入：处理 AI 队列。完成后再点加载 Codex 结果。",
    };
  } else if (task.result.analysis) {
    state.aiSummaries[paper.id] = { analysis: task.result.analysis, source: task.result.source || "codex-bridge" };
  } else {
    const summary = task.result.summaries?.find((item) => item.id === paper.id) || task.result.summary || task.result;
    state.aiSummaries[paper.id] = { ...summary, source: summary.source || task.result.source || "codex-bridge" };
  }
  saveAiSummaries();
  renderDetail();
}

function localClientSummary(paper) {
  return {
    main: paper.summary || paper.abstract || paper.title,
    innovation: `围绕 ${(paper.matchedKeywords || []).slice(0, 4).join(", ") || "当前兴趣方向"} 的相关工作，建议核对方法、数据和验证。`,
    source: "local-static",
  };
}

function localClientDeepDive(paper) {
  const s = localClientSummary(paper);
  return {
    contribution: s.main,
    innovation: s.innovation,
    method: "查看模型结构、数据来源、输入输出和对照实验。",
    results: "重点提取核心指标、消融实验、外部验证和失败案例。",
  };
}

function preferenceSummary() {
  if (state.feedback.length < 10) return "";
  const recent = state.feedback.slice(-10);
  const likes = recent.filter((x) => x.value === "like").length;
  const dislikes = recent.filter((x) => x.value === "dislike").length;
  if (likes >= dislikes) return `已收集 ${state.feedback.length} 条反馈：当前偏好更接近 OCT/AI 相关高价值论文。`;
  return `已收集 ${state.feedback.length} 条反馈：系统会降低相似低兴趣论文的优先级。`;
}

function selectQueuePaper(index) {
  const queue = currentQueue();
  if (index < 0 || index >= queue.length) return;
  state.selected = queue[index];
  renderList();
  renderDetail();
  $("detailPanel").scrollTop = 0;
}

function openImageModal(image) {
  if (!image) return;
  $("modalImage").src = assetUrl(image);
  $("modalImage").alt = image.name;
  $("modalCaption").textContent = image.path || image.name;
  $("imageModal").hidden = false;
}

function closeImageModal() {
  $("imageModal").hidden = true;
  $("modalImage").src = "";
}

async function runConfPapers() {
  if (state.dataMode === "static") {
    alert("顶会搜索需要用 node web/server.js 启动实时模式。");
    return;
  }
  const btn = $("runSkillBtn");
  btn.disabled = true;
  btn.textContent = "运行中...";
  try {
    const res = await getJson("/api/skills/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill: "conf-papers", year: 2025, conference: "CVPR", focus: "OCT AI" }),
    });
    await loadAll();
    alert(skillRunMessage(res));
  } catch (error) {
    alert(`顶会搜索失败：${error.message}`);
  } finally {
    btn.disabled = false;
    updateSkillButtonLabel();
  }
}

async function runSelectedSkill() {
  const skill = $("skillSelect")?.value;
  if (!skill) return;
  if (skill === "codex-queue") {
    if (!state.selected) return;
    await enqueueCodexTask(state.selected, "deep");
    return;
  }
  if (state.dataMode === "static") {
    alert("运行技能需要用 node web/server.js 启动实时模式。");
    return;
  }
  const query = ($("interestInput")?.value || $("searchInput").value || "").trim();
  const btn = $("runSkillBtn");
  btn.disabled = true;
  btn.textContent = "运行中...";
  try {
    const res = await getJson("/api/skills/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill, query, lang: state.lang, paper: state.selected }),
    });
    if (res.mode === "direct") await loadAll();
    alert(skillRunMessage(res));
  } catch (error) {
    alert(`技能运行失败：${error.message}`);
  } finally {
    btn.disabled = false;
    updateSkillButtonLabel();
  }
}

function skillRunMessage(res) {
  const parts = [res.message || "技能运行完成。"];
  if (res.outputs?.length) parts.push(`输出位置：\n${res.outputs.join("\n")}`);
  if (res.nextStep) parts.push(res.nextStep);
  if (res.stdout && res.status !== "completed") parts.push(`输出摘要：\n${String(res.stdout).slice(0, 800)}`);
  return parts.join("\n\n");
}

function updateSkillButtonLabel() {
  const btn = $("runSkillBtn");
  const skill = $("skillSelect")?.value;
  if (!btn) return;
  if (skill === "conf-papers") {
    btn.textContent = "直接运行";
  } else if (["start-my-day", "paper-search"].includes(skill)) {
    btn.textContent = "直接运行";
  } else if (skill === "codex-queue") {
    btn.textContent = "加入队列";
  } else {
    btn.textContent = "半自动";
  }
}

$("searchInput").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
  renderDetail();
});

$("sourceFilter").addEventListener("change", (event) => {
  state.source = event.target.value;
  renderList();
  renderDetail();
});

$("dateFilter").addEventListener("change", (event) => {
  state.date = event.target.value;
  renderList();
  renderDetail();
});

$("assetFilter").addEventListener("change", (event) => {
  state.asset = event.target.value;
  renderList();
  renderDetail();
});

$("statusFilter").addEventListener("change", (event) => {
  state.status = event.target.value;
  renderList();
  renderDetail();
});

$("sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderList();
  renderDetail();
});

function latestDate() {
  return [...new Set(state.papers.map(paperDate).filter(Boolean))].sort().reverse()[0] || "all";
}

function applyPreset(preset) {
  if (preset === "reset") {
    state.query = "";
    state.source = "all";
    state.date = "all";
    state.asset = "all";
    state.status = "all";
    state.sort = "score";
  }
  if (preset === "today") {
    state.source = "daily-recommendation";
    state.date = latestDate();
    state.asset = "all";
    state.status = "all";
    state.sort = "score";
  }
  if (preset === "ready") {
    state.source = "all";
    state.date = "all";
    state.asset = "images";
    state.status = "all";
    state.sort = "images";
  }
  if (preset === "todo") {
    state.source = "all";
    state.date = "all";
    state.asset = "all";
    state.status = "unread";
    state.sort = "score";
  }
  if (preset === "starred") {
    state.status = "starred";
  }
  if (preset === "favorites") {
    state.source = "all";
    state.date = "all";
    state.asset = "favorite";
    state.status = "all";
    state.sort = "score";
  }
  $("searchInput").value = state.query;
  $("sourceFilter").value = state.source;
  $("dateFilter").value = state.date;
  $("assetFilter").value = state.asset;
  $("statusFilter").value = state.status;
  $("sortSelect").value = state.sort;
  renderList();
  renderDetail();
}

function updateQuickChips() {
  document.querySelectorAll("[data-preset]").forEach((button) => {
    const preset = button.dataset.preset;
    const active = (
      (preset === "today" && state.source === "daily-recommendation" && state.date === latestDate() && state.asset === "all" && state.status === "all") ||
      (preset === "ready" && state.asset === "images" && state.sort === "images") ||
      (preset === "todo" && state.status === "unread") ||
      (preset === "starred" && state.status === "starred") ||
      (preset === "favorites" && state.asset === "favorite") ||
      (preset === "reset" && state.source === "all" && state.date === "all" && state.asset === "all" && state.status === "all" && !state.query)
    );
    button.classList.toggle("active", active);
  });
}

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("active", item === button));
    renderList();
  });
});

async function runInterestSearch() {
  const query = ($("interestInput")?.value || $("searchInput").value).trim();
  if (!query) return;
  const mode = $("interestMode").value;
  if (mode === "codex") {
    await enqueueCodexInterestTask(query);
    return;
  }
  if (state.dataMode === "static" || mode === "semantic") {
    state.query = query;
    $("searchInput").value = query;
    state.source = "all";
    renderList();
    renderDetail();
    return;
  }
  const btn = $("interestSearchBtn");
  btn.disabled = true;
  btn.textContent = "搜索中...";
  try {
    const res = await getJson("/api/search-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, mode, lang: state.lang }),
    });
    state.papers = [...(res.papers || []), ...state.papers.filter((paper) => paper.source !== "arxiv-search")];
    state.source = "all";
    $("sourceFilter").value = "all";
    updateDateFilter();
    renderList();
    renderDetail();
  } finally {
    btn.disabled = false;
    btn.textContent = "提交";
  }
}

async function enqueueCodexInterestTask(query) {
  if (state.dataMode === "static") {
    alert("Codex 队列需要用 node web/server.js 启动实时模式。");
    return;
  }
  const btn = $("interestSearchBtn");
  btn.disabled = true;
  btn.textContent = "排队中...";
  try {
    const candidates = filteredPapers().slice(0, 20);
    const res = await getJson("/api/codex-queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "interest", lang: state.lang, query, mode: "codex-interest", papers: candidates }),
    });
    state.query = query;
    $("searchInput").value = query;
    renderList();
    renderDetail();
    alert(`已加入 Codex 兴趣筛选队列：\n${query}\n\n回到 Codex 对话输入：处理 AI 队列\n任务文件：web/ai-queue/${res.task.id}.json`);
  } finally {
    btn.disabled = false;
    btn.textContent = "提交";
  }
}

function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
}

$("refreshBtn").addEventListener("click", loadAll);
$("runSkillBtn")?.addEventListener("click", runSelectedSkill);
$("skillSelect")?.addEventListener("change", updateSkillButtonLabel);
$("closeImageModal").addEventListener("click", closeImageModal);
$("autoRefreshToggle").addEventListener("change", configureAutoRefresh);
$("interestSearchBtn").addEventListener("click", runInterestSearch);
$("interestInput")?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runInterestSearch();
});
$("languageSelect").addEventListener("change", (event) => applyLanguage(event.target.value));
$("batchSummaryBtn").addEventListener("click", generateBatchSummaries);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeImageModal();
  if (event.target && ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
  if (event.key === "ArrowUp") selectQueuePaper(selectedQueueIndex() - 1);
  if (event.key === "ArrowDown") selectQueuePaper(selectedQueueIndex() + 1);
});

loadMarks();
$("languageSelect").value = state.lang;
applyLanguage(state.lang);
updateSkillButtonLabel();
loadAll().catch((error) => {
  $("detailPanel").innerHTML = `<div class="empty-state"><h2>加载失败</h2><p>${escapeHtml(error.message)}</p></div>`;
}).finally(configureAutoRefresh);
