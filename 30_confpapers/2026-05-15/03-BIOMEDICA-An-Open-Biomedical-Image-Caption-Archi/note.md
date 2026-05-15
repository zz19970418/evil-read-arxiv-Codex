---
tags: ["llm-generated", "conference-paper-analysis"]
source: "CVPR 2025"
---

# BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature

**中文题名**: 视觉语言 / 医学图像相关顶会论文：BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature

## 摘要中文翻译

请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：

> The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community

## 要点提炼

待阅读 PDF 后补充中文要点。请至少提炼研究问题、方法创新、实验数据、关键结果和产品启发。

## 研究背景与动机

该论文来自指定顶会主会，且命中本次 OCT / 眼科 AI 主题筛选词。具体临床或仪器背景需结合全文进一步确认。

## 方法概述和架构

当前自动检索阶段仅获得题名、作者、会议和可用摘要/PDF 链接。若需要完整方法拆解，应继续读取 PDF 正文。

## 实验结果分析

待从 PDF 正文提取实验设置、数据集、指标和对比结果。

## 研究价值评估

推荐评分：40。相关性 20/40，热门度 0/40，质量 20/20。

## 优势和局限性

- 优势：来自顶级会议，且与当前主题关键词匹配。
- 局限：Semantic Scholar 受限时，引用数和摘要可能不完整。

## 与已有本地论文的关系

可与 `20_Research/Papers` 中的 OCT、眼科 AI、VLM、分割和异常检测论文进行主题对照。

## 后续阅读问题

- 是否使用真实眼科 OCT / 眼底 / 临床数据？
- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？
- 是否提供开源代码、模型或数据集？

## 图片索引

尚未下载 PDF 提取图片。可在网络稳定后补充 `paper.pdf` 和 `images/`。

## 链接

- PDF: https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf
- Semantic Scholar: --
- DBLP/CVF: https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html

## 英文原文摘要

> The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community