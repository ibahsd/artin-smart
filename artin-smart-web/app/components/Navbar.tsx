'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">
              ArtinSmart
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600">功能</a>
            <a href="#api" className="text-gray-600 hover:text-primary-600">API</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600">定价</a>
            <a href="/api-docs" className="text-gray-600 hover:text-primary-600">文档</a>
            <a href="/admin" className="text-gray-600 hover:text-primary-600">管理</a>
            <a href="/login.html" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              立即开始
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <a href="#features" className="block py-2 text-gray-600">功能</a>
            <a href="#api" className="block py-2 text-gray-600">API</a>
            <a href="#pricing" className="block py-2 text-gray-600">定价</a>
            <a href="/api-docs" className="block py-2 text-gray-600">文档</a>
            <a href="/admin" className="block py-2 text-gray-600">管理</a>
            <a href="/login.html" className="block py-2 text-primary-600 font-medium">立即开始</a>
          </div>
        </div>
      )}
    </nav>
  )
}
