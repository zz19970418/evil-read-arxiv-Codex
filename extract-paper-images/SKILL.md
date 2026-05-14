---
name: extract-paper-images
description: Extract figures/images from academic papers into an Obsidian paper-note folder. Use when the user asks to extract paper figures, get high-quality images from arXiv source, fall back to PDF image extraction, create an image index, or save figures into a note directory's images subfolder.
---

# extract-paper-images

Use this skill when the user asks to extract images or figures from a paper, especially from arXiv papers or local PDFs.

Work in the current Obsidian vault. Prefer reproducible local files over temporary downloads.

## Goal

Extract useful paper figures and save them beside the paper note:

- Prefer high-quality original images from the arXiv source package.
- Fall back to PDF image extraction when source extraction is unavailable.
- Generate an image index.
- Save images into the paper note directory's `images/` subdirectory.

## Default Layout

For a paper folder:

```text
20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/
  <paper-note>.md
  paper.pdf
  images/
    figure-01.ext
    figure-02.ext
  image-index.md
```

Use `images/`, not `figures/`, for this skill. If older notes already use `figures/`, keep existing links unless the user asks to migrate them.

## Inputs

Accept any of these:

- arXiv abstract URL, e.g. `https://arxiv.org/abs/2605.02720`.
- arXiv PDF URL, e.g. `https://arxiv.org/pdf/2605.02720`.
- arXiv ID, e.g. `2605.02720`.
- Local paper folder containing `paper.pdf`.
- Local PDF path.
- Existing paper note path.

If the input is an existing paper note or folder, infer the paper folder and write outputs there.

## Workflow

### 1. Resolve Paper Folder And arXiv ID

Determine:

- Paper folder.
- Existing `paper.pdf`, if any.
- arXiv ID, if available from URL, note metadata, filename, or PDF link.

If no paper folder exists, create one under today's date:

```text
20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/
```

### 2. Try arXiv Source First

For arXiv papers, download the source package:

```text
https://arxiv.org/e-print/<arxiv-id>
```

Save it temporarily or as:

```text
source/<arxiv-id>.tar
```

Extract safely inside the paper folder. The source may be `.tar`, `.tar.gz`, or a raw TeX file.

Look for figure assets by extension:

- `.png`
- `.jpg`
- `.jpeg`
- `.pdf`
- `.eps`
- `.svg`

Prefer images referenced by TeX commands such as:

```tex
\includegraphics{...}
```

When possible, preserve original image quality and extension. Copy selected images into `images/` with stable names:

```text
images/figure-01-original-name.ext
```

If source images are PDF/EPS and raster previews are needed, render to PNG only when a local renderer is available. Keep the original file when rendering is not available.

### 3. PDF Extraction Fallback

If arXiv source download fails, source has no usable figures, or the paper is not on arXiv, extract images from `paper.pdf`.

Use PyMuPDF (`fitz`) when available:

- Skip tiny icons/logos.
- Prefer images larger than roughly `250x180`.
- Extract up to 10 images by default unless the user requests more.
- Save to `images/figure-01-pN.png`.

PDF fallback can miss vector-only diagrams. If extracted image count is suspiciously low, report that the PDF likely stores figures as vector graphics.

### 4. Generate Image Index

Create or update:

```text
image-index.md
```

Use this structure:

```markdown
# Image Index

Source: arXiv source | PDF fallback | mixed

## Figures

### Figure 01

![[images/figure-01.png]]

- **File**: `images/figure-01.png`
- **Source**: arXiv source / PDF page N
- **Notes**: ...
```

If figure captions can be inferred from nearby TeX or PDF text, include them. If not, use `--`.

### 5. Insert Links Into Paper Note

If a paper note exists, add or update a section:

```markdown
## 图片索引

![[image-index.md]]
```

Do not duplicate image embeds if the section already exists.

## Safety

- Never extract archives outside the paper folder.
- Normalize paths and ignore archive entries containing `..` or absolute paths.
- Do not delete existing images unless the user explicitly asks.
- If filenames collide, add a numeric suffix.

## Relationship To paper-analyze

`paper-analyze` may create a first-pass note and extract PDF images. Use `extract-paper-images` when the user wants higher-quality source images, a dedicated image index, or image extraction independent of full paper analysis.

For new workflows, prefer:

1. `paper-analyze` to create the structured note.
2. `extract-paper-images` to improve image quality and create `image-index.md`.

## Failure Handling

- If arXiv source is unavailable or rate-limited, fall back to PDF extraction.
- If PDF is missing and cannot be downloaded, create `image-index.md` with a failure note.
- If PyMuPDF is missing, ask to install `PyMuPDF` or continue with source-only extraction.
- Report how many images were extracted and from which source.
