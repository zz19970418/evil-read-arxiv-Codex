# evil-read-arxiv web

本地论文阅读工作台有两种 AI 路线：正式 OpenAI API，以及备用的 Codex 半自动队列。

## 实时模式

```powershell
cd D:\newzz\note\Valut\evil-read-arxiv\web
node .\server.js
```

打开：

```text
http://127.0.0.1:3000
```

实时模式会扫描：

- `10_Daily`
- `20_Research/Papers`
- `30_confpapers`

## OpenAI API 正式通道

编辑本地配置文件：

```text
D:\newzz\note\Valut\evil-read-arxiv\web\config.local.json
```

官方 OpenAI 推荐配置：

```json
{
  "openaiApiKey": "sk-your-openai-api-key",
  "openaiModel": "gpt-4.1-mini",
  "openaiBaseUrl": "https://api.openai.com/v1",
  "openaiEndpoint": "responses",
  "openaiTransport": "auto",
  "openaiProxy": ""
}
```

`web/config.local.json` 已加入 `.gitignore`，不会跟随 Git 上传。配置后重启 `node .\server.js`。

诊断接口：

```text
http://127.0.0.1:3000/api/ai/status
http://127.0.0.1:3000/api/ai/status?test=1
```

成功时会看到 `last.ok: true`。失败时看 `last.error`。

## Codex 半自动桥接

当 API 不通时，在页面里点 `交给 Codex`。Web 会生成本地任务文件：

```text
web/ai-queue/*.json
```

然后回到 Codex 对话里输入：

```text
处理 AI 队列
```

Codex 会读取任务，生成结果到：

```text
web/ai-results/*.json
```

再回到网页点 `加载 Codex 结果`，结果会显示在 AI 摘要区域。

`web/ai-queue/` 和 `web/ai-results/` 已加入 `.gitignore`，不会上传。

## 静态模式

```powershell
cd D:\newzz\note\Valut\evil-read-arxiv
node .\web\scripts\build-static-data.js
```

然后直接打开：

```text
web/public/index.html
```

静态模式只读取 `web/public/data.js`。在线 AI、重新搜索 arXiv、图片服务和 Codex 队列建议使用实时模式。
