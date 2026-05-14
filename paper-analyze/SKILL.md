---
name: paper-analyze
description: Deeply analyze a single academic paper in this Obsidian vault. Use when the user asks to analyze one paper, generate a detailed structured paper note, translate the abstract, extract figures, evaluate methods/results/value/limitations, compare related work, or update the research knowledge graph.
---

# paper-analyze

Use this skill when the user asks to analyze a specific paper, PDF, arXiv link, Semantic Scholar link, DOI, title, or an existing paper recommendation entry.

Work in the current Obsidian vault. Do not assume Claude slash commands or Bash-only environment setup.

## Goal

Create a detailed structured Chinese paper-analysis note for one paper, including:

- Abstract translation and key-point extraction.
- Research background and motivation.
- Method overview and architecture.
- Experiment/result analysis.
- Research value assessment.
- Strengths and limitations.
- Comparison with related papers.
- Extracted paper figures inserted into the note.
- Knowledge-graph updates through Obsidian links, tags, aliases, and related-note references.

## Default Paths

- Vault root: current workspace directory.
- Paper notes root: `20_Research/Papers`.
- Daily recommendation notes: `10_Daily`.
- Config file: `99_System/Config/research_interests.yaml`.

For new analyzed papers, use:

```text
20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/
  <paper-note>.md
  paper.pdf
  figures/
    figure-01-pN.png
```

Use short folder names to avoid Windows path-length problems. Keep the full paper title in the note heading and metadata.

## Workflow

### 1. Resolve Metadata

Collect:

- English title.
- Chinese title translation.
- Authors.
- Source and date.
- arXiv/DOI/Semantic Scholar links when available.
- PDF URL or local PDF path.
- Matched domains and keywords when available.

Do not invent missing metadata. Use `--` for unavailable fields.

### 2. Download Or Locate PDF

Download or copy the PDF as `paper.pdf`.

If arXiv gives an `http://arxiv.org/pdf/...` URL, prefer `https://arxiv.org/pdf/...`.

If download fails because of network or rate limits, keep the note skeleton and report the failure.

### 3. Extract Figures

Use PyMuPDF (`fitz`) when available to extract bitmap figures into `figures/`.

Insert extracted figures with Obsidian embeds:

```markdown
![[20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/figures/figure-01-pN.png]]
```

Some PDFs store diagrams as vector graphics; those may not appear as extracted bitmap images. Prefer useful large figures and skip tiny icons/logos.

### 4. Write Detailed Chinese Note

Keep the English title, but write analysis content in Chinese.

Required structure:

```markdown
---
tags: ["paper-analysis", "ophthalmology", "OCT"]
aliases:
  - "<中文题名>"
source: "<paper URL>"
---

# <English title>

**中文题名**: <中文题名>

## 基本信息

- **作者**: ...
- **来源**: ...
- **日期**: ...
- **链接**: ...
- **PDF**: ...
- **研究方向**: ...
- **关键词**: ...

## 摘要翻译

<忠实中文翻译或结构化中文摘要。>

## 要点提炼

- ...
- ...
- ...

## 研究背景与动机

<说明问题为什么重要，以及论文试图填补什么空白。>

## 方法概述和架构

<说明方法、模型、算法、系统架构或数据流水线。>

## 实验结果分析

<说明数据集、指标、基线、主要结果，以及这些结果意味着什么。>

## 研究价值评估

<结合用户关注的眼科生物测量、OCT、验光/屈光、仪器和 AI 方向评估价值。>

## 优势和局限性

**优势**:
- ...

**局限性**:
- ...

## 与相关论文对比

- [[Related Note|Related Paper]]: ...
- If no local related note exists, compare conceptually in plain text.

## 提取图片

![[...]]

## 知识图谱链接

- **相关主题**: [[OCT]], [[眼科AI]], [[生物参数测量]], [[验光仪]]
- **相关论文**: ...
- **可复用概念**: ...

## 下一步精读问题

- ...
```

## Knowledge Graph Updates

Update the knowledge graph by:

- Adding tags and aliases in frontmatter.
- Adding wikilinks to existing topic notes when they exist.
- Linking to related existing paper notes under `20_Research/Papers`.
- Adding concept links such as `[[OCT]]`, `[[眼科AI]]`, `[[生物参数测量]]`, `[[验光仪]]`, `[[屈光]]`.

Do not create many empty topic notes unless the user asks. Wikilinks are enough to seed the graph.

## Relationship To start-my-day

When invoked from `start-my-day`, analyze the requested paper from the daily note.

`start-my-day/scripts/analyze_top_papers.py` can create a useful first-pass analysis and extract figures. For a deeper `paper-analyze` pass, enrich that first-pass note with the full required structure above.

## Failure Handling

- If Python is unavailable, create a structured note from available metadata and report that figure extraction requires Python and PyMuPDF.
- If PyMuPDF is missing, ask to install `PyMuPDF` or continue without images.
- If PDF download fails, include links and metadata, then mark image extraction as unavailable.
- If a field cannot be verified, write `--` rather than guessing.
