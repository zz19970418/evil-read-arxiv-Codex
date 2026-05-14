---
tags: ["llm-generated", "conference-paper-recommendation"]
source: "DBLP + Semantic Scholar/CVF fallback"
date: "2026-05-14"
---

# 2026-05-14 CVPR 2025 OCT / AI 顶会论文推荐

## 今日概览

本次检索范围为 **CVPR 2025**，主题聚焦 **OCT + AI**。共从 DBLP 获取 2871 篇候选，标题轻筛后保留 175 篇，最终推荐前 10 篇。

Semantic Scholar 当前返回 429，因此本次引用数和热门度没有补全；排序主要基于 DBLP/CVF 主会论文、标题/摘要相关性和会议质量。CVF 页面可用的论文已补充 PDF 链接。

**阅读优先级建议**: 先读 MuTri 和 Blood Flow Speed Estimation，它们最贴近 OCT/OCTA 设备与成像算法；再读 BIOMEDICA 作为眼科视觉语言模型数据基础设施参考；其余论文适合作为异常检测、分割、域适应和基础模型方法储备。

## 推荐论文

### 1. MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation
**中文题名**: MuTri：用于 OCT 到 OCTA 三维图像转换的多视角三重对齐方法
- **会议/年份**: CVPR 2025
- **作者**: Zhuangzhuang Chen, Hualiang Wang, Chubin Ou, Xiaomeng Li 0001
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.01945)
- **综合评分**: 54
- **评分构成**: 相关性 34/40，热门度 0/40，质量 20/20
- **匹配关键词**: OCT, OCTA, optical coherence tomography
- **与我的方向关系**: 高度相关：OCT 设备、OCTA、三维血管成像、成像算法增强。

**中文一句话总结**: 从常规三维 OCT 合成三维 OCTA，利用 VQVAE 离散潜空间和多视角三重对齐提升血管结构转换质量。

**为什么值得看**:
- 直接命中 OCT/OCTA，是本次最贴近眼科成像设备的论文。
- OCTA2024 配对数据集和 OCT 到 OCTA 转换任务，对低成本血管成像和设备软件增值有参考价值。
- 后续应重点查看跨设备泛化、血管定量准确性和临床可解释性。

### 2. Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images
**中文题名**: 基于 OCTA 图像的血流速度估计
- **会议/年份**: CVPR 2025
- **作者**: Wensheng Cheng, Zhenghong Li, Jiaxiang Ren 0002, Hyomin Jeong, Congwu Du, Yingtian Pan, Haibin Ling
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.00979)
- **综合评分**: 40
- **评分构成**: 相关性 20/40，热门度 0/40，质量 20/20
- **匹配关键词**: optical coherence tomography, OCTA
- **与我的方向关系**: 高度相关：OCTA 功能定量、血流速度估计、光学成像算法。

**中文一句话总结**: 提出 OCTA-Flow，从 OCTA 图像估计血流速度，用 ODT 伪标签、多尺度窗口注意力和 CRF 解码器增强速度场估计。

**为什么值得看**:
- 把 OCTA 从结构显示推进到血流功能定量，适合关注设备定量指标的人阅读。
- 方法尝试绕开真实血流速度标注困难，具有产品化算法思路。
- 需要确认脑皮层场景能否迁移到视网膜 OCTA。

### 3. BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature
**中文题名**: BIOMEDICA：从科学文献构建的开放生物医学图像-图注数据集和视觉语言模型
- **会议/年份**: CVPR 2025
- **作者**: Alejandro Lozano, Min Woo Sun, James Burgess, Liangyu Chen 0005, Jeffrey J. Nirschl, Jeffrey Gu, Ivan Lopez 0001, Josiah Aklilu 等
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.01837)
- **综合评分**: 40
- **评分构成**: 相关性 20/40，热门度 0/40，质量 20/20
- **匹配关键词**: vision-language model, ophthalmology
- **与我的方向关系**: 中高相关：眼科 VLM、生物医学图文数据集、文献图像挖掘。

**中文一句话总结**: 从 PMC 开放文献构建超过 2400 万图像-文本对，并训练 BMC-CLIP，在包括眼科在内的 40 个生物医学任务上提升表现。

