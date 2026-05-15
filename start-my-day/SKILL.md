---
name: start-my-day
description: Start the user's daily paper-reading workflow in an Obsidian vault by searching arXiv/Semantic Scholar, ranking papers, and creating a daily recommendation note.
---

# start-my-day

Use this skill when the user asks to "start my day", "start-my-day", or wants a daily arXiv paper recommendation note generated inside this Obsidian vault.

This is a Codex skill. Do not assume Claude Code slash commands, Bash-only variables, or macOS shell startup files. Work from the current workspace/vault and use Codex tools plus the bundled Python scripts in this skill directory.

## Goal

Generate a daily paper recommendation note for the user's research workflow:

- Read the user's research interests from `99_System/Config/research_interests.yaml`.
- Scan existing paper notes under `20_Research/Papers/`.
- Search recent arXiv papers and optional hot papers from Semantic Scholar.
- Rank/filter papers with `scripts/search_arxiv.py`.
- Write a daily Obsidian note under `10_Daily/`.
- Optionally link keywords to existing notes with `scripts/link_keywords.py`.

## Paths

Use these paths unless the user explicitly provides different ones:

- Vault root: current workspace directory.
- Skill directory: `start-my-day`.
- Config file: `99_System/Config/research_interests.yaml`.
- Daily notes directory: `10_Daily`.
- Existing paper notes directory: `20_Research/Papers`.

When running commands in Codex on Windows/PowerShell, prefer explicit paths rather than relying on shell variables:

```powershell
$Vault = (Get-Location).Path
$Skill = Join-Path $Vault "start-my-day"
$Config = Join-Path $Vault "99_System\Config\research_interests.yaml"
```

If the environment variable `OBSIDIAN_VAULT_PATH` is already set, it may be used, but do not require it. If it is missing, treat the current workspace as the vault root.

## Python Command

The scripts require Python 3 and PyYAML. Before running scripts, detect an available Python command:

```powershell
Get-Command python, py, python3 -ErrorAction SilentlyContinue
```

Use whichever command exists. If no Python command exists, tell the user that the skill files are converted but the workflow cannot be executed until Python 3 is available in PATH.

## Language

The output language is controlled by the `language` field in `99_System/Config/research_interests.yaml`:

- `language: "zh"` or missing: generate a Chinese note.
- `language: "en"`: generate an English note.

Codex should read the YAML config directly or inspect the line with PowerShell. Do not use Bash `grep`, `awk`, `source ~/.zshrc`, or Claude-specific environment assumptions.

Filename suffix:

- Chinese: use the suffix meaning "paper recommendations" in Chinese, producing `10_Daily/YYYY-MM-DD<ChineseSuffix>.md`.
- English: `paper-recommendations`, producing `10_Daily/YYYY-MM-DD-paper-recommendations.md`.

## Workflow

### 1. Resolve Date

If the user provides a date in `YYYY-MM-DD`, use that as the target date. Otherwise use today's date in the user's local timezone.

### 2. Validate Inputs

Check that these exist:

- `99_System/Config/research_interests.yaml`
- `10_Daily/`
- `20_Research/Papers/`
- `start-my-day/scripts/search_arxiv.py`
- `start-my-day/scripts/scan_existing_notes.py`
- `start-my-day/scripts/link_keywords.py`
- `start-my-day/scripts/analyze_top_papers.py`

If the papers directory is missing, create it only if the user is clearly asking to run the workflow and the vault structure indicates this is appropriate. Otherwise report the missing path.

### 3. Build Existing Notes Index

Run from the skill directory:

```powershell
Set-Location $Skill
python .\scripts\scan_existing_notes.py `
  --vault $Vault `
  --output .\existing_notes_index.json
```

Replace `python` with the detected Python command if needed.

This creates `existing_notes_index.json` containing:

- `notes`: scanned markdown paper notes.
- `keyword_to_notes`: keywords that can be linked back to existing notes.

### 4. Search and Rank Papers

Run:

```powershell
Set-Location $Skill
python .\scripts\search_arxiv.py `
  --config $Config `
  --output .\arxiv_filtered.json `
  --max-results 50 `
  --top-n 10 `
  --categories "eess.IV,cs.CV,cs.AI,cs.LG,physics.optics" `
  --target-date "YYYY-MM-DD" `
  --cache-dir .\.cache `
  --cache-ttl-hours 72 `
  --arxiv-mode auto `
  --arxiv-max-retries 1 `
  --fallback-sources "europe_pmc,pubmed,crossref" `
  --fallback-top-k 20 `
  --s2-request-limit 25 `
  --s2-max-queries 3 `
  --s2-interval 20
