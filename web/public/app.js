const state = {
  papers: [],
  selected: null,
  query: "",
  source: "all",
  status: "all",
  sort: "score",
  view: "comfortable",
  marks: {},
};

const $ = (id) => document.getElementById(id);
const MARKS_KEY = "evil-read-arxiv.paperMarks.v1";

function loadMarks() {
  try {
    state.marks = JSON.parse(localStorage.getItem(MARKS_KEY) || "{}");
  } catch {
    state.marks = {};
  }
}

function saveMarks() {
  localStorage.setItem(MARKS_KEY, JSON.stringify(state.marks));
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
    "conf-papers": "顶会",
    "paper-note": "本地笔记",
  }[value] || value || "未知";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
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
    .replace(/^###\s+(.+)$/gm, "<strong>$1</strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n-\s+/g, "\n• ")
    .replace(/\n/g, "<br>");
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
          <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.name)}" loading="lazy" />
          <span>${escapeHtml(image.sourceDir ? `${image.sourceDir} / ${image.name}` : image.name)}</span>
        </button>
      `).join("")}
    </div>
  `;
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
    ...(paper.authors || []),
    ...(paper.matchedKeywords || []),
  ].join(" ").toLowerCase();
}

function filteredPapers() {
  const q = state.query.trim().toLowerCase();
  const items = state.papers.filter((paper) => {
    if (state.source !== "all" && paper.source !== state.source) return false;
    const mark = paperMark(paper.id);
    if (state.status === "starred" && !mark.starred) return false;
    if (["unread", "reading", "done", "hidden"].includes(state.status) && mark.status !== state.status) return false;
    if (!q) return true;
    return paperSearchText(paper).includes(q);
  });
  return items.sort(comparePapers);
}

function comparePapers(a, b) {
  if (state.sort === "title") return String(a.title || "").localeCompare(String(b.title || ""));
  if (state.sort === "images") return (b.imageCount || 0) - (a.imageCount || 0) || compareByScore(a, b);
  if (state.sort === "recent") return (Date.parse(b.modifiedAt || b.date || 0) || 0) - (Date.parse(a.modifiedAt || a.date || 0) || 0);
  return compareByScore(a, b);
}

function compareByScore(a, b) {
  return (Number(b.score) || 0) - (Number(a.score) || 0) || String(a.title || "").localeCompare(String(b.title || ""));
}

async function getJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function loadAll() {
  if (window.EVIL_READ_ARXIV_DATA) {
    loadStatic();
    return;
  }
  await Promise.all([loadStats(), loadPapers()]);
}

function loadStatic() {
  const data = window.EVIL_READ_ARXIV_DATA;
  renderStats(data.stats || {});
  state.papers = data.papers || [];
  state.selected = state.papers[0] || null;
  renderList();
  renderDetail();
}

async function loadStats() {
  const stats = await getJson("/api/stats");
  renderStats(stats);
}

function renderStats(stats) {
  $("stats").innerHTML = [
    stat(stats.confCandidates, "DBLP 候选"),
    stat(stats.confFiltered, "标题筛选保留"),
    stat(stats.localNotes, "本地论文笔记"),
    stat(stats.totalImages ?? countImages(), "已提取图片"),
    stat(stats.confRateLimited ? "429" : "正常", "S2 状态"),
  ].join("");
}

function countImages() {
  return state.papers.reduce((sum, paper) => sum + (paper.imageCount || paper.images?.length || 0), 0);
}

function stat(value, label) {
  return `<div class="stat"><b>${escapeHtml(value ?? 0)}</b><span>${escapeHtml(label)}</span></div>`;
}

async function loadPapers() {
  const data = await getJson("/api/papers");
  state.papers = data.papers || [];
  state.selected = state.papers[0] || null;
  renderList();
  renderDetail();
}

