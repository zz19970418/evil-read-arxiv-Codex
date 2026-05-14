# evil-read-arxiv-Codex

一个面向眼科/OCT/生物参数测量/验光仪/AI 方向的本地论文阅读与推荐工作流。仓库同时包含 Obsidian 笔记库结构、Codex 技能说明、论文推荐脚本、会议论文检索脚本，以及一个本地 Web 论文看板。

## 功能概览

- `start-my-day`：每日论文推荐，从 arXiv 和 Semantic Scholar 检索、过滤、评分，并生成中文每日推荐笔记。
- `paper-analyze`：对单篇论文生成结构化深度分析笔记，包含摘要翻译、方法、实验、价值、局限性和图片引用。
- `extract-paper-images`：优先从 arXiv 源码包提取论文图片，失败时从 PDF 提取，并生成图片索引。
- `paper-search`：在已有论文笔记中按标题、作者、关键词、领域和正文内容搜索。
- `conf-papers`：检索 CVPR/ICCV/ECCV/ICLR/AAAI/NeurIPS/ICML 等会议论文，并按相关性、热度和质量排序推荐。
- `web`：本地静态论文看板，用于浏览每日推荐、会议论文、论文详情、PDF 和图片。

## 目录结构

```text
.
├─ 10_Daily/                  # 每日论文推荐笔记
├─ 20_Research/Papers/         # 普通论文笔记、PDF、图片和详细分析
├─ 30_confpapers/              # 顶会论文推荐和分析结果
├─ 99_System/Config/           # 研究兴趣和会议论文配置
├─ start-my-day/               # 每日论文推荐技能与脚本
├─ paper-analyze/              # 单篇论文深度分析技能
├─ extract-paper-images/       # 论文图片提取技能
├─ paper-search/               # 本地论文笔记搜索技能
├─ conf-papers/                # 顶会论文检索推荐技能与脚本
└─ web/                        # 本地 Web 看板
```

## 环境要求

- Windows + PowerShell
- Git
- Node.js 20 或更高版本，用于运行 `web` 看板和部分会议检索脚本
- Python 3，用于运行 arXiv 检索、论文分析和图片提取相关脚本
- 推荐 Python 依赖：`PyYAML`、`requests`、`PyMuPDF`

可先检查本机环境：

```powershell
git --version
node --version
Get-Command python, py, python3 -ErrorAction SilentlyContinue
```

## 配置文件

主要配置位于：

- `99_System/Config/research_interests.yaml`
- `99_System/Config/conf-papers.yaml`

`research_interests.yaml` 用于控制每日论文推荐方向，例如 OCT、眼科 AI、生物参数测量、验光、医学影像等关键词。

`conf-papers.yaml` 用于控制顶会论文搜索范围，例如会议、年份、关键词、排除词、推荐数量和 Semantic Scholar 请求节奏。

## 常用工作流

### 每日论文推荐

在 Codex 中输入：

```text
start-my-day
```

输出通常写入：

```text
10_Daily/YYYY-MM-DD论文推荐.md
20_Research/Papers/YYYY-MM-DD/
```

### 顶会论文推荐

在 Codex 中输入：

```text
conf-papers CVPR 2025 OCT AI
```

输出通常写入：

```text
30_confpapers/YYYY-MM-DD/
```

其中 `conference-paper-recommendations.md` 是当天会议论文推荐总览，前三篇可在有 arXiv ID 或 PDF URL 时生成详细分析目录。

### 单篇论文深度分析

在 Codex 中输入类似：

```text
paper-analyze [[Paper Note Title]]
```

输出通常保存在对应论文目录下：

```text
20_Research/Papers/YYYY-MM-DD/NN-ShortTitle/
```

### 提取论文图片

在 Codex 中输入类似：

```text
extract-paper-images [[Paper Note Title]]
```

输出通常保存在论文目录的：

```text
images/
image-index.md
```

旧笔记中也可能存在 `figures/` 目录，Web 看板会同时识别 `images/`、`figures/` 和 `figure/`。

### 搜索已有论文笔记

在 Codex 中输入：

```text
paper-search OCT AI
```

默认会优先搜索：

```text
20_Research/Papers/
```

## Web 看板

进入 `web` 目录运行：

```powershell
cd web
node server.js
```

然后在浏览器打开：

```text
http://localhost:3000
```

如果只想重新生成静态数据：

```powershell
node web\scripts\build-static-data.js
```

Web 看板会读取 `10_Daily/`、`20_Research/Papers/`、`30_confpapers/` 中的内容，并展示论文列表、状态、详情、PDF 链接和图片。

## GitHub 同步

首次推送已经配置远端：

```text
https://github.com/zz19970418/evil-read-arxiv-Codex.git
```

常规同步命令：

```powershell
git status
git add .
git commit -m "Update paper workflow"
git push
```

如果访问 GitHub 出现 `Failed to connect to github.com port 443`，通常是 Git 没有走代理。当前仓库可使用本地代理配置：

```powershell
git config --local http.proxy http://127.0.0.1:7897
git config --local https.proxy http://127.0.0.1:7897
```

## 注意事项

- `.gitignore` 会排除缓存、日志、Python 缓存、Node 构建产物、本地环境变量和 Obsidian 的 `workspace.json`。
- 论文 PDF、提取图片、Markdown 笔记、技能说明和 Web 看板文件会保留在 Git 中。
- 如果以后论文 PDF 或图片变得很多，仓库体积可能明显增大；届时可以考虑 Git LFS 或只同步 Markdown 笔记。

