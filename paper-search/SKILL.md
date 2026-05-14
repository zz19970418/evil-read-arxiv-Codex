---
name: paper-search
description: Search existing paper notes in this Obsidian vault by title, author, keyword, research domain, tag, concept, or free-text query, then rank results by relevance. Use when the user asks to find papers, search notes, locate prior analyses, or retrieve related work from the local paper-note collection.
---

# paper-search

Use this skill when the user asks to search existing paper notes in the vault.

Work locally first. Search `20_Research/Papers` before using the web.

## Goal

Find relevant paper notes and rank them by relevance.

Supported search modes:

- Title search.
- Author search.
- Keyword/concept search.
- Research domain search.
- Tag/frontmatter search.
- Free-text semantic-ish search using weighted keyword matching.

## Default Paths

- Vault root: current workspace directory.
- Paper notes root: `20_Research/Papers`.
- Daily notes: `10_Daily`.
- Research interest config: `99_System/Config/research_interests.yaml`.

Search only Markdown files by default:

```powershell
rg --files "20_Research/Papers" -g "*.md"
```

Skip generated image indexes unless the user asks for image indexes:

- `image-index.md`
- files under `images/`
- files under `figures/`

## Query Interpretation

Classify the user's query when possible:

- `title:<text>` or paper-like title: title search.
- `author:<name>` or person name: author search.
- `keyword:<term>`: keyword/concept search.
- `domain:<field>`: domain search.
- Otherwise: free-text search across title, aliases, headings, metadata, and body.

If the user writes Chinese query terms, search both the Chinese terms and likely English equivalents when obvious:

- OCT -> `OCT`, `optical coherence tomography`, `光学相干断层扫描`
- 眼科 AI -> `ophthalmology`, `ophthalmic AI`, `眼科AI`
- 生物参数测量 -> `ocular biometry`, `axial length`, `keratometry`
- 验光/屈光 -> `optometry`, `refraction`, `autorefractor`

## Search Procedure

### 1. Collect Candidate Notes

Use `rg` first:

```powershell
rg -n -i "<query terms>" "20_Research/Papers" -g "*.md"
```

For broader searches, list all Markdown files and inspect metadata/headings:

```powershell
rg --files "20_Research/Papers" -g "*.md"
```

### 2. Score Relevance

Rank notes using a simple weighted score:

- Title or H1 match: +10.
- Chinese title / aliases match: +9.
- Author match: +8.
- Tags/frontmatter/source fields match: +7.
- Section heading match: +6.
- Keyword/concept match in body: +3 each.
- Exact phrase match: +5 bonus.
- Recent daily folder or non-archive folder: +1 bonus.
- Archive folder: -1 unless the user asks to include archived notes.

Prefer precision over recall for short queries. For broad concepts, return the top 5-10 results.

### 3. Output Results

Use this format:

```markdown
找到 N 篇相关论文：

1. [[path/to/note|Paper Title]]
   - **相关性**: score / reason
   - **匹配点**: title / author / keyword / domain / section
   - **一句话**: short summary from the note
```

Use Obsidian-friendly wikilinks when the path is inside the vault. If responding in Codex final answer, also include clickable file links when helpful.

### 4. Related Work Search

When the user asks for related papers, search by:

- Shared keywords.
- Shared domain tags.
- Same modality, e.g. OCT, fundus, OCTA.
- Same task, e.g. segmentation, anomaly detection, speckle reduction.
- Same method family, e.g. foundation model, VLM, self-supervised learning.

Group results by relationship type when useful:

- Same task.
- Same modality.
- Same method.
- Same clinical application.

## Optional Script

No script is required, but a future implementation may add:

```text
paper-search/scripts/search_notes.py
```

Until then, use `rg`, PowerShell, and direct file reads.

## Failure Handling

- If no notes match, say that no local paper notes were found and suggest running `start-my-day` or `paper-analyze`.
- If the query is ambiguous, search broadly and show the strongest matches with reasons.
- Do not search the web unless the user asks for papers outside the local vault.
