---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "http://arxiv.org/abs/2605.02707v1"
---

# SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT

**中文题名**: SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习

## 基本信息

- **推荐分**: 7.77
- **匹配领域**: optical-coherence-tomography
- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI
- **arXiv**: http://arxiv.org/abs/2605.02707v1
- **PDF**: https://arxiv.org/pdf/2605.02707v1

## 摘要速读

### 中文翻译

这篇论文关注 OCT 视网膜疾病诊断模型的可解释性问题。作者认为，常见事后解释方法虽然能给出热力图，但往往难以贴合细小病灶结构、视网膜层边界和真实临床解剖关系。论文提出 SAIL 框架，把视网膜解剖先验融入表征学习，并与语义特征融合，使现有解释方法在不大改模型的情况下产生更清晰、更符合解剖结构的归因图。

### English Original

SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT Tienyu Chang∗ Dept. of BioHealth Informatics, Indiana University Indianapolis, Indiana, USA tienchan@iu.edu Tianhao Li∗ School of Information, University of Texas at Austin Austin, Texas, USA tianhao@utexas.edu Ruogu Fang Dept. of Biomedical Engineering, University of Florida Gainesville, Florida, USA ruogu.fang@bme.ufl.edu Jiang Bian Dept. of Biostatistics and Health Data Science, Indiana University School of Medicine Regenstreif Institute Indianapolis, Indiana, USA bianji@iu.edu Yu Huang Dept. of Biostatistics and Health Data Science, Indiana University School of Medicine Regenstreif Institute Indianapolis, Indiana, USA yh60@iu.edu Abstract Optical coherence tomography (OCT), a commonly used retinal imaging modality, plays a central role in retinal disease diagnosis by providing high-resolution visualization of retinal layers. While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its "black box" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval. Existing post-hoc explai

## 为什么值得读

论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。

## 研究背景与动机

OCT AI 在分类和检测上已经能达到较高准确率，但临床采用仍受可解释性约束。医生需要知道模型关注的是病灶、层结构还是噪声；监管和产品化也需要解释结果稳定、可复核。

## 方法概述和架构

SAIL 的思路是把视网膜解剖结构作为先验引入特征表征，再通过融合设计和语义特征结合。这样，后续 Grad-CAM 一类解释工具使用的特征本身就更有结构感。

## 实验结果分析

摘要显示，多数据集实验中该方法能让归因图更锐利、更符合视网膜解剖边界。消融实验强调结构先验和语义特征都不可少，二者融合方式会显著影响解释质量。

## 研究价值评估

对眼科 AI 产品很有价值，尤其是 OCT 疾病检测、辅助诊断和医生审阅界面。它提供了一种把解释图从“看起来像热力图”推进到“临床上更可相信”的工程路径。

## 优势和局限性

- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。
- **局限**: 需要阅读全文确认其解释指标是否与医生标注或真实病灶边界强相关，也要关注跨设备、跨疾病和低质量图像下解释是否稳定。

## 与相关论文对比

- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。
- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。

## 核心要点

- SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT Tienyu Chang∗ Dept.
- While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its "black box" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval.

## 与你的方向的关系

- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。
- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。
- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。
- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。

## 提取图片

![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png]]
![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png]]
![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png]]
![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png]]
![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png]]
![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png]]

## 下一步精读问题

- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？
- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？
- 模型有没有外部验证、跨设备验证和失败案例分析？
- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？
