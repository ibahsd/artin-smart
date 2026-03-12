'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const API_BASE = 'http://47.111.4.141:8000'

export default function LoginPage() {
  const router = useRouter()
  
  // 登录类型：email 或 phone
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email')
  
  // 登录方式：password 或 code
  const [loginMethod, setLoginMethod] = useState<'password' | 'code'>('password')
  
  // 表单数据
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  // 发送验证码
  const sendCode = async () => {
    const target = loginType === 'email' ? email : phone
    
    if (!target) {
      setMessage(loginType === 'email' ? '请输入邮箱' : '请输入手机号')
      setMessageType('error')
      return
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, type: loginType })
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

  // 登录
  const handleLogin = async () => {
    const target = loginType === 'email' ? email : phone
    
    if (!target) {
      setMessage('请输入' + (loginType === 'email' ? '邮箱' : '手机号'))
      setMessageType('error')
      return
    }

    if (loginMethod === 'password' && !password) {
      setMessage('请输入密码')
      setMessageType('error')
      return
    }

    if (loginMethod === 'code' && !code) {
      setMessage('请输入验证码')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      let loginData
      
      if (loginMethod === 'code') {
        // 验证码登录：先验证验证码
        const verifyRes = await fetch(`${API_BASE}/api/verify-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, code, type: loginType })
        })
        
        const verifyData = await verifyRes.json()
        
        if (!verifyData.success) {
          setMessage('验证码错误')
          setMessageType('error')
          setLoading(false)
          return
        }
        
        // 验证码正确，直接用手机号/邮箱作为标识登录
        loginData = { api_key: verifyData.api_key || 'verified_' + target }
      } else {
        // 密码登录
        const res = await fetch(`${API_BASE}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginType === 'email' ? email : '',
            phone: loginType === 'phone' ? phone : '',
            password: password
          })
        })
        
        loginData = await res.json()
      }
      
      if (loginData.api_key) {
        // 登录成功
        localStorage.setItem('artin_user', JSON.stringify({
          email: loginData.user?.email || loginType === 'email' ? email : phone,
          credits: loginData.user?.credits || 5
        }))
        localStorage.setItem('artin_api_key', loginData.api_key)
        
        setMessage('登录成功！正在跳转...')
        setMessageType('success')
        
        setTimeout(() => {
          router.push('/dashboard.html')
        }, 1000)
      } else {
        setMessage(loginData.detail || '登录失败')
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
          <h1 className="text-2xl font-bold text-gray-900">登录 ArtinSmart</h1>
          <p className="text-gray-500 mt-2">欢迎回来</p>
        </div>

        {/* 切换登录类型 */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLoginType('email')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              loginType === 'email' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'
            }`}
          >
            邮箱登录
          </button>
          <button
            onClick={() => setLoginType('phone')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              loginType === 'phone' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'
            }`}
          >
            手机号登录
          </button>
        </div>

        {/* 切换登录方式 */}
        <div className="flex mb-4 text-sm">
          <button
            onClick={() => setLoginMethod('password')}
            className={`mr-4 ${loginMethod === 'password' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            密码登录
          </button>
          <button
            onClick={() => setLoginMethod('code')}
            className={`${loginMethod === 'code' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            验证码登录
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

        {/* 登录表单 */}
        <div className="space-y-4">
          {/* 邮箱/手机号输入 */}
          {loginType === 'email' ? (
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

          {/* 密码登录 */}
          {loginMethod === 'password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* 验证码登录 */}
          {loginMethod === 'code' && (
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
          )}

          {/* 登录按钮 */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </div>

        {/* 没有账号 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          还没有账号？{' '}
          <a href="/register.html" className="text-blue-600 hover:underline">
            立即注册
          </a>
        </div>
      </div>
    </div>
  )
}
