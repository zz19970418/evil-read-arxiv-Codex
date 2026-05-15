#!/usr/bin/env python3
"""
Generate a bilingual daily paper recommendation note from arxiv_filtered.json.

The script keeps the markdown shape expected by analyze_top_papers.py:
paper sections are separated by "---", use "### [[note|title]]" headings, and
include a "PDF: <url>" token in the link line.
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


TITLE_ZH = {
    "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT":
        "SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习",
    "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis":
        "OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断",
    "From pre-training to downstream performance: Does domain-specific pre-training make sense?":
        "从预训练到下游表现：领域专用预训练是否真的有意义？",
    "Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography":
        "解剖感知的 OCT 视网膜异常无监督检测与定位",
    "Imaging-formulation-based numerical speckle reduction for optical coherence tomography":
        "基于成像公式的 OCT 数值散斑抑制方法",
    "Physics-Based iOCT Sonification for Real-time Interaction Awareness in Subretinal Injection":
        "用于视网膜下注射实时交互感知的物理建模 iOCT 声音反馈",
    "EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization":
        "EDU-Net：融合多尺度特征与边界优化的 OCT 视网膜病理液体分割",
    "PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature":
        "PubMed-Ophtha：用于训练眼科文献视觉语言模型的开放资源",
    "Enhanced Phase Sensitive SD-OCT for flow imaging using ultrasonically sculpted optical waveguides":
        "利用超声塑形光波导增强相位敏感 SD-OCT 流速成像",
    "Revisiting constraints on primordial vector modes and implications for sourced magnetic fields and observed $EB$ power spectrum":
        "重新审视原初矢量模式约束及其对磁场与观测 EB 功率谱的影响",
}


SUMMARY_ZH = {
    "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT":
        "论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。",
    "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis":
        "论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。",
    "From pre-training to downstream performance: Does domain-specific pre-training make sense?":
        "论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。",
    "Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography":
        "论文面向 OCT 视网膜异常提出无监督检测框架，用健康视网膜分布和层结构约束来定位异常，减少对病灶标注的依赖。",
    "Imaging-formulation-based numerical speckle reduction for optical coherence tomography":
        "论文从 OCT 成像公式出发设计单次体积采集可用的数值散斑抑制方法，在降低散斑的同时尽量保持横向分辨率和细节。",
    "Physics-Based iOCT Sonification for Real-time Interaction Awareness in Subretinal Injection":
        "论文把术中 OCT 的解剖层和器械运动映射为实时声音反馈，帮助视网膜下注射时感知针尖深度和组织变形。",
    "EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization":
        "论文提出 EDU-Net 双分支编码解码网络，用多尺度特征融合和边界注意力提升 OCT 视网膜液体病灶自动分割表现。",
    "PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature":
        "论文发布从 PMC 开放文献中抽取的眼科图文数据集，包含图像、子图、面板说明和成像模态标注，适合训练眼科视觉语言模型。",
    "Enhanced Phase Sensitive SD-OCT for flow imaging using ultrasonically sculpted optical waveguides":
        "论文用超声塑形光波导改善 SD-OCT 深度方向信噪比滚降，使更深位置的相位敏感流速检测成为可能。",
    "Revisiting constraints on primordial vector modes and implications for sourced magnetic fields and observed $EB$ power spectrum":
        "这篇是宇宙学论文，因标题中的 OCT 字符串误匹配进入列表，和眼科 OCT/验光/生物测量方向基本无关，建议跳过。",
}


CONTRIBUTIONS_ZH = {
    "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT": [
        "把视网膜层结构先验前置到表征学习中，而不是只在解释后处理阶段补救。",
        "目标是让 Grad-CAM 等常见事后解释方法产生更贴近病灶和解剖边界的热力图。",
        "对眼科 AI 的可解释性、临床可信度和注册审批叙事有直接参考价值。",
    ],
    "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis": [
        "同时利用 3D OCT 的深度信息和 2D en face OCT 的平面上下文。",
        "设计自适应推理机制，在单模态输入受限时仍保持较高诊断性能。",
        "适合关注眼科基础模型、跨设备部署和资源受限筛查场景。",
    ],
    "From pre-training to downstream performance: Does domain-specific pre-training make sense?": [
        "比较 CNN、Transformer、监督预训练和自监督预训练在多种医学影像任务中的差异。",
        "把视网膜 OCT 纳入评估，有助于判断是否值得为眼科设备单独构建预训练数据。",
        "结论对模型选型、数据采购和产品研发投入优先级很实用。",
    ],
}


def sanitize_note_filename(title: str) -> str:
    token = re.sub(r"[^\w\u4e00-\u9fff-]+", "_", title, flags=re.UNICODE)
    token = re.sub(r"_+", "_", token).strip("_")
    return token[:160] or "paper"


def one_line_english(summary: str) -> str:
    summary = re.sub(r"\s+", " ", summary).strip()
    sentences = re.split(r"(?<=[.!?])\s+", summary)
    return (sentences[0] if sentences else summary)[:500]


def authors_text(paper: Dict[str, Any]) -> str:
    authors = paper.get("authors") or []
    if not authors:
        return "--"
    if len(authors) <= 5:
        return ", ".join(authors)
    return ", ".join(authors[:5]) + f", 等 {len(authors)} 人"


def link_text(paper: Dict[str, Any]) -> str:
    links: List[str] = []
    url = paper.get("url")
    pdf = paper.get("pdf_url") or (paper.get("openAccessPdf") or {}).get("url")
    doi = paper.get("doi")
    if url:
        label = "arXiv" if "arxiv.org" in url else paper.get("source", "Source")
        links.append(f"[{label}]({url})")
    if doi:
        links.append(f"[DOI](https://doi.org/{doi})")
    links.append(f"PDF: {pdf or '--'}")
    return " | ".join(links)


def render_paper(paper: Dict[str, Any], idx: int) -> str:
    title = paper.get("title", "Untitled")
    note = paper.get("note_filename") or sanitize_note_filename(title)
    title_zh = TITLE_ZH.get(title, "--")
    summary = paper.get("summary", "")
    summary_zh = SUMMARY_ZH.get(title, "这篇论文与当前关键词相关，建议阅读全文后补充更精确的中文摘要。")
    scores = paper.get("scores") or {}
    contribs = CONTRIBUTIONS_ZH.get(title) or [
        "围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。",
        "建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。",
        "如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。",
    ]
    contrib_md = "\n".join(f"- {item}" for item in contribs)
    warning = ""
    if idx == 10 and "primordial vector" in title.lower():
        warning = "\n> 备注：该条大概率是关键词误匹配，因 `OCT` 出现在非眼科语境中，保留用于提醒后续过滤规则继续收紧。\n"

    return f"""### [[{note}|{title}]]
