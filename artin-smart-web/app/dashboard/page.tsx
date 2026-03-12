'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [apiKeys, setApiKeys] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // 用量数据
  const [usageData, setUsageData] = useState<any>(null)
  const [usageLoading, setUsageLoading] = useState(false)

  useEffect(() => {
    // 检查登录状态
    const storedUser = localStorage.getItem('artin_user')
    const storedKey = localStorage.getItem('artin_api_key')
    
    if (!storedUser || !storedKey) {
      router.push('/auth')
      return
    }

    setUser(JSON.parse(storedUser))
    // 模拟 API Keys 数据
    setApiKeys([
      { id: 1, name: '默认密钥', key: storedKey, created_at: '2026-03-10', status: 'active' }
    ])
    setLoading(false)
  }, [router])

  // 加载用量数据
  const loadUsageData = async (days: number = 7) => {
    const storedKey = localStorage.getItem('artin_api_key')
    if (!storedKey) return
    
    setUsageLoading(true)
    try {
      const res = await fetch(`/api/user/usage?api_key=${storedKey}&days=${days}`)
      if (res.ok) {
        const data = await res.json()
        setUsageData(data)
      }
    } catch (err) {
      console.error('Failed to load usage:', err)
    }
    setUsageLoading(false)
  }

  // 切换到用量 tab 时加载数据
  useEffect(() => {
    if (activeTab === 'usage' && !usageData) {
      loadUsageData()
    }
  }, [activeTab])

  const handleLogout = () => {
    localStorage.removeItem('artin_user')
    localStorage.removeItem('artin_api_key')
    router.push('/')
  }

  const createApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: `密钥 ${apiKeys.length + 1}`,
      key: 'artin-' + Math.random().toString(36).substring(2, 15),
      created_at: new Date().toISOString().split('T')[0],
      status: 'active'
    }
    setApiKeys([...apiKeys, newKey])
  }

  const deleteApiKey = (id: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== id))
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-primary-600">ArtinSmart</a>
              <span className="ml-4 text-gray-400">|</span>
              <span className="ml-4 text-gray-700">用户中心</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
                退出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 左侧菜单 */}
          <aside className="w-64">
            <div className="bg-white rounded-lg shadow">
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📊 概览
                </button>
                <button
                  onClick={() => setActiveTab('apikeys')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'apikeys' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔑 API 密钥
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'billing' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  💳 账单
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'usage' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📈 使用统计
                </button>
              </nav>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 欢迎卡片 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    欢迎回来，{user?.email?.split('@')[0]}
                  </h2>
                  <p className="text-gray-600">
                    这是您的 ArtinSmart 控制面板，您可以管理 API 密钥、查看账单和使用统计。
                  </p>
                </div>

                {/* 统计卡片 */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500 mb-1">账户余额</p>
                    <p className="text-3xl font-bold text-gray-900">¥{user?.credits?.toFixed(2) || '0.00'}</p>
                    <button className="mt-2 text-sm text-blue-600 hover:underline">充值</button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500 mb-1">总消费</p>
                    <p className="text-3xl font-bold text-gray-900">¥{user?.total_spent?.toFixed(2) || '0.00'}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500 mb-1">API 密钥</p>
                    <p className="text-3xl font-bold text-gray-900">{apiKeys.length}</p>
                    <button 
                      onClick={() => setActiveTab('apikeys')}
                      className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                      管理
                    </button>
                  </div>
                </div>

                {/* 快速开始 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">快速开始</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-sm text-green-400 font-mono">
                      {`curl https://api.artinsmart.cn/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKeys[0]?.key || 'your-api-key'}" \\
  -d '{"model": "MiniMax-M2.5", "messages": [{"role": "user", "content": "Hello"}]}'`}
                    </code>
                  </div>
                  <a href="/api-docs" className="mt-4 inline-block text-blue-600 hover:underline">
                    查看完整 API 文档 →
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'apikeys' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">API 密钥管理</h3>
                  <button 
                    onClick={createApiKey}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    + 创建新密钥
                  </button>
                </div>
                <div className="p-6">
                  {apiKeys.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">暂无 API 密钥</p>
                  ) : (
                    <div className="space-y-4">
                      {apiKeys.map((key) => (
                        <div key={key.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{key.name}</p>
                              <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded mt-1 block">
                                {key.key}
                              </code>
                              <p className="text-xs text-gray-400 mt-2">
                                创建于 {key.created_at}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                {key.status === 'active' ? '正常' : '已停用'}
                              </span>
                              <button 
                                onClick={() => deleteApiKey(key.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                删除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">账单记录</h3>
                <p className="text-gray-500">暂无账单记录</p>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-6">
                {/* 时间筛选 */}
                <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">使用统计</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => loadUsageData(7)}
                      className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-600"
                    >
                      最近7天
                    </button>
                    <button 
                      onClick={() => loadUsageData(30)}
                      className="px-3 py-1 text-sm rounded hover:bg-gray-100"
                    >
                      最近30天
                    </button>
                  </div>
                </div>

                {usageLoading ? (
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500">加载中...</p>
                  </div>
                ) : usageData ? (
                  <>
                    {/* 统计概览 */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-500">总请求数</p>
                        <p className="text-2xl font-bold text-gray-900">{usageData.summary?.total_requests || 0}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-500">输入 Tokens</p>
                        <p className="text-2xl font-bold text-gray-900">{usageData.summary?.total_input_tokens || 0}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-500">输出 Tokens</p>
                        <p className="text-2xl font-bold text-gray-900">{usageData.summary?.total_output_tokens || 0}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-500">总消耗</p>
                        <p className="text-2xl font-bold text-gray-900">¥{usageData.summary?.total_cost?.toFixed(4) || '0.00'}</p>
                      </div>
                    </div>

                    {/* 每日趋势 */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">每日使用趋势</h4>
                      {usageData.daily?.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">日期</th>
                                <th className="text-right py-2">请求数</th>
                                <th className="text-right py-2">输入</th>
                                <th className="text-right py-2">输出</th>
                                <th className="text-right py-2">总计</th>
                                <th className="text-right py-2">费用</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usageData.daily.map((day: any, idx: number) => (
                                <tr key={idx} className="border-b">
                                  <td className="py-2">{day.date}</td>
                                  <td className="text-right">{day.requests}</td>
                                  <td className="text-right">{day.input_tokens}</td>
                                  <td className="text-right">{day.output_tokens}</td>
                                  <td className="text-right font-medium">{day.total_tokens}</td>
                                  <td className="text-right">¥{day.cost?.toFixed(4)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">暂无使用记录</p>
                      )}
                    </div>

                    {/* 按模型统计 */}
                    {usageData.by_model?.length > 0 && (
                      <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">按模型统计</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">模型</th>
                                <th className="text-right py-2">请求数</th>
                                <th className="text-right py-2">总 Tokens</th>
                                <th className="text-right py-2">费用</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usageData.by_model.map((m: any, idx: number) => (
                                <tr key={idx} className="border-b">
                                  <td className="py-2 font-mono text-sm">{m.model}</td>
                                  <td className="text-right">{m.requests}</td>
                                  <td className="text-right">{m.total_tokens}</td>
                                  <td className="text-right">¥{m.cost?.toFixed(4)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500">暂无使用数据</p>
                    <p className="text-sm text-gray-400 mt-2">开始使用 API 后，这里会显示您的使用统计</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