```

If the user did not provide a target date, omit `--target-date`.

Useful optional flags:

- `--skip-hot-papers`: skip Semantic Scholar hot-paper search if the network is slow or unavailable.
- `--focus "topic words"`: narrow the search to a temporary focus.
- `--days 30`: change the recent-paper window.
- `--no-fallback-sources`: disable PubMed / Europe PMC / Crossref fallback searches.

If arXiv or Semantic Scholar returns HTTP 429, do not immediately repeat the same broad query many times. Prefer:

- Keep the default cache enabled so repeated runs reuse `.cache` instead of hitting APIs again.
- Reduce `--max-results` to 30-80.
- Use `--focus` with a narrow topic such as `"optical coherence tomography,OCT,ophthalmology"`.
- Use `--skip-hot-papers` when Semantic Scholar is rate-limited.
- Wait 10-30 minutes before retrying broad queries.
- Use available previous JSON or web-search fallback only when the user needs a note immediately.

Default rate-limit strategy:

- Prefer arXiv keyword mode over broad category scans. The script automatically builds priority keywords from `research_interests.yaml`.
- Keep `--arxiv-max-retries 1` during routine daily runs. Repeating the same rate-limited query usually extends the block.
- Use `--cache-ttl-hours 72` so repeated local tests reuse results instead of hitting APIs again.
- Limit Semantic Scholar to `--s2-max-queries 3` and `--s2-request-limit 25` unless the user explicitly wants a broader, slower search.
- The script writes short cooldown files under `.cache/cooldowns/` after 429 responses. During cooldown it skips the same query quickly instead of waiting and retrying.
- When arXiv returns no recent papers, fallback sources run automatically in this order: Europe PMC, PubMed, Crossref. Europe PMC is preferred for ophthalmology/OCT biomedical literature because it often includes abstracts, DOI, PMID/PMCID, and open-access links.
- The script resolves legal open-access PDFs in this order: PMC PDF first, then existing source PDF, then Unpaywall when `unpaywall_email` is configured.
- If the user has a Semantic Scholar API key, put it in `99_System/Config/research_interests.yaml` as `semantic_scholar_api_key`; this improves reliability.
- If the user wants Unpaywall lookup, put an email in `99_System/Config/research_interests.yaml` as `unpaywall_email`.

The script writes `status` and `rate_limited` into `arxiv_filtered.json`; if `status` is `rate_limited`, explain that API limits prevented fresh automated retrieval.

The script writes `arxiv_filtered.json` with:

- `target_date`
- `date_windows`
- `total_recent`
- `total_fallback`
- `total_hot`
- `total_unique`
- `top_papers`

Each paper usually includes title, authors, abstract/summary, categories, links, scores, matched domains/keywords, and `note_filename`.

Network access may be required for arXiv and Semantic Scholar. If Codex command execution fails with a network/sandbox error, request escalation for the same command.

### 5. Generate Daily Recommendation Note

Read `arxiv_filtered.json` and create the daily note in `10_Daily`.

Do not use a script that does not exist. In this repository, there is no dedicated note-generation script in `start-my-day/scripts`, so Codex should generate the markdown content itself from the JSON.

Frontmatter:

```markdown
---
keywords: [keyword1, keyword2]
tags: ["llm-generated", "daily-paper-recommend"]
---
```

Chinese overview section. Generate the actual prose in Chinese when `language: "zh"`:

```markdown
## <Chinese heading for Today's Overview>

<Chinese sentence summarizing that today's {paper_count} recommended papers focus on **{direction1}**, **{direction2}**, and **{direction3}**.>

- **<Chinese label for Overall Trends>**: {summary}
- **<Chinese label for Quality Distribution>**: {score range and assessment}
- **<Chinese label for Research Hotspots>**:
  - **{hotspot1}**: {description}
  - **{hotspot2}**: {description}
  - **{hotspot3}**: {description}
- **<Chinese label for Reading Suggestions>**: {reading_order}
```

English overview section:

```markdown
## Today's Overview

Today's {paper_count} recommended papers focus on **{direction1}**, **{direction2}**, and **{direction3}**.

- **Overall Trends**: {summary}
- **Quality Distribution**: Scores range from {min_score}-{max_score}, {assessment}
- **Research Hotspots**:
  - **{hotspot1}**: {description}
  - **{hotspot2}**: {description}
  - **{hotspot3}**: {description}
- **Reading Suggestions**: {reading_order}
```

Chinese paper entry format. Generate field labels in Chinese when writing the real note:

```markdown
### [[{note_filename}|{paper_title}]]
- **<Chinese label for Authors>**: {authors}
- **<Chinese label for Affiliation>**: {affiliation_or_--}
- **<Chinese label for Links>**: [arXiv]({arxiv_url}) | [PDF]({pdf_url})
- **<Chinese label for Source>**: {source}
- **<Chinese label for Recommendation Score>**: {score}
- **<Chinese label for Matched Domains>**: {matched_domains}
- **<Chinese label for Note>**: {existing_note_link_or_--}

**<Chinese label for One-line Summary>**: {one_sentence_summary}

