---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "http://arxiv.org/abs/2605.02714v1"
---

# OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis

**中文题名**: OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断

## 基本信息

- **推荐分**: 7.73
- **匹配领域**: optical-coherence-tomography
- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI
- **arXiv**: http://arxiv.org/abs/2605.02714v1
- **PDF**: https://arxiv.org/pdf/2605.02714v1

## 摘要速读

### 中文翻译

这篇论文提出 OphMAE 眼科多模态基础模型，用来连接 3D OCT 体数据和 2D en face OCT 平面影像。它的核心目标是解决临床诊断依赖多模态信息、但实际部署中常常缺少三维高端设备的问题。模型通过跨模态融合和自适应推理，在完整多模态和受限单模态场景下都保持较强诊断能力。

### English Original

OphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1‡, Zhen Chen2,3‡, Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J. Saykin6,8, Ruogu Fang4*, Yu Huang1*, Jiang Bian1*, Qingyu Chen2* 1Department of Biostatistics and Health Data Science, Indiana University, Indianapolis, IN 2Department of Biomedical Informatics and Data Science, Yale University, New Haven, CT 3Department of Data Science and Artificial Intelligence, The Hong Kong Polytechnic University, Hong Kong 4Department of Biomedical Engineering, University of Florida, Gainesville, FL 5Department of Health Outcomes and Biomedical Informatics, University of Florida, Gainesville, FL 6Radiology & Imaging Sciences, Indiana University, Indianapolis, IN 7Ophthalmology, Indiana University, Indianapolis, IN 8Center for Neuroimaging and Indiana Alzheimer’s Disease Research Center, Indiana University, Indianapolis, IN ‡Contributed Equally *Corresponding authors 1 Abstract The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from

## 为什么值得读

论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。

## 研究背景与动机

眼科诊断常常同时依赖 3D OCT、2D en face 图像和临床上下文，但很多基层或资源受限场景未必拥有完整三维扫描能力。

## 方法概述和架构

OphMAE 使用多模态 masked autoencoder 思路预训练，并通过跨模态融合结构学习 3D 体信息和 2D 平面信息之间的互补关系。自适应推理机制让模型能按实际可用输入工作。

## 实验结果分析

摘要报告其在 17 个诊断任务上达到较强表现，AMD 和 DME AUC 分别达到 96.9% 和 97.2%；在只有 2D 输入时仍能保持较高性能，并在少量标注样本下保持数据效率。

## 研究价值评估

这类模型适合眼科 AI 平台化和设备分层部署：高端 OCT 可用完整模型，低资源筛查设备可用受限输入模型。

## 优势和局限性

- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。
- **局限**: 需要重点核对训练数据来源、外部验证中心、不同厂商设备覆盖程度，以及是否公开权重或只公开结果。

## 与相关论文对比

- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。
- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。

## 核心要点

- OphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1‡, Zhen Chen2,3‡, Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J.

## 与你的方向的关系

- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。
- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。
- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。
- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。

## 提取图片

![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png]]
![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png]]
![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png]]
![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png]]
![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png]]
![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png]]

## 下一步精读问题

- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？
- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？
- 模型有没有外部验证、跨设备验证和失败案例分析？
- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？
