'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const API_BASE = 'http://47.111.4.141:8000'

export default function RegisterPage() {
  const router = useRouter()
  
  // 注册类型：email 或 phone
  const [regType, setRegType] = useState<'email' | 'phone'>('email')
  
  // 表单数据
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  // 发送验证码
  const sendCode = async () => {
    const target = regType === 'email' ? email : phone
    
    if (!target) {
      setMessage(regType === 'email' ? '请输入邮箱' : '请输入手机号')
      setMessageType('error')
      return
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, type: regType })
      })
      
      const data = await res.json()
      
      if (data.success || data.detail?.includes('发送成功')) {
        setMessage('验证码已发送')
        setMessageType('success')
        
        // 开始倒计时
        setCountdown(60)
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setMessage(data.detail || '发送失败')
        setMessageType('error')
      }
    } catch (err) {
      setMessage('网络错误')
      setMessageType('error')
    }
  }

  // 注册
  const handleRegister = async () => {
    const target = regType === 'email' ? email : phone
    
    // 基础验证
    if (!target) {
      setMessage('请输入' + (regType === 'email' ? '邮箱' : '手机号'))
      setMessageType('error')
      return
    }
    
    if (!password) {
      setMessage('请输入密码')
      setMessageType('error')
      return
    }
    
    if (password !== confirmPassword) {
      setMessage('两次密码不一致')
      setMessageType('error')
      return
    }
    
    if (!code) {
      setMessage('请输入验证码')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // 先验证验证码
      const verifyRes = await fetch(`${API_BASE}/api/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code, type: regType })
      })
      
      const verifyData = await verifyRes.json()
      
      if (!verifyData.success) {
        setMessage('验证码错误')
        setMessageType('error')
        setLoading(false)
        return
      }
      
      // 验证码正确，进行注册
      const regRes = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: regType === 'email' ? email : '',
          phone: regType === 'phone' ? phone : '',
          password: password
        })
      })
      
      const regData = await regRes.json()
      
      if (regData.id || regData.api_key) {
        // 注册成功，保存登录状态
        localStorage.setItem('artin_user', JSON.stringify({
          email: regData.email || regData.phone,
          credits: regData.credits
        }))
        localStorage.setItem('artin_api_key', regData.api_key)
        
        setMessage('注册成功！正在跳转...')
        setMessageType('success')
        
        setTimeout(() => {
          router.push('/dashboard.html')
        }, 1000)
      } else {
        setMessage(regData.detail || '注册失败')
        setMessageType('error')
      }
    } catch (err) {
      setMessage('网络错误')
      setMessageType('error')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">注册 ArtinSmart</h1>
          <p className="text-gray-500 mt-2">创建您的账户</p>
        </div>

        {/* 切换注册类型 */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setRegType('email')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              regType === 'email' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'
            }`}
          >
            邮箱注册
          </button>
          <button
            onClick={() => setRegType('phone')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              regType === 'phone' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'
            }`}
          >
            手机号注册
          </button>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* 注册表单 */}
        <div className="space-y-4">
          {/* 邮箱/手机号输入 */}
          {regType === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入手机号"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* 验证码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">验证码</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="请输入验证码"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={sendCode}
                disabled={countdown > 0}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  countdown > 0 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* 密码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="设置密码"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 确认密码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="再次输入密码"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 注册按钮 */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </div>

        {/* 已有账号 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          已有账号？{' '}
          <a href="/auth.html" className="text-blue-600 hover:underline">
            立即登录
          </a>
        </div>
      </div>
    </div>
  )
}
