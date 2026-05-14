---
tags: ["paper-analysis", "llm-generated", "ophthalmology", "OCT"]
source: "https://arxiv.org/abs/2602.03302"
---

# FOCUS: Full end-to-end diagnostic workflow automation of 3D OCT via foundation model-driven AI for retinal diseases

## 鍩烘湰淇℃伅

- **鎺ㄨ崘鍒?*: 2.95
- **鍖归厤棰嗗煙**: optical-coherence-tomography, ai-ophthalmology
- **鍖归厤鍏抽敭璇?*: 3D OCT, foundation model, retinal disease, diagnostic workflow
- **arXiv**: https://arxiv.org/abs/2602.03302
- **PDF**: https://arxiv.org/pdf/2602.03302

## 鎽樿閫熻

Optical coherence tomography (OCT) has revolutionized retinal disease diagnosis with its high-resolution and three-dimensional imaging nature, yet its full diagnostic automation in clinical practices remains constrained by multi-stage workflows and conventional single-slice single-task AI models. We present Full-process OCT-based Clinical Utility System (FOCUS), a foundation model-driven framework enabling end- to-end automation of 3D OCT retinal disease diagnosis. FOCUS sequentially performs image quality assessment with EfficientNetV2-S, followed by abnormality detection and multi-disease classification using a fine-tuned Vision Foundation Model. Crucially, FOCUS leverages a unified adaptive aggregation method to intelligently integrate 2D slices-level predictions into comprehensive 3D patient-level diagnosis. Trained and tested on 3,300 patients (40,672 slices), and externally validated on 1,345 patients (18,498 slices) across four different-tier centers and diverse OCT devices, FOCUS achieved high F1 scores for quality assessment (99.01%), abnormally detection (97.46%), and patient-level diagnosis (94.39%). Real-world validation across centers also showed stable performance (F1: 90.22%-95.24%). In human-machine comparisons, FOCUS matched expert performance in abnormality detection (F1: 95.47% vs 90.91%) and multi-disease diagnosis (F1: 93.49% vs 91.35%), while demonstrating better efficiency. FOCUS automates the image-to-diagnosis pipeline, representing a critical advance towards unmanned ophthalmology with a validated blueprint for autonomous screening to enhance population scale retinal care accessibility and efficiency.

## 涓轰粈涔堝€煎緱璇?
FOCUS 鎶?3D OCT 鐨勫浘鍍忚川閲忚瘎浼般€佸紓甯告娴嬨€佸鐥呯鍒嗙被鍜屾偅鑰呯骇璇婃柇鏁村悎鎴愮鍒扮鑷姩鍖栨祦绋嬨€?
## 鏍稿績瑕佺偣

- We present Full-process OCT-based Clinical Utility System (FOCUS), a foundation model-driven framework enabling end- to-end automation of 3D OCT retinal disease diagnosis.
- FOCUS sequentially performs image quality assessment with EfficientNetV2-S, followed by abnormality detection and multi-disease classification using a fine-tuned Vision Foundation Model.
- Crucially, FOCUS leverages a unified adaptive aggregation method to intelligently integrate 2D slices-level predictions into comprehensive 3D patient-level diagnosis.
- Real-world validation across centers also showed stable performance (F1: 90.22%-95.24%).

## 涓庝綘鐨勬柟鍚戠殑鍏崇郴

- **鐢熺墿鍙傛暟/璁惧娴嬮噺**: 鍏虫敞璁烘枃鏄惁鎻愪緵鍙洿鎺ヨ浆鍖栦负浠櫒鎸囨爣銆佽川閲忔帶鍒舵垨娴嬮噺绋冲畾鎬х殑绠楁硶銆?- **OCT/鐪肩褰卞儚**: 鍏虫敞鏁版嵁妯℃€併€佹壂鎻忓崗璁€佸垎鍓?鍒嗙被鐩爣鍜岃法璁惧娉涘寲銆?- **楠屽厜/杩戣绠＄悊**: 鍏虫敞鏄惁娑夊強杞撮暱銆佸眻鍏夌姸鎬併€佽繎瑙嗚繘灞曟垨瑙嗚鍔熻兘璇勪及銆?- **AI 钀藉湴**: 鍏虫敞妯″瀷鏄惁鏀寔绔埌绔祦绋嬨€佷綆璧勬簮杈撳叆銆佽澶囦晶閮ㄧ讲鎴栦复搴婂彲瑙ｉ噴鎬с€?
## 鎻愬彇鍥剧墖

![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-01-p6.png]]
![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-02-p7.png]]
![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-03-p7.png]]
![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-04-p8.png]]
![[20_Research/Papers/2026-05-14/02-FOCUS/figures/figure-05-p9.png]]

## 涓嬩竴姝ョ簿璇婚棶棰?
- 鏁版嵁鏉ヨ嚜鍝簺璁惧銆佷腑蹇冨拰浜虹兢锛熸槸鍚﹁鐩栫湡瀹炰复搴婅澶囧樊寮傦紵
- 杈撳嚭鎸囨爣鏄惁鑳芥槧灏勫埌鐢熺墿娴嬮噺浠€丱CT 鎴栭獙鍏変华鐨勫疄闄呬骇鍝佸弬鏁帮紵
- 妯″瀷鏈夋病鏈夊閮ㄩ獙璇併€佽法璁惧楠岃瘉鍜屽け璐ユ渚嬪垎鏋愶紵
- 濡傛灉鐢ㄤ簬璁惧绔紝鎺ㄧ悊閫熷害銆佹ā鍨嬪ぇ灏忋€佽川閲忔帶鍒跺拰涓嶇‘瀹氭€у浣曞鐞嗭紵

