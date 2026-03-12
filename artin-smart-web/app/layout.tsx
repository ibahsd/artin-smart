import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArtinSmart - AI API 服务平台',
  description: '提供大模型API、语音识别、OCR等AI服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
