'use client'

import { useState } from 'react'

export default function AdminNav() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: '概览', icon: '📊' },
    { id: 'users', label: '用户管理', icon: '👥' },
    { id: 'billing', label: '计费管理', icon: '💰' },
    { id: 'usage', label: '使用统计', icon: '📈' },
    { id: 'settings', label: '系统设置', icon: '⚙️' },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold">ArtinSmart</span>
        <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">Admin</span>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="flex items-center px-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-500">admin@artinsmart.cn</p>
          </div>
        </div>
      </div>
    </div>
  )
}
