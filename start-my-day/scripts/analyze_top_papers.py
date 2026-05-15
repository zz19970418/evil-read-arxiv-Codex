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


TITLE_ZH = {
    "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT":
        "SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习",
    "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis":
        "OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断",
    "From pre-training to downstream performance: Does domain-specific pre-training make sense?":
        "从预训练到下游表现：领域专用预训练是否真的有意义？",
}


ABSTRACT_ZH = {
    "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT":
        "这篇论文关注 OCT 视网膜疾病诊断模型的可解释性问题。作者认为，常见事后解释方法虽然能给出热力图，但往往难以贴合细小病灶结构、视网膜层边界和真实临床解剖关系。论文提出 SAIL 框架，把视网膜解剖先验融入表征学习，并与语义特征融合，使现有解释方法在不大改模型的情况下产生更清晰、更符合解剖结构的归因图。",
    "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis":
        "这篇论文提出 OphMAE 眼科多模态基础模型，用来连接 3D OCT 体数据和 2D en face OCT 平面影像。它的核心目标是解决临床诊断依赖多模态信息、但实际部署中常常缺少三维高端设备的问题。模型通过跨模态融合和自适应推理，在完整多模态和受限单模态场景下都保持较强诊断能力。",
    "From pre-training to downstream performance: Does domain-specific pre-training make sense?":
        "这篇论文系统评估医学影像模型从预训练到下游任务的迁移效果，比较 CNN、Transformer、监督学习、自监督学习以及不同数据模态初始化。其关键结论是，只有当预训练数据和目标任务模态足够接近时，领域专用预训练才会显著提升下游表现；对视网膜 OCT 等任务而言，这直接影响是否值得投入专门的眼科预训练数据。",
}


DETAILED_ZH = {
    "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT": {
        "background": "OCT AI 在分类和检测上已经能达到较高准确率，但临床采用仍受可解释性约束。医生需要知道模型关注的是病灶、层结构还是噪声；监管和产品化也需要解释结果稳定、可复核。",
        "method": "SAIL 的思路是把视网膜解剖结构作为先验引入特征表征，再通过融合设计和语义特征结合。这样，后续 Grad-CAM 一类解释工具使用的特征本身就更有结构感。",
        "results": "摘要显示，多数据集实验中该方法能让归因图更锐利、更符合视网膜解剖边界。消融实验强调结构先验和语义特征都不可少，二者融合方式会显著影响解释质量。",
        "value": "对眼科 AI 产品很有价值，尤其是 OCT 疾病检测、辅助诊断和医生审阅界面。它提供了一种把解释图从“看起来像热力图”推进到“临床上更可相信”的工程路径。",
        "limits": "需要阅读全文确认其解释指标是否与医生标注或真实病灶边界强相关，也要关注跨设备、跨疾病和低质量图像下解释是否稳定。",
    },
    "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis": {
        "background": "眼科诊断常常同时依赖 3D OCT、2D en face 图像和临床上下文，但很多基层或资源受限场景未必拥有完整三维扫描能力。",
        "method": "OphMAE 使用多模态 masked autoencoder 思路预训练，并通过跨模态融合结构学习 3D 体信息和 2D 平面信息之间的互补关系。自适应推理机制让模型能按实际可用输入工作。",
        "results": "摘要报告其在 17 个诊断任务上达到较强表现，AMD 和 DME AUC 分别达到 96.9% 和 97.2%；在只有 2D 输入时仍能保持较高性能，并在少量标注样本下保持数据效率。",
        "value": "这类模型适合眼科 AI 平台化和设备分层部署：高端 OCT 可用完整模型，低资源筛查设备可用受限输入模型。",
        "limits": "需要重点核对训练数据来源、外部验证中心、不同厂商设备覆盖程度，以及是否公开权重或只公开结果。",
    },
    "From pre-training to downstream performance: Does domain-specific pre-training make sense?": {
        "background": "医学 AI 常见问题是：到底用自然图像预训练、通用医学预训练，还是为 OCT/眼底等单独收集数据做领域预训练。这个选择直接影响研发成本。",
        "method": "论文比较卷积网络和 Transformer，覆盖监督、自监督、不同初始化和不同模态预训练，并在自然图像、胸片、胸部 CT、视网膜 OCT 等任务上评估。",
        "results": "摘要结论指出，只有预训练数据和目标模态高度匹配时，下游任务才明显受益；自监督方法有时优于监督方法，但效果依赖具体场景。",
        "value": "对眼科设备 AI 非常实用：如果目标是 OCT 质量控制、病灶检测或分割，构建高质量 OCT 预训练集可能比盲目扩大通用医学数据更有意义。",
        "limits": "需要看各下游任务数据量、评估指标和统计显著性；如果任务过窄或标注集很小，结论可能受实验设置影响。",
    },
}


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

    figure_page_candidates: List[int] = []

    for page_index, page in enumerate(doc):
        if page_index < 8:
            page_text = page.get_text("text")
            text_parts.append(page_text)
            if re.search(r"(?i)\b(fig\.|figure)\s*\d+", page_text):
                figure_page_candidates.append(page_index)

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

    if len(image_paths) < max_images:
        for page_index in figure_page_candidates:
            if len(image_paths) >= max_images:
                break
            page = doc[page_index]
            output = image_dir / f"figure-page-{len(image_paths) + 1:02d}-p{page_index + 1}.png"
            if output.exists():
                continue
            pix = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), alpha=False)
            pix.save(output)
            image_paths.append(output)

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
    title_zh = TITLE_ZH.get(paper.title, "--")
    abstract_zh = ABSTRACT_ZH.get(paper.title, "自动提取到的摘要如下方英文原文所示；中文精读翻译需要结合全文继续人工校订。")
    detailed = DETAILED_ZH.get(paper.title, {})

    rel_images = [p.relative_to(vault_root).as_posix() for p in image_paths]
    image_md = "\n".join([f"![[{p}]]" for p in rel_images]) if rel_images else "--"

    content = f"""---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "{paper.arxiv_url or paper.pdf_url or ''}"
---

# {paper.title}

**中文题名**: {title_zh}

## 基本信息

- **推荐分**: {paper.score}
- **匹配领域**: {paper.matched_domain}
- **匹配关键词**: {paper.matched_keywords}
- **arXiv**: {paper.arxiv_url or '--'}
- **PDF**: {paper.pdf_url or '--'}

## 摘要速读

### 中文翻译

{abstract_zh}

### English Original

{abstract}

## 为什么值得读

{paper.daily_summary}

## 研究背景与动机

{detailed.get("background", "这篇论文与 OCT、眼科影像或医学 AI 相关，主要动机需要结合全文的引言部分继续补充。")}

## 方法概述和架构

{detailed.get("method", "方法细节需要阅读全文后继续拆解；当前笔记已保留 PDF 和原文摘要，便于后续精读。")}

## 实验结果分析

{detailed.get("results", "实验结果需要结合论文表格、图和消融实验继续核对。")}

## 研究价值评估

{detailed.get("value", "对你的方向的价值主要体现在 OCT/眼科 AI 方法跟踪和设备端可转化性判断。")}

## 优势和局限性

- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。
- **局限**: {detailed.get("limits", "当前为自动生成笔记，仍需要人工阅读全文确认数据集、指标、统计检验和失败案例。")}

## 与相关论文对比

- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。
- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。

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
