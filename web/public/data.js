window.EVIL_READ_ARXIV_DATA = {
  "generatedAt": "2026-05-15T09:37:55.621Z",
  "stats": {
    "confCandidates": 2871,
    "confFiltered": 175,
    "confRateLimited": true,
    "localNotes": 11,
    "dailyRecommendations": 10,
    "totalImages": 117,
    "latestDailyNote": "10_Daily/2026-05-15论文推荐.md",
    "latestConfRun": "30_confpapers/2026-05-15/run-status.json"
  },
  "runFile": "30_confpapers/2026-05-15/run-status.json",
  "papers": [
    {
      "id": "daily-1",
      "source": "daily-recommendation",
      "title": "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT",
      "zhTitle": "SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习",
      "venue": "Daily Recommendation",
      "score": 7.77,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "cs.CV",
        "cs.AI"
      ],
      "summary": "论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。",
      "authors": [
        "Tienyu Chang",
        "Tianhao Li",
        "Ruogu Fang",
        "Jiang Bian",
        "Yu Huang"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.02707v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.02707v1",
      "abstract": "Optical coherence tomography (OCT), a commonly used retinal imaging modality, plays a central role in retinal disease diagnosis by providing high-resolution visualization of retinal layers. While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its \"black box\" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval. Existing post-hoc explainable AI (XAI) methods often struggle to delineate fine-grained lesion structures, respect anatomical boundaries, or suppress noise, limiting the trustworthiness of their explanations. To bridge these gaps, we propose a Structure-Aware Interpretable Learning (SAIL) framework that integrates retinal anatomical priors at the representation level and couples them with semantic features via a fusion design. Without modifying standard post-hoc explainability methods, this representation yields sharper and more anatomically aligned attribution maps. Comprehensive experiments on diverse OCT datasets demonstrate that our structure-aware method consistently enhances interpretability, producing clinically meaningful and anatomy-aware explanations. Ablation studies further show that strong interpretability requires both structural priors and semantic features, and that properly fusing the two is critical to achieve the best explanation quality. Together, these results highlight structure-aware representations as a key step toward reliable explainability in OCT.",
      "analysisPath": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT.md",
      "analysisFolder": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for",
      "analysisMarkdown": "---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"http://arxiv.org/abs/2605.02707v1\"\r\n---\r\n\r\n# SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT\r\n\r\n**中文题名**: SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习\r\n\r\n## 基本信息\r\n\r\n- **推荐分**: 7.77\r\n- **匹配领域**: optical-coherence-tomography\r\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\r\n- **arXiv**: http://arxiv.org/abs/2605.02707v1\r\n- **PDF**: https://arxiv.org/pdf/2605.02707v1\r\n\r\n## 摘要速读\r\n\r\n### 中文翻译\r\n\r\n这篇论文关注 OCT 视网膜疾病诊断模型的可解释性问题。作者认为，常见事后解释方法虽然能给出热力图，但往往难以贴合细小病灶结构、视网膜层边界和真实临床解剖关系。论文提出 SAIL 框架，把视网膜解剖先验融入表征学习，并与语义特征融合，使现有解释方法在不大改模型的情况下产生更清晰、更符合解剖结构的归因图。\r\n\r\n### English Original\r\n\r\nSAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT Tienyu Chang∗ Dept. of BioHealth Informatics, Indiana University Indianapolis, Indiana, USA tienchan@iu.edu Tianhao Li∗ School of Information, University of Texas at Austin Austin, Texas, USA tianhao@utexas.edu Ruogu Fang Dept. of Biomedical Engineering, University of Florida Gainesville, Florida, USA ruogu.fang@bme.ufl.edu Jiang Bian Dept. of Biostatistics and Health Data Science, Indiana University School of Medicine Regenstreif Institute Indianapolis, Indiana, USA bianji@iu.edu Yu Huang Dept. of Biostatistics and Health Data Science, Indiana University School of Medicine Regenstreif Institute Indianapolis, Indiana, USA yh60@iu.edu Abstract Optical coherence tomography (OCT), a commonly used retinal imaging modality, plays a central role in retinal disease diagnosis by providing high-resolution visualization of retinal layers. While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its \"black box\" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval. Existing post-hoc explai\r\n\r\n## 为什么值得读\r\n\r\n论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。\r\n\r\n## 研究背景与动机\r\n\r\nOCT AI 在分类和检测上已经能达到较高准确率，但临床采用仍受可解释性约束。医生需要知道模型关注的是病灶、层结构还是噪声；监管和产品化也需要解释结果稳定、可复核。\r\n\r\n## 方法概述和架构\r\n\r\nSAIL 的思路是把视网膜解剖结构作为先验引入特征表征，再通过融合设计和语义特征结合。这样，后续 Grad-CAM 一类解释工具使用的特征本身就更有结构感。\r\n\r\n## 实验结果分析\r\n\r\n摘要显示，多数据集实验中该方法能让归因图更锐利、更符合视网膜解剖边界。消融实验强调结构先验和语义特征都不可少，二者融合方式会显著影响解释质量。\r\n\r\n## 研究价值评估\r\n\r\n对眼科 AI 产品很有价值，尤其是 OCT 疾病检测、辅助诊断和医生审阅界面。它提供了一种把解释图从“看起来像热力图”推进到“临床上更可相信”的工程路径。\r\n\r\n## 优势和局限性\r\n\r\n- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。\r\n- **局限**: 需要阅读全文确认其解释指标是否与医生标注或真实病灶边界强相关，也要关注跨设备、跨疾病和低质量图像下解释是否稳定。\r\n\r\n## 与相关论文对比\r\n\r\n- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。\r\n- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。\r\n\r\n## 核心要点\r\n\r\n- SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT Tienyu Chang∗ Dept.\r\n- While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its \"black box\" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval.\r\n\r\n## 与你的方向的关系\r\n\r\n- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。\r\n- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。\r\n- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。\r\n- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。\r\n\r\n## 提取图片\r\n\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png]]\r\n\r\n## 下一步精读问题\r\n\r\n- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？\r\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\r\n- 模型有没有外部验证、跨设备验证和失败案例分析？\r\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\r\n",
      "images": [
        {
          "name": "figure-01-p3.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-01-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p4.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-02-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p7.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-03-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p7.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-04-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p11.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-05-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p14.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-06-p14.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:06:33.040Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "## 今日概览\n\n今天自动检索得到 10 篇推荐论文。arXiv 最近 30 天命中 13 篇，Semantic Scholar 过去一年高热度通道命中 0 篇，备用源命中 0 篇。Semantic Scholar 仍触发 429，因此热门论文通道本次为 0；arXiv 最近 30 天检索已成功。\n\n- **整体趋势**: 今日结果明显集中在 OCT 可解释 AI、多模态眼科基础模型、OCT 预训练策略、无监督异常检测、散斑抑制和术中 OCT 交互反馈。\n- **与你方向的关系**: 第 1、2、4、7、8 篇更贴近眼科 AI/OCT 软件算法；第 5、9 篇更贴近 OCT 成像和仪器物理；第 3 篇适合判断眼科模型预训练是否值得投入。\n- **限流状态**: Semantic Scholar 429 已被降级处理，未阻塞 arXiv 主流程；如 arXiv 失败，系统会再尝试 europe_pmc, pubmed, crossref。\n- **阅读建议**: 优先精读前三篇，因为它们分别覆盖 OCT 可解释性、多模态基础模型和医学影像预训练策略；第 10 篇属于明显误匹配，可跳过或用于优化排除词。\n\n## Today's Overview\n\nThe pipeline found 10 recommended papers for 2026-05-15. arXiv recent search worked, while Semantic Scholar is still rate-limited, so today's list is mainly based on fresh arXiv papers.\n\n### [[SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT|SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT]]\n**中文题名**: SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习\n\n- **作者**: Tienyu Chang, Tianhao Li, Ruogu Fang, Jiang Bian, Yu Huang\n- **单位**: --\n- **发布日期**: 2026-05-04\n- **链接**: [arXiv](http://arxiv.org/abs/2605.02707v1) | PDF: https://arxiv.org/pdf/2605.02707v1\n- **来源**: arxiv\n- **推荐分**: 7.77\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\n- **笔记**: --\n\n**一句话总结**: 论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。\n\n**English One-line Summary**: Optical coherence tomography (OCT), a commonly used retinal imaging modality, plays a central role in retinal disease diagnosis by providing high-resolution visualization of retinal layers.\n\n**中文摘要翻译**: 论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。\n\n**核心贡献**:\n- 把视网膜层结构先验前置到表征学习中，而不是只在解释后处理阶段补救。\n- 目标是让 Grad-CAM 等常见事后解释方法产生更贴近病灶和解剖边界的热力图。\n- 对眼科 AI 的可解释性、临床可信度和注册审批叙事有直接参考价值。\n\n**原始摘要**: Optical coherence tomography (OCT), a commonly used retinal imaging modality, plays a central role in retinal disease diagnosis by providing high-resolution visualization of retinal layers. While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its \"black box\" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval. Existing post-hoc explainable AI (XAI) methods often struggle to delineate fine-grained lesion structures, respect anatomical boundaries, or suppress noise, limiting the trustworthiness of their explanations. To bridge these gaps, we propose a Structure-Aware Interpretable Learning (SAIL) framework that integrates retinal anatomical priors at the representation level and couples them with semantic features via a fusion design. Without modifying standard post-hoc explainability methods, this representation yields sharper and more anatomically aligned attribution maps. Comprehensive experiments on diverse OCT datasets demonstrate that our structure-aware method consistently enhances interpretability, producing clinically meaningful and anatomy-aware explanations. Ablation studies further show that strong interpretability requires both structural priors and semantic features, and that properly fusing the two is critical to achieve the best explanation quality. Together, these results highlight structure-aware representations as a key step toward reliable explainability in OCT."
    },
    {
      "id": "daily-2",
      "source": "daily-recommendation",
      "title": "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis",
      "zhTitle": "OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断",
      "venue": "Daily Recommendation",
      "score": 7.73,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "cs.CV",
        "cs.AI"
      ],
      "summary": "论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。",
      "authors": [
        "Tienyu Chang",
        "Zhen Chen",
        "Renjie Liang",
        "Jinyu Ding",
        "Jie Xu"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.02714v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.02714v1",
      "abstract": "The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from large-scale unlabeled datasets. However, current ophthalmic AI paradigms are predominantly constrained to single-modality inference, thereby creating a dissonance with clinical practice where diagnosis relies on the synthesis of complementary imaging modalities. Furthermore, the deployment of high-performance AI in resource-limited settings is frequently impeded by the unavailability of advanced three-dimensional imaging hardware. Here, we present the Ophthalmic multimodal Masked Autoencoder (OphMAE), a multi-imaging foundation model engineered to synergize the volumetric depth of 3D Optical Coherence Tomography (OCT) with the planar context of 2D en face OCT. By implementing a novel cross-modal fusion architecture and a unique adaptive inference mechanism, OphMAE was pre-trained on a massive dataset with of 183,875 paired OCT images derived from 32,765 patients. In a rigorous benchmark encompassing 17 diverse diagnostic tasks with 48,340 paired OCT images from 8,191 patients, the model demonstrated state-of-the-art performance, achieving an Area Under the Curve (AUC) of 96.9% for Age-related Macular Degeneration (AMD) and 97.2% for Diabetic Macular Edema (DME), consistently surpassing existing single-modal and multimodal foundation models. Crucially, OphMAE exhibits robust engineering adaptability: it maintains high diagnostic accuracy, such as 93.7\\% AUC for AMD, even when restricted to single-modality 2D inputs, and demonstrates exceptional data efficiency by retaining 95.7% AUC with as few as 500 labeled samples. This work establishes a scalable and adaptable framework for ophthalmic AI, ensuring robust performance across different tasks.",
      "analysisPath": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/OphMAE_Bridging_Volumetric_and_Planar_Imaging_with_a_Foundation_Model_for_Adaptive_Ophthalmological_Diagnosis.md",
      "analysisFolder": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi",
      "analysisMarkdown": "---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"http://arxiv.org/abs/2605.02714v1\"\r\n---\r\n\r\n# OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis\r\n\r\n**中文题名**: OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断\r\n\r\n## 基本信息\r\n\r\n- **推荐分**: 7.73\r\n- **匹配领域**: optical-coherence-tomography\r\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\r\n- **arXiv**: http://arxiv.org/abs/2605.02714v1\r\n- **PDF**: https://arxiv.org/pdf/2605.02714v1\r\n\r\n## 摘要速读\r\n\r\n### 中文翻译\r\n\r\n这篇论文提出 OphMAE 眼科多模态基础模型，用来连接 3D OCT 体数据和 2D en face OCT 平面影像。它的核心目标是解决临床诊断依赖多模态信息、但实际部署中常常缺少三维高端设备的问题。模型通过跨模态融合和自适应推理，在完整多模态和受限单模态场景下都保持较强诊断能力。\r\n\r\n### English Original\r\n\r\nOphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1‡, Zhen Chen2,3‡, Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J. Saykin6,8, Ruogu Fang4*, Yu Huang1*, Jiang Bian1*, Qingyu Chen2* 1Department of Biostatistics and Health Data Science, Indiana University, Indianapolis, IN 2Department of Biomedical Informatics and Data Science, Yale University, New Haven, CT 3Department of Data Science and Artificial Intelligence, The Hong Kong Polytechnic University, Hong Kong 4Department of Biomedical Engineering, University of Florida, Gainesville, FL 5Department of Health Outcomes and Biomedical Informatics, University of Florida, Gainesville, FL 6Radiology & Imaging Sciences, Indiana University, Indianapolis, IN 7Ophthalmology, Indiana University, Indianapolis, IN 8Center for Neuroimaging and Indiana Alzheimer’s Disease Research Center, Indiana University, Indianapolis, IN ‡Contributed Equally *Corresponding authors 1 Abstract The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from\r\n\r\n## 为什么值得读\r\n\r\n论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。\r\n\r\n## 研究背景与动机\r\n\r\n眼科诊断常常同时依赖 3D OCT、2D en face 图像和临床上下文，但很多基层或资源受限场景未必拥有完整三维扫描能力。\r\n\r\n## 方法概述和架构\r\n\r\nOphMAE 使用多模态 masked autoencoder 思路预训练，并通过跨模态融合结构学习 3D 体信息和 2D 平面信息之间的互补关系。自适应推理机制让模型能按实际可用输入工作。\r\n\r\n## 实验结果分析\r\n\r\n摘要报告其在 17 个诊断任务上达到较强表现，AMD 和 DME AUC 分别达到 96.9% 和 97.2%；在只有 2D 输入时仍能保持较高性能，并在少量标注样本下保持数据效率。\r\n\r\n## 研究价值评估\r\n\r\n这类模型适合眼科 AI 平台化和设备分层部署：高端 OCT 可用完整模型，低资源筛查设备可用受限输入模型。\r\n\r\n## 优势和局限性\r\n\r\n- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。\r\n- **局限**: 需要重点核对训练数据来源、外部验证中心、不同厂商设备覆盖程度，以及是否公开权重或只公开结果。\r\n\r\n## 与相关论文对比\r\n\r\n- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。\r\n- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。\r\n\r\n## 核心要点\r\n\r\n- OphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1‡, Zhen Chen2,3‡, Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J.\r\n\r\n## 与你的方向的关系\r\n\r\n- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。\r\n- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。\r\n- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。\r\n- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。\r\n\r\n## 提取图片\r\n\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png]]\r\n\r\n## 下一步精读问题\r\n\r\n- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？\r\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\r\n- 模型有没有外部验证、跨设备验证和失败案例分析？\r\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\r\n",
      "images": [
        {
          "name": "figure-01-p4.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-01-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p7.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-02-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p9.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-03-p9.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p11.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-04-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p12.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-05-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p13.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-06-p13.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:06:36.575Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[OphMAE_Bridging_Volumetric_and_Planar_Imaging_with_a_Foundation_Model_for_Adaptive_Ophthalmological_Diagnosis|OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis]]\n**中文题名**: OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断\n\n- **作者**: Tienyu Chang, Zhen Chen, Renjie Liang, Jinyu Ding, Jie Xu, 等 12 人\n- **单位**: --\n- **发布日期**: 2026-05-04\n- **链接**: [arXiv](http://arxiv.org/abs/2605.02714v1) | PDF: https://arxiv.org/pdf/2605.02714v1\n- **来源**: arxiv\n- **推荐分**: 7.73\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\n- **笔记**: --\n\n**一句话总结**: 论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。\n\n**English One-line Summary**: The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from large-scale unlabeled datasets.\n\n**中文摘要翻译**: 论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。\n\n**核心贡献**:\n- 同时利用 3D OCT 的深度信息和 2D en face OCT 的平面上下文。\n- 设计自适应推理机制，在单模态输入受限时仍保持较高诊断性能。\n- 适合关注眼科基础模型、跨设备部署和资源受限筛查场景。\n\n**原始摘要**: The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from large-scale unlabeled datasets. However, current ophthalmic AI paradigms are predominantly constrained to single-modality inference, thereby creating a dissonance with clinical practice where diagnosis relies on the synthesis of complementary imaging modalities. Furthermore, the deployment of high-performance AI in resource-limited settings is frequently impeded by the unavailability of advanced three-dimensional imaging hardware. Here, we present the Ophthalmic multimodal Masked Autoencoder (OphMAE), a multi-imaging foundation model engineered to synergize the volumetric depth of 3D Optical Coherence Tomography (OCT) with the planar context of 2D en face OCT. By implementing a novel cross-modal fusion architecture and a unique adaptive inference mechanism, OphMAE was pre-trained on a massive dataset with of 183,875 paired OCT images derived from 32,765 patients. In a rigorous benchmark encompassing 17 diverse diagnostic tasks with 48,340 paired OCT images from 8,191 patients, the model demonstrated state-of-the-art performance, achieving an Area Under the Curve (AUC) of 96.9% for Age-related Macular Degeneration (AMD) and 97.2% for Diabetic Macular Edema (DME), consistently surpassing existing single-modal and multimodal foundation models. Crucially, OphMAE exhibits robust engineering adaptability: it maintains high diagnostic accuracy, such as 93.7\\% AUC for AMD, even when restricted to single-modality 2D inputs, and demonstrates exceptional data efficiency by retaining 95.7% AUC with as few as 500 labeled samples. This work establishes a scalable and adaptable framework for ophthalmic AI, ensuring robust performance across different tasks."
    },
    {
      "id": "daily-3",
      "source": "daily-recommendation",
      "title": "From pre-training to downstream performance: Does domain-specific pre-training make sense?",
      "zhTitle": "从预训练到下游表现：领域专用预训练是否真的有意义？",
      "venue": "Daily Recommendation",
      "score": 7.57,
      "matchedKeywords": [
        "OCT",
        "cs.CV",
        "cs.LG"
      ],
      "summary": "论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。",
      "authors": [
        "Felix Krones"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.08819v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.08819v1",
      "abstract": "Deep learning techniques have revolutionised medical imaging, improving diagnostic accuracy and enabling both more accurate and earlier disease detection. However, the relationship between pre-training strategies and downstream performance in medical imaging models requires further exploration. Here, we systematically compare convolutional neural networks and transformers, examining various pre-training approaches, including supervised and self-supervised learning, as well as different initialisations and data modalities. Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, considering the effects of matching pre-training data with target modalities. Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance. While self-supervised learning can outperform supervised methods, its effectiveness varies with context. The study underscores the importance of pre-training strategies to enhance the reliability and effectiveness of deep learning models in medical imaging. By addressing these key factors, our research aims to contribute to the development of more accurate and dependable diagnostic tools, ultimately improving patient outcomes in clinical settings.",
      "analysisPath": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/From_pre-training_to_downstream_performance_Does_domain-specific_pre-training_make_sense.md",
      "analysisFolder": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does",
      "analysisMarkdown": "---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"http://arxiv.org/abs/2605.08819v1\"\r\n---\r\n\r\n# From pre-training to downstream performance: Does domain-specific pre-training make sense?\r\n\r\n**中文题名**: 从预训练到下游表现：领域专用预训练是否真的有意义？\r\n\r\n## 基本信息\r\n\r\n- **推荐分**: 7.57\r\n- **匹配领域**: optical-coherence-tomography\r\n- **匹配关键词**: OCT, cs.CV, cs.LG\r\n- **arXiv**: http://arxiv.org/abs/2605.08819v1\r\n- **PDF**: https://arxiv.org/pdf/2605.08819v1\r\n\r\n## 摘要速读\r\n\r\n### 中文翻译\r\n\r\n这篇论文系统评估医学影像模型从预训练到下游任务的迁移效果，比较 CNN、Transformer、监督学习、自监督学习以及不同数据模态初始化。其关键结论是，只有当预训练数据和目标任务模态足够接近时，领域专用预训练才会显著提升下游表现；对视网膜 OCT 等任务而言，这直接影响是否值得投入专门的眼科预训练数据。\r\n\r\n### English Original\r\n\r\nDeep learning techniques have revolutionised medical imag- ing, improving diagnostic accuracy and enabling both more accurate and earlier disease detection. However, the relationship between pre-training strategies and downstream performance in medical imaging models re- quires further exploration. Here, we systematically compare convolu- tional neural networks and transformers, examining various pre-training approaches, including supervised and self-supervised learning, as well as different initialisations and data modalities. Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, con- sidering the effects of matching pre-training data with target modalities. Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance. While self-supervised learning can outperform supervised methods, its effec- tiveness varies with context. The study underscores the importance of pre-training strategies to enhance the reliability and effectiveness of deep learning models in medical imaging. By addressing these key factors, our research aims to contribute to the development of more accurate and dependable diagnostic tools, ultimately improving patient outcomes in clinical settings.\r\n\r\n## 为什么值得读\r\n\r\n论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。\r\n\r\n## 研究背景与动机\r\n\r\n医学 AI 常见问题是：到底用自然图像预训练、通用医学预训练，还是为 OCT/眼底等单独收集数据做领域预训练。这个选择直接影响研发成本。\r\n\r\n## 方法概述和架构\r\n\r\n论文比较卷积网络和 Transformer，覆盖监督、自监督、不同初始化和不同模态预训练，并在自然图像、胸片、胸部 CT、视网膜 OCT 等任务上评估。\r\n\r\n## 实验结果分析\r\n\r\n摘要结论指出，只有预训练数据和目标模态高度匹配时，下游任务才明显受益；自监督方法有时优于监督方法，但效果依赖具体场景。\r\n\r\n## 研究价值评估\r\n\r\n对眼科设备 AI 非常实用：如果目标是 OCT 质量控制、病灶检测或分割，构建高质量 OCT 预训练集可能比盲目扩大通用医学数据更有意义。\r\n\r\n## 优势和局限性\r\n\r\n- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。\r\n- **局限**: 需要看各下游任务数据量、评估指标和统计显著性；如果任务过窄或标注集很小，结论可能受实验设置影响。\r\n\r\n## 与相关论文对比\r\n\r\n- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。\r\n- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。\r\n\r\n## 核心要点\r\n\r\n- However, the relationship between pre-training strategies and downstream performance in medical imaging models re- quires further exploration.\r\n- Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, con- sidering the effects of matching pre-training data with target modalities.\r\n- Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance.\r\n- While self-supervised learning can outperform supervised methods, its effec- tiveness varies with context.\r\n\r\n## 与你的方向的关系\r\n\r\n- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。\r\n- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。\r\n- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。\r\n- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。\r\n\r\n## 提取图片\r\n\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png]]\r\n\r\n## 下一步精读问题\r\n\r\n- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？\r\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\r\n- 模型有没有外部验证、跨设备验证和失败案例分析？\r\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\r\n",
      "images": [
        {
          "name": "figure-01-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-01-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-02-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-03-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-04-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-05-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-06-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:06:39.784Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[From_pre-training_to_downstream_performance_Does_domain-specific_pre-training_make_sense|From pre-training to downstream performance: Does domain-specific pre-training make sense?]]\n**中文题名**: 从预训练到下游表现：领域专用预训练是否真的有意义？\n\n- **作者**: Felix Krones\n- **单位**: --\n- **发布日期**: 2026-05-09\n- **链接**: [arXiv](http://arxiv.org/abs/2605.08819v1) | PDF: https://arxiv.org/pdf/2605.08819v1\n- **来源**: arxiv\n- **推荐分**: 7.57\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: OCT, cs.CV, cs.LG\n- **笔记**: --\n\n**一句话总结**: 论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。\n\n**English One-line Summary**: Deep learning techniques have revolutionised medical imaging, improving diagnostic accuracy and enabling both more accurate and earlier disease detection.\n\n**中文摘要翻译**: 论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。\n\n**核心贡献**:\n- 比较 CNN、Transformer、监督预训练和自监督预训练在多种医学影像任务中的差异。\n- 把视网膜 OCT 纳入评估，有助于判断是否值得为眼科设备单独构建预训练数据。\n- 结论对模型选型、数据采购和产品研发投入优先级很实用。\n\n**原始摘要**: Deep learning techniques have revolutionised medical imaging, improving diagnostic accuracy and enabling both more accurate and earlier disease detection. However, the relationship between pre-training strategies and downstream performance in medical imaging models requires further exploration. Here, we systematically compare convolutional neural networks and transformers, examining various pre-training approaches, including supervised and self-supervised learning, as well as different initialisations and data modalities. Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, considering the effects of matching pre-training data with target modalities. Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance. While self-supervised learning can outperform supervised methods, its effectiveness varies with context. The study underscores the importance of pre-training strategies to enhance the reliability and effectiveness of deep learning models in medical imaging. By addressing these key factors, our research aims to contribute to the development of more accurate and dependable diagnostic tools, ultimately improving patient outcomes in clinical settings."
    },
    {
      "id": "daily-4",
      "source": "daily-recommendation",
      "title": "Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography",
      "zhTitle": "解剖感知的 OCT 视网膜异常无监督检测与定位",
      "venue": "Daily Recommendation",
      "score": 7.4,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "cs.CV",
        "cs.LG"
      ],
      "summary": "论文面向 OCT 视网膜异常提出无监督检测框架，用健康视网膜分布和层结构约束来定位异常，减少对病灶标注的依赖。",
      "authors": [
        "Tania Haghighi",
        "Sina Gholami",
        "Hamed Tabkhi",
        "Minhaj Nur Alam"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2604.22139v1",
      "openAccessUrl": "http://arxiv.org/abs/2604.22139v1",
      "abstract": "Reliable automated analysis of Optical Coherence Tomography (OCT) imaging is crucial for diagnosing retinal disorders but faces a critical barrier: the need for expensive, labor-intensive expert annotations. Supervised deep learning models struggle to generalize across diverse pathologies, imaging devices, and patient populations due to their restricted vocabulary of annotated abnormalities. We propose an unsupervised anomaly detection framework that learns the normative distribution of healthy retinal anatomy without lesion annotations, directly addressing annotation efficiency challenges in clinical deployment. Our approach leverages a discrete latent model trained on normal B-scans to capture OCT-specific structural patterns. To enhance clinical robustness, we incorporate retinal layer-aware supervision and structured triplet learning to separate healthy from pathological representations, improving model reliability across varied imaging conditions. During inference, anomalies are detected and localized via reconstruction discrepancies, enabling both image and pixel-level identification without requiring disease-specific labels. On the Kermany dataset (AUROC: 0.799), our method substantially outperforms VAE, VQVAE, VQGAN, and f-AnoGAN baselines. Critically, cross-dataset evaluation on Srinivasan achieves AUROC 0.884 with superior generalization, demonstrating robust domain adaptation. On the external RETOUCH benchmark, unsupervised anomaly segmentation achieves competitive Dice (0.200) and mIoU (0.117) scores, validating reproducibility across institutions.",
      "analysisPath": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography.md",
      "analysisFolder": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz",
      "analysisMarkdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"http://arxiv.org/abs/2604.22139v1\"\n---\n\n# Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography\n\n**中文题名**: 基于解剖感知的 OCT 视网膜异常无监督检测与定位\n\n## 基本信息\n\n- **推荐分**: 8.79\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.LG\n- **arXiv**: http://arxiv.org/abs/2604.22139v1\n- **PDF**: https://arxiv.org/pdf/2604.22139v1\n\n## 摘要速读\n\n这篇论文面向 OCT 视网膜异常检测中的标注成本问题，提出一种无监督异常检测和定位框架。它先学习健康视网膜的正常解剖结构分布，再在推理时通过重建差异发现异常区域。论文还加入视网膜层感知监督和结构化 triplet learning，以提升在不同病灶、设备和数据集之间的泛化能力。\n\n## 为什么值得读\n\n这篇论文面向 OCT 视网膜异常检测中的标注成本问题，提出一种无监督异常检测和定位框架。它先学习健康视网膜的正常解剖结构分布，再在推理时通过重建差异发现异常区域。论文还加入视网膜层感知监督和结构化 triplet learning，以提升在不同病灶、设备和数据集之间的泛化能力。\n\n## 核心要点\n\n- 不依赖病灶级人工标注，适合缺少大规模专家标注的真实临床环境。\n- 通过离散潜变量模型学习正常 OCT B-scan 的结构模式。\n- 推理时可同时给出图像级异常判断和像素级异常定位。\n- 在 Kermany、Srinivasan 和 RETOUCH 等数据集上展示跨数据集泛化，强调 domain adaptation 能力。\n\n## 与你的方向的关系\n\n- 适合作为 OCT 设备端异常筛查或质量分诊模块的算法基础。\n- 可用于发现未知或少见异常，而不局限于训练集中已有疾病标签。\n- 后续需要重点看误报控制、异常热图是否可解释，以及外部设备数据上的稳定性。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-01-p4.png]]\n![[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-02-p5.png]]\n![[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-03-p6.png]]\n\n## 下一步精读问题\n\n- 数据来自哪些 OCT 设备、扫描协议和中心？是否覆盖真实临床设备差异？\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\n- 模型或算法有没有外部验证、跨设备验证和失败案例分析？\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\n",
      "images": [
        {
          "name": "figure-01-p4.png",
          "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-01-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Ffigures%2Ffigure-01-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-01-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p5.png",
          "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-02-p5.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Ffigures%2Ffigure-02-p5.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-02-p5.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p6.png",
          "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-03-p6.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Ffigures%2Ffigure-03-p6.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-03-p6.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 3,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-14T07:22:38.932Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography|Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography]]\n**中文题名**: 解剖感知的 OCT 视网膜异常无监督检测与定位\n\n- **作者**: Tania Haghighi, Sina Gholami, Hamed Tabkhi, Minhaj Nur Alam\n- **单位**: --\n- **发布日期**: 2026-04-24\n- **链接**: [arXiv](http://arxiv.org/abs/2604.22139v1) | PDF: https://arxiv.org/pdf/2604.22139v1\n- **来源**: arxiv\n- **推荐分**: 7.4\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.LG\n- **笔记**: --\n\n**一句话总结**: 论文面向 OCT 视网膜异常提出无监督检测框架，用健康视网膜分布和层结构约束来定位异常，减少对病灶标注的依赖。\n\n**English One-line Summary**: Reliable automated analysis of Optical Coherence Tomography (OCT) imaging is crucial for diagnosing retinal disorders but faces a critical barrier: the need for expensive, labor-intensive expert annotations.\n\n**中文摘要翻译**: 论文面向 OCT 视网膜异常提出无监督检测框架，用健康视网膜分布和层结构约束来定位异常，减少对病灶标注的依赖。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: Reliable automated analysis of Optical Coherence Tomography (OCT) imaging is crucial for diagnosing retinal disorders but faces a critical barrier: the need for expensive, labor-intensive expert annotations. Supervised deep learning models struggle to generalize across diverse pathologies, imaging devices, and patient populations due to their restricted vocabulary of annotated abnormalities. We propose an unsupervised anomaly detection framework that learns the normative distribution of healthy retinal anatomy without lesion annotations, directly addressing annotation efficiency challenges in clinical deployment. Our approach leverages a discrete latent model trained on normal B-scans to capture OCT-specific structural patterns. To enhance clinical robustness, we incorporate retinal layer-aware supervision and structured triplet learning to separate healthy from pathological representations, improving model reliability across varied imaging conditions. During inference, anomalies are detected and localized via reconstruction discrepancies, enabling both image and pixel-level identification without requiring disease-specific labels. On the Kermany dataset (AUROC: 0.799), our method substantially outperforms VAE, VQVAE, VQGAN, and f-AnoGAN baselines. Critically, cross-dataset evaluation on Srinivasan achieves AUROC 0.884 with superior generalization, demonstrating robust domain adaptation. On the external RETOUCH benchmark, unsupervised anomaly segmentation achieves competitive Dice (0.200) and mIoU (0.117) scores, validating reproducibility across institutions."
    },
    {
      "id": "daily-5",
      "source": "daily-recommendation",
      "title": "Imaging-formulation-based numerical speckle reduction for optical coherence tomography",
      "zhTitle": "基于成像公式的 OCT 数值散斑抑制方法",
      "venue": "Daily Recommendation",
      "score": 7.3,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "swept-source OCT",
        "physics.optics"
      ],
      "summary": "论文从 OCT 成像公式出发设计单次体积采集可用的数值散斑抑制方法，在降低散斑的同时尽量保持横向分辨率和细节。",
      "authors": [
        "Xibo Wang",
        "Shuichi Makita",
        "Nobuhisa Tateno",
        "Suzuyo Komeda",
        "Cunyou Bao"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.13443v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.13443v1",
      "abstract": "Speckle is an intrinsic pattern in optical coherence tomography (OCT) that obscures fine image features and degrades effective resolution. In this study, we propose a numerical speckle reduction method based on the dispersed scatterer model and the imaging formulation of OCT. Utilizing the shifted-complex-conjugate-product, the proposed method digitally modulates speckle patterns by shifting the complex en face OCT signal and averaging the resulting real-part images. This approach allows for effective speckle suppression using a single volumetric acquisition without additional hardware modifications. OCT point spread function phantom measurement demonstrated lateral resolution preservation of the proposed method. We validated the method using a custom-built full-field swept-source OCT system on human breast adenocarcinoma spheroids and a zebrafish eye. Quantitative evaluations using the contrast-to-noise ratio and equivalent number of looks demonstrated that the proposed method significantly outperforms conventional frame-averaging techniques. The speckle-reduced images revealed microstructures previously obscured by speckle, such as necrotic regions in spheroids, while preserving the original image sharpness and resolution.",
      "analysisPath": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/Imaging-formulation-based_numerical_speckle_reduction_for_optical_coherence_tomography.md",
      "analysisFolder": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu",
      "analysisMarkdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"http://arxiv.org/abs/2605.13443v1\"\n---\n\n# Imaging-formulation-based numerical speckle reduction for optical coherence tomography\n\n**中文题名**: 基于成像公式的 OCT 数值散斑抑制方法\n\n## 基本信息\n\n- **推荐分**: 9.34\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, swept-source OCT, physics.optics\n- **arXiv**: http://arxiv.org/abs/2605.13443v1\n- **PDF**: https://arxiv.org/pdf/2605.13443v1\n\n## 摘要速读\n\n这篇论文针对 OCT 图像中固有的散斑噪声问题，提出一种基于 OCT 成像公式的数值散斑抑制方法。它的重点不是增加硬件采集次数，而是利用单次体积采集中的复 en face OCT 信号，通过 shifted-complex-conjugate-product 和平均策略调制散斑，从而在保持横向分辨率的同时提升图像可读性。\n\n## 为什么值得读\n\n这篇论文针对 OCT 图像中固有的散斑噪声问题，提出一种基于 OCT 成像公式的数值散斑抑制方法。它的重点不是增加硬件采集次数，而是利用单次体积采集中的复 en face OCT 信号，通过 shifted-complex-conjugate-product 和平均策略调制散斑，从而在保持横向分辨率的同时提升图像可读性。\n\n## 核心要点\n\n- 从 OCT 成像机理出发建模散斑，而不是单纯使用通用图像去噪网络。\n- 方法只依赖单次体积采集，理论上更容易嵌入现有 OCT 设备的软件处理链。\n- 在点扩散函数体模、肿瘤球体和斑马鱼眼样本上验证了对比噪声比与等效 looks 数的提升。\n- 论文特别强调保留图像锐度和分辨率，这对后续层分割、病灶检测和定量测量很重要。\n\n## 与你的方向的关系\n\n- 对 OCT 设备图像质量提升非常直接，可作为散斑抑制算法模块参考。\n- 适合关注 swept-source OCT、full-field OCT 或单次扫描质量增强的仪器研发场景。\n- 后续可重点检查算法是否支持实时处理、不同组织样本和临床视网膜 OCT 数据。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png]]\n\n## 下一步精读问题\n\n- 数据来自哪些 OCT 设备、扫描协议和中心？是否覆盖真实临床设备差异？\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\n- 模型或算法有没有外部验证、跨设备验证和失败案例分析？\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\n",
      "images": [
        {
          "name": "figure-01-p10.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-01-p10.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p10.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-02-p10.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p10.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-03-p10.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p11.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-04-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p12.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-05-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p12.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-06-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-14T07:22:38.931Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[Imaging-formulation-based_numerical_speckle_reduction_for_optical_coherence_tomography|Imaging-formulation-based numerical speckle reduction for optical coherence tomography]]\n**中文题名**: 基于成像公式的 OCT 数值散斑抑制方法\n\n- **作者**: Xibo Wang, Shuichi Makita, Nobuhisa Tateno, Suzuyo Komeda, Cunyou Bao, 等 9 人\n- **单位**: --\n- **发布日期**: 2026-05-13\n- **链接**: [arXiv](http://arxiv.org/abs/2605.13443v1) | PDF: https://arxiv.org/pdf/2605.13443v1\n- **来源**: arxiv\n- **推荐分**: 7.3\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, swept-source OCT, physics.optics\n- **笔记**: --\n\n**一句话总结**: 论文从 OCT 成像公式出发设计单次体积采集可用的数值散斑抑制方法，在降低散斑的同时尽量保持横向分辨率和细节。\n\n**English One-line Summary**: Speckle is an intrinsic pattern in optical coherence tomography (OCT) that obscures fine image features and degrades effective resolution.\n\n**中文摘要翻译**: 论文从 OCT 成像公式出发设计单次体积采集可用的数值散斑抑制方法，在降低散斑的同时尽量保持横向分辨率和细节。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: Speckle is an intrinsic pattern in optical coherence tomography (OCT) that obscures fine image features and degrades effective resolution. In this study, we propose a numerical speckle reduction method based on the dispersed scatterer model and the imaging formulation of OCT. Utilizing the shifted-complex-conjugate-product, the proposed method digitally modulates speckle patterns by shifting the complex en face OCT signal and averaging the resulting real-part images. This approach allows for effective speckle suppression using a single volumetric acquisition without additional hardware modifications. OCT point spread function phantom measurement demonstrated lateral resolution preservation of the proposed method. We validated the method using a custom-built full-field swept-source OCT system on human breast adenocarcinoma spheroids and a zebrafish eye. Quantitative evaluations using the contrast-to-noise ratio and equivalent number of looks demonstrated that the proposed method significantly outperforms conventional frame-averaging techniques. The speckle-reduced images revealed microstructures previously obscured by speckle, such as necrotic regions in spheroids, while preserving the original image sharpness and resolution."
    },
    {
      "id": "daily-6",
      "source": "daily-recommendation",
      "title": "Physics-Based iOCT Sonification for Real-time Interaction Awareness in Subretinal Injection",
      "zhTitle": "用于视网膜下注射实时交互感知的物理建模 iOCT 声音反馈",
      "venue": "Daily Recommendation",
      "score": 7.17,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "eess.IV"
      ],
      "summary": "论文把术中 OCT 的解剖层和器械运动映射为实时声音反馈，帮助视网膜下注射时感知针尖深度和组织变形。",
      "authors": [
        "Luis D. Reyes Vargas",
        "Veronica Ruozzi",
        "Andrea K. M. Ross",
        "Shervin Dehghani",
        "Michael Sommersperger"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.14500v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.14500v1",
      "abstract": "Subretinal injection is a delicate vitreoretinal procedure requiring precise needle placement within the subretinal space while avoiding perforation of the retinal pigment epithelium (RPE), a layer directly beneath the target with extremely limited regenerative capacity. To enhance depth perception during cannula advancement, intraoperative optical coherence tomography (iOCT) offers high-resolution cross-sectional visualization of needle-tissue interaction; however, interpreting these images requires sustained visual attention alongside the en face microscope view, thereby increasing cognitive load during critical phases and placing additional demands on the surgeon's proprioceptive control. In this paper, we propose a structured, real-time sonification framework designed for extensible mapping of iOCT-derived anatomical features into perceptual auditory feedback. The method employs a physics-inspired acoustic model driven by segmented retinal layers from a stream of iOCT B-scans, with needle motion and injection-induced retinal layer displacements serving as excitation inputs to the sound model, enabling perception of tool position and retinal deformation. In a controlled user study (n=34), the proposed sonification achieved high retinal layer identification accuracy and robust detection of retinal deformation-related events, significantly outperforming a state-of-the-art baseline in overall event identification (83.4% vs. 60.6%, p < 0.001), with gains driven primarily by enhanced detection of injection-induced retinal deformation. Evaluation by experts (n=4) confirmed the clinical relevance and potential intraoperative applicability of the method. These results establish structured iOCT sonification as a viable complementary modality for real-time surgical guidance in subretinal injection.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "10_Daily",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:04:31.913Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[Physics-Based_iOCT_Sonification_for_Real-time_Interaction_Awareness_in_Subretinal_Injection|Physics-Based iOCT Sonification for Real-time Interaction Awareness in Subretinal Injection]]\n**中文题名**: 用于视网膜下注射实时交互感知的物理建模 iOCT 声音反馈\n\n- **作者**: Luis D. Reyes Vargas, Veronica Ruozzi, Andrea K. M. Ross, Shervin Dehghani, Michael Sommersperger, 等 10 人\n- **单位**: --\n- **发布日期**: 2026-05-14\n- **链接**: [arXiv](http://arxiv.org/abs/2605.14500v1) | PDF: https://arxiv.org/pdf/2605.14500v1\n- **来源**: arxiv\n- **推荐分**: 7.17\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, eess.IV\n- **笔记**: --\n\n**一句话总结**: 论文把术中 OCT 的解剖层和器械运动映射为实时声音反馈，帮助视网膜下注射时感知针尖深度和组织变形。\n\n**English One-line Summary**: Subretinal injection is a delicate vitreoretinal procedure requiring precise needle placement within the subretinal space while avoiding perforation of the retinal pigment epithelium (RPE), a layer directly beneath the target with extremely limited regenerative capacity.\n\n**中文摘要翻译**: 论文把术中 OCT 的解剖层和器械运动映射为实时声音反馈，帮助视网膜下注射时感知针尖深度和组织变形。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: Subretinal injection is a delicate vitreoretinal procedure requiring precise needle placement within the subretinal space while avoiding perforation of the retinal pigment epithelium (RPE), a layer directly beneath the target with extremely limited regenerative capacity. To enhance depth perception during cannula advancement, intraoperative optical coherence tomography (iOCT) offers high-resolution cross-sectional visualization of needle-tissue interaction; however, interpreting these images requires sustained visual attention alongside the en face microscope view, thereby increasing cognitive load during critical phases and placing additional demands on the surgeon's proprioceptive control. In this paper, we propose a structured, real-time sonification framework designed for extensible mapping of iOCT-derived anatomical features into perceptual auditory feedback. The method employs a physics-inspired acoustic model driven by segmented retinal layers from a stream of iOCT B-scans, with needle motion and injection-induced retinal layer displacements serving as excitation inputs to the sound model, enabling perception of tool position and retinal deformation. In a controlled user study (n=34), the proposed sonification achieved high retinal layer identification accuracy and robust detection of retinal deformation-related events, significantly outperforming a state-of-the-art baseline in overall event identification (83.4% vs. 60.6%, p < 0.001), with gains driven primarily by enhanced detection of injection-induced retinal deformation. Evaluation by experts (n=4) confirmed the clinical relevance and potential intraoperative applicability of the method. These results establish structured iOCT sonification as a viable complementary modality for real-time surgical guidance in subretinal injection."
    },
    {
      "id": "daily-7",
      "source": "daily-recommendation",
      "title": "EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization",
      "zhTitle": "EDU-Net：融合多尺度特征与边界优化的 OCT 视网膜病理液体分割",
      "venue": "Daily Recommendation",
      "score": 5.9,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "eess.IV"
      ],
      "summary": "论文提出 EDU-Net 双分支编码解码网络，用多尺度特征融合和边界注意力提升 OCT 视网膜液体病灶自动分割表现。",
      "authors": [
        "Zijun Lei",
        "Zikang Xu",
        "Liang Zhang",
        "Ge Song",
        "Hanyu Guo"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2604.20918v1",
      "openAccessUrl": "http://arxiv.org/abs/2604.20918v1",
      "abstract": "Objective: Diabetic macular edema (DME) is the leading cause of severe visual impairment in patients with diabetes. Quantification of retinal fluid, particularly intraretinal fluid (IRF) and subretinal fluid (SRF), plays a critical role in the management of DME. Although optical coherence tomography (OCT) can be used for detection, the variable morphology of fluid accumulation and the blurred boundaries caused by noise interference still limit the accuracy of OCT's automatic segmentation. Methods: Retrospective model development and validation study. This study proposes a novel edge-guided dual-branch encoder-decoder network (EDU-Net) to achieve accurate and efficient automatic segmentation of OCT liquid lesions. The local feature extraction branch is based on the EfficientNet model, which precisely captures tiny lesions by leveraging its lightweight separable convolution and high-resolution feature preservation strategy. The global feature extraction branch is based on the large-kernel efficient convolution (LKEC) module and the downsampling layer design to enhance long-range dependencies and global semantics. EDU-Net applies a multi-category edge-guided attention module to fuse high-frequency boundary detail information to each resolution feature to optimize the boundary segmentation performance. Results: Extensive results on the in-house and public datasets demonstrate that EDU-Net achieves state-of-the-art DSC segmentation performance in terms of efficiency and robustness, especially in the segmentation of IRF lesions. Conclusions: EDU-Net integrates local details with global context and optimizes boundaries, achieving an improvement in the accuracy of automatic segmentation of retinal fluid.",
      "analysisPath": "20_Research/Papers/2026-05-14/05-EDU-Net/EDU-Net_Retinal_Pathological_Fluid_Segmentation_in_OCT_Images_with_Multiscale_Feature_Fusion_and_Boundary_Optimization.md",
      "analysisFolder": "20_Research/Papers/2026-05-14/05-EDU-Net",
      "analysisMarkdown": "---\ntags: [\"paper-images\", \"ophthalmology\", \"OCT\", \"segmentation\"]\nsource: \"http://arxiv.org/abs/2604.20918v1\"\n---\n\n# EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization\n\n**中文题名**: EDU-Net：结合多尺度特征融合与边界优化的 OCT 视网膜病理性液体分割\n\n## 基本信息\n\n- **作者**: Zijun Lei, Zikang Xu, Liang Zhang, Ge Song, Hanyu Guo, Dan Cao, Yujia Zhou, Qianjin Feng\n- **链接**: [arXiv](http://arxiv.org/abs/2604.20918v1)\n- **PDF**: [paper.pdf](paper.pdf)\n- **图片来源**: PDF fallback\n\n## 图片索引\n\n![[image-index.md]]\n\n## 说明\n\n本目录由 extract-paper-images 创建。已优先尝试 arXiv source 包，但 e-print 返回 PDF，因此改用 PDF 图片提取。\n",
      "images": [
        {
          "name": "figure-01-p23.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-01-p23.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-01-p23.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-01-p23.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-02-p24.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-02-p24.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-02-p24.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-02-p24.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-03-p25.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-03-p25.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-03-p25.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-03-p25.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-04-p26.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-04-p26.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-04-p26.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-04-p26.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-05-p27.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-05-p27.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-05-p27.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-05-p27.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-06-p28.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-06-p28.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-06-p28.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-06-p28.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-07-p29.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-07-p29.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-07-p29.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-07-p29.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-08-p30.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-08-p30.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-08-p30.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-08-p30.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-09-p31.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-09-p31.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-09-p31.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-09-p31.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-10-p32.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-10-p32.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-10-p32.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-10-p32.png",
          "sourceDir": "images"
        }
      ],
      "imageCount": 10,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/05-EDU-Net/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-14/05-EDU-Net",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-14T07:50:20.738Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[EDU-Net_Retinal_Pathological_Fluid_Segmentation_in_OCT_Images_with_Multiscale_Feature_Fusion_and_Boundary_Optimization|EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization]]\n**中文题名**: EDU-Net：融合多尺度特征与边界优化的 OCT 视网膜病理液体分割\n\n- **作者**: Zijun Lei, Zikang Xu, Liang Zhang, Ge Song, Hanyu Guo, 等 8 人\n- **单位**: --\n- **发布日期**: 2026-04-22\n- **链接**: [arXiv](http://arxiv.org/abs/2604.20918v1) | PDF: https://arxiv.org/pdf/2604.20918v1\n- **来源**: arxiv\n- **推荐分**: 5.9\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, eess.IV\n- **笔记**: --\n\n**一句话总结**: 论文提出 EDU-Net 双分支编码解码网络，用多尺度特征融合和边界注意力提升 OCT 视网膜液体病灶自动分割表现。\n\n**English One-line Summary**: Objective: Diabetic macular edema (DME) is the leading cause of severe visual impairment in patients with diabetes.\n\n**中文摘要翻译**: 论文提出 EDU-Net 双分支编码解码网络，用多尺度特征融合和边界注意力提升 OCT 视网膜液体病灶自动分割表现。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: Objective: Diabetic macular edema (DME) is the leading cause of severe visual impairment in patients with diabetes. Quantification of retinal fluid, particularly intraretinal fluid (IRF) and subretinal fluid (SRF), plays a critical role in the management of DME. Although optical coherence tomography (OCT) can be used for detection, the variable morphology of fluid accumulation and the blurred boundaries caused by noise interference still limit the accuracy of OCT's automatic segmentation. Methods: Retrospective model development and validation study. This study proposes a novel edge-guided dual-branch encoder-decoder network (EDU-Net) to achieve accurate and efficient automatic segmentation of OCT liquid lesions. The local feature extraction branch is based on the EfficientNet model, which precisely captures tiny lesions by leveraging its lightweight separable convolution and high-resolution feature preservation strategy. The global feature extraction branch is based on the large-kernel efficient convolution (LKEC) module and the downsampling layer design to enhance long-range dependencies and global semantics. EDU-Net applies a multi-category edge-guided attention module to fuse high-frequency boundary detail information to each resolution feature to optimize the boundary segmentation performance. Results: Extensive results on the in-house and public datasets demonstrate that EDU-Net achieves state-of-the-art DSC segmentation performance in terms of efficiency and robustness, especially in the segmentation of IRF lesions. Conclusions: EDU-Net integrates local details with global context and optimizes boundaries, achieving an improvement in the accuracy of automatic segmentation of retinal fluid."
    },
    {
      "id": "daily-8",
      "source": "daily-recommendation",
      "title": "PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature",
      "zhTitle": "PubMed-Ophtha：用于训练眼科文献视觉语言模型的开放资源",
      "venue": "Daily Recommendation",
      "score": 5.67,
      "matchedKeywords": [
        "optical coherence tomography",
        "cs.CV"
      ],
      "summary": "论文发布从 PMC 开放文献中抽取的眼科图文数据集，包含图像、子图、面板说明和成像模态标注，适合训练眼科视觉语言模型。",
      "authors": [
        "Verena Jasmin Hallitschke",
        "Carsten Eickhoff",
        "Philipp Berens"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.02720v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.02720v1",
      "abstract": "Vision-language models hold considerable promise for ophthalmology, but their development depends on large-scale, high-quality image-text datasets that remain scarce. We present PubMed-Ophtha, a hierarchical dataset of 102,023 ophthalmological image-caption pairs extracted from 15,842 open-access articles in PubMed Central. Unlike existing datasets, figures are extracted directly from article PDFs at full resolution and decomposed into their constituent panels, panel identifiers, and individual images. Each image is annotated with its imaging modality -- color fundus photography, optical coherence tomography, retinal imaging, or other -- and a mark status indicating the presence of annotation marks such as arrows. Figure captions are split into panel-level subcaptions using a two-step LLM approach, achieving a mean average sentence BLEU score of 0.913 on human-annotated data. Panel and image detection models reach a mAP@0.50 of 0.909 and 0.892, respectively, and figure extraction achieves a median IoU of 0.997. To support reproducibility, we additionally release the human-annotated ground-truth data, all trained models, and the full dataset generation pipeline.",
      "analysisPath": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/PubMed-Ophtha_An_open_resource_for_training_ophthalmology_vision-language_models_on_scientific_literature.md",
      "analysisFolder": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha",
      "analysisMarkdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"vision-language-model\", \"dataset\"]\naliases:\n  - \"PubMed-Ophtha\"\n  - \"眼科视觉语言模型文献图文数据集\"\nsource: \"http://arxiv.org/abs/2605.02720v1\"\n---\n\n# PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature\n\n**中文题名**: PubMed-Ophtha：用于训练眼科视觉语言模型的科学文献开放资源\n\n## 基本信息\n\n- **作者**: Verena Jasmin Hallitschke, Carsten Eickhoff, Philipp Berens\n- **来源**: arXiv\n- **日期**: 2026-05-04\n- **链接**: [arXiv](http://arxiv.org/abs/2605.02720v1)\n- **PDF**: [paper.pdf](paper.pdf)\n- **研究方向**: 眼科视觉语言模型、医学图文数据集、OCT/眼底图像、科学文献图像挖掘\n- **关键词**: ophthalmology, vision-language model, PubMed Central, OCT, fundus photography, image-caption dataset\n\n## 摘要翻译\n\n视觉语言模型在眼科中具有很大潜力，但它们的发展依赖大规模、高质量的图像-文本数据集，而这类资源仍然稀缺。本文提出 PubMed-Ophtha，这是一个从 PubMed Central 开放获取论文中提取的层次化眼科图文数据集，包含 102,023 对眼科图像-图注，来源于 15,842 篇开放获取文章。与已有数据集不同，该数据集直接从论文 PDF 中以完整分辨率提取图像，并进一步拆解为图版、图版标识符和单张图像。每张图像都标注了成像模态，例如彩色眼底照相、OCT、视网膜影像或其他类型，并标注是否存在箭头等人工标记。论文还使用两阶段 LLM 方法将整段图注拆分为 panel 级子图注，在人工标注数据上达到 0.913 的平均句子 BLEU。Panel 和图像检测模型分别达到 mAP@0.50 为 0.909 和 0.892，图像提取的中位 IoU 达到 0.997。为支持可复现性，作者还发布了人工标注的 ground-truth 数据、训练模型和完整的数据生成流水线。\n\n## 要点提炼\n\n- 数据集规模大：102,023 对眼科图像-文本对，来自 15,842 篇 PubMed Central 开放论文。\n- 数据来源贴近科研语境：直接从论文 PDF 提取图像和图注，而不是只依赖临床数据集或网页图片。\n- 数据结构层次清晰：从 figure 到 panel，再到 individual image，并保留 panel identifier 和子图注。\n- 标注了眼科关键成像模态，包括 fundus photography、OCT、retinal imaging 等。\n- 提供检测模型、人工标注数据和完整生成流程，有利于复现和扩展。\n\n## 研究背景与动机\n\n眼科 AI 过去主要依赖结构化临床数据集，例如眼底照相、OCT B-scan、疾病标签或分割标注。这类数据对诊断模型训练很重要，但对视觉语言模型来说还不够：VLM 需要图像和自然语言之间的对应关系，包括图像描述、医学术语、病灶位置、图像模态和上下文解释。\n\n科学论文天然包含大量高质量眼科图像和专家撰写的图注，尤其是 OCT、眼底照相、OCTA、组织图像和多 panel 组合图。但这些信息通常嵌在 PDF 中，结构复杂，不能直接用于模型训练。PubMed-Ophtha 的动机就是把开放文献中的眼科图像和图注系统化提取出来，构建可训练眼科 VLM 的开放资源。\n\n## 方法概述和架构\n\n论文的方法可以理解为一个“文献 PDF 到眼科图文数据集”的自动化流水线：\n\n1. **论文筛选**: 从 PubMed Central 开放获取文章中筛选眼科相关论文。\n2. **PDF 图像提取**: 从 PDF 中提取完整分辨率 figure。\n3. **Panel 和单图分解**: 将多 panel figure 拆分为 panel、panel label 和 individual image。\n4. **图注拆分**: 使用两阶段 LLM 方法把整段 caption 拆分成 panel-level subcaption。\n5. **模态标注**: 给每张图像标注 imaging modality，例如彩色眼底照相、OCT、retinal imaging 或其他。\n6. **标记状态识别**: 标注图像中是否有箭头、框线等 annotation marks。\n7. **质量验证**: 使用人工标注 ground truth 评估 panel detection、image detection、figure extraction 和 caption splitting。\n\n这个架构对你的方向很有启发：它不是单纯训练诊断模型，而是在构建一个眼科 AI 的基础数据层，后续可服务于 OCT 图像理解、报告生成、检索问答和多模态预训练。\n\n## 实验结果分析\n\n论文报告了几个关键指标：\n\n- 数据规模：102,023 对 image-caption pairs。\n- 来源规模：15,842 篇 PubMed Central 开放获取眼科文章。\n- 图注拆分：mean average sentence BLEU 为 0.913，说明 LLM 辅助拆分与人工标注较接近。\n- Panel 检测：mAP@0.50 为 0.909。\n- Image 检测：mAP@0.50 为 0.892。\n- Figure extraction：median IoU 为 0.997，说明从 PDF 中定位和裁剪图像非常准确。\n\n这些结果说明该流水线在“从文献 PDF 中可靠提取眼科图文数据”这一任务上已经比较成熟。不过，模型训练效果本身不是本文唯一重点；更核心的贡献是数据资源和数据构建方法。\n\n## 研究价值评估\n\n对你的兴趣方向，这篇论文的价值主要有三点：\n\n- **眼科 AI 基础设施价值**: PubMed-Ophtha 可以作为眼科视觉语言模型、图文检索和医学图像问答的预训练数据来源。\n- **OCT/眼底图像语义理解**: 数据集中包含 OCT、fundus photography、retinal imaging 等模态，有助于模型学习不同眼科设备图像与文本描述的关系。\n- **仪器研发辅助**: 对设备厂商或算法团队而言，论文图像和图注中包含大量设备成像案例、病灶描述和实验图示，可用于构建知识库或辅助模型理解。\n\n它不直接解决生物参数测量仪或验光仪的测量问题，但能为“眼科设备图像 + 文本解释 + 知识问答”打基础。\n\n## 优势和局限性\n\n**优势**:\n\n- 数据规模大，而且来源于开放科学文献，医学语义密度高。\n- 覆盖多种眼科图像模态，包括 OCT 和眼底照相。\n- 数据层次结构细，支持 figure/panel/image/subcaption 多粒度训练。\n- 提供人工标注数据、模型和生成流水线，便于复现。\n- 对眼科 VLM 和文献图像挖掘方向非常实用。\n\n**局限性**:\n\n- 文献图像分布不一定等同于真实临床设备输出，可能存在发表偏倚和图像后处理偏倚。\n- 图注语言偏科研论文风格，和临床报告、设备报告、验光报告存在差异。\n- 图像中可能包含合成示意图、统计图、流程图，并非全部是原始医学影像。\n- 对中文眼科语料、中文报告生成和国内设备数据的支持需要后续扩展。\n- 数据集可用于预训练，但具体诊断任务仍需要高质量临床标注验证。\n\n## 与相关论文对比\n\n- [[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/Imaging-formulation-based_numerical_speckle_reduction_for_optical_coherence_tomography|OCT 数值散斑抑制]]: 该论文关注 OCT 图像质量增强，是设备/成像算法层面的工作；PubMed-Ophtha 更偏数据基础设施和多模态训练资源。\n- [[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT|SAIL]]: SAIL 关注 OCT 模型解释性；PubMed-Ophtha 可为类似眼科 VLM 或解释模型提供图文训练语料。\n- [[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography|OCT 异常无监督检测]]: 该论文关注无标注异常检测；PubMed-Ophtha 则从文献中构建弱监督/图文监督资源，两者都在降低眼科 AI 对昂贵标注的依赖。\n- OphMAE: 更偏 OCT foundation model 训练；PubMed-Ophtha 更偏 ophthalmology VLM 数据集，可作为未来眼科多模态基础模型的数据来源之一。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-01-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-02-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-03-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-04-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-05-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-06-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-07-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-08-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-09-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-10-p2.png]]\n\n## 知识图谱链接\n\n- **相关主题**: [[OCT]], [[眼科AI]], [[视觉语言模型]], [[医学图像数据集]], [[眼底图像]], [[科学文献图像挖掘]]\n- **相关论文**: [[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT|SAIL]], [[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography|OCT 异常检测]], [[OphMAE]]\n- **可复用概念**: [[Panel detection]], [[Image-caption dataset]], [[Ophthalmology VLM]], [[PMC 文献挖掘]]\n\n## 下一步精读问题\n\n- 数据集中的 OCT 图像占比是多少？是否区分 OCT、OCTA、en face OCT 和 B-scan？\n- 图像模态标注是否足够细，能否支持设备类型或扫描部位级别的过滤？\n- 该数据集训练出的 VLM 在真实临床 OCT/眼底问答上表现如何？\n- 是否能扩展到中文眼科论文、中文设备报告和中文临床报告？\n- 对生物参数测量仪、验光仪报告截图，是否可以复用类似 PDF/图像-文本抽取流水线？\n",
      "images": [
        {
          "name": "figure-01-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-01-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-01-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-01-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-02-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-02-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-02-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-03-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-03-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-03-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-04-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-04-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-04-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-05-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-05-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-05-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-06-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-06-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-06-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-07-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-07-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-07-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-07-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-08-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-08-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-08-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-08-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-09-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-09-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-09-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-09-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-10-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-10-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-10-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-10-p2.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 10,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/paper.pdf"
      },
      "folder": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-14T07:35:06.441Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[PubMed-Ophtha_An_open_resource_for_training_ophthalmology_vision-language_models_on_scientific_literature|PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature]]\n**中文题名**: PubMed-Ophtha：用于训练眼科文献视觉语言模型的开放资源\n\n- **作者**: Verena Jasmin Hallitschke, Carsten Eickhoff, Philipp Berens\n- **单位**: --\n- **发布日期**: 2026-05-04\n- **链接**: [arXiv](http://arxiv.org/abs/2605.02720v1) | PDF: https://arxiv.org/pdf/2605.02720v1\n- **来源**: arxiv\n- **推荐分**: 5.67\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, cs.CV\n- **笔记**: --\n\n**一句话总结**: 论文发布从 PMC 开放文献中抽取的眼科图文数据集，包含图像、子图、面板说明和成像模态标注，适合训练眼科视觉语言模型。\n\n**English One-line Summary**: Vision-language models hold considerable promise for ophthalmology, but their development depends on large-scale, high-quality image-text datasets that remain scarce.\n\n**中文摘要翻译**: 论文发布从 PMC 开放文献中抽取的眼科图文数据集，包含图像、子图、面板说明和成像模态标注，适合训练眼科视觉语言模型。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: Vision-language models hold considerable promise for ophthalmology, but their development depends on large-scale, high-quality image-text datasets that remain scarce. We present PubMed-Ophtha, a hierarchical dataset of 102,023 ophthalmological image-caption pairs extracted from 15,842 open-access articles in PubMed Central. Unlike existing datasets, figures are extracted directly from article PDFs at full resolution and decomposed into their constituent panels, panel identifiers, and individual images. Each image is annotated with its imaging modality -- color fundus photography, optical coherence tomography, retinal imaging, or other -- and a mark status indicating the presence of annotation marks such as arrows. Figure captions are split into panel-level subcaptions using a two-step LLM approach, achieving a mean average sentence BLEU score of 0.913 on human-annotated data. Panel and image detection models reach a mAP@0.50 of 0.909 and 0.892, respectively, and figure extraction achieves a median IoU of 0.997. To support reproducibility, we additionally release the human-annotated ground-truth data, all trained models, and the full dataset generation pipeline."
    },
    {
      "id": "daily-9",
      "source": "daily-recommendation",
      "title": "Enhanced Phase Sensitive SD-OCT for flow imaging using ultrasonically sculpted optical waveguides",
      "zhTitle": "利用超声塑形光波导增强相位敏感 SD-OCT 流速成像",
      "venue": "Daily Recommendation",
      "score": 5.53,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCT",
        "physics.optics"
      ],
      "summary": "论文用超声塑形光波导改善 SD-OCT 深度方向信噪比滚降，使更深位置的相位敏感流速检测成为可能。",
      "authors": [
        "Lloyd Lobo",
        "Junze Liu",
        "Hang Yang",
        "Yasin Karimi",
        "B. Hyle Park"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2604.22646v1",
      "openAccessUrl": "http://arxiv.org/abs/2604.22646v1",
      "abstract": "Phase sensitive detection in spectral domain optical coherence tomography (SD-OCT) is a powerful method for functional imaging of biological events with high spatiotemporal resolution. The depth-dependent signal-to-noise ratio (SNR) is a limiting factor on the minimum detectable phase changes of phase in shot noise-limited SD-OCT systems. The SNR over a depth is constrained by the terminal optics, usually using a focusing lens to project light into the tissue and collect the backscattered light. In situ ultrasonically sculpted optical waveguides have been used to improve SNR roll-off over depth compared to conventional SD-OCT systems. In this paper, we extend this feature to demonstrate phase sensitive detection at depth using ultrasonically enhanced OCT (ue-OCT). Our experimental results show that ultrasonically sculpted optical waveguides are phase stable and follow near shot-noise limited behavior. We measured milk flow velocity changes to demonstrate a phase sensitivity of 5.25 mrad at 10 dB SNR and dynamic range of 0.8 mm/s to 14.7 cm/s using ue-OCT. Our results show flow detection with ue-OCT at extended depths (i.e., 3.5 mm) otherwise not possible with conventional SD-OCT systems with matched focal lengths. The results in this paper show the potential of ue-OCT for phase-sensitive flow measurement from the depth of tissue for a gamut of applications such as cerebral blood flow imaging as a proxy to neural activity mapping.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "10_Daily",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:04:31.913Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[Enhanced_Phase_Sensitive_SD-OCT_for_flow_imaging_using_ultrasonically_sculpted_optical_waveguides|Enhanced Phase Sensitive SD-OCT for flow imaging using ultrasonically sculpted optical waveguides]]\n**中文题名**: 利用超声塑形光波导增强相位敏感 SD-OCT 流速成像\n\n- **作者**: Lloyd Lobo, Junze Liu, Hang Yang, Yasin Karimi, B. Hyle Park, 等 6 人\n- **单位**: Department of Electrical and Computer Engineering, Carnegie Mellon University, Pittsburgh, USA, Department of Bioengineering, University of California Riverside, CA, USA\n- **发布日期**: 2026-04-24\n- **链接**: [arXiv](http://arxiv.org/abs/2604.22646v1) | PDF: https://arxiv.org/pdf/2604.22646v1\n- **来源**: arxiv\n- **推荐分**: 5.53\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, physics.optics\n- **笔记**: --\n\n**一句话总结**: 论文用超声塑形光波导改善 SD-OCT 深度方向信噪比滚降，使更深位置的相位敏感流速检测成为可能。\n\n**English One-line Summary**: Phase sensitive detection in spectral domain optical coherence tomography (SD-OCT) is a powerful method for functional imaging of biological events with high spatiotemporal resolution.\n\n**中文摘要翻译**: 论文用超声塑形光波导改善 SD-OCT 深度方向信噪比滚降，使更深位置的相位敏感流速检测成为可能。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: Phase sensitive detection in spectral domain optical coherence tomography (SD-OCT) is a powerful method for functional imaging of biological events with high spatiotemporal resolution. The depth-dependent signal-to-noise ratio (SNR) is a limiting factor on the minimum detectable phase changes of phase in shot noise-limited SD-OCT systems. The SNR over a depth is constrained by the terminal optics, usually using a focusing lens to project light into the tissue and collect the backscattered light. In situ ultrasonically sculpted optical waveguides have been used to improve SNR roll-off over depth compared to conventional SD-OCT systems. In this paper, we extend this feature to demonstrate phase sensitive detection at depth using ultrasonically enhanced OCT (ue-OCT). Our experimental results show that ultrasonically sculpted optical waveguides are phase stable and follow near shot-noise limited behavior. We measured milk flow velocity changes to demonstrate a phase sensitivity of 5.25 mrad at 10 dB SNR and dynamic range of 0.8 mm/s to 14.7 cm/s using ue-OCT. Our results show flow detection with ue-OCT at extended depths (i.e., 3.5 mm) otherwise not possible with conventional SD-OCT systems with matched focal lengths. The results in this paper show the potential of ue-OCT for phase-sensitive flow measurement from the depth of tissue for a gamut of applications such as cerebral blood flow imaging as a proxy to neural activity mapping."
    },
    {
      "id": "daily-10",
      "source": "daily-recommendation",
      "title": "Revisiting constraints on primordial vector modes and implications for sourced magnetic fields and observed $EB$ power spectrum",
      "zhTitle": "重新审视原初矢量模式约束及其对磁场与观测 EB 功率谱的影响",
      "venue": "Daily Recommendation",
      "score": 4.63,
      "matchedKeywords": [
        "OCT"
      ],
      "summary": "这篇是宇宙学论文，因标题中的 OCT 字符串误匹配进入列表，和眼科 OCT/验光/生物测量方向基本无关，建议跳过。",
      "authors": [
        "Kaito Yura",
        "Shohei Saga",
        "Shuichiro Yokoyama",
        "Kiyotomo Ichiki"
      ],
      "pdfUrl": "https://arxiv.org/pdf/2605.13016v1",
      "openAccessUrl": "http://arxiv.org/abs/2605.13016v1",
      "abstract": "We revisit regular primordial vector modes sustained by the anisotropic stress of free-streaming neutrinos. We consider two classes of neutrino-sector initial conditions, the neutrino velocity isocurvature mode ($ν\\mathrm{VI}$) and the neutrino octupole mode ($ν\\mathrm{OCT}$). We update their observational constraints using current cosmological data, and examine the impact of including the BICEP/Keck 2018 $B$-mode polarization data. From an MCMC analysis, we obtain the 95\\% C.L. upper bounds on the vector-to-scalar ratio as $r_\\mathrm{v}<1.55\\times10^{-4}$ and $r_\\mathrm{v}<1.04\\times10^{-2}$ for the $ν\\mathrm{VI}$ and $ν\\mathrm{OCT}$ modes at the vector pivot scale $k_{0} = 0.01\\,{\\rm Mpc}^{-1}$, respectively. We then study two consequences of these bounds. First, we estimate the magnetic fields inevitably generated in the pre-recombination plasma associated with the vector modes. We find that the magnetic-field amplitude at recombination with a coherent length of $1~{\\rm Mpc}$ is bounded by $B\\sim\\mathcal{O}(10^{-23})\\,{\\rm G}$ and $B\\sim\\mathcal{O}(10^{-21})\\,{\\rm G}$ for the $ν\\mathrm{VI}$ and $ν\\mathrm{OCT}$ modes, respetively, which is too small to provide the seed of magnetic fields observed today. Second, assuming the helical vector mode, we compute the induced CMB $EB$ spectrum. We show that even a fully helical primordial vector mode cannot reproduce the currently observed $EB$ signal while remaining consistent with parity-even CMB constraints.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "10_Daily",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:04:31.913Z",
      "dailyPath": "10_Daily/2026-05-15论文推荐.md",
      "markdown": "### [[Revisiting_constraints_on_primordial_vector_modes_and_implications_for_sourced_magnetic_fields_and_observed_$EB$_power_spectrum|Revisiting constraints on primordial vector modes and implications for sourced magnetic fields and observed $EB$ power spectrum]]\n**中文题名**: 重新审视原初矢量模式约束及其对磁场与观测 EB 功率谱的影响\n\n- **作者**: Kaito Yura, Shohei Saga, Shuichiro Yokoyama, Kiyotomo Ichiki\n- **单位**: --\n- **发布日期**: 2026-05-13\n- **链接**: [arXiv](http://arxiv.org/abs/2605.13016v1) | PDF: https://arxiv.org/pdf/2605.13016v1\n- **来源**: arxiv\n- **推荐分**: 4.63\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: OCT\n- **笔记**: --\n\n> 备注：该条大概率是关键词误匹配，因 `OCT` 出现在非眼科语境中，保留用于提醒后续过滤规则继续收紧。\n\n**一句话总结**: 这篇是宇宙学论文，因标题中的 OCT 字符串误匹配进入列表，和眼科 OCT/验光/生物测量方向基本无关，建议跳过。\n\n**English One-line Summary**: We revisit regular primordial vector modes sustained by the anisotropic stress of free-streaming neutrinos.\n\n**中文摘要翻译**: 这篇是宇宙学论文，因标题中的 OCT 字符串误匹配进入列表，和眼科 OCT/验光/生物测量方向基本无关，建议跳过。\n\n**核心贡献**:\n- 围绕 OCT、眼科影像或医学 AI 的具体问题展开，可作为方向跟踪材料。\n- 建议重点核对数据来源、设备类型、验证集设置和是否有跨设备泛化实验。\n- 如果涉及算法，应关注其是否能转化为仪器端稳定指标或临床工作流模块。\n\n**原始摘要**: We revisit regular primordial vector modes sustained by the anisotropic stress of free-streaming neutrinos. We consider two classes of neutrino-sector initial conditions, the neutrino velocity isocurvature mode ($ν\\mathrm{VI}$) and the neutrino octupole mode ($ν\\mathrm{OCT}$). We update their observational constraints using current cosmological data, and examine the impact of including the BICEP/Keck 2018 $B$-mode polarization data. From an MCMC analysis, we obtain the 95\\% C.L. upper bounds on the vector-to-scalar ratio as $r_\\mathrm{v}<1.55\\times10^{-4}$ and $r_\\mathrm{v}<1.04\\times10^{-2}$ for the $ν\\mathrm{VI}$ and $ν\\mathrm{OCT}$ modes at the vector pivot scale $k_{0} = 0.01\\,{\\rm Mpc}^{-1}$, respectively. We then study two consequences of these bounds. First, we estimate the magnetic fields inevitably generated in the pre-recombination plasma associated with the vector modes. We find that the magnetic-field amplitude at recombination with a coherent length of $1~{\\rm Mpc}$ is bounded by $B\\sim\\mathcal{O}(10^{-23})\\,{\\rm G}$ and $B\\sim\\mathcal{O}(10^{-21})\\,{\\rm G}$ for the $ν\\mathrm{VI}$ and $ν\\mathrm{OCT}$ modes, respetively, which is too small to provide the seed of magnetic fields observed today. Second, assuming the helical vector mode, we compute the induced CMB $EB$ spectrum. We show that even a fully helical primordial vector mode cannot reproduce the currently observed $EB$ signal while remaining consistent with parity-even CMB constraints."
    },
    {
      "id": "conf-0",
      "source": "conf-papers",
      "title": "MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation",
      "zhTitle": "OCT 到 OCTA 三维图像转换",
      "venue": "CVPR 2025",
      "score": 54,
      "matchedKeywords": [
        "OCT",
        "OCTA",
        "optical coherence tomography"
      ],
      "summary": "从三维 OCT 推断三维 OCTA，重点关注血管结构转换和 OCTA 数据增强。",
      "authors": [
        "Zhuangzhuang Chen",
        "Hualiang Wang",
        "Chubin Ou",
        "Xiaomeng Li 0001"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01945",
      "abstract": "Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.",
      "analysisPath": "30_confpapers/2026-05-15/01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3/note.md",
      "analysisFolder": "30_confpapers/2026-05-15/01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3",
      "analysisMarkdown": "---\ntags: [\"llm-generated\", \"conference-paper-analysis\"]\nsource: \"CVPR 2025\"\n---\n\n# MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation\n\n**中文题名**: OCT相关顶会论文：MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation\n\n## 摘要中文翻译\n\n请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：\n\n> Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.\n\n## 要点提炼\n\n待阅读 PDF 后补充中文要点。请至少提炼研究问题、方法创新、实验数据、关键结果和产品启发。\n\n## 研究背景与动机\n\n该论文来自指定顶会主会，且命中本次 OCT / 眼科 AI 主题筛选词。具体临床或仪器背景需结合全文进一步确认。\n\n## 方法概述和架构\n\n当前自动检索阶段仅获得题名、作者、会议和可用摘要/PDF 链接。若需要完整方法拆解，应继续读取 PDF 正文。\n\n## 实验结果分析\n\n待从 PDF 正文提取实验设置、数据集、指标和对比结果。\n\n## 研究价值评估\n\n推荐评分：54。相关性 34/40，热门度 0/40，质量 20/20。\n\n## 优势和局限性\n\n- 优势：来自顶级会议，且与当前主题关键词匹配。\n- 局限：Semantic Scholar 受限时，引用数和摘要可能不完整。\n\n## 与已有本地论文的关系\n\n可与 `20_Research/Papers` 中的 OCT、眼科 AI、VLM、分割和异常检测论文进行主题对照。\n\n## 后续阅读问题\n\n- 是否使用真实眼科 OCT / 眼底 / 临床数据？\n- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？\n- 是否提供开源代码、模型或数据集？\n\n## 图片索引\n\n尚未下载 PDF 提取图片。可在网络稳定后补充 `paper.pdf` 和 `images/`。\n\n## 链接\n\n- PDF: https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf\n- Semantic Scholar: --\n- DBLP/CVF: https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html\n\n## 英文原文摘要\n\n> Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.",
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "30_confpapers/2026-05-15/01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.899Z"
    },
    {
      "id": "conf-1",
      "source": "conf-papers",
      "title": "Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images",
      "zhTitle": "基于 OCTA 图像的血流速度估计",
      "venue": "CVPR 2025",
      "score": 40,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCTA"
      ],
      "summary": "从 OCTA 图像估计血流速度，把结构成像推进到功能定量。",
      "authors": [
        "Wensheng Cheng",
        "Zhenghong Li",
        "Jiaxiang Ren 0002",
        "Hyomin Jeong",
        "Congwu Du",
        "Yingtian Pan",
        "Haibin Ling"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.00979",
      "abstract": "Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.",
      "analysisPath": "30_confpapers/2026-05-15/02-Blood-Flow-Speed-Estimation-with-Optical-Coheren/note.md",
      "analysisFolder": "30_confpapers/2026-05-15/02-Blood-Flow-Speed-Estimation-with-Optical-Coheren",
      "analysisMarkdown": "---\ntags: [\"llm-generated\", \"conference-paper-analysis\"]\nsource: \"CVPR 2025\"\n---\n\n# Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images\n\n**中文题名**: OCT相关顶会论文：Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images\n\n## 摘要中文翻译\n\n请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：\n\n> Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.\n\n## 要点提炼\n\n待阅读 PDF 后补充中文要点。请至少提炼研究问题、方法创新、实验数据、关键结果和产品启发。\n\n## 研究背景与动机\n\n该论文来自指定顶会主会，且命中本次 OCT / 眼科 AI 主题筛选词。具体临床或仪器背景需结合全文进一步确认。\n\n## 方法概述和架构\n\n当前自动检索阶段仅获得题名、作者、会议和可用摘要/PDF 链接。若需要完整方法拆解，应继续读取 PDF 正文。\n\n## 实验结果分析\n\n待从 PDF 正文提取实验设置、数据集、指标和对比结果。\n\n## 研究价值评估\n\n推荐评分：40。相关性 20/40，热门度 0/40，质量 20/20。\n\n## 优势和局限性\n\n- 优势：来自顶级会议，且与当前主题关键词匹配。\n- 局限：Semantic Scholar 受限时，引用数和摘要可能不完整。\n\n## 与已有本地论文的关系\n\n可与 `20_Research/Papers` 中的 OCT、眼科 AI、VLM、分割和异常检测论文进行主题对照。\n\n## 后续阅读问题\n\n- 是否使用真实眼科 OCT / 眼底 / 临床数据？\n- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？\n- 是否提供开源代码、模型或数据集？\n\n## 图片索引\n\n尚未下载 PDF 提取图片。可在网络稳定后补充 `paper.pdf` 和 `images/`。\n\n## 链接\n\n- PDF: https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf\n- Semantic Scholar: --\n- DBLP/CVF: https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html\n\n## 英文原文摘要\n\n> Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.",
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "30_confpapers/2026-05-15/02-Blood-Flow-Speed-Estimation-with-Optical-Coheren",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.900Z"
    },
    {
      "id": "conf-2",
      "source": "conf-papers",
      "title": "BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature",
      "zhTitle": "开放生物医学图像-图注数据集与视觉语言模型",
      "venue": "CVPR 2025",
      "score": 40,
      "matchedKeywords": [
        "vision-language model",
        "ophthalmology"
      ],
      "summary": "从开放科学文献构建大规模生物医学图文数据集，并训练视觉语言模型。",
      "authors": [
        "Alejandro Lozano",
        "Min Woo Sun",
        "James Burgess",
        "Liangyu Chen 0005",
        "Jeffrey J. Nirschl",
        "Jeffrey Gu",
        "Ivan Lopez 0001",
        "Josiah Aklilu",
        "Anita Rau",
        "Austin Wolfgang Katzer",
        "Yuhui Zhang",
        "Collin Chiu",
        "Xiaohan Wang",
        "Alfred Seunghoon Song",
        "Robert Tibshirani",
        "Serena Yeung-Levy"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01837",
      "abstract": "The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community",
      "analysisPath": "30_confpapers/2026-05-15/03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi/note.md",
      "analysisFolder": "30_confpapers/2026-05-15/03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi",
      "analysisMarkdown": "---\ntags: [\"llm-generated\", \"conference-paper-analysis\"]\nsource: \"CVPR 2025\"\n---\n\n# BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature\n\n**中文题名**: 视觉语言 / 医学图像相关顶会论文：BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature\n\n## 摘要中文翻译\n\n请将下面英文摘要翻译并整理为中文。自动脚本已保留英文原文，后续分析时不要只复制英文摘要：\n\n> The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community\n\n## 要点提炼\n\n待阅读 PDF 后补充中文要点。请至少提炼研究问题、方法创新、实验数据、关键结果和产品启发。\n\n## 研究背景与动机\n\n该论文来自指定顶会主会，且命中本次 OCT / 眼科 AI 主题筛选词。具体临床或仪器背景需结合全文进一步确认。\n\n## 方法概述和架构\n\n当前自动检索阶段仅获得题名、作者、会议和可用摘要/PDF 链接。若需要完整方法拆解，应继续读取 PDF 正文。\n\n## 实验结果分析\n\n待从 PDF 正文提取实验设置、数据集、指标和对比结果。\n\n## 研究价值评估\n\n推荐评分：40。相关性 20/40，热门度 0/40，质量 20/20。\n\n## 优势和局限性\n\n- 优势：来自顶级会议，且与当前主题关键词匹配。\n- 局限：Semantic Scholar 受限时，引用数和摘要可能不完整。\n\n## 与已有本地论文的关系\n\n可与 `20_Research/Papers` 中的 OCT、眼科 AI、VLM、分割和异常检测论文进行主题对照。\n\n## 后续阅读问题\n\n- 是否使用真实眼科 OCT / 眼底 / 临床数据？\n- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？\n- 是否提供开源代码、模型或数据集？\n\n## 图片索引\n\n尚未下载 PDF 提取图片。可在网络稳定后补充 `paper.pdf` 和 `images/`。\n\n## 链接\n\n- PDF: https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf\n- Semantic Scholar: --\n- DBLP/CVF: https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html\n\n## 英文原文摘要\n\n> The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community",
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "30_confpapers/2026-05-15/03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-3",
      "source": "conf-papers",
      "title": "VERA: Explainable Video Anomaly Detection via Verbalized Learning of Vision-Language Models",
      "zhTitle": "异常检测相关论文：VERA: Explainable Video Anomaly Detection via Verbalized Learning of Vision-Language Models",
      "venue": "CVPR 2025",
      "score": 36,
      "matchedKeywords": [
        "vision-language model",
        "anomaly detection"
      ],
      "summary": "异常检测方向，可作为 OCT 异常筛查或设备质控的间接参考。",
      "authors": [
        "Muchao Ye",
        "Weiyang Liu",
        "Pan He"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Ye_VERA_Explainable_Video_Anomaly_Detection_via_Verbalized_Learning_of_Vision-Language_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.00811",
      "abstract": "The rapid advancement of vision-language models (VLMs) has established a new paradigm in video anomaly detection (VAD): leveraging VLMs to simultaneously detect anomalies and provide comprehendible explanations for the decisions. Existing work in this direction often assumes the complex reasoning required for VAD exceeds the capabilities of pretrained VLMs. Consequently, these approaches either incorporate specialized reasoning modules during inference or rely on instruction tuning datasets through additional training to adapt VLMs for VAD. However, such strategies often incur substantial computational costs or data annotation overhead. To address these challenges in explainable VAD, we introduce a verbalized learning framework named VERA that enables VLMs to perform VAD without model parameter modifications. Specifically, VERA automatically decomposes the complex reasoning required for VAD into reflections on simpler, more focused guiding questions capturing distinct abnormal patterns. It treats these reflective questions as learnable parameters and optimizes them through data-driven verbal interactions between learner and optimizer VLMs, using coarsely labeled training data. During inference, VERA embeds the learned questions into model prompts to guide VLMs in generating segment-level anomaly scores, which are then refined into frame-level scores via the fusion of scene and temporal contexts. Experimental results on challenging benchmarks demonstrate that the learned questions of VERA are highly adaptable, significantly improving both detection performance and explainability of VLMs for VAD.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-4",
      "source": "conf-papers",
      "title": "Towards Training-free Anomaly Detection with Vision and Language Foundation Models",
      "zhTitle": "异常检测相关论文：Towards Training-free Anomaly Detection with Vision and Language Foundation Models",
      "venue": "CVPR 2025",
      "score": 36,
      "matchedKeywords": [
        "foundation model",
        "anomaly detection"
      ],
      "summary": "异常检测方向，可作为 OCT 异常筛查或设备质控的间接参考。",
      "authors": [
        "Jinjin Zhang",
        "Guodong Wang 0006",
        "Yizhou Jin",
        "Di Huang 0001"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Towards_Training-free_Anomaly_Detection_with_Vision_and_Language_Foundation_Models_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Towards_Training-free_Anomaly_Detection_with_Vision_and_Language_Foundation_Models_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01416",
      "abstract": "Anomaly detection is valuable for real-world applications, such as industrial quality inspection. However, most approaches focus on detecting local structural anomalies while neglecting compositional anomalies incorporating logical constraints. In this paper, we introduce LogSAD, a novel multi-modal framework that requires no training for both Logical and Structural Anomaly Detection. First, we propose a match-of-thought architecture that employs advanced large multi-modal models (i.e. GPT-4V) to generate matching proposals, formulating interests and compositional rules of thought for anomaly detection. Second, we elaborate on multi-granularity anomaly detection, consisting of patch tokens, sets of interests, and composition matching with vision and language foundation models. Subsequently, we present a calibration module to align anomaly scores from different detectors, followed by integration strategies for the final decision. Consequently, our approach addresses both logical and structural anomaly detection within a unified framework and achieves state-of-the-art results without the need for training, even when compared to supervised approaches, highlighting its robustness and effectiveness. Code is available at https://github.com/zhang0jhon/LogSAD.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-5",
      "source": "conf-papers",
      "title": "Dinomaly: The Less Is More Philosophy in Multi-Class Unsupervised Anomaly Detection",
      "zhTitle": "异常检测相关论文：Dinomaly: The Less Is More Philosophy in Multi-Class Unsupervised Anomaly Detection",
      "venue": "CVPR 2025",
      "score": 36,
      "matchedKeywords": [
        "anomaly detection"
      ],
      "summary": "异常检测方向，可作为 OCT 异常筛查或设备质控的间接参考。",
      "authors": [
        "Jia Guo",
        "Shuai Lu 0003",
        "Weihang Zhang",
        "Fang Chen 0007",
        "Huiqi Li",
        "Hongen Liao"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Guo_Dinomaly_The_Less_Is_More_Philosophy_in_Multi-Class_Unsupervised_Anomaly_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Guo_Dinomaly_The_Less_Is_More_Philosophy_in_Multi-Class_Unsupervised_Anomaly_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01900",
      "abstract": "Recent studies highlighted a practical setting of unsupervised anomaly detection (UAD) that builds a unified model for multi-class images. Despite various advancements addressing this challenging task, the detection performance under the multi-class setting still lags far behind state-of-the-art class-separated models. Our research aims to bridge this substantial performance gap. In this paper, we present Dinomaly, a minimalist reconstruction-based anomaly detection framework that harnesses pure Transformer architectures without relying on complex designs, additional modules, or specialized tricks. Given this powerful framework consisting of only Attentions and MLPs, we found four simple components that are essential to multi-class anomaly detection: (1) Scalable foundation Transformers that extracts universal and discriminative features, (2) Noisy Bottleneck where pre-existing Dropouts do all the noise injection tricks, (3) Linear Attention that naturally cannot focus, and (4) Loose Reconstruction that does not force layer-to-layer and point-by-point reconstruction. Extensive experiments are conducted across popular anomaly detection benchmarks including MVTec-AD, VisA, and Real-IAD. Our proposed Dinomaly achieves impressive image-level AUROC of 99.6%, 98.7%, and 89.3% on the three datasets respectively, which is not only superior to state-of-the-art multi-class UAD methods, but also achieves the most advanced class-separated UAD records.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-6",
      "source": "conf-papers",
      "title": "Steady Progress Beats Stagnation: Mutual Aid of Foundation and Conventional Models in Mixed Domain Semi-Supervised Medical Image Segmentation",
      "zhTitle": "医学图像分割相关论文：Steady Progress Beats Stagnation: Mutual Aid of Foundation and Conventional Models in Mixed Domain Semi-Supervised Medical Image Segmentation",
      "venue": "CVPR 2025",
      "score": 32,
      "matchedKeywords": [
        "medical image segmentation",
        "foundation model"
      ],
      "summary": "医学图像分割方向，可作为 OCT/眼底分割和跨域泛化的算法参考。",
      "authors": [
        "Qinghe Ma",
        "Jian Zhang 0090",
        "Zekun Li 0010",
        "Lei Qi 0001",
        "Qian Yu 0007",
        "Yinghuan Shi"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Ma_Steady_Progress_Beats_Stagnation_Mutual_Aid_of_Foundation_and_Conventional_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Ma_Steady_Progress_Beats_Stagnation_Mutual_Aid_of_Foundation_and_Conventional_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.00488",
      "abstract": "Large pretrained visual foundation models exhibit impressive general capabilities. However, the extensive prior knowledge inherent in these models can sometimes be a double-edged sword when adapting them to downstream tasks in specific domains.In the context of semi-supervised medical image segmentation with domain shift, foundation models like MedSAM tend to make overconfident predictions, some of which are incorrect. The error accumulation hinders the effective utilization of unlabeled data and limits further improvements.In this paper, we introduce a Synergistic training framework for Foundation and Conventional models (SynFoC) to address the issue. We observe that a conventional model trained from scratch has the ability to correct the high-confidence mispredictions of the foundation model, while the foundation model can supervise it with high-quality pseudo-labels in the early training stages. Furthermore, to enhance the collaborative training effectiveness of both models and promote reliable convergence towards optimization, the consensus-divergence consistency regularization is proposed. We demonstrate the superiority of our method across four public multi-domain datasets. In particular, our method improves the Dice score by 10.31% on the Prostate dataset. Our code is available in the supplementary material.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-7",
      "source": "conf-papers",
      "title": "Revisiting MAE Pre-training for 3D Medical Image Segmentation",
      "zhTitle": "医学图像分割相关论文：Revisiting MAE Pre-training for 3D Medical Image Segmentation",
      "venue": "CVPR 2025",
      "score": 32,
      "matchedKeywords": [
        "medical image segmentation",
        "self-supervised learning"
      ],
      "summary": "医学图像分割方向，可作为 OCT/眼底分割和跨域泛化的算法参考。",
      "authors": [
        "Tassilo Wald",
        "Constantin Ulrich",
        "Stanislav Lukyanenko",
        "Andrei Goncharov",
        "Alberto Paderno",
        "Maximilian Miller",
        "Leander Maerkisch",
        "Paul F. Jaeger",
        "Klaus H. Maier-Hein"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wald_Revisiting_MAE_Pre-training_for_3D_Medical_Image_Segmentation_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Wald_Revisiting_MAE_Pre-training_for_3D_Medical_Image_Segmentation_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.00489",
      "abstract": "Self-Supervised Learning (SSL) presents an exciting opportunity to unlock the potential of vast, untapped clinical datasets, for various downstream applications that suffer from the scarcity of labeled data. While SSL has revolutionized fields like natural language processing and computer vision, its adoption in 3D medical image computing has been limited by three key pitfalls: Small pre-training dataset sizes, architectures inadequate for 3D medical image analysis, and insufficient evaluation practices. In this paper, we address these issues by i) leveraging a large-scale dataset of 39k 3D brain MRI volumes and ii) using a Residual Encoder U-Net architecture within the state-of-the-art nnU-Net framework. iii) A robust development framework, incorporating 5 development and 8 testing brain MRI segmentation datasets, allowed performance-driven design decisions to optimize the simple concept of Masked Auto En- coders (MAEs) for 3D CNNs. The resulting model not only surpasses previous SSL methods but also outperforms the strong nnU-Net baseline by an average of approximately 3 Dice points setting a new state-of-the-art. Our code and models are made available here.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-8",
      "source": "conf-papers",
      "title": "SemiDAViL: Semi-supervised Domain Adaptation with Vision-Language Guidance for Semantic Segmentation",
      "zhTitle": "视觉语言模型相关论文：SemiDAViL: Semi-supervised Domain Adaptation with Vision-Language Guidance for Semantic Segmentation",
      "venue": "CVPR 2025",
      "score": 32,
      "matchedKeywords": [
        "domain adaptation",
        "vision-language model"
      ],
      "summary": "视觉语言模型方向，可用于图文检索、报告生成和医学问答方法储备。",
      "authors": [
        "Hritam Basak",
        "Zhaozheng Yin"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Basak_SemiDAViL_Semi-supervised_Domain_Adaptation_with_Vision-Language_Guidance_for_Semantic_Segmentation_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Basak_SemiDAViL_Semi-supervised_Domain_Adaptation_with_Vision-Language_Guidance_for_Semantic_Segmentation_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.00917",
      "abstract": "Domain Adaptation (DA) and Semi-supervised Learning (SSL) converge in Semi-supervised Domain Adaptation (SSDA), where the objective is to transfer knowledge from a source domain to a target domain using a combination of limited labeled target samples and abundant unlabeled target data. Although intuitive, a simple amalgamation of DA and SSL is suboptimal in semantic segmentation due to two major reasons: (1) previous methods, while able to learn good segmentation boundaries, are prone to confuse classes with similar visual appearance due to limited supervision; and (2) skewed and imbalanced training data distribution preferring source representation learning whereas impeding from exploring limited information about tailed classes. Language guidance can serve as a pivotal semantic bridge, facilitating robust class discrimination and mitigating visual ambiguities by leveraging the rich semantic relationships encoded in pre-trained language models to enhance feature representations across domains. Therefore, we propose the first language-guided SSDA setting for semantic segmentation in this work. Specifically, we harness the semantic generalization capabilities inherent in vision-language models (VLMs) to establish a synergistic framework within the SSDA paradigm. To address the inherent class-imbalance challenges in long-tailed distributions, we introduce class-balanced segmentation loss formulations that effectively regularize the learning process. Through extensive experimentation across diverse domain adaptation scenarios, our approach demonstrates substantial performance improvements over contemporary state-of-the-art (SoTA) methodologies.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "conf-9",
      "source": "conf-papers",
      "title": "Mamba as a Bridge: Where Vision Foundation Models Meet Vision Language Models for Domain-Generalized Semantic Segmentation",
      "zhTitle": "基础模型相关论文：Mamba as a Bridge: Where Vision Foundation Models Meet Vision Language Models for Domain-Generalized Semantic Segmentation",
      "venue": "CVPR 2025",
      "score": 32,
      "matchedKeywords": [
        "foundation model",
        "vision-language model"
      ],
      "summary": "来自本地推荐结果，点击查看摘要、链接和详细信息。",
      "authors": [
        "Xin Zhang",
        "Robby T. Tan"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Mamba_as_a_Bridge_Where_Vision_Foundation_Models_Meet_Vision_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Mamba_as_a_Bridge_Where_Vision_Foundation_Models_Meet_Vision_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01354",
      "abstract": "Vision Foundation Models (VFMs) and Vision-Language Models (VLMs) have gained traction in Domain Generalized Semantic Segmentation (DGSS) due to their strong generalization capabilities. However, existing DGSS methods often rely exclusively on either VFMs or VLMs, overlooking their complementary strengths. VFMs (e.g., DINOv2) excel at capturing fine-grained features, while VLMs (e.g., CLIP) provide robust text alignment but struggle with coarse granularity. Despite their complementary strengths, effectively integrating VFMs and VLMs with attention mechanisms is challenging, as the increased patch tokens complicate long-sequence modeling. To address this, we propose MFuser, a novel Mamba-based fusion framework that efficiently combines the strengths of VFMs and VLMs while maintaining linear scalability in sequence length. MFuser consists of two key components: MVFuser, which acts as a co-adapter to jointly fine-tune the two models by capturing both sequential and spatial dynamics; and MTEnhancer, a hybrid attention-Mamba module that refines text embeddings by incorporating image priors. Our approach achieves precise feature locality and strong text alignment without incurring significant computational overhead. Extensive experiments demonstrate that MFuser significantly outperforms state-of-the-art DGSS methods, achieving 68.20 mIoU on synthetic-to-real and 71.87 mIoU on real-to-real benchmarks. The code is available at https://github.com/devinxzhang/MFuser.",
      "analysisPath": null,
      "analysisFolder": null,
      "analysisMarkdown": null,
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T09:15:07.902Z"
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTVcMDMtRnJvbS1wcmUtdHJhaW5pbmctdG8tZG93bnN0cmVhbS1wZXJmb3JtYW5jZS1Eb2VzXEZyb21fcHJlLXRyYWluaW5nX3RvX2Rvd25zdHJlYW1fcGVyZm9ybWFuY2VfRG9lc19kb21haW4tc3BlY2lmaWNfcHJlLXRyYWluaW5nX21ha2Vfc2Vuc2UubWQ",
      "source": "paper-note",
      "title": "From pre-training to downstream performance: Does domain-specific pre-training make sense?",
      "zhTitle": "从预训练到下游表现：领域专用预训练是否真的有意义？",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/From_pre-training_to_downstream_performance_Does_domain-specific_pre-training_make_sense.md",
      "folder": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:06:39.784Z",
      "markdown": "---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"http://arxiv.org/abs/2605.08819v1\"\r\n---\r\n\r\n# From pre-training to downstream performance: Does domain-specific pre-training make sense?\r\n\r\n**中文题名**: 从预训练到下游表现：领域专用预训练是否真的有意义？\r\n\r\n## 基本信息\r\n\r\n- **推荐分**: 7.57\r\n- **匹配领域**: optical-coherence-tomography\r\n- **匹配关键词**: OCT, cs.CV, cs.LG\r\n- **arXiv**: http://arxiv.org/abs/2605.08819v1\r\n- **PDF**: https://arxiv.org/pdf/2605.08819v1\r\n\r\n## 摘要速读\r\n\r\n### 中文翻译\r\n\r\n这篇论文系统评估医学影像模型从预训练到下游任务的迁移效果，比较 CNN、Transformer、监督学习、自监督学习以及不同数据模态初始化。其关键结论是，只有当预训练数据和目标任务模态足够接近时，领域专用预训练才会显著提升下游表现；对视网膜 OCT 等任务而言，这直接影响是否值得投入专门的眼科预训练数据。\r\n\r\n### English Original\r\n\r\nDeep learning techniques have revolutionised medical imag- ing, improving diagnostic accuracy and enabling both more accurate and earlier disease detection. However, the relationship between pre-training strategies and downstream performance in medical imaging models re- quires further exploration. Here, we systematically compare convolu- tional neural networks and transformers, examining various pre-training approaches, including supervised and self-supervised learning, as well as different initialisations and data modalities. Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, con- sidering the effects of matching pre-training data with target modalities. Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance. While self-supervised learning can outperform supervised methods, its effec- tiveness varies with context. The study underscores the importance of pre-training strategies to enhance the reliability and effectiveness of deep learning models in medical imaging. By addressing these key factors, our research aims to contribute to the development of more accurate and dependable diagnostic tools, ultimately improving patient outcomes in clinical settings.\r\n\r\n## 为什么值得读\r\n\r\n论文系统比较医学影像模型的多种预训练方式，结论强调只有预训练数据与目标模态足够接近时，下游 OCT 等任务才会明显受益。\r\n\r\n## 研究背景与动机\r\n\r\n医学 AI 常见问题是：到底用自然图像预训练、通用医学预训练，还是为 OCT/眼底等单独收集数据做领域预训练。这个选择直接影响研发成本。\r\n\r\n## 方法概述和架构\r\n\r\n论文比较卷积网络和 Transformer，覆盖监督、自监督、不同初始化和不同模态预训练，并在自然图像、胸片、胸部 CT、视网膜 OCT 等任务上评估。\r\n\r\n## 实验结果分析\r\n\r\n摘要结论指出，只有预训练数据和目标模态高度匹配时，下游任务才明显受益；自监督方法有时优于监督方法，但效果依赖具体场景。\r\n\r\n## 研究价值评估\r\n\r\n对眼科设备 AI 非常实用：如果目标是 OCT 质量控制、病灶检测或分割，构建高质量 OCT 预训练集可能比盲目扩大通用医学数据更有意义。\r\n\r\n## 优势和局限性\r\n\r\n- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。\r\n- **局限**: 需要看各下游任务数据量、评估指标和统计显著性；如果任务过窄或标注集很小，结论可能受实验设置影响。\r\n\r\n## 与相关论文对比\r\n\r\n- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。\r\n- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。\r\n\r\n## 核心要点\r\n\r\n- However, the relationship between pre-training strategies and downstream performance in medical imaging models re- quires further exploration.\r\n- Models are evaluated on natural images, chest X-rays, chest CT and retina OCT images, con- sidering the effects of matching pre-training data with target modalities.\r\n- Our findings indicate that only pre-training on data closely matching the target modality significantly improves downstream performance.\r\n- While self-supervised learning can outperform supervised methods, its effec- tiveness varies with context.\r\n\r\n## 与你的方向的关系\r\n\r\n- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。\r\n- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。\r\n- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。\r\n- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。\r\n\r\n## 提取图片\r\n\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png]]\r\n![[20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png]]\r\n\r\n## 下一步精读问题\r\n\r\n- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？\r\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\r\n- 模型有没有外部验证、跨设备验证和失败案例分析？\r\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\r\n",
      "images": [
        {
          "name": "figure-01-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-01-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-01-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-02-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-02-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-03-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-03-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-04-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-04-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-05-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-05-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p2.png",
          "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Ffigures%2Ffigure-06-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/figures/figure-06-p2.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F03-From-pre-training-to-downstream-performance-Does%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/03-From-pre-training-to-downstream-performance-Does/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTVcMDItT3BoTUFFLUJyaWRnaW5nLVZvbHVtZXRyaWMtYW5kLVBsYW5hci1JbWFnaW5nLXdpXE9waE1BRV9CcmlkZ2luZ19Wb2x1bWV0cmljX2FuZF9QbGFuYXJfSW1hZ2luZ193aXRoX2FfRm91bmRhdGlvbl9Nb2RlbF9mb3JfQWRhcHRpdmVfT3BodGhhbG1vbG9naWNhbF9EaWFnbm9zaXMubWQ",
      "source": "paper-note",
      "title": "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis",
      "zhTitle": "OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/OphMAE_Bridging_Volumetric_and_Planar_Imaging_with_a_Foundation_Model_for_Adaptive_Ophthalmological_Diagnosis.md",
      "folder": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:06:36.575Z",
      "markdown": "---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"http://arxiv.org/abs/2605.02714v1\"\r\n---\r\n\r\n# OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis\r\n\r\n**中文题名**: OphMAE：用眼科基础模型连接三维体数据与二维平面影像以实现自适应诊断\r\n\r\n## 基本信息\r\n\r\n- **推荐分**: 7.73\r\n- **匹配领域**: optical-coherence-tomography\r\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\r\n- **arXiv**: http://arxiv.org/abs/2605.02714v1\r\n- **PDF**: https://arxiv.org/pdf/2605.02714v1\r\n\r\n## 摘要速读\r\n\r\n### 中文翻译\r\n\r\n这篇论文提出 OphMAE 眼科多模态基础模型，用来连接 3D OCT 体数据和 2D en face OCT 平面影像。它的核心目标是解决临床诊断依赖多模态信息、但实际部署中常常缺少三维高端设备的问题。模型通过跨模态融合和自适应推理，在完整多模态和受限单模态场景下都保持较强诊断能力。\r\n\r\n### English Original\r\n\r\nOphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1‡, Zhen Chen2,3‡, Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J. Saykin6,8, Ruogu Fang4*, Yu Huang1*, Jiang Bian1*, Qingyu Chen2* 1Department of Biostatistics and Health Data Science, Indiana University, Indianapolis, IN 2Department of Biomedical Informatics and Data Science, Yale University, New Haven, CT 3Department of Data Science and Artificial Intelligence, The Hong Kong Polytechnic University, Hong Kong 4Department of Biomedical Engineering, University of Florida, Gainesville, FL 5Department of Health Outcomes and Biomedical Informatics, University of Florida, Gainesville, FL 6Radiology & Imaging Sciences, Indiana University, Indianapolis, IN 7Ophthalmology, Indiana University, Indianapolis, IN 8Center for Neuroimaging and Indiana Alzheimer’s Disease Research Center, Indiana University, Indianapolis, IN ‡Contributed Equally *Corresponding authors 1 Abstract The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from\r\n\r\n## 为什么值得读\r\n\r\n论文提出 OphMAE 眼科多模态基础模型，把 3D OCT 体数据和 2D en face OCT 信息结合，并支持在缺少三维设备时用二维输入进行自适应诊断。\r\n\r\n## 研究背景与动机\r\n\r\n眼科诊断常常同时依赖 3D OCT、2D en face 图像和临床上下文，但很多基层或资源受限场景未必拥有完整三维扫描能力。\r\n\r\n## 方法概述和架构\r\n\r\nOphMAE 使用多模态 masked autoencoder 思路预训练，并通过跨模态融合结构学习 3D 体信息和 2D 平面信息之间的互补关系。自适应推理机制让模型能按实际可用输入工作。\r\n\r\n## 实验结果分析\r\n\r\n摘要报告其在 17 个诊断任务上达到较强表现，AMD 和 DME AUC 分别达到 96.9% 和 97.2%；在只有 2D 输入时仍能保持较高性能，并在少量标注样本下保持数据效率。\r\n\r\n## 研究价值评估\r\n\r\n这类模型适合眼科 AI 平台化和设备分层部署：高端 OCT 可用完整模型，低资源筛查设备可用受限输入模型。\r\n\r\n## 优势和局限性\r\n\r\n- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。\r\n- **局限**: 需要重点核对训练数据来源、外部验证中心、不同厂商设备覆盖程度，以及是否公开权重或只公开结果。\r\n\r\n## 与相关论文对比\r\n\r\n- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。\r\n- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。\r\n\r\n## 核心要点\r\n\r\n- OphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1‡, Zhen Chen2,3‡, Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J.\r\n\r\n## 与你的方向的关系\r\n\r\n- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。\r\n- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。\r\n- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。\r\n- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。\r\n\r\n## 提取图片\r\n\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png]]\r\n![[20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png]]\r\n\r\n## 下一步精读问题\r\n\r\n- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？\r\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\r\n- 模型有没有外部验证、跨设备验证和失败案例分析？\r\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\r\n",
      "images": [
        {
          "name": "figure-01-p4.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-01-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-01-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p7.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-02-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-02-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p9.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-03-p9.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-03-p9.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p11.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-04-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-04-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p12.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-05-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-05-p12.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p13.png",
          "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Ffigures%2Ffigure-06-p13.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/figures/figure-06-p13.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/02-OphMAE-Bridging-Volumetric-and-Planar-Imaging-wi/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTVcMDEtU0FJTC1TdHJ1Y3R1cmUtQXdhcmUtSW50ZXJwcmV0YWJsZS1MZWFybmluZy1mb3JcU0FJTF9TdHJ1Y3R1cmUtQXdhcmVfSW50ZXJwcmV0YWJsZV9MZWFybmluZ19mb3JfQW5hdG9teS1BbGlnbmVkX1Bvc3QtaG9jX0V4cGxhbmF0aW9uc19pbl9PQ1QubWQ",
      "source": "paper-note",
      "title": "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT",
      "zhTitle": "SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT.md",
      "folder": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for",
      "date": "2026-05-15",
      "modifiedAt": "2026-05-15T02:06:33.040Z",
      "markdown": "---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"http://arxiv.org/abs/2605.02707v1\"\r\n---\r\n\r\n# SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT\r\n\r\n**中文题名**: SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习\r\n\r\n## 基本信息\r\n\r\n- **推荐分**: 7.77\r\n- **匹配领域**: optical-coherence-tomography\r\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\r\n- **arXiv**: http://arxiv.org/abs/2605.02707v1\r\n- **PDF**: https://arxiv.org/pdf/2605.02707v1\r\n\r\n## 摘要速读\r\n\r\n### 中文翻译\r\n\r\n这篇论文关注 OCT 视网膜疾病诊断模型的可解释性问题。作者认为，常见事后解释方法虽然能给出热力图，但往往难以贴合细小病灶结构、视网膜层边界和真实临床解剖关系。论文提出 SAIL 框架，把视网膜解剖先验融入表征学习，并与语义特征融合，使现有解释方法在不大改模型的情况下产生更清晰、更符合解剖结构的归因图。\r\n\r\n### English Original\r\n\r\nSAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT Tienyu Chang∗ Dept. of BioHealth Informatics, Indiana University Indianapolis, Indiana, USA tienchan@iu.edu Tianhao Li∗ School of Information, University of Texas at Austin Austin, Texas, USA tianhao@utexas.edu Ruogu Fang Dept. of Biomedical Engineering, University of Florida Gainesville, Florida, USA ruogu.fang@bme.ufl.edu Jiang Bian Dept. of Biostatistics and Health Data Science, Indiana University School of Medicine Regenstreif Institute Indianapolis, Indiana, USA bianji@iu.edu Yu Huang Dept. of Biostatistics and Health Data Science, Indiana University School of Medicine Regenstreif Institute Indianapolis, Indiana, USA yh60@iu.edu Abstract Optical coherence tomography (OCT), a commonly used retinal imaging modality, plays a central role in retinal disease diagnosis by providing high-resolution visualization of retinal layers. While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its \"black box\" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval. Existing post-hoc explai\r\n\r\n## 为什么值得读\r\n\r\n论文提出 SAIL 框架，将视网膜解剖先验与语义特征融合，用于提升 OCT 深度学习模型事后解释图的清晰度、边界一致性和临床可信度。\r\n\r\n## 研究背景与动机\r\n\r\nOCT AI 在分类和检测上已经能达到较高准确率，但临床采用仍受可解释性约束。医生需要知道模型关注的是病灶、层结构还是噪声；监管和产品化也需要解释结果稳定、可复核。\r\n\r\n## 方法概述和架构\r\n\r\nSAIL 的思路是把视网膜解剖结构作为先验引入特征表征，再通过融合设计和语义特征结合。这样，后续 Grad-CAM 一类解释工具使用的特征本身就更有结构感。\r\n\r\n## 实验结果分析\r\n\r\n摘要显示，多数据集实验中该方法能让归因图更锐利、更符合视网膜解剖边界。消融实验强调结构先验和语义特征都不可少，二者融合方式会显著影响解释质量。\r\n\r\n## 研究价值评估\r\n\r\n对眼科 AI 产品很有价值，尤其是 OCT 疾病检测、辅助诊断和医生审阅界面。它提供了一种把解释图从“看起来像热力图”推进到“临床上更可相信”的工程路径。\r\n\r\n## 优势和局限性\r\n\r\n- **优势**: 与 OCT、眼科影像或医学 AI 应用场景相关，适合纳入方向跟踪。\r\n- **局限**: 需要阅读全文确认其解释指标是否与医生标注或真实病灶边界强相关，也要关注跨设备、跨疾病和低质量图像下解释是否稳定。\r\n\r\n## 与相关论文对比\r\n\r\n- 可与近期 OCT 可解释性、眼科基础模型、医学影像预训练和 OCT 分割论文对比，重点看数据模态、外部验证和跨设备泛化。\r\n- 如果用于产品研发，建议和已有笔记中的 OCTA、眼轴/生物测量、验光 AI 和仪器质量控制方向串联阅读。\r\n\r\n## 核心要点\r\n\r\n- SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT Tienyu Chang∗ Dept.\r\n- While deep learning (DL) has achieved expert-level accuracy in OCT-based retinal disease detection, its \"black box\" nature poses challenges for clinical adoption, where explainability is essential for clinical trust and regulatory approval.\r\n\r\n## 与你的方向的关系\r\n\r\n- **生物参数/设备测量**: 关注论文是否提供可直接转化为仪器指标、质量控制或测量稳定性的算法。\r\n- **OCT/眼科影像**: 关注数据模态、扫描协议、分割/分类目标和跨设备泛化。\r\n- **验光/近视管理**: 关注是否涉及轴长、屈光状态、近视进展或视觉功能评估。\r\n- **AI 落地**: 关注模型是否支持端到端流程、低资源输入、设备侧部署或临床可解释性。\r\n\r\n## 提取图片\r\n\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png]]\r\n![[20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png]]\r\n\r\n## 下一步精读问题\r\n\r\n- 数据来自哪些设备、中心和人群？是否覆盖真实临床设备差异？\r\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\r\n- 模型有没有外部验证、跨设备验证和失败案例分析？\r\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\r\n",
      "images": [
        {
          "name": "figure-01-p3.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-01-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p4.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-02-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p7.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-03-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p7.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-04-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p11.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-05-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p14.png",
          "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-06-p14.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-15%2F01-SAIL-Structure-Aware-Interpretable-Learning-for%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-15/01-SAIL-Structure-Aware-Interpretable-Learning-for/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTRcMDUtRURVLU5ldFxFRFUtTmV0X1JldGluYWxfUGF0aG9sb2dpY2FsX0ZsdWlkX1NlZ21lbnRhdGlvbl9pbl9PQ1RfSW1hZ2VzX3dpdGhfTXVsdGlzY2FsZV9GZWF0dXJlX0Z1c2lvbl9hbmRfQm91bmRhcnlfT3B0aW1pemF0aW9uLm1k",
      "source": "paper-note",
      "title": "EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization",
      "zhTitle": "EDU-Net：结合多尺度特征融合与边界优化的 OCT 视网膜病理性液体分割",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14/05-EDU-Net/EDU-Net_Retinal_Pathological_Fluid_Segmentation_in_OCT_Images_with_Multiscale_Feature_Fusion_and_Boundary_Optimization.md",
      "folder": "20_Research/Papers/2026-05-14/05-EDU-Net",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T07:50:20.738Z",
      "markdown": "---\ntags: [\"paper-images\", \"ophthalmology\", \"OCT\", \"segmentation\"]\nsource: \"http://arxiv.org/abs/2604.20918v1\"\n---\n\n# EDU-Net: Retinal Pathological Fluid Segmentation in OCT Images with Multiscale Feature Fusion and Boundary Optimization\n\n**中文题名**: EDU-Net：结合多尺度特征融合与边界优化的 OCT 视网膜病理性液体分割\n\n## 基本信息\n\n- **作者**: Zijun Lei, Zikang Xu, Liang Zhang, Ge Song, Hanyu Guo, Dan Cao, Yujia Zhou, Qianjin Feng\n- **链接**: [arXiv](http://arxiv.org/abs/2604.20918v1)\n- **PDF**: [paper.pdf](paper.pdf)\n- **图片来源**: PDF fallback\n\n## 图片索引\n\n![[image-index.md]]\n\n## 说明\n\n本目录由 extract-paper-images 创建。已优先尝试 arXiv source 包，但 e-print 返回 PDF，因此改用 PDF 图片提取。\n",
      "images": [
        {
          "name": "figure-01-p23.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-01-p23.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-01-p23.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-01-p23.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-02-p24.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-02-p24.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-02-p24.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-02-p24.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-03-p25.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-03-p25.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-03-p25.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-03-p25.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-04-p26.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-04-p26.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-04-p26.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-04-p26.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-05-p27.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-05-p27.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-05-p27.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-05-p27.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-06-p28.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-06-p28.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-06-p28.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-06-p28.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-07-p29.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-07-p29.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-07-p29.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-07-p29.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-08-p30.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-08-p30.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-08-p30.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-08-p30.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-09-p31.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-09-p31.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-09-p31.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-09-p31.png",
          "sourceDir": "images"
        },
        {
          "name": "figure-10-p32.png",
          "path": "20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-10-p32.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fimages%2Ffigure-10-p32.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/images/figure-10-p32.png",
          "sourceDir": "images"
        }
      ],
      "imageCount": 10,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/05-EDU-Net/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F05-EDU-Net%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/05-EDU-Net/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTRcMDQtUHViTWVkLU9waHRoYVxQdWJNZWQtT3BodGhhX0FuX29wZW5fcmVzb3VyY2VfZm9yX3RyYWluaW5nX29waHRoYWxtb2xvZ3lfdmlzaW9uLWxhbmd1YWdlX21vZGVsc19vbl9zY2llbnRpZmljX2xpdGVyYXR1cmUubWQ",
      "source": "paper-note",
      "title": "PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature",
      "zhTitle": "PubMed-Ophtha：用于训练眼科视觉语言模型的科学文献开放资源",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/PubMed-Ophtha_An_open_resource_for_training_ophthalmology_vision-language_models_on_scientific_literature.md",
      "folder": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T07:35:06.441Z",
      "markdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"vision-language-model\", \"dataset\"]\naliases:\n  - \"PubMed-Ophtha\"\n  - \"眼科视觉语言模型文献图文数据集\"\nsource: \"http://arxiv.org/abs/2605.02720v1\"\n---\n\n# PubMed-Ophtha: An open resource for training ophthalmology vision-language models on scientific literature\n\n**中文题名**: PubMed-Ophtha：用于训练眼科视觉语言模型的科学文献开放资源\n\n## 基本信息\n\n- **作者**: Verena Jasmin Hallitschke, Carsten Eickhoff, Philipp Berens\n- **来源**: arXiv\n- **日期**: 2026-05-04\n- **链接**: [arXiv](http://arxiv.org/abs/2605.02720v1)\n- **PDF**: [paper.pdf](paper.pdf)\n- **研究方向**: 眼科视觉语言模型、医学图文数据集、OCT/眼底图像、科学文献图像挖掘\n- **关键词**: ophthalmology, vision-language model, PubMed Central, OCT, fundus photography, image-caption dataset\n\n## 摘要翻译\n\n视觉语言模型在眼科中具有很大潜力，但它们的发展依赖大规模、高质量的图像-文本数据集，而这类资源仍然稀缺。本文提出 PubMed-Ophtha，这是一个从 PubMed Central 开放获取论文中提取的层次化眼科图文数据集，包含 102,023 对眼科图像-图注，来源于 15,842 篇开放获取文章。与已有数据集不同，该数据集直接从论文 PDF 中以完整分辨率提取图像，并进一步拆解为图版、图版标识符和单张图像。每张图像都标注了成像模态，例如彩色眼底照相、OCT、视网膜影像或其他类型，并标注是否存在箭头等人工标记。论文还使用两阶段 LLM 方法将整段图注拆分为 panel 级子图注，在人工标注数据上达到 0.913 的平均句子 BLEU。Panel 和图像检测模型分别达到 mAP@0.50 为 0.909 和 0.892，图像提取的中位 IoU 达到 0.997。为支持可复现性，作者还发布了人工标注的 ground-truth 数据、训练模型和完整的数据生成流水线。\n\n## 要点提炼\n\n- 数据集规模大：102,023 对眼科图像-文本对，来自 15,842 篇 PubMed Central 开放论文。\n- 数据来源贴近科研语境：直接从论文 PDF 提取图像和图注，而不是只依赖临床数据集或网页图片。\n- 数据结构层次清晰：从 figure 到 panel，再到 individual image，并保留 panel identifier 和子图注。\n- 标注了眼科关键成像模态，包括 fundus photography、OCT、retinal imaging 等。\n- 提供检测模型、人工标注数据和完整生成流程，有利于复现和扩展。\n\n## 研究背景与动机\n\n眼科 AI 过去主要依赖结构化临床数据集，例如眼底照相、OCT B-scan、疾病标签或分割标注。这类数据对诊断模型训练很重要，但对视觉语言模型来说还不够：VLM 需要图像和自然语言之间的对应关系，包括图像描述、医学术语、病灶位置、图像模态和上下文解释。\n\n科学论文天然包含大量高质量眼科图像和专家撰写的图注，尤其是 OCT、眼底照相、OCTA、组织图像和多 panel 组合图。但这些信息通常嵌在 PDF 中，结构复杂，不能直接用于模型训练。PubMed-Ophtha 的动机就是把开放文献中的眼科图像和图注系统化提取出来，构建可训练眼科 VLM 的开放资源。\n\n## 方法概述和架构\n\n论文的方法可以理解为一个“文献 PDF 到眼科图文数据集”的自动化流水线：\n\n1. **论文筛选**: 从 PubMed Central 开放获取文章中筛选眼科相关论文。\n2. **PDF 图像提取**: 从 PDF 中提取完整分辨率 figure。\n3. **Panel 和单图分解**: 将多 panel figure 拆分为 panel、panel label 和 individual image。\n4. **图注拆分**: 使用两阶段 LLM 方法把整段 caption 拆分成 panel-level subcaption。\n5. **模态标注**: 给每张图像标注 imaging modality，例如彩色眼底照相、OCT、retinal imaging 或其他。\n6. **标记状态识别**: 标注图像中是否有箭头、框线等 annotation marks。\n7. **质量验证**: 使用人工标注 ground truth 评估 panel detection、image detection、figure extraction 和 caption splitting。\n\n这个架构对你的方向很有启发：它不是单纯训练诊断模型，而是在构建一个眼科 AI 的基础数据层，后续可服务于 OCT 图像理解、报告生成、检索问答和多模态预训练。\n\n## 实验结果分析\n\n论文报告了几个关键指标：\n\n- 数据规模：102,023 对 image-caption pairs。\n- 来源规模：15,842 篇 PubMed Central 开放获取眼科文章。\n- 图注拆分：mean average sentence BLEU 为 0.913，说明 LLM 辅助拆分与人工标注较接近。\n- Panel 检测：mAP@0.50 为 0.909。\n- Image 检测：mAP@0.50 为 0.892。\n- Figure extraction：median IoU 为 0.997，说明从 PDF 中定位和裁剪图像非常准确。\n\n这些结果说明该流水线在“从文献 PDF 中可靠提取眼科图文数据”这一任务上已经比较成熟。不过，模型训练效果本身不是本文唯一重点；更核心的贡献是数据资源和数据构建方法。\n\n## 研究价值评估\n\n对你的兴趣方向，这篇论文的价值主要有三点：\n\n- **眼科 AI 基础设施价值**: PubMed-Ophtha 可以作为眼科视觉语言模型、图文检索和医学图像问答的预训练数据来源。\n- **OCT/眼底图像语义理解**: 数据集中包含 OCT、fundus photography、retinal imaging 等模态，有助于模型学习不同眼科设备图像与文本描述的关系。\n- **仪器研发辅助**: 对设备厂商或算法团队而言，论文图像和图注中包含大量设备成像案例、病灶描述和实验图示，可用于构建知识库或辅助模型理解。\n\n它不直接解决生物参数测量仪或验光仪的测量问题，但能为“眼科设备图像 + 文本解释 + 知识问答”打基础。\n\n## 优势和局限性\n\n**优势**:\n\n- 数据规模大，而且来源于开放科学文献，医学语义密度高。\n- 覆盖多种眼科图像模态，包括 OCT 和眼底照相。\n- 数据层次结构细，支持 figure/panel/image/subcaption 多粒度训练。\n- 提供人工标注数据、模型和生成流水线，便于复现。\n- 对眼科 VLM 和文献图像挖掘方向非常实用。\n\n**局限性**:\n\n- 文献图像分布不一定等同于真实临床设备输出，可能存在发表偏倚和图像后处理偏倚。\n- 图注语言偏科研论文风格，和临床报告、设备报告、验光报告存在差异。\n- 图像中可能包含合成示意图、统计图、流程图，并非全部是原始医学影像。\n- 对中文眼科语料、中文报告生成和国内设备数据的支持需要后续扩展。\n- 数据集可用于预训练，但具体诊断任务仍需要高质量临床标注验证。\n\n## 与相关论文对比\n\n- [[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/Imaging-formulation-based_numerical_speckle_reduction_for_optical_coherence_tomography|OCT 数值散斑抑制]]: 该论文关注 OCT 图像质量增强，是设备/成像算法层面的工作；PubMed-Ophtha 更偏数据基础设施和多模态训练资源。\n- [[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT|SAIL]]: SAIL 关注 OCT 模型解释性；PubMed-Ophtha 可为类似眼科 VLM 或解释模型提供图文训练语料。\n- [[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography|OCT 异常无监督检测]]: 该论文关注无标注异常检测；PubMed-Ophtha 则从文献中构建弱监督/图文监督资源，两者都在降低眼科 AI 对昂贵标注的依赖。\n- OphMAE: 更偏 OCT foundation model 训练；PubMed-Ophtha 更偏 ophthalmology VLM 数据集，可作为未来眼科多模态基础模型的数据来源之一。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-01-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-02-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-03-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-04-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-05-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-06-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-07-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-08-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-09-p2.png]]\n![[20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-10-p2.png]]\n\n## 知识图谱链接\n\n- **相关主题**: [[OCT]], [[眼科AI]], [[视觉语言模型]], [[医学图像数据集]], [[眼底图像]], [[科学文献图像挖掘]]\n- **相关论文**: [[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT|SAIL]], [[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography|OCT 异常检测]], [[OphMAE]]\n- **可复用概念**: [[Panel detection]], [[Image-caption dataset]], [[Ophthalmology VLM]], [[PMC 文献挖掘]]\n\n## 下一步精读问题\n\n- 数据集中的 OCT 图像占比是多少？是否区分 OCT、OCTA、en face OCT 和 B-scan？\n- 图像模态标注是否足够细，能否支持设备类型或扫描部位级别的过滤？\n- 该数据集训练出的 VLM 在真实临床 OCT/眼底问答上表现如何？\n- 是否能扩展到中文眼科论文、中文设备报告和中文临床报告？\n- 对生物参数测量仪、验光仪报告截图，是否可以复用类似 PDF/图像-文本抽取流水线？\n",
      "images": [
        {
          "name": "figure-01-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-01-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-01-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-01-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-02-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-02-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-02-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-03-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-03-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-03-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-04-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-04-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-04-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-05-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-05-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-05-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-06-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-06-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-06-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-07-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-07-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-07-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-07-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-08-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-08-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-08-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-08-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-09-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-09-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-09-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-09-p2.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-10-p2.png",
          "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-10-p2.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Ffigures%2Ffigure-10-p2.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/figures/figure-10-p2.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 10,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/04-PubMed-Ophtha/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F04-PubMed-Ophtha%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/04-PubMed-Ophtha/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTRcMDMtQW5hdG9teS1Bd2FyZS1VbnN1cGVydmlzZWQtRGV0ZWN0aW9uLWFuZC1Mb2NhbGl6XEFuYXRvbXktQXdhcmVfVW5zdXBlcnZpc2VkX0RldGVjdGlvbl9hbmRfTG9jYWxpemF0aW9uX29mX1JldGluYWxfQWJub3JtYWxpdGllc19pbl9PcHRpY2FsX0NvaGVyZW5jZV9Ub21vZ3JhcGh5Lm1k",
      "source": "paper-note",
      "title": "Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography",
      "zhTitle": "基于解剖感知的 OCT 视网膜异常无监督检测与定位",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/Anatomy-Aware_Unsupervised_Detection_and_Localization_of_Retinal_Abnormalities_in_Optical_Coherence_Tomography.md",
      "folder": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T07:22:38.932Z",
      "markdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"http://arxiv.org/abs/2604.22139v1\"\n---\n\n# Anatomy-Aware Unsupervised Detection and Localization of Retinal Abnormalities in Optical Coherence Tomography\n\n**中文题名**: 基于解剖感知的 OCT 视网膜异常无监督检测与定位\n\n## 基本信息\n\n- **推荐分**: 8.79\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.LG\n- **arXiv**: http://arxiv.org/abs/2604.22139v1\n- **PDF**: https://arxiv.org/pdf/2604.22139v1\n\n## 摘要速读\n\n这篇论文面向 OCT 视网膜异常检测中的标注成本问题，提出一种无监督异常检测和定位框架。它先学习健康视网膜的正常解剖结构分布，再在推理时通过重建差异发现异常区域。论文还加入视网膜层感知监督和结构化 triplet learning，以提升在不同病灶、设备和数据集之间的泛化能力。\n\n## 为什么值得读\n\n这篇论文面向 OCT 视网膜异常检测中的标注成本问题，提出一种无监督异常检测和定位框架。它先学习健康视网膜的正常解剖结构分布，再在推理时通过重建差异发现异常区域。论文还加入视网膜层感知监督和结构化 triplet learning，以提升在不同病灶、设备和数据集之间的泛化能力。\n\n## 核心要点\n\n- 不依赖病灶级人工标注，适合缺少大规模专家标注的真实临床环境。\n- 通过离散潜变量模型学习正常 OCT B-scan 的结构模式。\n- 推理时可同时给出图像级异常判断和像素级异常定位。\n- 在 Kermany、Srinivasan 和 RETOUCH 等数据集上展示跨数据集泛化，强调 domain adaptation 能力。\n\n## 与你的方向的关系\n\n- 适合作为 OCT 设备端异常筛查或质量分诊模块的算法基础。\n- 可用于发现未知或少见异常，而不局限于训练集中已有疾病标签。\n- 后续需要重点看误报控制、异常热图是否可解释，以及外部设备数据上的稳定性。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-01-p4.png]]\n![[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-02-p5.png]]\n![[20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-03-p6.png]]\n\n## 下一步精读问题\n\n- 数据来自哪些 OCT 设备、扫描协议和中心？是否覆盖真实临床设备差异？\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\n- 模型或算法有没有外部验证、跨设备验证和失败案例分析？\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\n",
      "images": [
        {
          "name": "figure-01-p4.png",
          "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-01-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Ffigures%2Ffigure-01-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-01-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p5.png",
          "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-02-p5.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Ffigures%2Ffigure-02-p5.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-02-p5.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p6.png",
          "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-03-p6.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Ffigures%2Ffigure-03-p6.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/figures/figure-03-p6.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 3,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F03-Anatomy-Aware-Unsupervised-Detection-and-Localiz%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/03-Anatomy-Aware-Unsupervised-Detection-and-Localiz/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTRcMDEtSW1hZ2luZy1mb3JtdWxhdGlvbi1iYXNlZC1udW1lcmljYWwtc3BlY2tsZS1yZWR1XEltYWdpbmctZm9ybXVsYXRpb24tYmFzZWRfbnVtZXJpY2FsX3NwZWNrbGVfcmVkdWN0aW9uX2Zvcl9vcHRpY2FsX2NvaGVyZW5jZV90b21vZ3JhcGh5Lm1k",
      "source": "paper-note",
      "title": "Imaging-formulation-based numerical speckle reduction for optical coherence tomography",
      "zhTitle": "基于成像公式的 OCT 数值散斑抑制方法",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/Imaging-formulation-based_numerical_speckle_reduction_for_optical_coherence_tomography.md",
      "folder": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T07:22:38.931Z",
      "markdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"http://arxiv.org/abs/2605.13443v1\"\n---\n\n# Imaging-formulation-based numerical speckle reduction for optical coherence tomography\n\n**中文题名**: 基于成像公式的 OCT 数值散斑抑制方法\n\n## 基本信息\n\n- **推荐分**: 9.34\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, swept-source OCT, physics.optics\n- **arXiv**: http://arxiv.org/abs/2605.13443v1\n- **PDF**: https://arxiv.org/pdf/2605.13443v1\n\n## 摘要速读\n\n这篇论文针对 OCT 图像中固有的散斑噪声问题，提出一种基于 OCT 成像公式的数值散斑抑制方法。它的重点不是增加硬件采集次数，而是利用单次体积采集中的复 en face OCT 信号，通过 shifted-complex-conjugate-product 和平均策略调制散斑，从而在保持横向分辨率的同时提升图像可读性。\n\n## 为什么值得读\n\n这篇论文针对 OCT 图像中固有的散斑噪声问题，提出一种基于 OCT 成像公式的数值散斑抑制方法。它的重点不是增加硬件采集次数，而是利用单次体积采集中的复 en face OCT 信号，通过 shifted-complex-conjugate-product 和平均策略调制散斑，从而在保持横向分辨率的同时提升图像可读性。\n\n## 核心要点\n\n- 从 OCT 成像机理出发建模散斑，而不是单纯使用通用图像去噪网络。\n- 方法只依赖单次体积采集，理论上更容易嵌入现有 OCT 设备的软件处理链。\n- 在点扩散函数体模、肿瘤球体和斑马鱼眼样本上验证了对比噪声比与等效 looks 数的提升。\n- 论文特别强调保留图像锐度和分辨率，这对后续层分割、病灶检测和定量测量很重要。\n\n## 与你的方向的关系\n\n- 对 OCT 设备图像质量提升非常直接，可作为散斑抑制算法模块参考。\n- 适合关注 swept-source OCT、full-field OCT 或单次扫描质量增强的仪器研发场景。\n- 后续可重点检查算法是否支持实时处理、不同组织样本和临床视网膜 OCT 数据。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png]]\n![[20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png]]\n\n## 下一步精读问题\n\n- 数据来自哪些 OCT 设备、扫描协议和中心？是否覆盖真实临床设备差异？\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\n- 模型或算法有没有外部验证、跨设备验证和失败案例分析？\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\n",
      "images": [
        {
          "name": "figure-01-p10.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-01-p10.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-01-p10.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p10.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-02-p10.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-02-p10.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p10.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-03-p10.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-03-p10.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p11.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-04-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-04-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p12.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-05-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-05-p12.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p12.png",
          "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Ffigures%2Ffigure-06-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/figures/figure-06-p12.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F01-Imaging-formulation-based-numerical-speckle-redu%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/01-Imaging-formulation-based-numerical-speckle-redu/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTRcMDItU0FJTC1TdHJ1Y3R1cmUtQXdhcmUtSW50ZXJwcmV0YWJsZS1MZWFybmluZy1mb3JcU0FJTF9TdHJ1Y3R1cmUtQXdhcmVfSW50ZXJwcmV0YWJsZV9MZWFybmluZ19mb3JfQW5hdG9teS1BbGlnbmVkX1Bvc3QtaG9jX0V4cGxhbmF0aW9uc19pbl9PQ1QubWQ",
      "source": "paper-note",
      "title": "SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT",
      "zhTitle": "SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/SAIL_Structure-Aware_Interpretable_Learning_for_Anatomy-Aligned_Post-hoc_Explanations_in_OCT.md",
      "folder": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T07:22:38.931Z",
      "markdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"http://arxiv.org/abs/2605.02707v1\"\n---\n\n# SAIL: Structure-Aware Interpretable Learning for Anatomy-Aligned Post-hoc Explanations in OCT\n\n**中文题名**: SAIL：面向 OCT 解剖结构对齐事后解释的结构感知可解释学习\n\n## 基本信息\n\n- **推荐分**: 9.15\n- **匹配领域**: optical-coherence-tomography\n- **匹配关键词**: optical coherence tomography, OCT, cs.CV, cs.AI\n- **arXiv**: http://arxiv.org/abs/2605.02707v1\n- **PDF**: https://arxiv.org/pdf/2605.02707v1\n\n## 摘要速读\n\nSAIL 关注 OCT AI 模型的临床可解释性问题。传统 Grad-CAM 等事后解释方法经常热区模糊、跨越解剖边界或受噪声影响，难以让医生信任。论文提出把视网膜解剖结构先验融入表示学习，再与语义特征融合，使常规事后解释方法能产生更清晰、更符合视网膜层结构的归因图。\n\n## 为什么值得读\n\nSAIL 关注 OCT AI 模型的临床可解释性问题。传统 Grad-CAM 等事后解释方法经常热区模糊、跨越解剖边界或受噪声影响，难以让医生信任。论文提出把视网膜解剖结构先验融入表示学习，再与语义特征融合，使常规事后解释方法能产生更清晰、更符合视网膜层结构的归因图。\n\n## 核心要点\n\n- 问题定义非常贴近临床落地：不是只提高分类准确率，而是提升解释图的解剖可信度。\n- 核心设计是结构先验与语义特征融合，让解释结果更贴近 retinal layer 和 lesion structure。\n- 方法不要求替换所有后处理解释工具，而是改善模型表示，使现有解释方法受益。\n- 消融实验强调结构先验和语义特征二者都重要，融合策略会影响最终解释质量。\n\n## 与你的方向的关系\n\n- 适合用于 OCT AI 辅助诊断系统的医生可解释界面。\n- 对设备软件很有价值，可以把模型判断与解剖层结构、病灶位置一起展示。\n- 后续应关注其结构先验来源、是否依赖额外分割标签，以及跨设备 OCT 数据泛化能力。\n\n## 提取图片\n\n![[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png]]\n![[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png]]\n![[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png]]\n![[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png]]\n![[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png]]\n![[20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png]]\n\n## 下一步精读问题\n\n- 数据来自哪些 OCT 设备、扫描协议和中心？是否覆盖真实临床设备差异？\n- 输出指标是否能映射到生物测量仪、OCT 或验光仪的实际产品参数？\n- 模型或算法有没有外部验证、跨设备验证和失败案例分析？\n- 如果用于设备端，推理速度、模型大小、质量控制和不确定性如何处理？\n",
      "images": [
        {
          "name": "figure-01-p3.png",
          "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-01-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-01-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p4.png",
          "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-02-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-02-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p7.png",
          "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-03-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-03-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p7.png",
          "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-04-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-04-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p11.png",
          "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-05-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-05-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p14.png",
          "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Ffigures%2Ffigure-06-p14.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/figures/figure-06-p14.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14%2F02-SAIL-Structure-Aware-Interpretable-Learning-for%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14/02-SAIL-Structure-Aware-Interpretable-Learning-for/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTQtYXJjaGl2ZVwwMS1PcGhNQUVcT3BoTUFFX0JyaWRnaW5nX1ZvbHVtZXRyaWNfYW5kX1BsYW5hcl9JbWFnaW5nX3dpdGhfYV9Gb3VuZGF0aW9uX01vZGVsX2Zvcl9BZGFwdGl2ZV9PcGh0aGFsbW9sb2dpY2FsX0RpYWdub3Npcy5tZA",
      "source": "paper-note",
      "title": "OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis",
      "zhTitle": "",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/OphMAE_Bridging_Volumetric_and_Planar_Imaging_with_a_Foundation_Model_for_Adaptive_Ophthalmological_Diagnosis.md",
      "folder": "20_Research/Papers/2026-05-14-archive/01-OphMAE",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T06:53:34.445Z",
      "markdown": "---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"https://arxiv.org/abs/2605.02714\"\n---\n\n# OphMAE: Bridging Volumetric and Planar Imaging with a Foundation Model for Adaptive Ophthalmological Diagnosis\n\n## 鍩烘湰淇℃伅\n\n- **鎺ㄨ崘鍒?*: 3.00\n- **鍖归厤棰嗗煙**: optical-coherence-tomography, ai-ophthalmology\n- **鍖归厤鍏抽敭璇?*: OCT, ophthalmic AI, foundation model, multimodal imaging\n- **arXiv**: https://arxiv.org/abs/2605.02714\n- **PDF**: https://arxiv.org/pdf/2605.02714\n\n## 鎽樿閫熻\n\nOphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1鈥? Zhen Chen2,3鈥? Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J. Saykin6,8, Ruogu Fang4*, Yu Huang1*, Jiang Bian1*, Qingyu Chen2* 1Department of Biostatistics and Health Data Science, Indiana University, Indianapolis, IN 2Department of Biomedical Informatics and Data Science, Yale University, New Haven, CT 3Department of Data Science and Artificial Intelligence, The Hong Kong Polytechnic University, Hong Kong 4Department of Biomedical Engineering, University of Florida, Gainesville, FL 5Department of Health Outcomes and Biomedical Informatics, University of Florida, Gainesville, FL 6Radiology & Imaging Sciences, Indiana University, Indianapolis, IN 7Ophthalmology, Indiana University, Indianapolis, IN 8Center for Neuroimaging and Indiana Alzheimer鈥檚 Disease Research Center, Indiana University, Indianapolis, IN 鈥ontributed Equally *Corresponding authors 1 Abstract The advent of foundation models has heralded a new era in medical artificial intelligence (AI), enabling the extraction of generalizable representations from\n\n## 涓轰粈涔堝€煎緱璇?\n\nOphMAE 鐢?3D OCT 涓?2D en face OCT 鐨勫妯℃€?masked autoencoder锛屾瀯寤洪潰鍚戠溂绉戣瘖鏂殑鑷€傚簲 foundation model銆?\n\n## 鏍稿績瑕佺偣\n\n- OphMAE: Bridging Volumetric and Planar Imaging with a Foun- dation Model for Adaptive Ophthalmological Diagnosis Tienyu Chang1鈥? Zhen Chen2,3鈥? Renjie Liang5, Jinyu Ding2, Jie Xu5, Sunu Mathew6,7, Amir Reza Hajrasouliha7, Andrew J.\n\n## 涓庝綘鐨勬柟鍚戠殑鍏崇郴\n\n- **鐢熺墿鍙傛暟/璁惧娴嬮噺**: 鍏虫敞璁烘枃鏄惁鎻愪緵鍙洿鎺ヨ浆鍖栦负浠櫒鎸囨爣銆佽川閲忔帶鍒舵垨娴嬮噺绋冲畾鎬х殑绠楁硶銆?\n- **OCT/鐪肩褰卞儚**: 鍏虫敞鏁版嵁妯℃€併€佹壂鎻忓崗璁€佸垎鍓?鍒嗙被鐩爣鍜岃法璁惧娉涘寲銆?\n- **楠屽厜/杩戣绠＄悊**: 鍏虫敞鏄惁娑夊強杞撮暱銆佸眻鍏夌姸鎬併€佽繎瑙嗚繘灞曟垨瑙嗚鍔熻兘璇勪及銆?\n- **AI 钀藉湴**: 鍏虫敞妯″瀷鏄惁鏀寔绔埌绔祦绋嬨€佷綆璧勬簮杈撳叆銆佽澶囦晶閮ㄧ讲鎴栦复搴婂彲瑙ｉ噴鎬с€?\n\n## 鎻愬彇鍥剧墖\n\n![[20_Research/Papers/2026-05-14/01-OphMAE/figures/figure-01-p4.png]]\n![[20_Research/Papers/2026-05-14/01-OphMAE/figures/figure-02-p7.png]]\n![[20_Research/Papers/2026-05-14/01-OphMAE/figures/figure-03-p9.png]]\n![[20_Research/Papers/2026-05-14/01-OphMAE/figures/figure-04-p11.png]]\n![[20_Research/Papers/2026-05-14/01-OphMAE/figures/figure-05-p12.png]]\n![[20_Research/Papers/2026-05-14/01-OphMAE/figures/figure-06-p13.png]]\n\n## 涓嬩竴姝ョ簿璇婚棶棰?\n\n- 鏁版嵁鏉ヨ嚜鍝簺璁惧銆佷腑蹇冨拰浜虹兢锛熸槸鍚﹁鐩栫湡瀹炰复搴婅澶囧樊寮傦紵\n- 杈撳嚭鎸囨爣鏄惁鑳芥槧灏勫埌鐢熺墿娴嬮噺浠€丱CT 鎴栭獙鍏変华鐨勫疄闄呬骇鍝佸弬鏁帮紵\n- 妯″瀷鏈夋病鏈夊閮ㄩ獙璇併€佽法璁惧楠岃瘉鍜屽け璐ユ渚嬪垎鏋愶紵\n- 濡傛灉鐢ㄤ簬璁惧绔紝鎺ㄧ悊閫熷害銆佹ā鍨嬪ぇ灏忋€佽川閲忔帶鍒跺拰涓嶇‘瀹氭€у浣曞鐞嗭紵\n\n",
      "images": [
        {
          "name": "figure-01-p4.png",
          "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-01-p4.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Ffigures%2Ffigure-01-p4.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-01-p4.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p7.png",
          "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-02-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Ffigures%2Ffigure-02-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-02-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p9.png",
          "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-03-p9.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Ffigures%2Ffigure-03-p9.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-03-p9.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p11.png",
          "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-04-p11.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Ffigures%2Ffigure-04-p11.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-04-p11.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p12.png",
          "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-05-p12.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Ffigures%2Ffigure-05-p12.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-05-p12.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p13.png",
          "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-06-p13.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Ffigures%2Ffigure-06-p13.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/figures/figure-06-p13.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14-archive/01-OphMAE/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F01-OphMAE%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/01-OphMAE/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTQtYXJjaGl2ZVwwMy1NSVJBR0VcTUlSQUdFX011bHRpbW9kYWxfZm91bmRhdGlvbl9tb2RlbF9hbmRfYmVuY2htYXJrX2Zvcl9jb21wcmVoZW5zaXZlX3JldGluYWxfT0NUX2ltYWdlX2FuYWx5c2lzLm1k",
      "source": "paper-note",
      "title": "MIRAGE: Multimodal foundation model and benchmark for comprehensive retinal OCT image analysis",
      "zhTitle": "",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/MIRAGE_Multimodal_foundation_model_and_benchmark_for_comprehensive_retinal_OCT_image_analysis.md",
      "folder": "20_Research/Papers/2026-05-14-archive/03-MIRAGE",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T06:44:36.169Z",
      "markdown": "﻿---\r\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\r\nsource: \"https://arxiv.org/abs/2506.08900\"\r\n---\r\n\r\n# MIRAGE: Multimodal foundation model and benchmark for comprehensive retinal OCT image analysis\r\n\r\n## 鍩烘湰淇℃伅\r\n\r\n- **鎺ㄨ崘鍒?*: 2.80\r\n- **鍖归厤棰嗗煙**: optical-coherence-tomography, ai-ophthalmology\r\n- **鍖归厤鍏抽敭璇?*: OCT, SLO, foundation model, segmentation, benchmark\r\n- **arXiv**: https://arxiv.org/abs/2506.08900\r\n- **PDF**: https://arxiv.org/pdf/2506.08900\r\n\r\n## 鎽樿閫熻\r\n\r\nArtificial intelligence (AI) has become a fundamental tool for assisting clinicians in an- alyzing ophthalmic images, such as optical coherence tomography (OCT). However, devel- oping AI models often requires extensive annotation, and existing models tend to under- perform on independent, unseen data. Foundation models (FMs), large AI models trained on vast unlabeled datasets, have shown promise in overcoming these challenges. Nonethe- less, available FMs for ophthalmology lack extensive validation, especially for segmentation tasks, and focus on a single imaging modality. In this context, we propose MIRAGE, a novel multimodal FM for the analysis of OCT and scanning laser ophthalmoscopy (SLO) images. Additionally, we propose a new evaluation benchmark with OCT/SLO classifi- cation and segmentation tasks. The comparison with general and specialized FMs and segmentation methods shows the superiority of MIRAGE in both types of tasks, highlight- ing its suitability as a basis for the development of robust AI systems for retinal OCT image analysis. Both MIRAGE and the evaluation benchmark are publicly available at https://github.com/j-morano/MIRAGE.\r\n\r\n## 涓轰粈涔堝€煎緱璇?\n\r\nMIRAGE 闈㈠悜 OCT 鍜?SLO 鍥惧儚鎻愬嚭澶氭ā鎬?foundation model锛屽苟缁欏嚭鍖呭惈鍒嗙被鍜屽垎鍓蹭换鍔＄殑鏂板熀鍑嗐€?\n\r\n## 鏍稿績瑕佺偣\r\n\r\n- Artificial intelligence (AI) has become a fundamental tool for assisting clinicians in an- alyzing ophthalmic images, such as optical coherence tomography (OCT).\r\n- However, devel- oping AI models often requires extensive annotation, and existing models tend to under- perform on independent, unseen data.\r\n- Foundation models (FMs), large AI models trained on vast unlabeled datasets, have shown promise in overcoming these challenges.\r\n- Nonethe- less, available FMs for ophthalmology lack extensive validation, especially for segmentation tasks, and focus on a single imaging modality.\r\n\r\n## 涓庝綘鐨勬柟鍚戠殑鍏崇郴\r\n\r\n- **鐢熺墿鍙傛暟/璁惧娴嬮噺**: 鍏虫敞璁烘枃鏄惁鎻愪緵鍙洿鎺ヨ浆鍖栦负浠櫒鎸囨爣銆佽川閲忔帶鍒舵垨娴嬮噺绋冲畾鎬х殑绠楁硶銆?\n- **OCT/鐪肩褰卞儚**: 鍏虫敞鏁版嵁妯℃€併€佹壂鎻忓崗璁€佸垎鍓?鍒嗙被鐩爣鍜岃法璁惧娉涘寲銆?\n- **楠屽厜/杩戣绠＄悊**: 鍏虫敞鏄惁娑夊強杞撮暱銆佸眻鍏夌姸鎬併€佽繎瑙嗚繘灞曟垨瑙嗚鍔熻兘璇勪及銆?\n- **AI 钀藉湴**: 鍏虫敞妯″瀷鏄惁鏀寔绔埌绔祦绋嬨€佷綆璧勬簮杈撳叆銆佽澶囦晶閮ㄧ讲鎴栦复搴婂彲瑙ｉ噴鎬с€?\n\r\n## 鎻愬彇鍥剧墖\r\n\r\n![[20_Research/Papers/2026-05-14/03-MIRAGE/figures/figure-01-p3.png]]\r\n![[20_Research/Papers/2026-05-14/03-MIRAGE/figures/figure-02-p3.png]]\r\n![[20_Research/Papers/2026-05-14/03-MIRAGE/figures/figure-03-p3.png]]\r\n![[20_Research/Papers/2026-05-14/03-MIRAGE/figures/figure-04-p3.png]]\r\n![[20_Research/Papers/2026-05-14/03-MIRAGE/figures/figure-05-p3.png]]\r\n![[20_Research/Papers/2026-05-14/03-MIRAGE/figures/figure-06-p13.png]]\r\n\r\n## 涓嬩竴姝ョ簿璇婚棶棰?\n\r\n- 鏁版嵁鏉ヨ嚜鍝簺璁惧銆佷腑蹇冨拰浜虹兢锛熸槸鍚﹁鐩栫湡瀹炰复搴婅澶囧樊寮傦紵\r\n- 杈撳嚭鎸囨爣鏄惁鑳芥槧灏勫埌鐢熺墿娴嬮噺浠€丱CT 鎴栭獙鍏変华鐨勫疄闄呬骇鍝佸弬鏁帮紵\r\n- 妯″瀷鏈夋病鏈夊閮ㄩ獙璇併€佽法璁惧楠岃瘉鍜屽け璐ユ渚嬪垎鏋愶紵\r\n- 濡傛灉鐢ㄤ簬璁惧绔紝鎺ㄧ悊閫熷害銆佹ā鍨嬪ぇ灏忋€佽川閲忔帶鍒跺拰涓嶇‘瀹氭€у浣曞鐞嗭紵\r\n\r\n\r\n",
      "images": [
        {
          "name": "figure-01-p3.png",
          "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-01-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Ffigures%2Ffigure-01-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-01-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p3.png",
          "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-02-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Ffigures%2Ffigure-02-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-02-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p3.png",
          "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-03-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Ffigures%2Ffigure-03-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-03-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p3.png",
          "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-04-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Ffigures%2Ffigure-04-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-04-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p3.png",
          "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-05-p3.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Ffigures%2Ffigure-05-p3.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-05-p3.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-06-p13.png",
          "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-06-p13.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Ffigures%2Ffigure-06-p13.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/figures/figure-06-p13.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 6,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14-archive/03-MIRAGE/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F03-MIRAGE%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/03-MIRAGE/paper.pdf"
      }
    },
    {
      "id": "MjBfUmVzZWFyY2hcUGFwZXJzXDIwMjYtMDUtMTQtYXJjaGl2ZVwwMi1GT0NVU1xGT0NVU19GdWxsX2VuZC10by1lbmRfZGlhZ25vc3RpY193b3JrZmxvd19hdXRvbWF0aW9uX29mXzNEX09DVF92aWFfZm91bmRhdGlvbl9tb2RlbC1kcml2ZW5fQUlfZm9yX3JldGluYWxfZGlzZWFzZXMubWQ",
      "source": "paper-note",
      "title": "FOCUS: Full end-to-end diagnostic workflow automation of 3D OCT via foundation model-driven AI for retinal diseases",
      "zhTitle": "",
      "venue": "Local Note",
      "score": null,
      "matchedKeywords": [],
      "summary": "本地论文笔记，点击查看详情。",
      "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/FOCUS_Full_end-to-end_diagnostic_workflow_automation_of_3D_OCT_via_foundation_model-driven_AI_for_retinal_diseases.md",
      "folder": "20_Research/Papers/2026-05-14-archive/02-FOCUS",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T06:44:36.120Z",
      "markdown": "﻿---\ntags: [\"paper-analysis\", \"llm-generated\", \"ophthalmology\", \"OCT\"]\nsource: \"https://arxiv.org/abs/2602.03302\"\n---\n\n# FOCUS: Full end-to-end diagnostic workflow automation of 3D OCT via foundation model-driven AI for retinal diseases\n\n## 鍩烘湰淇℃伅\n\n- **鎺ㄨ崘鍒?*: 2.95\n- **鍖归厤棰嗗煙**: optical-coherence-tomography, ai-ophthalmology\n- **鍖归厤鍏抽敭璇?*: 3D OCT, foundation model, retinal disease, diagnostic workflow\n- **arXiv**: https://arxiv.org/abs/2602.03302\n- **PDF**: https://arxiv.org/pdf/2602.03302\n\n## 鎽樿閫熻\n\nOptical coherence tomography (OCT) has revolutionized retinal disease diagnosis with its high-resolution and three-dimensional imaging nature, yet its full diagnostic automation in clinical practices remains constrained by multi-stage workflows and conventional single-slice single-task AI models. We present Full-process OCT-based Clinical Utility System (FOCUS), a foundation model-driven framework enabling end- to-end automation of 3D OCT retinal disease diagnosis. FOCUS sequentially performs image quality assessment with EfficientNetV2-S, followed by abnormality detection and multi-disease classification using a fine-tuned Vision Foundation Model. Crucially, FOCUS leverages a unified adaptive aggregation method to intelligently integrate 2D slices-level predictions into comprehensive 3D patient-level diagnosis. Trained and tested on 3,300 patients (40,672 slices), and externally validated on 1,345 patients (18,498 slices) across four different-tier centers and diverse OCT devices, FOCUS achieved high F1 scores for quality assessment (99.01%), abnormally detection (97.46%), and patient-level diagnosis (94.39%). Real-world validation across centers also showed stable performance (F1: 90.22%-95.24%). In human-machine comparisons, FOCUS matched expert performance in abnormality detection (F1: 95.47% vs 90.91%) and multi-disease diagnosis (F1: 93.49% vs 91.35%), while demonstrating better efficiency. FOCUS automates the image-to-diagnosis pipeline, representing a critical advance towards unmanned ophthalmology with a validated blueprint for autonomous screening to enhance population scale retinal care accessibility and efficiency.\n\n## 涓轰粈涔堝€煎緱璇?\nFOCUS 鎶?3D OCT 鐨勫浘鍍忚川閲忚瘎浼般€佸紓甯告娴嬨€佸鐥呯鍒嗙被鍜屾偅鑰呯骇璇婃柇鏁村悎鎴愮鍒扮鑷姩鍖栨祦绋嬨€?\n## 鏍稿績瑕佺偣\n\n- We present Full-process OCT-based Clinical Utility System (FOCUS), a foundation model-driven framework enabling end- to-end automation of 3D OCT retinal disease diagnosis.\n- FOCUS sequentially performs image quality assessment with EfficientNetV2-S, followed by abnormality detection and multi-disease classification using a fine-tuned Vision Foundation Model.\n- Crucially, FOCUS leverages a unified adaptive aggregation method to intelligently integrate 2D slices-level predictions into comprehensive 3D patient-level diagnosis.\n- Real-world validation across centers also showed stable performance (F1: 90.22%-95.24%).\n\n## 涓庝綘鐨勬柟鍚戠殑鍏崇郴\n\n- **鐢熺墿鍙傛暟/璁惧娴嬮噺**: 鍏虫敞璁烘枃鏄惁鎻愪緵鍙洿鎺ヨ浆鍖栦负浠櫒鎸囨爣銆佽川閲忔帶鍒舵垨娴嬮噺绋冲畾鎬х殑绠楁硶銆?- **OCT/鐪肩褰卞儚**: 鍏虫敞鏁版嵁妯℃€併€佹壂鎻忓崗璁€佸垎鍓?鍒嗙被鐩爣鍜岃法璁惧娉涘寲銆?- **楠屽厜/杩戣绠＄悊**: 鍏虫敞鏄惁娑夊強杞撮暱銆佸眻鍏夌姸鎬併€佽繎瑙嗚繘灞曟垨瑙嗚鍔熻兘璇勪及銆?- **AI 钀藉湴**: 鍏虫敞妯″瀷鏄惁鏀寔绔埌绔祦绋嬨€佷綆璧勬簮杈撳叆銆佽澶囦晶閮ㄧ讲鎴栦复搴婂彲瑙ｉ噴鎬с€?\n## 鎻愬彇鍥剧墖\n\n![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-01-p6.png]]\n![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-02-p7.png]]\n![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-03-p7.png]]\n![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-04-p8.png]]\n![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-05-p9.png]]\n\n## 涓嬩竴姝ョ簿璇婚棶棰?\n- 鏁版嵁鏉ヨ嚜鍝簺璁惧銆佷腑蹇冨拰浜虹兢锛熸槸鍚﹁鐩栫湡瀹炰复搴婅澶囧樊寮傦紵\n- 杈撳嚭鎸囨爣鏄惁鑳芥槧灏勫埌鐢熺墿娴嬮噺浠€丱CT 鎴栭獙鍏変华鐨勫疄闄呬骇鍝佸弬鏁帮紵\n- 妯″瀷鏈夋病鏈夊閮ㄩ獙璇併€佽法璁惧楠岃瘉鍜屽け璐ユ渚嬪垎鏋愶紵\n- 濡傛灉鐢ㄤ簬璁惧绔紝鎺ㄧ悊閫熷害銆佹ā鍨嬪ぇ灏忋€佽川閲忔帶鍒跺拰涓嶇‘瀹氭€у浣曞鐞嗭紵\n\r\n",
      "images": [
        {
          "name": "figure-01-p6.png",
          "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-01-p6.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F02-FOCUS%2Ffigures%2Ffigure-01-p6.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-01-p6.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-02-p7.png",
          "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-02-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F02-FOCUS%2Ffigures%2Ffigure-02-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-02-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-03-p7.png",
          "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-03-p7.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F02-FOCUS%2Ffigures%2Ffigure-03-p7.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-03-p7.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-04-p8.png",
          "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-04-p8.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F02-FOCUS%2Ffigures%2Ffigure-04-p8.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-04-p8.png",
          "sourceDir": "figures"
        },
        {
          "name": "figure-05-p9.png",
          "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-05-p9.png",
          "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F02-FOCUS%2Ffigures%2Ffigure-05-p9.png",
          "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/02-FOCUS/figures/figure-05-p9.png",
          "sourceDir": "figures"
        }
      ],
      "imageCount": 5,
      "localPdf": {
        "name": "paper.pdf",
        "path": "20_Research/Papers/2026-05-14-archive/02-FOCUS/paper.pdf",
        "url": "/api/file?path=20_Research%2FPapers%2F2026-05-14-archive%2F02-FOCUS%2Fpaper.pdf",
        "fileUrl": "file:///D:/newzz/note/Valut/evil-read-arxiv/20_Research/Papers/2026-05-14-archive/02-FOCUS/paper.pdf"
      }
    },
    {
      "id": "conf-note-30_confpapers-2026-05-14-01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3",
      "source": "conf-papers",
      "title": "MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation",
      "zhTitle": "OCT 到 OCTA 三维图像转换",
      "venue": "CVPR 2025",
      "score": 54,
      "matchedKeywords": [
        "OCT",
        "OCTA",
        "optical coherence tomography"
      ],
      "summary": "从三维 OCT 推断三维 OCTA，重点关注血管结构转换和 OCTA 数据增强。",
      "authors": [
        "Zhuangzhuang Chen",
        "Hualiang Wang",
        "Chubin Ou",
        "Xiaomeng Li 0001"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01945",
      "abstract": "Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.",
      "analysisPath": "30_confpapers/2026-05-14/01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3/note.md",
      "analysisMarkdown": "---\ntags: [\"llm-generated\", \"conference-paper-analysis\"]\nsource: \"CVPR 2025\"\n---\n\n# MuTri: Multi-view Tri-alignment for OCT to OCTA 3D Image Translation\n\n**中文题名**: MuTri：用于 OCT 到 OCTA 三维图像转换的多视角三重对齐方法\n\n- **会议/年份**: CVPR 2025\n- **作者**: Zhuangzhuang Chen, Hualiang Wang, Chubin Ou, Xiaomeng Li 0001\n- **匹配关键词**: OCT, OCTA, optical coherence tomography\n- **综合评分**: 54\n- **PDF**: https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.pdf\n- **CVF/DBLP**: https://openaccess.thecvf.com/content/CVPR2025/html/Chen_MuTri_Multi-view_Tri-alignment_for_OCT_to_OCTA_3D_Image_Translation_CVPR_2025_paper.html\n\n## 摘要中文翻译\n\nOCTA 能提供血管微循环网络的三维成像，但通常依赖专用传感器和昂贵设备。MuTri 试图把更容易获得的三维 OCT 图像转换为三维 OCTA 图像。论文认为已有方法只用单一 OCTA 投影图作为监督，直接在连续空间学习 OCT 到 OCTA 的映射，容易得到次优结果。作者提出多视角三重对齐框架：先分别用 VQVAE 重建三维 OCT 和三维 OCTA，获得语义先验；再让另一个 VQVAE 在离散有限空间中学习 OCT 到 OCTA 的映射。方法同时使用语义对齐来促进 codebook 学习，并使用血管结构对齐来减少与 OCTA 投影视角之间的结构差异。作者还构建了 OCTA2024 数据集，包含 846 名受试者的 OCT/OCTA 配对体数据。\n\n## 要点提炼\n\n- 核心任务是从三维 OCT 合成三维 OCTA，直接贴近 OCT 设备数据增强和血管成像应用。\n- 方法亮点是把转换问题放到 VQVAE 离散潜空间中，并引入 OCT、OCTA、OCTA 投影图三个视角的对齐。\n- OCTA2024 配对数据集具有较高价值，后续可重点查看数据采集设备、视网膜/脑血管场景和公开可用性。\n\n## 研究背景与动机\n\n这篇论文非常贴近你的 OCT 和眼科仪器方向。OCTA 对微血管观察很有用，但硬件成本和采集要求更高；如果能从常规 OCT 稳定推断 OCTA 信息，就可能降低血管成像门槛，也能为设备软件链路提供增值算法模块。\n\n## 方法概述和架构\n\nMuTri 分两阶段：第一阶段分别训练 OCT 和 OCTA 的 VQVAE，用重建任务学习两个模态的离散表示；第二阶段训练 OCT 到 OCTA 的映射模型。语义对齐通过对比式目标提高 OCT/OCTA 潜表示互信息，血管结构对齐利用 OCTA 投影图约束细血管结构。整体思路不是简单像素回归，而是用离散 codebook 和多视角先验约束三维转换。\n\n## 实验结果分析\n\n摘要中明确提到提出 OCTA2024 大规模配对数据集，并声称多视角三重对齐能改善 OCT 到 OCTA 的三维转换质量。具体指标、对比方法、消融实验和跨设备泛化需要继续阅读 PDF 正文确认。\n\n## 研究价值评估\n\n对 OCT 设备软件、OCTA 辅助生成、低成本血管成像和三维眼科影像分析都有参考价值。相比普通医学图像分割论文，它更接近成像设备和算法产品化链路。\n\n## 优势和局限性\n\n**优势**:\n- 来自 CVPR 2025 主会，研究质量和可见度较高。\n- 与当前关注的 OCT、OCTA、眼科 AI 或生物医学视觉语言模型方向存在明确关联。\n\n**局限性**:\n- 需要确认合成 OCTA 是否达到临床可解释和可量化血流/血管指标要求。\n- 配对 OCT/OCTA 数据是否来自单中心、单设备或特定扫描协议，会影响泛化。\n- 如果输出只是结构相似图像，仍需验证能否用于真实诊断或定量分析。\n\n## 与已有本地论文的关系\n\n- 可与 20_Research/Papers 中的 OCT、眼科 AI、视觉语言模型、医学图像分割和异常检测论文进行主题对照。\n- 可与 PubMed-Ophtha 这类文献图像数据集工作比较：关注数据来源、图像模态、图注质量、眼科子集规模和下游任务表现。\n\n## 后续阅读问题\n\n- 是否使用真实眼科 OCT / OCTA / 眼底 / 临床数据？\n- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？\n- 是否提供开源代码、模型或数据集？\n- 是否有跨设备、跨中心、跨扫描协议验证？\n\n## 英文原文摘要\n\n> Optical coherence tomography angiography (OCTA) shows its great importance in imaging microvascular networks by providing accurate 3D imaging of blood vessels, but it relies upon specialized sensors and expensive devices. For this reason, previous works show the potential to translate the readily available 3D Optical Coherence Tomography (OCT) images into 3D OCTA images. However, existing OCTA translation methods directly learn the mapping from the OCT domain to the OCTA domain in continuous and infinite space with guidance from only a single view, i.e., the OCTA project map, resulting in suboptimal results. To this end, we propose the multi-view Tri-alignment framework for OCT to OCTA 3D image translation in discrete and finite space, named MuTri. In the first stage, we pre-train two vector-quantized variational auto-encoder (VQVAE) by reconstructing 3D OCT and 3D OCTA data, providing semantic prior for subsequent multi-view guidances. In the second stage, our multi-view tri-alignment facilitates another VQVAE model to learn the mapping from the OCT domain to the OCTA domain in discrete and finite space. Specifically, a contrastive-inspired semantic alignment is proposed to maximize the mutual information with the pre-trained models from OCT and OCTA views, to facilitate codebook learning. Meanwhile, a vessel structure alignment is proposed to minimize the structure discrepancy with the pre-trained models from the OCTA project map view, benefiting from learning the detailed vessel structure information. We also collect the first large-scale dataset, namely, OCTA2024, which contains a pair of OCT and OCTA volumes from 846 subjects. Our codes and datasets are available at: https://github.com/xmed-lab/MuTri.\n\n## 图片索引\n\n尚未下载 PDF 提取图片。后续可把 PDF 保存为 paper.pdf，并将图片放入 images/。\n",
      "analysisFolder": "30_confpapers/2026-05-14/01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3",
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "30_confpapers/2026-05-14/01-MuTri-Multi-view-Tri-alignment-for-OCT-to-OCTA-3",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T08:44:12.312Z"
    },
    {
      "id": "conf-note-30_confpapers-2026-05-14-02-Blood-Flow-Speed-Estimation-with-Optical-Coheren",
      "source": "conf-papers",
      "title": "Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images",
      "zhTitle": "基于 OCTA 图像的血流速度估计",
      "venue": "CVPR 2025",
      "score": 40,
      "matchedKeywords": [
        "optical coherence tomography",
        "OCTA"
      ],
      "summary": "从 OCTA 图像估计血流速度，把结构成像推进到功能定量。",
      "authors": [
        "Wensheng Cheng",
        "Zhenghong Li",
        "Jiaxiang Ren 0002",
        "Hyomin Jeong",
        "Congwu Du",
        "Yingtian Pan",
        "Haibin Ling"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.00979",
      "abstract": "Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.",
      "analysisPath": "30_confpapers/2026-05-14/02-Blood-Flow-Speed-Estimation-with-Optical-Coheren/note.md",
      "analysisMarkdown": "---\ntags: [\"llm-generated\", \"conference-paper-analysis\"]\nsource: \"CVPR 2025\"\n---\n\n# Blood Flow Speed Estimation with Optical Coherence Tomography Angiography Images\n\n**中文题名**: 基于 OCTA 图像的血流速度估计\n\n- **会议/年份**: CVPR 2025\n- **作者**: Wensheng Cheng, Zhenghong Li, Jiaxiang Ren 0002, Hyomin Jeong, Congwu Du, Yingtian Pan, Haibin Ling\n- **匹配关键词**: optical coherence tomography, OCTA\n- **综合评分**: 40\n- **PDF**: https://openaccess.thecvf.com/content/CVPR2025/papers/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.pdf\n- **CVF/DBLP**: https://openaccess.thecvf.com/content/CVPR2025/html/Cheng_Blood_Flow_Speed_Estimation_with_Optical_Coherence_Tomography_Angiography_Images_CVPR_2025_paper.html\n\n## 摘要中文翻译\n\n血流速度估计在医学和生理应用中很重要，但血管结构复杂、流体动力学复杂，尤其在脑皮层区域更具挑战。传统 Optical Doppler Tomography（ODT）通常需要复杂硬件控制和信号处理，还会受到系统伪影影响。论文提出 OCTA-Flow，一种从常规 OCTA 图像直接估计血管血流速度的学习方法。它用编码器-解码器结构，并利用 ODT 数据作为伪标签训练，从而绕开真实血流速度标注难以获得的问题。方法还设计 Adaptive Window Fusion 模块，用多尺度窗口注意力建模不同尺度血管和血流速度之间的关系；同时引入 Conditional Random Field Decoder，增强估计结果的平滑性和一致性，减少 ODT 伪影影响。\n\n## 要点提炼\n\n- 把 OCTA 从结构成像扩展到血流速度估计，和 OCT/OCTA 定量功能升级高度相关。\n- 用 ODT 伪标签训练 OCTA-Flow，避免直接采集真实血流速度标签的困难。\n- 多尺度窗口注意力和 CRF 解码器分别处理血管尺度变化和速度场平滑一致性。\n\n## 研究背景与动机\n\nOCTA 通常更擅长显示血管结构，而血流速度这样的功能性指标更难获取。若能从常规 OCTA 数据估计血流速度，就可能让现有 OCTA 设备获得更强的定量分析能力。\n\n## 方法概述和架构\n\nOCTA-Flow 使用编码器-解码器网络，以 ODT 数据产生的结果作为伪标签。Adaptive Window Fusion 模块用多尺度窗口注意力捕捉不同直径血管与流速之间的关系；Conditional Random Field Decoder 对输出速度场施加平滑和一致性约束，以降低 ODT 伪影向模型学习过程传播。\n\n## 实验结果分析\n\n摘要称该方法能更准确地产生血流速度估计、抑制 ODT 伪影，并提高基于 OCTA 数据采集的实用性。具体评价指标、实验数据来源、脑皮层与眼科 OCTA 的差异，需要阅读全文确认。\n\n## 研究价值评估\n\n这篇论文对眼科 OCTA 产品很有启发：它提供了从血管结构图像走向血流功能定量的路线。若能迁移到视网膜 OCTA，可能支持微循环评估、糖网/青光眼/黄斑疾病等方向的定量分析。\n\n## 优势和局限性\n\n**优势**:\n- 来自 CVPR 2025 主会，研究质量和可见度较高。\n- 与当前关注的 OCT、OCTA、眼科 AI 或生物医学视觉语言模型方向存在明确关联。\n\n**局限性**:\n- 摘要场景强调脑皮层区域，不一定直接等价于视网膜 OCTA。\n- ODT 伪标签本身有伪影，模型可能继承伪标签偏差。\n- 需要验证跨设备、跨扫描协议和低信噪比数据下的稳定性。\n\n## 与已有本地论文的关系\n\n- 可与 20_Research/Papers 中的 OCT、眼科 AI、视觉语言模型、医学图像分割和异常检测论文进行主题对照。\n- 可与 PubMed-Ophtha 这类文献图像数据集工作比较：关注数据来源、图像模态、图注质量、眼科子集规模和下游任务表现。\n\n## 后续阅读问题\n\n- 是否使用真实眼科 OCT / OCTA / 眼底 / 临床数据？\n- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？\n- 是否提供开源代码、模型或数据集？\n- 是否有跨设备、跨中心、跨扫描协议验证？\n\n## 英文原文摘要\n\n> Estimating blood flow speed is essential in many medical and physiological applications, yet it is extremely challenging due to complex vascular structure and flow dynamics, particularly for cerebral cortex regions. Existing techniques, such as Optical Doppler Tomography (ODT), generally require complex hardware control and signal processing, and still suffer from inherent system-level artifacts. To address these challenges, we propose a new learning-based approach named OCTA-Flow, which directly estimates vascular blood flow speed from Optical Coherence Tomography Angiography (OCTA) images that are commonly used for vascular structure analysis. OCTA-Flow employs several novel components to achieve this goal. First, using an encoder-decoder architecture, OCTA-Flow leverages ODT data as pseudo labels during training, thus bypassing the difficulty of collecting ground truth data. Second, to capture the relationship between vessels of varying scales and their flow speed, we design an Adaptive Window Fusion module that employs multiscale window attention. Third, to mitigate ODT artifacts, we incorporate a Conditional Random Field Decoder that promotes smoothness and consistency in the estimated blood flow. Together, these innovations enable OCTA-Flow to effectively produce accurate flow estimation, suppress the artifacts in ODT, and enhance practicality, benefiting from the established techniques of OCTA data acquisition. The code and data are available at https://github.com/Spritea/OCTA-Flow.\n\n## 图片索引\n\n尚未下载 PDF 提取图片。后续可把 PDF 保存为 paper.pdf，并将图片放入 images/。\n",
      "analysisFolder": "30_confpapers/2026-05-14/02-Blood-Flow-Speed-Estimation-with-Optical-Coheren",
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "30_confpapers/2026-05-14/02-Blood-Flow-Speed-Estimation-with-Optical-Coheren",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T08:44:12.314Z"
    },
    {
      "id": "conf-note-30_confpapers-2026-05-14-03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi",
      "source": "conf-papers",
      "title": "BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature",
      "zhTitle": "开放生物医学图像-图注数据集与视觉语言模型",
      "venue": "CVPR 2025",
      "score": 40,
      "matchedKeywords": [
        "vision-language model",
        "ophthalmology"
      ],
      "summary": "从开放科学文献构建大规模生物医学图文数据集，并训练视觉语言模型。",
      "authors": [
        "Alejandro Lozano",
        "Min Woo Sun",
        "James Burgess",
        "Liangyu Chen 0005",
        "Jeffrey J. Nirschl",
        "Jeffrey Gu",
        "Ivan Lopez 0001",
        "Josiah Aklilu",
        "Anita Rau",
        "Austin Wolfgang Katzer",
        "Yuhui Zhang",
        "Collin Chiu",
        "Xiaohan Wang",
        "Alfred Seunghoon Song",
        "Robert Tibshirani",
        "Serena Yeung-Levy"
      ],
      "pdfUrl": "https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf",
      "openAccessUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html",
      "doiUrl": "https://doi.org/10.1109/CVPR52734.2025.01837",
      "abstract": "The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community",
      "analysisPath": "30_confpapers/2026-05-14/03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi/note.md",
      "analysisMarkdown": "---\ntags: [\"llm-generated\", \"conference-paper-analysis\"]\nsource: \"CVPR 2025\"\n---\n\n# BIOMEDICA: An Open Biomedical Image-Caption Archive, Dataset, and Vision-Language Models Derived from Scientific Literature\n\n**中文题名**: BIOMEDICA：从科学文献构建的开放生物医学图像-图注档案、数据集和视觉语言模型\n\n- **会议/年份**: CVPR 2025\n- **作者**: Alejandro Lozano, Min Woo Sun, James Burgess, Liangyu Chen 0005, Jeffrey J. Nirschl, Jeffrey Gu, Ivan Lopez 0001, Josiah Aklilu 等\n- **匹配关键词**: vision-language model, ophthalmology\n- **综合评分**: 40\n- **PDF**: https://openaccess.thecvf.com/content/CVPR2025/papers/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.pdf\n- **CVF/DBLP**: https://openaccess.thecvf.com/content/CVPR2025/html/Lozano_BIOMEDICA_An_Open_Biomedical_Image-Caption_Archive_Dataset_and_Vision-Language_Models_CVPR_2025_paper.html\n\n## 摘要中文翻译\n\n视觉语言模型的发展依赖大规模、多样化的多模态数据，但生物医学通用 VLM 受限于公开标注数据不足。现有数据集往往局限在狭窄领域，未充分利用科学文献中丰富的生物医学知识。BIOMEDICA 提出一个可扩展开源框架，从 PubMed Central Open Access 子集中抽取、标注并序列化图像-文本数据，形成超过 2400 万对独特图像-文本对，来源覆盖 600 多万篇文章，并提供元数据和专家引导标注。作者还发布 BMC-CLIP 系列模型，在 BIOMEDICA 上以流式方式持续预训练，避免本地下载 27TB 数据。模型在 40 个任务上达到平均领先表现，覆盖病理、放射、眼科、皮肤科、外科、分子生物学等领域，其中零样本分类平均提升 6.56%，眼科任务最高提升 17.5%。\n\n## 要点提炼\n\n- 核心贡献是超大规模生物医学图像-图注数据集和开放抽取框架。\n- 与 PubMed-Ophtha 思路相近，但覆盖更广的生物医学领域，并报告眼科任务收益。\n- BMC-CLIP 通过流式预训练降低数据下载门槛，对眼科 VLM、图文检索和报告生成有参考价值。\n\n## 研究背景与动机\n\n眼科 AI 正在从单一图像分类/分割走向图文理解、报告生成和多模态问答。BIOMEDICA 的价值在于提供通用生物医学视觉语言预训练资源，眼科只是其中一个重要子领域。\n\n## 方法概述和架构\n\n论文构建了从 PMC 开放文献中提取图像和图注的流水线，并对数据进行标注、序列化和元数据组织。随后在该数据集上训练 BMC-CLIP 系列视觉语言模型，采用流式训练来规避超大数据集本地下载成本。\n\n## 实验结果分析\n\n摘要报告数据规模超过 2400 万图像-文本对、覆盖 600 多万文章。BMC-CLIP 在 40 个任务上平均达到 SOTA，零样本分类平均提升 6.56%，皮肤科最高 29.8%，眼科最高 17.5%，并在图文检索上更强，同时使用约 10 倍更少计算量。\n\n## 研究价值评估\n\n对你的眼科 AI 方向，它可作为眼科 VLM 和医学图文检索的上游资源。它不直接解决 OCT 或验光仪测量问题，但能增强模型对医学图像、图注和领域术语之间关系的理解。\n\n## 优势和局限性\n\n**优势**:\n- 来自 CVPR 2025 主会，研究质量和可见度较高。\n- 与当前关注的 OCT、OCTA、眼科 AI 或生物医学视觉语言模型方向存在明确关联。\n\n**局限性**:\n- 数据来自科学文献，和真实设备工作站图像、临床报告、中文报告之间仍有域差异。\n- 图注文本不等同于结构化诊断标签，训练出的模型仍需在具体眼科任务上验证。\n- 需要关注眼科子集是否充分覆盖 OCT、OCTA、眼底照相和前节图像。\n\n## 与已有本地论文的关系\n\n- 可与 20_Research/Papers 中的 OCT、眼科 AI、视觉语言模型、医学图像分割和异常检测论文进行主题对照。\n- 可与 PubMed-Ophtha 这类文献图像数据集工作比较：关注数据来源、图像模态、图注质量、眼科子集规模和下游任务表现。\n\n## 后续阅读问题\n\n- 是否使用真实眼科 OCT / OCTA / 眼底 / 临床数据？\n- 是否能迁移到生物参数测量仪、OCT 或验光仪产品链路？\n- 是否提供开源代码、模型或数据集？\n- 是否有跨设备、跨中心、跨扫描协议验证？\n\n## 英文原文摘要\n\n> The development of vision-language models (VLMs) is driven by large-scale and diverse multi-modal datasets. However, progress toward generalist biomedical VLMs is limited by the lack of annotated, publicly accessible datasets across biology and medicine. Existing efforts are limited to narrow domains, missing the opportunity to leverage the full diversity of biomedical knowledge encoded in scientific literature. To address this gap, we introduce BIOMEDICA: a scalable, open-source framework to extract, annotate, and serialize the entirety of the PubMed Central Open Access subset into an easy-to-use, publicly accessible dataset. Our framework produces a comprehensive archive with over 24 million unique image-text pairs from over 6 million articles. Metadata and expert-guided annotations are additionally provided. We demonstrate the utility and accessibility of our resource by releasing BMC-CLIP, a suite of CLIP-style models continuously pre-trained on BIOMEDICA dataset via streaming (eliminating the need to download 27 TB of data locally). On average, our models achieve state-of-the-art performance across 40 tasks -- spanning pathology, radiology, ophthalmology, dermatology, surgery, molecular biology, parasitology, and cell biology -- excelling in zero-shot classification with 6.56% average improvement (as high as 29.8% and 17.5% gains in dermatology and ophthalmology, respectively) and stronger image-text retrieval while using 10x less compute. To foster reproducibility and collaboration, we release our codebase and dataset to the broader research community\n\n## 图片索引\n\n尚未下载 PDF 提取图片。后续可把 PDF 保存为 paper.pdf，并将图片放入 images/。\n",
      "analysisFolder": "30_confpapers/2026-05-14/03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi",
      "images": [],
      "imageCount": 0,
      "localPdf": null,
      "folder": "30_confpapers/2026-05-14/03-BIOMEDICA-An-Open-Biomedical-Image-Caption-Archi",
      "date": "2026-05-14",
      "modifiedAt": "2026-05-14T08:44:12.316Z"
    }
  ]
};
