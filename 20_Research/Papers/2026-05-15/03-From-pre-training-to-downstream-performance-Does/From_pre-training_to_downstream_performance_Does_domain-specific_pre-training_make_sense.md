---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "http://arxiv.org/abs/2605.08819v1"
---

# From pre-training to downstream performance: Does domain-specific pre-training make sense?

**中文题名**: 从预训练到下游表现：领域专用预训练是否真的有意义？

## 基本信息

- **推荐分**: 7.57
- **匹配领域**: optical-coherence-tomography
- **匹配关键词**: OCT, cs.CV, cs.LG
- **arXiv**: http://arxiv.org/abs/2605.08819v1
- **PDF**: https://arxiv.org/pdf/2605.08819v1

## 摘要速读

### 中文翻译

这篇论文系统评估医学影像模型从预训练到下游任务的迁移效果，比较 CNN、Transformer、监督学习、自监督学习以及不同数据模态初始化。其关键结论是，只有当预训练数据和目标任务模态足够接近时，领域专用预训练才会显著提升下游表现；对视网膜 OCT 等任务而言，这直接影响是否值得投入专门的眼科预训练数据。

### English Original

Deep learning techniques have revolutionised medical imag- ing, improving diagnostic accuracy and enabling both more accurate and earlier disease detection. However, the relationship between pre-training strategies and downstream performance in medical imaging models re- quires further exploration. Here, we systematically compare convolu- tional neural networks and transformers, examining various pre-training approaches, including supervised and self-supervised learning, as well as different initialisations and data modalities. Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, con- sidering the effects of matching pre-training data with target modalities. Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance. While self-supervised learning can outperform supervised methods, its effec- tiveness varies with context. The study underscores the importance of pre-training strategies to enhance the reliability and effectiveness of deep learning models in medical imaging. By addressing these key factors, our research aims to contribute to the development of more accurate and dependable diagnostic tools, ultimately improving patient outcomes in clinical settings.

## 为什么值得读

论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。

## 研究背景与动机

医学 AI 常见问题是：到底用自然图像预训练、通用医学预训练，还是为 OCT/眼底等单独收集数据做领域预训练。这个选择直接影响研发成本。

## 方法概述和架构

论文比较卷积网络和 Transformer，覆盖监督、自监督、不同初始化和不同模态预训练，并在自然图像、胸片、胸部 CT、视网膜 OCT 等任务上评估。

## 实验结果分析

摘要结论指出，只有预训练数据和目标模态高度匹配时，下游任务才明显受益；自监督方法有时优于监督方法，但效果依赖具体场景。

## 研究价值评估

对眼科设备 AI 非常实用：如果目标是 OCT 质量控制、病灶检测或分割，构建高质量 OCT 预训练集可能比盲目扩大通用医学数据更有意义。

## 优势和局限性

- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。
- **局限**: 需要看各下游任务数据量、评估指标和统计显著性；如果任务过窄或标注集很小，结论可能受实验设置影响。

## 与相关论文对比

- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。
- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。

## 核心要点

- However, the relationship between pre-training strategies and downstream performance in medical imaging models re- quires further exploration.
- Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, con- sidering the effects of matching pre-training data with target modalities.
- Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance.
- While self-supervised learning can outperform supervised methods, its effec- tiveness varies with context.

## 与你的方向的关系

- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。
- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。
- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。
- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。

## 提取图片

![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png]]
![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png]]
![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png]]
![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png]]
![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png]]
![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png]]

## 下一步精读问题

- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？
- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？
- 模型有没有外部验证、跨设备验证和失败案例分析？
- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？
