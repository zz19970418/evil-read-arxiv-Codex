# Codex AI Queue Bridge

When the user asks "处理 AI 队列", read pending JSON files in:

```text
web/ai-queue/
```

For each task, write one result JSON file to:

```text
web/ai-results/<task-id>.json
```

Summary task result:

```json
{
  "source": "codex-bridge",
  "summaries": [
    {
      "id": "paper-id",
      "main": "中文主要内容",
      "innovation": "中文创新点",
      "source": "codex-bridge"
    }
  ]
}
```

Interest task result:

```json
{
  "source": "codex-bridge",
  "summaries": [
    {
      "id": "paper-id",
      "main": "为什么这篇符合兴趣方向",
      "innovation": "最值得关注的创新点或用途",
      "source": "codex-bridge"
    }
  ]
}
```

Deep task result:

```json
{
  "source": "codex-bridge",
  "analysis": {
    "contribution": "中文核心贡献",
    "innovation": "中文创新点",
    "method": "中文方法概要",
    "results": "中文关键结果"
  }
}
```

Keep results concise and structured. Use paper title, abstract, summary, keywords, links, and image paths from the queue file.
