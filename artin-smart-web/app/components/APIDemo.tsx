'use client'

import { useState } from 'react'

export default function APIDemo() {
  const [activeTab, setActiveTab] = useState('chat')

  const codeExamples = {
    chat: `curl https://api.artinsmart.cn/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: artin-your-api-key" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    whisper: `curl https://api.artinsmart.cn/v1/audio/transcriptions \\
  -H "X-API-Key: artin-your-api-key" \\
  -F "file=@audio.mp3"`,
    ocr: `curl https://api.artinsmart.cn/v1/ocr \\
  -H "X-API-Key: artin-your-api-key" \\
  -F "file=@image.png" \\
  -F "language=ch_sim+eng"`,
  }

  return (
    <section id="api" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">简单接入，立即使用</h2>
          <p className="text-gray-400">兼容 OpenAI API 格式，迁移零成本</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-4 mb-6">
            {[
              { id: 'chat', label: '聊天' },
              { id: 'whisper', label: '语音' },
              { id: 'ocr', label: 'OCR' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              {codeExamples[activeTab as keyof typeof codeExamples]}
            </pre>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/api-docs"
              className="text-primary-400 hover:text-primary-300 inline-flex items-center"
            >
              查看完整 API 文档
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