**<Chinese label for Core Contributions>**:
- {contribution_1}
- {contribution_2}
- {contribution_3}

**<Chinese label for Key Results>**: {key_result}

---
```

English paper entry format:

```markdown
### [[{note_filename}|{paper_title}]]
- **Authors**: {authors}
- **Affiliation**: {affiliation_or_--}
- **Links**: [arXiv]({arxiv_url}) | [PDF]({pdf_url})
- **Source**: {source}
- **Recommendation Score**: {score}
- **Matched Domains**: {matched_domains}
- **Note**: {existing_note_link_or_--}

**One-line Summary**: {one_sentence_summary}

**Core Contributions**:
- {contribution_1}
- {contribution_2}
- {contribution_3}

**Key Results**: {key_result}

---
```

Rules:

- Sort all papers by recommendation score, highest first.
- Use Obsidian wikilinks with display aliases: `[[path_or_filename|Readable Title]]`.
- For Chinese notes, keep the original English paper title in the heading and add `**中文题名**: ...` immediately below the heading.
- For Chinese notes, translate one-line summaries, core contributions, key results, and overview prose into Chinese. Do not leave raw English abstract sentences as the main summary.
- Use `--` for missing data. Do not use `---` as a placeholder because Obsidian renders it as a separator.
- Use `note_filename` from JSON when available.
- Do not invent affiliations. If not present in JSON or obvious source metadata, use `--`.
- Keep summaries faithful to title/abstract. If uncertain, phrase conservatively.

### 6. Link Keywords

After writing the daily note, optionally run keyword linking:

```powershell
Set-Location $Skill
python .\scripts\link_keywords.py `
  --index .\existing_notes_index.json `
  --input "$Vault\10_Daily\YYYY-MM-DD<ChineseSuffix>.md" `
  --output "$Vault\10_Daily\YYYY-MM-DD<ChineseSuffix>_linked.md"
```

For English notes, use the English filename. Prefer replacing the original daily note with the linked version only after checking that the linked file looks correct. Use Codex file editing tools for that replacement rather than destructive shell commands.

The linker skips frontmatter, headings, code blocks, existing wikilinks, images, and normal markdown links.

### 7. Analyze Top Papers and Extract Images

When the user explicitly asks for detailed analysis, images, or expects the first few recommended papers to become paper notes, run:

```powershell
Set-Location $Skill
python .\scripts\analyze_top_papers.py `
  --vault $Vault `
  --daily-note "$Vault\10_Daily\YYYY-MM-DD<ChineseSuffix>.md" `
  --limit 3 `
  --max-images 6
```

For English notes, use the English filename. This creates:

- `20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/<paper>.md`: detailed paper note.
- `20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/paper.pdf`: downloaded PDF.
- `20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/figures/figure-*.png`: extracted figures.

Requirements:

- Python package `PyMuPDF` (`fitz`) is required for PDF text and image extraction.
- Only run this for papers with a direct PDF URL.
- If a PDF download fails due to network limits, keep the daily note and report which paper failed.
- Extracted images are raw PDF images. Some PDFs store charts as vector drawings; those may not appear as extracted bitmap images.
- For Chinese workflows, detailed paper notes must also include `**中文题名**: ...`, Chinese summary, Chinese core points, Chinese relevance-to-user-direction notes, and Chinese next-step reading questions. Do not leave the extracted English abstract as the main analysis.

## Existing Notes Matching

Before generating each entry, check `existing_notes_index.json` for an existing note by:

- arXiv ID if present in note path/title/content.
- Exact or fuzzy title match.
- Strong title keyword match.

If an existing note is found, reference it in the Chinese `Note` field or English `Note` field. Do not generate a duplicate detailed report.

## Relationship to Other Skills

This skill may mention `paper-analyze` or `extract-paper-images` in older docs, but those skills are not bundled in this directory. In Codex:

- Do not call Claude slash commands like `/paper-analyze` or `/extract-paper-images`.
- If a matching Codex skill exists in the current environment, use it only when the user explicitly asks for deeper analysis or image extraction.
- The default `start-my-day` output is the daily recommendation note. When the user asks for detailed analysis or images, use `scripts/analyze_top_papers.py` for the top papers.

## Temporary Files

The workflow may create these temporary files in `start-my-day/`:

- `existing_notes_index.json`
- `arxiv_filtered.json`

Keep them if useful for traceability. Clean them up only if the user asks or if they are clearly disposable and not needed.

## Failure Handling

- If Python is missing, report that Python 3 is required and stop before changing daily notes.
- If PyYAML is missing, report that `PyYAML` is required by the scripts.
- If network access fails, retry with escalation when appropriate.
- If `arxiv_filtered.json` contains no papers, do not create an empty recommendation note unless the user explicitly wants one.
- If generated content is incomplete because a field is absent from JSON, use `--` and keep going.