**中文题名**: {title_zh}

- **作者**: {authors_text(paper)}
- **单位**: {", ".join(paper.get("affiliations") or []) or "--"}
- **发布日期**: {(paper.get("published") or paper.get("published_date") or "--")[:10]}
- **链接**: {link_text(paper)}
- **来源**: {paper.get("source", "--")}
- **推荐分**: {scores.get("recommendation", "--")}
- **匹配领域**: {paper.get("matched_domain", "--")}
- **匹配关键词**: {", ".join(paper.get("matched_keywords") or []) or "--"}
- **笔记**: --
{warning}
**一句话总结**: {summary_zh}

**English One-line Summary**: {one_line_english(summary)}

**中文摘要翻译**: {summary_zh}

**核心贡献**:
{contrib_md}

**原始摘要**: {summary}
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate daily bilingual paper note")
    parser.add_argument("--input", required=True, help="arxiv_filtered.json path")
    parser.add_argument("--output", required=True, help="daily markdown output path")
    parser.add_argument("--top-n", type=int, default=10)
    args = parser.parse_args()

    data = json.loads(Path(args.input).read_text(encoding="utf-8"))
    papers = (data.get("top_papers") or [])[: args.top_n]
    if not papers:
        raise SystemExit("No top_papers found")

    target_date = data.get("target_date", "unknown-date")
    total_recent = data.get("total_recent", 0)
    total_hot = data.get("total_hot", 0)
    total_fallback = data.get("total_fallback", 0)
    fallback_sources = ", ".join(data.get("fallback_sources") or [])
    rate_note = "Semantic Scholar 仍触发 429，因此热门论文通道本次为 0；arXiv 最近 30 天检索已成功。" if data.get("rate_limited") else "本次未记录到限流。"

    body = f"""---
keywords: [ocular biometry, OCT, OCTA, ophthalmic device, optometry, AI ophthalmology]
tags: ["llm-generated", "daily-paper-recommend"]
---

## 今日概览

今天自动检索得到 {len(papers)} 篇推荐论文。arXiv 最近 30 天命中 {total_recent} 篇，Semantic Scholar 过去一年高热度通道命中 {total_hot} 篇，备用源命中 {total_fallback} 篇。{rate_note}

- **整体趋势**: 今日结果明显集中在 OCT 可解释 AI、多模态眼科基础模型、OCT 预训练策略、无监督异常检测、散斑抑制和术中 OCT 交互反馈。
- **与你方向的关系**: 第 1、2、4、7、8 篇更贴近眼科 AI/OCT 软件算法；第 5、9 篇更贴近 OCT 成像和仪器物理；第 3 篇适合判断眼科模型预训练是否值得投入。
- **限流状态**: Semantic Scholar 429 已被降级处理，未阻塞 arXiv 主流程；如 arXiv 失败，系统会再尝试 {fallback_sources or "备用源"}。
- **阅读建议**: 优先精读前三篇，因为它们分别覆盖 OCT 可解释性、多模态基础模型和医学影像预训练策略；第 10 篇属于明显误匹配，可跳过或用于优化排除词。

## Today's Overview

The pipeline found {len(papers)} recommended papers for {target_date}. arXiv recent search worked, while Semantic Scholar is still rate-limited, so today's list is mainly based on fresh arXiv papers.

"""

    body += "\n---\n\n".join(render_paper(p, i + 1) for i, p in enumerate(papers))
    body += "\n"

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(body, encoding="utf-8")
    print(f"Wrote daily note: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
