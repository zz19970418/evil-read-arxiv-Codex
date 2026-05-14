---
name: conf-papers
description: Search and recommend top-conference papers from CVPR, ICCV, ECCV, ICLR, AAAI, NeurIPS, ICML, and related AI/vision venues using DBLP plus Semantic Scholar metadata, then rank, summarize, and optionally analyze the top papers into the vault. Use when the user asks for conference papers, top conference recommendations, CVPR/ICCV/ECCV/ICLR/NeurIPS/ICML/AAAI search, or recent high-quality conference work.
---

# conf-papers

Use this skill when the user asks for top-conference paper search or recommendations.

Work from the current Obsidian vault. Store outputs under `30_confpapers`, not `20_Research/Papers`.

## Goal

Search top AI, computer vision, and machine learning conference papers, then recommend papers that match the user's research interests.

Default target venues:

- CVPR
- ICCV
- ECCV
- ICLR
- NeurIPS
- ICML
- AAAI

Default workflow:

1. Read `99_System/Config/conf-papers.yaml`.
2. Fetch paper lists from DBLP.
3. Lightly filter by title keywords and excluded words.
4. Enrich retained candidates with Semantic Scholar metadata when available.
5. Score papers with relevance, popularity, and venue quality.
6. Write recommendation notes under `30_confpapers/YYYY-MM-DD/`.
7. For the top 3 papers, generate detailed analysis only when an arXiv ID or PDF URL is available.

## Paths

- Vault root: current workspace directory.
- Skill directory: `conf-papers`.
- Config file: `99_System/Config/conf-papers.yaml`.
- Output root: `30_confpapers`.
- Daily conference folder: `30_confpapers/YYYY-MM-DD`.
- Detailed paper folder: `30_confpapers/YYYY-MM-DD/NN-ShortTitle`.

Keep each paper's files together:

```text
30_confpapers/YYYY-MM-DD/
  conference-paper-recommendations.md
  01-ShortTitle/
    note.md
    paper.pdf
    images/
      image-001.png
    metadata.json
```

## Config

Use `99_System/Config/conf-papers.yaml`.

Expected fields:

- `language`: `zh` or `en`.
- `default_years`: list of years to search when the user does not specify a year.
- `default_conferences`: venues to search.
- `keywords`: preferred title and abstract terms.
- `exclude_keywords`: terms to filter out early.
- `semantic_scholar_api_key`: optional API key for better limits.
- `max_dblp_results_per_conference`: DBLP fetch cap per venue/year.
- `max_s2_requests`: Semantic Scholar enrichment cap per run.
- `top_n`: number of recommended papers.
- `analyze_top_n`: number of top papers to analyze when arXiv/PDF is available.
- `s2_interval_seconds`: delay between Semantic Scholar requests.

If the config is missing, create a conservative default before running.

## Python Command

Detect Python before running scripts:

```powershell
Get-Command python, py, python3 -ErrorAction SilentlyContinue
```

Use whichever command exists. If no Python command is available, explain that the skill can be used manually with DBLP/Semantic Scholar search, but automated execution requires Python 3 in PATH.

## Search Procedure

### 1. Interpret User Scope

Extract optional user constraints:

- Conference: `CVPR`, `ICCV`, `ECCV`, `ICLR`, `AAAI`, `NeurIPS`, `ICML`.
- Year or year range: `2024`, `2025`, `2023-2025`.
- Topic focus: e.g. `OCT`, `ophthalmic AI`, `medical image segmentation`.
- Output size: e.g. `top 10`.

If absent, use config defaults.

### 2. Fetch DBLP Candidates

Use DBLP as the primary source for venue/year paper lists.

DBLP venue hints:

- CVPR: `conf/cvpr`
- ICCV: `conf/iccv`
- ECCV: `conf/eccv`
- ICLR: `conf/iclr`
- AAAI: `conf/aaai`
- NeurIPS: `conf/nips`
- ICML: `conf/icml`

Prefer DBLP APIs or XML/JSON endpoints. Keep cached raw responses under `conf-papers/.cache/` to reduce repeated requests.

### 3. Stage-One Title Filtering

Filter candidates cheaply before Semantic Scholar calls.

Keep papers that match at least one configured keyword in title, unless the user explicitly asks for broad venue browsing.

Apply exclude keywords case-insensitively. Typical exclusions:

- survey
- review
- tutorial
- workshop
- challenge
- competition
- benchmark report
- editorial
- erratum

