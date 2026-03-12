#!/bin/bash
# 启动 ArtinSmart API 服务

cd "$(dirname "$0")"

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "安装依赖..."
pip install -r requirements.txt -q

# 启动服务
echo "启动 ArtinSmart API 服务..."
echo "访问地址: http://localhost:8000"
echo "API 文档: http://localhost:8000/docs"
echo ""

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
