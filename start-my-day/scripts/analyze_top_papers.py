#!/usr/bin/env python3
"""
Create detailed Obsidian notes and extract figures for the top papers in a daily note.

This script intentionally uses lightweight heuristics: it does not replace a human
paper review, but it turns the top recommendations into useful working notes.
"""

import argparse
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional

import fitz
import requests


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


@dataclass
class PaperEntry:
    index: int
    title: str
    note_filename: str
    arxiv_url: Optional[str]
    pdf_url: Optional[str]
    daily_summary: str
    score: str
    matched_domain: str
    matched_keywords: str


def sanitize_filename(name: str) -> str:
    return re.sub(r'[ /\\:*?"<>|]+', "_", name).strip("_")[:180]


def date_folder_from_daily_note(path: Path) -> str:
    match = re.search(r"(\d{4}-\d{2}-\d{2})", path.stem)
    return match.group(1) if match else "undated"


def paper_folder_name(paper: PaperEntry) -> str:
    title_token = re.sub(r"[^A-Za-z0-9]+", "-", paper.title).strip("-")
    title_token = title_token[:48].strip("-") or paper.note_filename[:48] or "paper"
    return f"{paper.index:02d}-{title_token}"


def parse_daily_note(path: Path, limit: int) -> List[PaperEntry]:
    text = path.read_text(encoding="utf-8")
    sections = re.split(r"\n---\n", text)
    entries: List[PaperEntry] = []

    for section in sections:
        heading = re.search(r"^### \[\[(?P<note>[^|\]]+)\|(?P<title>.+?)\]\]", section, re.M)
        if not heading:
            continue

        links = re.search(r"- \*\*(?:链接|Links)\*\*: (?P<links>.+)", section)
        link_line = links.group("links") if links else ""
        arxiv_url = None
        pdf_url = None

        arxiv_match = re.search(r"\[arXiv\]\((https?://[^)]+)\)", link_line)
        pdf_match = re.search(r"\[arXiv PDF\]\((https?://[^)]+)\)|PDF:\s*(https?://\S+)", link_line)
        if arxiv_match:
            arxiv_url = arxiv_match.group(1)
        if pdf_match:
            pdf_url = pdf_match.group(1) or pdf_match.group(2)
        elif arxiv_url and "/abs/" in arxiv_url:
            pdf_url = arxiv_url.replace("/abs/", "/pdf/")

        summary_match = re.search(r"\*\*(?:一句话总结|One-line Summary)\*\*:\s*(.+)", section)
        score_match = re.search(r"- \*\*(?:推荐分|Recommendation Score)\*\*:\s*(.+)", section)
        domain_match = re.search(r"- \*\*(?:匹配领域|Matched Domains)\*\*:\s*(.+)", section)
        keywords_match = re.search(r"- \*\*(?:匹配关键词|Matched Keywords)\*\*:\s*(.+)", section)

        entries.append(PaperEntry(
            index=len(entries) + 1,
            title=heading.group("title").strip(),
            note_filename=sanitize_filename(heading.group("note").strip()),
            arxiv_url=arxiv_url,
            pdf_url=pdf_url,
            daily_summary=summary_match.group(1).strip() if summary_match else "--",
            score=score_match.group(1).strip() if score_match else "--",
            matched_domain=domain_match.group(1).strip() if domain_match else "--",
            matched_keywords=keywords_match.group(1).strip() if keywords_match else "--",
        ))

        if len(entries) >= limit:
            break

    return entries


