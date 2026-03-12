# ArtinSmart API

通用大模型 API 服务平台 - 兼容 OpenAI API 格式

## 功能特性

### 1. 大模型中转 API
- 兼容 OpenAI API 格式 (`/v1/chat/completions`)
- 支持多模型切换：
  - OpenAI: GPT-4, GPT-4-Turbo, GPT-3.5-Turbo
  - Anthropic: Claude-3-Opus, Claude-3-Sonnet
  - 国产模型: Moonshot, DeepSeek
- 按量计费，免费额度

### 2. AI 功能 API
- **语音识别** (Whisper): `/v1/audio/transcriptions`
- **OCR 文字识别** (PaddleOCR): `/v1/ocr`
- **图像理解** (CLIP): `/v1/vision/analyze`
- **图像分类** (Zero-shot): `/v1/vision/classify`
- **目标检测** (YOLO): `/v1/vision/detect`

### 3. 用户管理
- API Key 鉴权
- 余额管理
- 使用统计

## 快速开始

### 1. 安装依赖
```bash
# Windows
start.bat

# Linux/Mac
bash start.sh
```

### 2. 配置环境变量
复制 `.env.example` 为 `.env`，填入你的 API Keys：
```bash
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
MOONSHOT_API_KEY=sk-your-key
DEEPSEEK_API_KEY=sk-your-key
```

### 3. 启动服务
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

访问：
- API: http://localhost:8000
- 文档: http://localhost:8000/docs

## API 使用示例

### 注册用户
```bash
curl -X POST "http://localhost:8000/api/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

### 聊天完成
```bash
curl -X POST "http://localhost:8000/api/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: artin-your-api-key" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### 列出模型
```bash
curl "http://localhost:8000/api/v1/models"
```

## 价格

| 服务 | 价格 |
|------|------|
| GPT-4 | $0.03/1K input, $0.06/1K output |
| GPT-3.5-Turbo | $0.0005/1K input, $0.0015/1K output |
| Claude-3-Opus | $0.015/1K input, $0.075/1K output |
| 语音识别 | $0.006/分钟 |
| OCR | $0.001/张 |
| 图像分析 | $0.002/张 |

新用户赠送 $5 免费额度。

## 项目结构

```
artin-smart-api/
├── app/              # FastAPI 应用入口
├── api/              # API 路由
│   ├── chat.py       # 大模型 API
│   ├── user.py       # 用户管理
│   ├── whisper.py    # 语音识别
│   ├── ocr.py        # 文字识别
│   └── vision.py     # 视觉分析
├── db/               # 数据库模型
├── utils/            # 工具函数
├── config/           # 配置文件
├── models/           # AI 模型（待部署）
├── requirements.txt  # 依赖
└── start.bat/sh      # 启动脚本
```

## 部署

### 阿里云部署
```bash
# 安装依赖
pip install -r requirements.txt

# 生产环境启动
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

# 或使用 gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

### Nginx 配置
```nginx
server {
    listen 80;
    server_name api.artinsmart.cn;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 待办

- [ ] 部署 Whisper 语音识别模型
- [ ] 部署 PaddleOCR 文字识别
- [ ] 部署 CLIP 图像理解
- [ ] 部署 YOLO 目标检测
- [ ] 接入支付系统
- [ ] 完善监控和日志

## 许可证

MIT License
