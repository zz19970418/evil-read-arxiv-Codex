---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "http://arxiv.org/abs/2605.13443v1"
---

# Imaging-formulation-based numerical speckle reduction for optical coherence tomography

**中文题名**: 基于成像公式的 OCT 数值散斑抑制方法

## 基本信息

- **推荐分**: 9.34
- **匹配领域**: optical-coherence-tomography
- **匹配关键词**: optical coherence tomography, OCT, swept-source OCT, physics.optics
- **arXiv**: http://arxiv.org/abs/2605.13443v1
- **PDF**: https://arxiv.org/pdf/2605.13443v1

## 摘要速读

这篇论文针对 OCT 图像中固有的散斑噪声问题，提出一种基于 OCT 成像公式的数值散斑抑制方法。它的重点不是增加硬件采集次数，而是利用单次体积采集中的复 en face OCT 信号，通过 shifted-complex-conjugate-product 和平均策略调制散斑，从而在保持横向分辨率的同时提升图像可读性。

## 为什么值得读

这篇论文针对 OCT 图像中固有的散斑噪声问题，提出一种基于 OCT 成像公式的数值散斑抑制方法。它的重点不是增加硬件采集次数，而是利用单次体积采集中的复 en face OCT 信号，通过 shifted-complex-conjugate-product 和平均策略调制散斑，从而在保持横向分辨率的同时提升图像可读性。

## 核心要点

- 从 OCT 成像机理出发建模散斑，而不是单纯使用通用图像去噪网络。
- 方法只依赖单次体积采集，理论上更容易嵌入现有 OCT 设备的软件处理链。
- 在点扩散函数体模、肿瘤球体和斑马鱼眼样本上验证了对比噪声比与等效 looks 数的提升。
- 论文特别强调保留图像锐度和分辨率，这对后续层分割、病灶检测和定量测量很重要。

## 与你的方向的关系

- 对 OCT 设备图像质量提升非常直接，可作为散斑抑制算法模块参考。
- 适合关注 swept-source OCT、full-field OCT 或单次扫描质量增强的仪器研发场景。
- 后续可重点检查算法是否支持实时处理、不同组织样本和临床视网膜 OCT 数据。

## 提取图片

![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png]]
![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png]]
![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png]]
![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png]]
![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png]]
![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png]]

## 下一步精读问题

- 数据来自哪些 OCT 设备、扫描协议和中心？是否覆盖真实临床设备差异？
- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？
- 模型或算法有没有外部验证、跨设备验证和失败案例分析？
- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？