**为什么值得看**:
- 与 PubMed-Ophtha 类似，都是从科学文献构建图文资源，但覆盖面更广。
- 眼科任务报告了零样本分类收益，可作为眼科 VLM 和图文检索的上游资源。
- 适合和你现有 PubMed-Ophtha 笔记做对照阅读。

### 4. VERA: Explainable Video Anomaly Detection via Verbalized Learning of Vision-Language Models
**中文题名**: VERA：通过语言化学习实现可解释视频异常检测的视觉语言模型方法
- **会议/年份**: CVPR 2025
- **作者**: Muchao Ye, Weiyang Liu, Pan He
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.00811)
- **综合评分**: 36
- **评分构成**: 相关性 16/40，热门度 0/40，质量 20/20
- **匹配关键词**: vision-language model, anomaly detection
- **与我的方向关系**: 间接相关：异常检测、可解释 AI、VLM 推理。

**中文一句话总结**: 用可学习的语言化问题引导 VLM 做视频异常检测，并输出更可解释的异常判断。

**为什么值得看**:
- 虽然不是眼科论文，但异常检测和可解释 VLM 可迁移到 OCT 异常筛查思路。
- 不改模型参数，通过提示/问题学习提升推理，可作为低成本适配策略参考。

### 5. Towards Training-free Anomaly Detection with Vision and Language Foundation Models
**中文题名**: 面向免训练异常检测的视觉语言基础模型方法
- **会议/年份**: CVPR 2025
- **作者**: Jinjin Zhang, Guodong Wang 0006, Yizhou Jin, Di Huang 0001
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Towards_Training-free_Anomaly_Detection_with_Vision_and_Language_Foundation_Models_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Towards_Training-free_Anomaly_Detection_with_Vision_and_Language_Foundation_Models_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.01416)
- **综合评分**: 36
- **评分构成**: 相关性 16/40，热门度 0/40，质量 20/20
- **匹配关键词**: foundation model, anomaly detection
- **与我的方向关系**: 间接相关：基础模型、异常检测、低标注部署。

**中文一句话总结**: 探索不训练模型也能做逻辑和结构异常检测的多模态框架，强调基础模型在异常检测中的零样本能力。

**为什么值得看**:
- 可为 OCT 异常检测、设备质控和缺陷检测提供方法参考。
- 更偏通用异常检测，和眼科需要通过数据和任务设计建立连接。

### 6. Dinomaly: The Less Is More Philosophy in Multi-Class Unsupervised Anomaly Detection
**中文题名**: Dinomaly：面向多类别无监督异常检测的简洁重建框架
- **会议/年份**: CVPR 2025
- **作者**: Jia Guo, Shuai Lu 0003, Weihang Zhang, Fang Chen 0007, Huiqi Li, Hongen Liao
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Guo_Dinomaly_The_Less_Is_More_Philosophy_in_Multi-Class_Unsupervised_Anomaly_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Guo_Dinomaly_The_Less_Is_More_Philosophy_in_Multi-Class_Unsupervised_Anomaly_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.01900)
- **综合评分**: 36
- **评分构成**: 相关性 16/40，热门度 0/40，质量 20/20
- **匹配关键词**: anomaly detection
- **与我的方向关系**: 间接相关：无监督异常检测、少标注医学图像。

**中文一句话总结**: 提出更简洁的多类别无监督异常检测框架，试图缩小统一模型与类别独立模型之间的性能差距。

**为什么值得看**:
- 对少标注 OCT 异常检测、设备图像质控有参考价值。
- 需要关注其是否依赖工业图像假设，医学图像迁移仍需验证。

### 7. Steady Progress Beats Stagnation: Mutual Aid of Foundation and Conventional Models in Mixed Domain Semi-Supervised Medical Image Segmentation
**中文题名**: 稳步进展优于停滞：基础模型与常规模型互助的混合域半监督医学图像分割
- **会议/年份**: CVPR 2025
- **作者**: Qinghe Ma, Jian Zhang 0090, Zekun Li 0010, Lei Qi 0001, Qian Yu 0007, Yinghuan Shi
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Ma_Steady_Progress_Beats_Stagnation_Mutual_Aid_of_Foundation_and_Conventional_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Ma_Steady_Progress_Beats_Stagnation_Mutual_Aid_of_Foundation_and_Conventional_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.00488)
- **综合评分**: 32
- **评分构成**: 相关性 12/40，热门度 0/40，质量 20/20
- **匹配关键词**: medical image segmentation, foundation model
- **与我的方向关系**: 相关：医学图像分割、基础模型、跨域半监督学习。

