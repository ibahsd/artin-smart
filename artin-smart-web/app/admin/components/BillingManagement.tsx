'use client'

import { useState } from 'react'

export default function BillingManagement({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('pricing')

  const pricing = {
    chat: {
      'gpt-4': { input: 0.03, output: 0.06 },
      'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 text-gray-500 hover:text-gray-700">
            ← 返回
          </button>
          <h2 className="text-2xl font-bold text-gray-900">计费管理</h2>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('pricing')}
          className={`pb-2 px-4 ${activeTab === 'pricing' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          定价设置
        </button>
        <button
          onClick={() => setActiveTab('promotions')}
          className={`pb-2 px-4 ${activeTab === 'promotions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          优惠活动
        </button>
      </div>

      {activeTab === 'pricing' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">模型定价 (每 1K tokens)</h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">模型</th>
                <th className="px-4 py-2 text-left">输入价格</th>
                <th className="px-4 py-2 text-left">输出价格</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pricing.chat).map(([model, prices]: [string, any]) => (
                <tr key={model} className="border-t">
                  <td className="px-4 py-3 font-mono">{model}</td>
                  <td className="px-4 py-3">${prices.input}</td>
                  <td className="px-4 py-3">${prices.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'promotions' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">优惠活动</h3>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">新用户注册赠送</p>
                <p className="text-sm text-gray-500">每个新注册用户自动获得 $5 额度</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">进行中</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
