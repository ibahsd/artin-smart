'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'ArtinSmart2026!'
const API_BASE = 'https://api.artinsmart.cn'

export default function UserManagement({ onBack }: { onBack: () => void }) {
  const [users, setUsers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/admin/users?password=${ADMIN_PASSWORD}&search=${searchTerm}`)
      const data = await res.json()
      setUsers(data.users || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleRecharge = async (userId: number, amount: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}/recharge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADMIN_PASSWORD, amount })
      })
      const data = await res.json()
      if (data.success) {
        setMessage(`充值成功！新余额: $${data.new_balance}`)
        fetchUsers()
      }
    } catch (err) {
      setMessage('充值失败')
    }
  }

  const handleToggleStatus = async (userId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}/toggle-status?password=${ADMIN_PASSWORD}`, {
        method: 'POST'
      })
      const data = await res.json()
      if (data.success) {
        setMessage(`状态已更新: ${data.status}`)
        fetchUsers()
      }
    } catch (err) {
      setMessage('操作失败')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 text-gray-500 hover:text-gray-700">
            ← 返回
          </button>
          <h2 className="text-2xl font-bold text-gray-900">用户管理</h2>
        </div>
        <button onClick={fetchUsers} className="text-sm text-blue-600 hover:underline">
          刷新
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {message}
        </div>
      )}

      {/* 筛选栏 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4">
        <input
          type="text"
          placeholder="搜索邮箱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchUsers()}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={fetchUsers} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          搜索
        </button>
      </div>

      {/* 用户列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">加载中...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">邮箱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">余额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">总消费</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{user.email}</div>
                    <div className="text-xs text-gray-500">{user.api_key}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.credits?.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.total_spent?.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? '正常' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleRecharge(user.id, 10)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      +$10
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      {user.status === 'active' ? '停用' : '启用'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        共 {total} 个用户
      </div>
    </div>
  )
}
