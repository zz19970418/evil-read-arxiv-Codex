const state = {
  papers: [],
  selected: null,
  query: "",
  source: "all",
  status: "all",
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

function renderMarkdownSections(markdown) {
  const sections = markdownSections(markdown);
  return `<div class="section-stack">${
    sections.map((section, index) => `
      <details class="note-section" ${index < 2 ? "open" : ""}>
        <summary>${escapeHtml(section.title)}</summary>
        <div class="markdown">${escapeHtml(section.body.join("\n").trim())}</div>
      </details>
    `).join("")
  }</div>`;
}

function renderImages(images = []) {
  if (!images.length) return "";
  return `
    <h3>图片</h3>
    <div class="image-grid">
      ${images.map((image) => `
        <a class="image-tile" href="${escapeHtml(image.url)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.name)}" loading="lazy" />
          <span>${escapeHtml(image.sourceDir ? `${image.sourceDir} / ${image.name}` : image.name)}</span>
        </a>
      `).join("")}
    </div>
  `;
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
    stat(stats.confCandidates, "DBLP 顶会候选"),
    stat(stats.confFiltered, "标题轻筛保留"),
    stat(stats.localNotes, "本地论文笔记"),
    stat(stats.confRateLimited ? "429" : "正常", "Semantic Scholar 状态"),
  ].join("");
}

function stat(value, label) {
  return `<div class="stat"><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`;
}

async function loadPapers() {
  const data = await getJson("/api/papers");
  state.papers = data.papers || [];
  state.selected = state.papers[0] || null;
  renderList();
  renderDetail();
}

