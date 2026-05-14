---
tags: ["llm-generated", "conference-paper-analysis"]
source: "CVPR 2025"
---

# Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images

**中文题名**: 基于 OCTA 图像的血流速度估计

- **会议/年份**: CVPR 2025
- **作者**: Wensheng Cheng, Zhenghong Li, Jiaxiang Ren 0002, Hyomin Jeong, Congwu Du, Yingtian Pan, Haibin Ling
- **匹配关键词**: optical coherence tomography, OCTA
- **综合评分**: 40
- **PDF**: https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf
- **CVF/DBLP**: https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html

## 摘要中文翻译

血流速度估计在医学和生理应用中很重要，但血管结构复杂、流体动力学复杂，尤其在脑皮层区域更具挑战。传统 Optical Doppler Tomography（ODT）通常需要复杂硬件控制和信号处理，还会受到系统伪影影响。论文提出 OCTA-Flow，一种从常规 OCTA 图像直接估计血管血流速度的学习方法。它用编码器-解码器结构，并利用 ODT 数据作为伪标签训练，从而绕开真实血流速度标注难以获得的问题。方法还设计 Adaptive Window Fusion 模块，用多尺度窗口注意力建模不同尺度血管和血流速度之间的关系；同时引入 Conditional Random Field Decoder，增强估计结果的平滑性和一致性，减少 ODT 伪影影响。

## 要点提炼

- 把 OCTA 从结构成像扩展到血流速度估计，和 OCT/OCTA 定量功能升级高度相关。
- 用 ODT 伪标签训练 OCTA-Flow，避免直接采集真实血流速度标签的困难。
- 多尺度窗口注意力和 CRF 解码器分别处理血管尺度变化和速度场平滑一致性。

## 研究背景与动机

OCTA 通常更擅长显示血管结构，而血流速度这样的功能性指标更难获取。若能从常规 OCTA 数据估计血流速度，就可能让现有 OCTA 设备获得更强的定量分析能力。

## 方法概述和架构

OCTA-Flow 使用编码器-解码器网络，以 ODT 数据产生的结果作为伪标签。Adaptive Window Fusion 模块用多尺度窗口注意力捕捉不同直径血管与流速之间的关系；Conditional Random Field Decoder 对输出速度场施加平滑和一致性约束，以降低 ODT 伪影向模型学习过程传播。

## 实验结果分析

摘要称该方法能更准确地产生血流速度估计、抑制 ODT 伪影，并提高基于 OCTA 数据采集的实用性。具体评价指标、实验数据来源、脑皮层与眼科 OCTA 的差异，需要阅读全文确认。

## 研究价值评估

这篇论文对眼科 OCTA 产品很有启发：它提供了从血管结构图像走向血流功能定量的路线。若能迁移到视网膜 OCTA，可能支持微循环评估、糖网/青光眼/黄斑疾病等方向的定量分析。

## 优势和局限性

**优势**:
- 来自 CVPR 2025 主会，研究质量和可见度较高。
- 与当前关注的 OCT、OCTA、眼科 AI 或生物医学视觉语言模型方向存在明确关联。

**局限性**:
- 摘要场景强调脑皮层区域，不一定直接等价于视网膜 OCTA。
- ODT 伪标签本身有伪影，模型可能继承伪标签偏差。
- 需要验证跨设备、跨扫描协议和低信噪比数据下的稳定性。

## 与已有本地论文的关系

- 可与 20_Research/Papers 中的 OCT、眼科 AI、视觉语言模型、医学图像分割和异常检测论文进行主题对照。
- 可与 PubMed-Ophtha 这类文献图像数据集工作比较：关注数据来源、图像模态、图注质量、眼科子集规模和下游任务表现。

## 后续阅读问题

- 是否使用真实眼科 OCT / OCTA / 眼底 / 临床数据？
- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？
- 是否提供开源代码、模型或数据集？
- 是否有跨设备、跨中心、跨扫描协议验证？

## 英文原文摘要

> Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.

## 图片索引

尚未下载 PDF 提取图片。后续可把 PDF 保存为 paper.pdf，并将图片放入 images/。
