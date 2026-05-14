---
tags: ["llm-generated", "conference-paper-analysis"]
source: "CVPR 2025"
---

# BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature

**中文题名**: BIOMEDICA：从科学文献构建的开放生物医学图像-图注档案、数据集和视觉语言模型

- **会议/年份**: CVPR 2025
- **作者**: Alejandro Lozano, Min Woo Sun, James Burgess, Liangyu Chen 0005, Jeffrey J. Nirschl, Jeffrey Gu, Ivan Lopez 0001, Josiah Aklilu 等
- **匹配关键词**: vision-language model, ophthalmology
- **综合评分**: 40
- **PDF**: https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf
- **CVF/DBLP**: https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html

## 摘要中文翻译

视觉语言模型的发展依赖大规模、多样化的多模态数据，但生物医学通用 VLM 受限于公开标注数据不足。现有数据集往往局限在狭窄领域，未充分利用科学文献中丰富的生物医学知识。BIOMEDICA 提出一个可扩展开源框架，从 PubMed Central Open Access 子集中抽取、标注并序列化图像-文本数据，形成超过 2400 万对独特图像-文本对，来源覆盖 600 多万篇文章，并提供元数据和专家引导标注。作者还发布 BMC-CLIP 系列模型，在 BIOMEDICA 上以流式方式持续预训练，避免本地下载 27TB 数据。模型在 40 个任务上达到平均领先表现，覆盖病理、放射、眼科、皮肤科、外科、分子生物学等领域，其中零样本分类平均提升 6.56%，眼科任务最高提升 17.5%。

## 要点提炼

- 核心贡献是超大规模生物医学图像-图注数据集和开放抽取框架。
- 与 PubMed-Ophtha 思路相近，但覆盖更广的生物医学领域，并报告眼科任务收益。
- BMC-CLIP 通过流式预训练降低数据下载门槛，对眼科 VLM、图文检索和报告生成有参考价值。

## 研究背景与动机

眼科 AI 正在从单一图像分类/分割走向图文理解、报告生成和多模态问答。BIOMEDICA 的价值在于提供通用生物医学视觉语言预训练资源，眼科只是其中一个重要子领域。

## 方法概述和架构

论文构建了从 PMC 开放文献中提取图像和图注的流水线，并对数据进行标注、序列化和元数据组织。随后在该数据集上训练 BMC-CLIP 系列视觉语言模型，采用流式训练来规避超大数据集本地下载成本。

## 实验结果分析

摘要报告数据规模超过 2400 万图像-文本对、覆盖 600 多万文章。BMC-CLIP 在 40 个任务上平均达到 SOTA，零样本分类平均提升 6.56%，皮肤科最高 29.8%，眼科最高 17.5%，并在图文检索上更强，同时使用约 10 倍更少计算量。

## 研究价值评估

对你的眼科 AI 方向，它可作为眼科 VLM 和医学图文检索的上游资源。它不直接解决 OCT 或验光仪测量问题，但能增强模型对医学图像、图注和领域术语之间关系的理解。

## 优势和局限性

**优势**:
- 来自 CVPR 2025 主会，研究质量和可见度较高。
- 与当前关注的 OCT、OCTA、眼科 AI 或生物医学视觉语言模型方向存在明确关联。

**局限性**:
- 数据来自科学文献，和真实设备工作站图像、临床报告、中文报告之间仍有域差异。
- 图注文本不等同于结构化诊断标签，训练出的模型仍需在具体眼科任务上验证。
- 需要关注眼科子集是否充分覆盖 OCT、OCTA、眼底照相和前节图像。

## 与已有本地论文的关系

- 可与 20_Research/Papers 中的 OCT、眼科 AI、视觉语言模型、医学图像分割和异常检测论文进行主题对照。
- 可与 PubMed-Ophtha 这类文献图像数据集工作比较：关注数据来源、图像模态、图注质量、眼科子集规模和下游任务表现。

## 后续阅读问题

- 是否使用真实眼科 OCT / OCTA / 眼底 / 临床数据？
- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？
- 是否提供开源代码、模型或数据集？
- 是否有跨设备、跨中心、跨扫描协议验证？

## 英文原文摘要

> The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community

## 图片索引

尚未下载 PDF 提取图片。后续可把 PDF 保存为 paper.pdf，并将图片放入 images/。
