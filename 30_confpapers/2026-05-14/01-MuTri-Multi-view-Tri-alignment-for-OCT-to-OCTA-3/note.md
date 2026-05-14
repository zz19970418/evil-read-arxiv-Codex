---
tags: ["llm-generated", "conference-paper-analysis"]
source: "CVPR 2025"
---

# MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation

**中文题名**: MuTri：用于 OCT 到 OCTA 三维图像转换的多视角三重对齐方法

- **会议/年份**: CVPR 2025
- **作者**: Zhuangzhuang Chen, Hualiang Wang, Chubin Ou, Xiaomeng Li 0001
- **匹配关键词**: OCT, OCTA, optical coherence tomography
- **综合评分**: 54
- **PDF**: https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf
- **CVF/DBLP**: https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html

## 摘要中文翻译

OCTA 能提供血管微循环网络的三维成像，但通常依赖专用传感器和昂贵设备。MuTri 试图把更容易获得的三维 OCT 图像转换为三维 OCTA 图像。论文认为已有方法只用单一 OCTA 投影图作为监督，直接在连续空间学习 OCT 到 OCTA 的映射，容易得到次优结果。作者提出多视角三重对齐框架：先分别用 VQVAE 重建三维 OCT 和三维 OCTA，获得语义先验；再让另一个 VQVAE 在离散有限空间中学习 OCT 到 OCTA 的映射。方法同时使用语义对齐来促进 codebook 学习，并使用血管结构对齐来减少与 OCTA 投影视角之间的结构差异。作者还构建了 OCTA2024 数据集，包含 846 名受试者的 OCT/OCTA 配对体数据。

## 要点提炼

- 核心任务是从三维 OCT 合成三维 OCTA，直接贴近 OCT 设备数据增强和血管成像应用。
- 方法亮点是把转换问题放到 VQVAE 离散潜空间中，并引入 OCT、OCTA、OCTA 投影图三个视角的对齐。
- OCTA2024 配对数据集具有较高价值，后续可重点查看数据采集设备、视网膜/脑血管场景和公开可用性。

## 研究背景与动机

这篇论文非常贴近你的 OCT 和眼科仪器方向。OCTA 对微血管观察很有用，但硬件成本和采集要求更高；如果能从常规 OCT 稳定推断 OCTA 信息，就可能降低血管成像门槛，也能为设备软件链路提供增值算法模块。

## 方法概述和架构

MuTri 分两阶段：第一阶段分别训练 OCT 和 OCTA 的 VQVAE，用重建任务学习两个模态的离散表示；第二阶段训练 OCT 到 OCTA 的映射模型。语义对齐通过对比式目标提高 OCT/OCTA 潜表示互信息，血管结构对齐利用 OCTA 投影图约束细血管结构。整体思路不是简单像素回归，而是用离散 codebook 和多视角先验约束三维转换。

## 实验结果分析

摘要中明确提到提出 OCTA2024 大规模配对数据集，并声称多视角三重对齐能改善 OCT 到 OCTA 的三维转换质量。具体指标、对比方法、消融实验和跨设备泛化需要继续阅读 PDF 正文确认。

## 研究价值评估

对 OCT 设备软件、OCTA 辅助生成、低成本血管成像和三维眼科影像分析都有参考价值。相比普通医学图像分割论文，它更接近成像设备和算法产品化链路。

## 优势和局限性

**优势**:
- 来自 CVPR 2025 主会，研究质量和可见度较高。
- 与当前关注的 OCT、OCTA、眼科 AI 或生物医学视觉语言模型方向存在明确关联。

**局限性**:
- 需要确认合成 OCTA 是否达到临床可解释和可量化血流/血管指标要求。
- 配对 OCT/OCTA 数据是否来自单中心、单设备或特定扫描协议，会影响泛化。
- 如果输出只是结构相似图像，仍需验证能否用于真实诊断或定量分析。

## 与已有本地论文的关系

- 可与 20_Research/Papers 中的 OCT、眼科 AI、视觉语言模型、医学图像分割和异常检测论文进行主题对照。
- 可与 PubMed-Ophtha 这类文献图像数据集工作比较：关注数据来源、图像模态、图注质量、眼科子集规模和下游任务表现。

## 后续阅读问题

- 是否使用真实眼科 OCT / OCTA / 眼底 / 临床数据？
- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？
- 是否提供开源代码、模型或数据集？
- 是否有跨设备、跨中心、跨扫描协议验证？

## 英文原文摘要

> Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.

## 图片索引

尚未下载 PDF 提取图片。后续可把 PDF 保存为 paper.pdf，并将图片放入 images/。