function renderList() {
  const papers = filteredPapers();
  $("resultCount").textContent = `${papers.length} 篇论文`;
  $("paperList").className = `paper-list ${state.view === "compact" ? "compact-list" : ""}`;
  $("paperList").innerHTML = papers.map((paper) => {
    const mark = paperMark(paper.id);
    const title = paper.zhTitle && paper.zhTitle !== paper.title ? paper.zhTitle : paper.title;
    return `
      <button class="paper-item ${state.selected?.id === paper.id ? "active" : ""} ${mark.status === "hidden" ? "muted-item" : ""}" data-id="${escapeHtml(paper.id)}">
        <div class="item-head">
          <span class="source-dot ${paper.source === "conf-papers" ? "conf-dot" : "note-dot"}"></span>
          <h3>${escapeHtml(title)}</h3>
        </div>
        <p>${escapeHtml(paper.title)}</p>
        <div class="badge-row">
          <span class="badge accent">${escapeHtml(paper.venue || sourceLabel(paper.source))}</span>
          ${paper.score == null ? "" : `<span class="badge">评分 ${escapeHtml(paper.score)}</span>`}
          <span class="badge">${escapeHtml(statusLabel(mark.status))}</span>
          ${mark.starred ? `<span class="badge star">重点</span>` : ""}
          ${(paper.imageCount || paper.images?.length) ? `<span class="badge">${escapeHtml(paper.imageCount || paper.images.length)} 图</span>` : ""}
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
    paper.localPdf && `<a href="${escapeHtml(paper.localPdf.url)}" target="_blank" rel="noreferrer">本地 PDF</a>`,
    paper.doiUrl && `<a href="${escapeHtml(paper.doiUrl)}" target="_blank" rel="noreferrer">DOI</a>`,
  ].filter(Boolean).join("");
  const analysisButton = paper.analysisMarkdown || paper.analysisPath
    ? `<button class="text-button note-link" id="loadAnalysisBtn">查看详细中文笔记</button>`
    : "";
  const mark = paperMark(paper.id);
  const authors = (paper.authors || []).slice(0, 8).join("、");
  const imageCount = paper.imageCount || paper.images?.length || 0;

  $("detailPanel").innerHTML = `
    <article class="paper-detail">
      <div class="detail-kicker">${escapeHtml(sourceLabel(paper.source))} · ${escapeHtml(paper.venue || "未标注来源")}</div>
      <h2>${escapeHtml(paper.title)}</h2>
      ${paper.zhTitle && paper.zhTitle !== paper.title ? `<p class="zh-title">${escapeHtml(paper.zhTitle)}</p>` : ""}
      <div class="fact-grid">
        <div><span>综合评分</span><b>${escapeHtml(paper.score ?? "--")}</b></div>
        <div><span>图片</span><b>${escapeHtml(imageCount)}</b></div>
        <div><span>状态</span><b>${escapeHtml(statusLabel(mark.status))}</b></div>
        <div><span>日期</span><b>${escapeHtml(formatDate(paper.modifiedAt || paper.date) || "--")}</b></div>
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
      </div>
      <nav class="detail-nav">
        <a href="#summaryBlock">摘要</a>
        <a href="#imageBlock">图片</a>
        ${paper.abstract ? `<a href="#abstractBlock">英文摘要</a>` : ""}
        <a href="#markdownBox">笔记</a>
      </nav>
      <section id="summaryBlock">
        <h3>中文摘要</h3>
        <div class="summary-box">${escapeHtml(paper.summary || "暂无中文摘要。")}</div>
      </section>
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

function openImageModal(image) {
  if (!image) return;
  $("modalImage").src = image.url;
  $("modalImage").alt = image.name;
  $("modalCaption").textContent = image.path || image.name;
  $("imageModal").hidden = false;
}

function closeImageModal() {
  $("imageModal").hidden = true;
  $("modalImage").src = "";
}

async function runConfPapers() {
  if (window.EVIL_READ_ARXIV_DATA) {
    alert("当前是静态预览模式。要重新运行检索，请用 node web/server.js 启动服务后再点击。");
    return;
  }
  const btn = $("runConfBtn");
  btn.disabled = true;
  btn.textContent = "运行中...";
  try {
    await getJson("/api/conf-papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: 2025, conference: "CVPR", focus: "OCT AI" }),
    });
    await loadAll();
  } catch (error) {
    alert(`运行失败：${error.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = "运行 CVPR 2025 OCT AI";
  }
}

$("searchInput").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});

$("sourceFilter").addEventListener("change", (event) => {
  state.source = event.target.value;
  renderList();
});

$("statusFilter").addEventListener("change", (event) => {
  state.status = event.target.value;
  renderList();
});

$("sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderList();
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("active", item === button));
    renderList();
  });
});

$("refreshBtn").addEventListener("click", loadAll);
$("runConfBtn").addEventListener("click", runConfPapers);
$("closeImageModal").addEventListener("click", closeImageModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeImageModal();
});

loadMarks();
loadAll().catch((error) => {
  $("detailPanel").innerHTML = `<div class="empty-state"><h2>加载失败</h2><p>${escapeHtml(error.message)}</p></div>`;
});