def download_pdf(url: str, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    headers = {"User-Agent": "StartMyDay-PaperAnalyzer/1.0"}
    if url.startswith("http://arxiv.org/"):
        url = url.replace("http://arxiv.org/", "https://arxiv.org/", 1)
    for attempt in range(3):
        try:
            with requests.get(url, headers=headers, timeout=90, stream=True) as response:
                response.raise_for_status()
                with output_path.open("wb") as f:
                    for chunk in response.iter_content(chunk_size=1024 * 128):
                        if chunk:
                            f.write(chunk)
            return
        except Exception:
            if attempt == 2:
                raise
            time.sleep(5 * (attempt + 1))


def extract_text_and_figures(pdf_path: Path, image_dir: Path, max_images: int) -> tuple[str, List[Path]]:
    image_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    text_parts = []
    image_paths: List[Path] = []

    for page_index, page in enumerate(doc):
        if page_index < 8:
            text_parts.append(page.get_text("text"))

        for image_index, img in enumerate(page.get_images(full=True)):
            if len(image_paths) >= max_images:
                break
            xref = img[0]
            pix = fitz.Pixmap(doc, xref)
            try:
                if pix.width < 250 or pix.height < 180:
                    continue
                if pix.n >= 5:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                output = image_dir / f"figure-{len(image_paths) + 1:02d}-p{page_index + 1}.png"
                pix.save(output)
                image_paths.append(output)
            finally:
                pix = None

        if len(image_paths) >= max_images and page_index >= 7:
            break

    return "\n".join(text_parts), image_paths


def extract_abstract(text: str) -> str:
    cleaned = re.sub(r"\s+", " ", text).strip()
    match = re.search(r"(?i)\babstract\b\s*[:.\-]?\s*(.{300,1800}?)(?:\b1\s+Introduction\b|\bIntroduction\b|\bKeywords\b)", cleaned)
    if match:
        return match.group(1).strip()
    return cleaned[:1200].strip()


def bulletize_from_text(text: str, limit: int = 4) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", re.sub(r"\s+", " ", text).strip())
    useful = []
    keywords = [
        "propose", "introduce", "method", "model", "framework", "dataset",
        "performance", "achieve", "diagnosis", "segmentation", "classification",
        "OCT", "foundation", "multimodal", "workflow",
    ]
    for sentence in sentences:
        if 60 <= len(sentence) <= 260 and any(k.lower() in sentence.lower() for k in keywords):
            useful.append(sentence)
        if len(useful) >= limit:
            break
    return useful or sentences[:limit]


def write_analysis_note(
    paper: PaperEntry,
    text: str,
    image_paths: List[Path],
    output_path: Path,
    vault_root: Path,
) -> None:
    abstract = extract_abstract(text)
    bullets = bulletize_from_text(abstract, limit=4)

    rel_images = [p.relative_to(vault_root).as_posix() for p in image_paths]
    image_md = "\n".join([f"![[{p}]]" for p in rel_images]) if rel_images else "--"

    content = f"""---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "{paper.arxiv_url or paper.pdf_url or ''}"
---

# {paper.title}

**中文题名**: --

## 基本信息

- **推荐分**: {paper.score}
- **匹配领域**: {paper.matched_domain}
- **匹配关键词**: {paper.matched_keywords}
- **arXiv**: {paper.arxiv_url or '--'}
- **PDF**: {paper.pdf_url or '--'}

## 摘要速读

{abstract}

## 为什么值得读

{paper.daily_summary}

## 核心要点

""" + "\n".join([f"- {b}" for b in bullets]) + f"""

## 与你的方向的关系

- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。
- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。
- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。
- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。

## 提取图片

{image_md}

## 下一步精读问题

- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？
- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？
- 模型有没有外部验证、跨设备验证和失败案例分析？
- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？
"""

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Analyze top papers from a daily recommendation note")
    parser.add_argument("--vault", required=True, help="Obsidian vault root")
    parser.add_argument("--daily-note", required=True, help="Daily recommendation note path")
    parser.add_argument("--limit", type=int, default=3, help="Number of top papers to analyze")
    parser.add_argument("--max-images", type=int, default=6, help="Maximum images to extract per paper")
    args = parser.parse_args()

    vault_root = Path(args.vault).resolve()
    daily_note = Path(args.daily_note).resolve()
    papers_dir = vault_root / "20_Research" / "Papers" / date_folder_from_daily_note(daily_note)

    papers = parse_daily_note(daily_note, args.limit)
    if not papers:
        print("No paper entries found in daily note")
        return 1

    for paper in papers:
        if not paper.pdf_url:
            print(f"Skipping without PDF: {paper.title}")
            continue

        safe_name = sanitize_filename(paper.note_filename or paper.title)
        paper_dir = papers_dir / paper_folder_name(paper)
        pdf_path = paper_dir / "paper.pdf"
        image_dir = paper_dir / "figures"
        note_path = paper_dir / f"{safe_name}.md"

        print(f"Downloading PDF: {paper.title}")
        download_pdf(paper.pdf_url, pdf_path)
        print(f"Extracting text/images: {pdf_path.name}")
        text, images = extract_text_and_figures(pdf_path, image_dir, args.max_images)
        write_analysis_note(paper, text, images, note_path, vault_root)
        print(f"Wrote note: {note_path}")
        print(f"Extracted images: {len(images)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