**中文一句话总结**: 针对跨域半监督医学图像分割，利用基础模型和常规模型互相纠错，缓解伪标签错误累积。

**为什么值得看**:
- 对 OCT 分割、跨设备泛化、半监督标注节省都很有启发。
- 尤其适合关注不同设备/中心数据域偏移的问题。

### 8. Revisiting MAE Pre-training for 3D Medical Image Segmentation
**中文题名**: 重新审视 3D 医学图像分割中的 MAE 预训练
- **会议/年份**: CVPR 2025
- **作者**: Tassilo Wald, Constantin Ulrich, Stanislav Lukyanenko, Andrei Goncharov, Alberto Paderno, Maximilian Miller, Leander Maerkisch, Paul F. Jaeger 等
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Wald_Revisiting_MAE_Pre-training_for_3D_Medical_Image_Segmentation_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Wald_Revisiting_MAE_Pre-training_for_3D_Medical_Image_Segmentation_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.00489)
- **综合评分**: 32
- **评分构成**: 相关性 12/40，热门度 0/40，质量 20/20
- **匹配关键词**: medical image segmentation, self-supervised learning
- **与我的方向关系**: 相关：3D 医学图像、自监督预训练、体数据分割。

**中文一句话总结**: 用大规模 3D 医学数据和 nnU-Net 框架重新评估 MAE 自监督预训练，关注 3D 分割中的数据规模、架构和评测问题。

**为什么值得看**:
- 3D OCT 与 3D 医学影像在体数据建模上有共通之处。
- 可作为 OCT 体数据自监督预训练和分割模型设计参考。

### 9. SemiDAViL: Semi-supervised Domain Adaptation with Vision-Language Guidance for Semantic Segmentation
**中文题名**: SemiDAViL：视觉语言指导的半监督域适应语义分割
- **会议/年份**: CVPR 2025
- **作者**: Hritam Basak, Zhaozheng Yin
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Basak_SemiDAViL_Semi-supervised_Domain_Adaptation_with_Vision-Language_Guidance_for_Semantic_Segmentation_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Basak_SemiDAViL_Semi-supervised_Domain_Adaptation_with_Vision-Language_Guidance_for_Semantic_Segmentation_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.00917)
- **综合评分**: 32
- **评分构成**: 相关性 12/40，热门度 0/40，质量 20/20
- **匹配关键词**: domain adaptation, vision-language model
- **与我的方向关系**: 相关：域适应、VLM 指导分割、跨设备泛化。

**中文一句话总结**: 结合半监督学习和域适应，用视觉语言模型指导语义分割在目标域中的迁移。

**为什么值得看**:
- 对跨设备 OCT/眼底图像分割很有方法借鉴价值。
- 重点可看其如何用 VLM 缓解目标域标签少的问题。

### 10. Mamba as a Bridge: Where Vision Foundation Models Meet Vision Language Models for Domain-Generalized Semantic Segmentation
**中文题名**: 以 Mamba 为桥梁：连接视觉基础模型与视觉语言模型的域泛化语义分割
- **会议/年份**: CVPR 2025
- **作者**: Xin Zhang, Robby T. Tan
- **链接**: [CVF](https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Mamba_as_a_Bridge_Where_Vision_Foundation_Models_Meet_Vision_CVPR_2025_paper.html) | [PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Mamba_as_a_Bridge_Where_Vision_Foundation_Models_Meet_Vision_CVPR_2025_paper.pdf) | [DOI](https://doi.org/10.1109/CVPR52734.2025.01354)
- **综合评分**: 32
- **评分构成**: 相关性 12/40，热门度 0/40，质量 20/20
- **匹配关键词**: foundation model, vision-language model
- **与我的方向关系**: 相关：域泛化分割、基础模型、视觉语言模型融合。

**中文一句话总结**: 尝试融合视觉基础模型的细粒度特征和视觉语言模型的文本对齐能力，用于域泛化语义分割。

**为什么值得看**:
- 适合思考眼科图像跨设备、跨中心分割模型如何结合 VFM 与 VLM。
- 不是眼科专用，但方法层面对泛化问题有参考价值。