function filteredPapers() {
  const q = state.query.trim().toLowerCase();
  return state.papers.filter((paper) => {
    if (state.source !== "all" && paper.source !== state.source) return false;
    const mark = paperMark(paper.id);
    if (state.status === "starred" && !mark.starred) return false;
    if (["unread", "reading", "done", "hidden"].includes(state.status) && mark.status !== state.status) return false;
    if (!q) return true;
    const haystack = [
      paper.title,
      paper.zhTitle,
      paper.summary,
      paper.venue,
      ...(paper.matchedKeywords || []),
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

function renderList() {
  const papers = filteredPapers();
  $("paperList").innerHTML = papers.map((paper) => `
    <button class="paper-item ${state.selected?.id === paper.id ? "active" : ""} ${paperMark(paper.id).status === "hidden" ? "muted-item" : ""}" data-id="${escapeHtml(paper.id)}">
      <h3>${escapeHtml(paper.zhTitle || paper.title)}</h3>
      <p>${escapeHtml(paper.title)}</p>
      <div class="badge-row">
        <span class="badge accent">${escapeHtml(paper.venue || paper.source)}</span>
        ${paper.score == null ? "" : `<span class="badge">评分 ${escapeHtml(paper.score)}</span>`}
        <span class="badge">${escapeHtml(statusLabel(paperMark(paper.id).status))}</span>
        ${paperMark(paper.id).starred ? `<span class="badge star">重点</span>` : ""}
        ${(paper.matchedKeywords || []).slice(0, 3).map((x) => `<span class="badge">${escapeHtml(x)}</span>`).join("")}
      </div>
    </button>
  `).join("") || `<div class="empty-state"><p>没有匹配的论文</p></div>`;

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
    paper.pdfUrl && `<a href="${escapeHtml(paper.pdfUrl)}" target="_blank" rel="noreferrer">PDF</a>`,
    paper.localPdf && `<a href="${escapeHtml(paper.localPdf.url)}" target="_blank" rel="noreferrer">本地 PDF</a>`,
    paper.doiUrl && `<a href="${escapeHtml(paper.doiUrl)}" target="_blank" rel="noreferrer">DOI</a>`,
  ].filter(Boolean).join("");
  const analysisButton = paper.analysisMarkdown || paper.analysisPath
    ? `<button class="text-button note-link" id="loadAnalysisBtn">查看详细中文笔记</button>`
    : "";
  const mark = paperMark(paper.id);

  $("detailPanel").innerHTML = `
    <h2>${escapeHtml(paper.title)}</h2>
    <p class="zh-title">${escapeHtml(paper.zhTitle || "")}</p>
    <div class="meta-row">
      <span>${escapeHtml(paper.venue || paper.source)}</span>
      ${paper.score == null ? "" : `<span>综合评分 ${escapeHtml(paper.score)}</span>`}
      ${(paper.authors || []).slice(0, 6).map((x) => `<span>${escapeHtml(x)}</span>`).join("")}
    </div>
    <div class="badge-row">
      ${(paper.matchedKeywords || []).map((x) => `<span class="badge accent">${escapeHtml(x)}</span>`).join("")}
    </div>
    <div class="action-row">
      <button class="text-button ${mark.status === "reading" ? "selected-action" : ""}" data-status-action="reading">在读</button>
      <button class="text-button ${mark.status === "done" ? "selected-action" : ""}" data-status-action="done">已读</button>
      <button class="text-button ${mark.status === "hidden" ? "selected-action danger-action" : ""}" data-status-action="hidden">暂不关注</button>
      <button class="text-button ${mark.starred ? "selected-action star-action" : ""}" id="starBtn">${mark.starred ? "取消重点" : "标为重点"}</button>
    </div>
    <h3>中文摘要</h3>
    <div class="summary-box">${escapeHtml(paper.summary || "暂无中文摘要。")}</div>
    ${links ? `<div class="link-row">${links}</div>` : ""}
    ${paper.analysisFolder ? `<p class="status">详细笔记目录：${escapeHtml(paper.analysisFolder)}</p>` : ""}
    ${analysisButton}
    ${paper.path ? `<button class="text-button note-link" id="loadNoteBtn">查看本地 Markdown</button>` : ""}
    ${renderImages(paper.images)}
    ${paper.abstract ? `<h3>英文摘要</h3><div class="abstract-box">${escapeHtml(paper.abstract)}</div>` : ""}
    <div id="markdownBox"></div>
  `;

  document.querySelectorAll("[data-status-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.statusAction;
      setPaperMark(paper.id, { status: paperMark(paper.id).status === next ? "unread" : next });
    });
  });

  const starBtn = $("starBtn");
  if (starBtn) {
    starBtn.addEventListener("click", () => setPaperMark(paper.id, { starred: !paperMark(paper.id).starred }));
  }

  const analysisBtn = $("loadAnalysisBtn");
  if (analysisBtn) {
    analysisBtn.addEventListener("click", async () => {
      if (paper.analysisMarkdown) {
        $("markdownBox").innerHTML = `<h3>详细中文笔记</h3>${renderMarkdownSections(paper.analysisMarkdown)}`;
        return;
      }
      analysisBtn.textContent = "读取中...";
      const res = await fetch(`/api/markdown?path=${encodeURIComponent(paper.analysisPath)}`);
      const text = await res.text();
      $("markdownBox").innerHTML = `<h3>详细中文笔记</h3>${renderMarkdownSections(text)}`;
      analysisBtn.textContent = "查看详细中文笔记";
    });
  }

  const noteBtn = $("loadNoteBtn");
  if (noteBtn) {
    noteBtn.addEventListener("click", async () => {
      if (paper.markdown) {
        $("markdownBox").innerHTML = `<h3>本地 Markdown</h3>${renderMarkdownSections(paper.markdown)}`;
        return;
      }
      noteBtn.textContent = "读取中...";
      const res = await fetch(`/api/markdown?path=${encodeURIComponent(paper.path)}`);
      const text = await res.text();
      $("markdownBox").innerHTML = `<h3>本地 Markdown</h3>${renderMarkdownSections(text)}`;
      noteBtn.textContent = "查看本地 Markdown";
    });
  }
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

$("refreshBtn").addEventListener("click", loadAll);
$("runConfBtn").addEventListener("click", runConfPapers);

loadMarks();
loadAll().catch((error) => {
  $("detailPanel").innerHTML = `<div class="empty-state"><h2>加载失败</h2><p>${escapeHtml(error.message)}</p></div>`;
});
