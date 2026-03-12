'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'ArtinSmart2026!'
const API_BASE = 'https://api.artinsmart.cn'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // 数据状态
  const [stats, setStats] = useState<any>(null)
  const [recentUsers, setRecentUsers] = useState<any[]>([])

  // 加载仪表盘数据
  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/admin/dashboard?password=${ADMIN_PASSWORD}`)
      const data = await res.json()
      
      if (data.stats) {
        setStats(data.stats)
        setRecentUsers(data.recent_users || [])
      } else {
        setError('Failed to load data')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  if (activeTab === 'users') {
    return <UserManagement onBack={() => setActiveTab('dashboard')} />
  }
  if (activeTab === 'billing') {
    return <BillingManagement onBack={() => setActiveTab('dashboard')} />
  }
  if (activeTab === 'usage') {
    return <UsageStats onBack={() => setActiveTab('dashboard')} />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button onClick={fetchDashboard} className="mt-2 text-sm text-red-600 underline">
          重试
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
        <button onClick={fetchDashboard} className="text-sm text-blue-600 hover:underline">
          刷新数据
        </button>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="总用户数" value={stats?.total_users || 0} />
        <StatCard title="活跃用户" value={stats?.active_users || 0} />
        <StatCard title="今日请求" value={stats?.today_requests || 0} />
        <StatCard title="总收入" value={`$${stats?.total_revenue?.toFixed(2) || '0.00'}`} />
      </div>

      {/* 快捷操作 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">快捷操作</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('users')}
              className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              👥 用户管理
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              💰 计费管理
            </button>
            <button 
              onClick={() => setActiveTab('usage')}
              className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              📈 使用统计
            </button>
          </div>
        </div>

        {/* 最近用户 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">最近注册用户</h3>
          <div className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无用户</p>
            ) : (
              recentUsers.map((user: any) => (
                <div key={user.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${user.credits}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? '正常' : '停用'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* API 状态 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">API 状态</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">✓</p>
            <p className="text-sm text-gray-600">Chat API</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">✓</p>
            <p className="text-sm text-gray-600">用户系统</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">✓</p>
            <p className="text-sm text-gray-600">管理后台</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">99%</p>
            <p className="text-sm text-gray-600">可用性</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

// 导入其他组件
import UserManagement from './UserManagement'
import BillingManagement from './BillingManagement'
import UsageStats from './UsageStats'
