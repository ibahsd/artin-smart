'use client'

import { useState } from 'react'

interface CodeBlockProps {
  title?: string
  code: string
}

export default function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
      {title && (
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <span className="text-sm text-gray-400">{title}</span>
          <button
            onClick={copyToClipboard}
            className="text-xs text-gray-500 hover:text-white transition"
          >
            {copied ? '已复制!' : '复制'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-green-400 font-mono">{code}</code>
      </pre>
    </div>
  )
}
