---
tags: ["llm-generated", "conference-paper-analysis"]
source: "CVPR 2025"
---

# Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images

**中文题名**: OCT相关顶会论文：Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images

## 摘要中文翻译

请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：

> Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.

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

- PDF: https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf
- Semantic Scholar: --
- DBLP/CVF: https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html

## 英文原文摘要

> Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.