For the user's domain, useful keyword families include:

- OCT: `OCT`, `optical coherence tomography`, `OCTA`, `retinal OCT`
- ophthalmic AI: `ophthalmology`, `retina`, `fundus`, `glaucoma`, `diabetic retinopathy`
- biometry: `ocular biometry`, `axial length`, `keratometry`, `IOL`
- refraction: `optometry`, `refraction`, `autorefractor`, `myopia`
- instruments: `optical measurement`, `interferometry`, `biomedical sensor`

### 4. Semantic Scholar Enrichment

Use Semantic Scholar only for candidates retained after title filtering.

Useful fields:

- title
- abstract
- authors
- year
- venue
- citationCount
- influentialCitationCount
- externalIds
- openAccessPdf
- url
- fieldsOfStudy

Respect rate limits:

- Use cache before making requests.
- Cap requests with `max_s2_requests`.
- Sleep `s2_interval_seconds` between requests.
- If HTTP 429 occurs, stop enrichment and rank with available metadata.
- Do not retry broad queries repeatedly in the same run.

If `semantic_scholar_api_key` exists, pass it as `x-api-key`.

### 5. Score Candidates

Compute a 100-point score:

- Relevance: 40%.
- Popularity: 40%.
- Venue/year quality: 20%.

Relevance examples:

- Title keyword match: strong boost.
- Abstract keyword match: medium boost.
- Multiple domain matches: boost.
- User-provided focus terms: strong boost.

Popularity examples:

- Citation count, normalized within the result set.
- Influential citation count when available.
- Recent papers should not be over-penalized for low citations.

Quality examples:

- Venue tier from config.
- Main conference over workshops.
- Full paper over poster/abstract when metadata indicates it.

Prefer high relevance over raw citation count for niche biomedical and ophthalmic topics.

### 6. Write Recommendation Note

Create:

```text
30_confpapers/YYYY-MM-DD/conference-paper-recommendations.md
```

For Chinese output, write Chinese headings and analysis while preserving original English paper titles.

Recommended note structure:

```markdown
---
tags: ["llm-generated", "conference-paper-recommendation"]
source: "DBLP + Semantic Scholar"
---

# YYYY-MM-DD 顶会论文推荐

## 今日概览

...

## 推荐论文

### 1. Paper Title
**中文题名**: ...
- **会议/年份**: CVPR 2025
- **作者**: ...
- **链接**: [DBLP](...) | [Semantic Scholar](...) | [PDF](...)
- **综合评分**: 86
- **评分构成**: 相关性 34/40，热门度 32/40，质量 20/20
- **匹配关键词**: OCT, medical image segmentation

**一句话总结**: ...

**为什么值得看**:
- ...
- ...
- ...
```

Use `--` for missing values. Do not invent abstracts or arXiv IDs.

### 7. Analyze Top 3

For the top `analyze_top_n` papers, create detailed notes only if one of these is available:

- arXiv ID in Semantic Scholar `externalIds`.
- `openAccessPdf.url`.
- reliable paper PDF URL.

Store analysis in each paper folder:

```text
30_confpapers/YYYY-MM-DD/01-ShortTitle/note.md
```

Detailed Chinese note should include:

- 中文题名
- 摘要翻译和要点提炼
- 研究背景与动机
- 方法概述和架构
- 实验结果分析
- 研究价值评估
- 优势和局限性
- 与已有本地论文的关系
- 后续阅读问题
- 图片索引, when images were extracted

If no arXiv ID or PDF exists, keep the recommendation entry and mark detailed analysis as unavailable rather than fabricating content.

### 8. Image Extraction

If a PDF is available and PyMuPDF is installed, extract bitmap images into:

```text
30_confpapers/YYYY-MM-DD/NN-ShortTitle/images/
```

Some conference PDFs store figures as vector drawings; those may not extract as images. In that case, say no extractable bitmap figures were found.

## Failure Handling

- If DBLP fails, report the venue/year that failed and continue with cached or remaining venues.
- If Semantic Scholar returns 429, stop enrichment, use cached metadata, and explain the result may have weaker citation/abstract scoring.
- If no candidates pass filters, suggest broadening keywords, adding a year, or reducing exclude terms.
- If Python is unavailable, do a manual `rg`/web-assisted explanation only when the user asks; otherwise report the missing runtime.
- Never place conference outputs in `20_Research/Papers`; use `30_confpapers`.
