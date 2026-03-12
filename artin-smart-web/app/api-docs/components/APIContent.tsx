import CodeBlock from './CodeBlock'

export default function APIContent() {
  return (
    <div className="max-w-3xl">
      {/* 简介 */}
      <section id="intro" className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ArtinSmart API 文档</h1>
        <p className="text-lg text-gray-600 mb-6">
          ArtinSmart 提供简单易用的 AI API 服务，支持大语言模型、语音识别、OCR 等多种能力。
          兼容 OpenAI API 格式，迁移零成本。
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-700">
            <strong>Base URL:</strong> <code className="bg-blue-100 px-1 rounded">https://api.artinsmart.cn</code>
          </p>
        </div>
      </section>

      {/* 认证 */}
      <section id="auth" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">认证方式</h2>
        <p className="text-gray-600 mb-4">
          所有 API 请求需要在 Header 中携带 API Key 进行认证。
        </p>
        
        <CodeBlock
          title="请求头格式"
          code={`X-API-Key: artin-your-api-key`}
        />

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
          <p className="text-sm text-yellow-700">
            <strong>注意：</strong>API Key 是敏感信息，请勿在客户端代码中暴露。
          </p>
        </div>
      </section>

      {/* 快速开始 */}
      <section id="quickstart" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">快速开始</h2>
        <p className="text-gray-600 mb-4">3 步即可开始使用：</p>
        
        <ol className="list-decimal list-inside space-y-4 mb-6">
          <li className="text-gray-700">
            <strong>注册账号</strong> - 调用注册接口获取 API Key
          </li>
          <li className="text-gray-700">
            <strong>充值余额</strong> - 新用户赠送 $5 免费额度
          </li>
          <li className="text-gray-700">
            <strong>调用 API</strong> - 使用 API Key 发起请求
          </li>
        </ol>

        <CodeBlock
          title="1. 注册用户获取 API Key"
          code={`curl -X POST https://api.artinsmart.cn/api/register \\
  -H "Content-Type: application/json" \\
  -d '{"email": "your@email.com"}'`}
        />
      </section>

      {/* Chat Completions */}
      <section id="chat" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat Completions</h2>
        <p className="text-gray-600 mb-4">
          创建聊天完成，兼容 OpenAI API 格式。
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <code className="text-sm text-gray-800">
            <span className="text-green-600 font-bold">POST</span> /api/v1/chat/completions
          </code>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">请求参数</h3>
        <table className="w-full text-sm mb-4 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left border">参数</th>
              <th className="px-4 py-2 text-left border">类型</th>
              <th className="px-4 py-2 text-left border">必填</th>
              <th className="px-4 py-2 text-left border">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border font-mono">model</td>
              <td className="px-4 py-2 border">string</td>
              <td className="px-4 py-2 border">是</td>
              <td className="px-4 py-2 border">模型 ID，如 gpt-4</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">messages</td>
              <td className="px-4 py-2 border">array</td>
              <td className="px-4 py-2 border">是</td>
              <td className="px-4 py-2 border">消息列表</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">temperature</td>
              <td className="px-4 py-2 border">float</td>
              <td className="px-4 py-2 border">否</td>
              <td className="px-4 py-2 border">采样温度 (0-2)，默认 0.7</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">max_tokens</td>
              <td className="px-4 py-2 border">integer</td>
              <td className="px-4 py-2 border">否</td>
              <td className="px-4 py-2 border">最大生成 token 数</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">stream</td>
              <td className="px-4 py-2 border">boolean</td>
              <td className="px-4 py-2 border">否</td>
              <td className="px-4 py-2 border">是否流式响应，默认 false</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          title="请求示例"
          code={`curl https://api.artinsmart.cn/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: artin-your-api-key" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7
  }'`}
        />

        <CodeBlock
          title="响应示例"
          code={`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you today?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}`}
        />
      </section>

      {/* 支持的模型 */}
      <section id="models" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">支持模型</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left border">模型</th>
              <th className="px-4 py-2 text-left border">提供商</th>
              <th className="px-4 py-2 text-left border">上下文</th>
              <th className="px-4 py-2 text-left border">输入价格</th>
              <th className="px-4 py-2 text-left border">输出价格</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border font-mono">gpt-4</td>
              <td className="px-4 py-2 border">OpenAI</td>
              <td className="px-4 py-2 border">8K</td>
              <td className="px-4 py-2 border">$0.03/1K</td>
              <td className="px-4 py-2 border">$0.06/1K</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">gpt-4-turbo</td>
              <td className="px-4 py-2 border">OpenAI</td>
              <td className="px-4 py-2 border">128K</td>
              <td className="px-4 py-2 border">$0.01/1K</td>
              <td className="px-4 py-2 border">$0.03/1K</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">gpt-3.5-turbo</td>
              <td className="px-4 py-2 border">OpenAI</td>
              <td className="px-4 py-2 border">16K</td>
              <td className="px-4 py-2 border">$0.0005/1K</td>
              <td className="px-4 py-2 border">$0.0015/1K</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">claude-3-opus</td>
              <td className="px-4 py-2 border">Anthropic</td>
              <td className="px-4 py-2 border">200K</td>
              <td className="px-4 py-2 border">$0.015/1K</td>
              <td className="px-4 py-2 border">$0.075/1K</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">moonshot-v1-8k</td>
              <td className="px-4 py-2 border">Moonshot</td>
              <td className="px-4 py-2 border">8K</td>
              <td className="px-4 py-2 border">$0.001/1K</td>
              <td className="px-4 py-2 border">$0.001/1K</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border font-mono">deepseek-chat</td>
              <td className="px-4 py-2 border">DeepSeek</td>
              <td className="px-4 py-2 border">64K</td>
              <td className="px-4 py-2 border">$0.00014/1K</td>
              <td className="px-4 py-2 border">$0.00028/1K</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 语音识别 */}
      <section id="speech" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">语音识别</h2>
        <p className="text-gray-600 mb-4">基于 Whisper 模型，支持多语言语音转文字。</p>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <code className="text-sm text-gray-800">
            <span className="text-green-600 font-bold">POST</span> /api/v1/audio/transcriptions
          </code>
        </div>

        <CodeBlock
          title="请求示例"
          code={`curl https://api.artinsmart.cn/api/v1/audio/transcriptions \\
  -H "X-API-Key: artin-your-api-key" \\
  -F "file=@audio.mp3" \\
  -F "model=whisper-1" \\
  -F "language=zh"`}
        />
      </section>

      {/* OCR */}
      <section id="ocr" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">文字识别 (OCR)</h2>
        <p className="text-gray-600 mb-4">基于 PaddleOCR，支持多语种印刷体/手写体识别。</p>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <code className="text-sm text-gray-800">
            <span className="text-green-600 font-bold">POST</span> /api/v1/ocr
          </code>
        </div>

        <CodeBlock
          title="请求示例"
          code={`curl https://api.artinsmart.cn/api/v1/ocr \\
  -H "X-API-Key: artin-your-api-key" \\
  -F "file=@image.png" \\
  -F "language=ch_sim+eng"`}
        />
      </section>

      {/* 错误码 */}
      <section id="errors" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">错误码</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left border">HTTP 状态码</th>
              <th className="px-4 py-2 text-left border">错误类型</th>
              <th className="px-4 py-2 text-left border">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">200</td>
              <td className="px-4 py-2 border">OK</td>
              <td className="px-4 py-2 border">请求成功</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">400</td>
              <td className="px-4 py-2 border">Bad Request</td>
              <td className="px-4 py-2 border">请求参数错误</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">401</td>
              <td className="px-4 py-2 border">Unauthorized</td>
              <td className="px-4 py-2 border">API Key 无效或缺失</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">402</td>
              <td className="px-4 py-2 border">Payment Required</td>
              <td className="px-4 py-2 border">余额不足</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">429</td>
              <td className="px-4 py-2 border">Too Many Requests</td>
              <td className="px-4 py-2 border">请求过于频繁</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">500</td>
              <td className="px-4 py-2 border">Internal Server Error</td>
              <td className="px-4 py-2 border">服务器内部错误</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 限流 */}
      <section id="limits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">限流说明</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>免费用户：60 请求/分钟</li>
          <li>付费用户：600 请求/分钟</li>
          <li>企业用户：可定制</li>
        </ul>
        <p className="text-gray-600 mt-4">
          超出限流会返回 429 状态码，请在代码中实现重试机制。
        </p>
      </section>
    </div>
  )
}
