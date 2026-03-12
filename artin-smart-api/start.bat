@echo off
chcp 65001 >nul
:: 启动 ArtinSmart API 服务

cd /d "%~dp0"

:: 检查虚拟环境
if not exist "venv" (
    echo 创建虚拟环境...
    python -m venv venv
)

:: 激活虚拟环境
call venv\Scripts\activate.bat

:: 安装依赖
echo 安装依赖...
pip install -r requirements.txt -q

:: 启动服务
echo.
echo ========================================
echo  启动 ArtinSmart API 服务
echo ========================================
echo 访问地址: http://localhost:8000
echo API 文档: http://localhost:8000/docs
echo.

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
