'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'ArtinSmart2026!'
const API_BASE = 'https://api.artinsmart.cn'

export default function UsageStats({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/admin/usage?password=${ADMIN_PASSWORD}&days=7`)
      const result = await res.json()
      setData(result)
    } catch (err) {
      console.error('Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-700">
          ← 返回
        </button>
        <div className="text-center p-8 text-gray-500">加载中...</div>
      </div>
    )
  }

  const dailyStats = data?.daily_stats || []
  const maxRequests = Math.max(...dailyStats.map((d: any) => d.requests || 0), 1)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 text-gray-500 hover:text-gray-700">
            ← 返回
          </button>
          <h2 className="text-2xl font-bold text-gray-900">使用统计</h2>
        </div>
        <button onClick={fetchStats} className="text-sm text-blue-600 hover:underline">
          刷新
        </button>
      </div>

      {/* 7日趋势 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">7日请求趋势</h3>
        {dailyStats.length === 0 ? (
          <p className="text-gray-500">暂无数据</p>
        ) : (
          <div className="space-y-3">
            {dailyStats.map((day: any) => (
              <div key={day.date} className="flex items-center">
                <span className="w-12 text-sm text-gray-500">{day.date}</span>
                <div className="flex-1 mx-3 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${(day.requests / maxRequests) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                    {day.requests}
                  </span>
                </div>
                <span className="w-16 text-sm text-gray-600 text-right">${day.cost?.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 统计表格 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">日期</th>
              <th className="px-4 py-2 text-right">请求数</th>
              <th className="px-4 py-2 text-right">费用</th>
            </tr>
          </thead>
          <tbody>
            {dailyStats.map((day: any) => (
              <tr key={day.date} className="border-t">
                <td className="px-4 py-3">{day.date}</td>
                <td className="px-4 py-3 text-right">{day.requests}</td>
                <td className="px-4 py-3 text-right">${day.cost?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
