---
tags: ["llm-generated", "conference-paper-analysis"]
source: "CVPR 2025"
---

# MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation

**中文题名**: OCT相关顶会论文：MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation

## 摘要中文翻译

请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：

> Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.

## 要点提炼

待阅读 PDF 后补充中文要点。请至少提炼研究问题、方法创新、实验数据、关键结果和产品启发。

## 研究背景与动机

该论文来自指定顶会主会，且命中本次 OCT / 眼科 AI 主题筛选词。具体临床或仪器背景需结合全文进一步确认。

## 方法概述和架构

当前自动检索阶段仅获得题名、作者、会议和可用摘要/PDF 链接。若需要完整方法拆解，应继续读取 PDF 正文。

## 实验结果分析

待从 PDF 正文提取实验设置、数据集、指标和对比结果。

## 研究价值评估

推荐评分：54。相关性 34/40，热门度 0/40，质量 20/20。

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

- PDF: https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf
- Semantic Scholar: --
- DBLP/CVF: https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html

## 英文原文摘要

> Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.