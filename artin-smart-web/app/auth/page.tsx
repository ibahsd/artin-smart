'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  
  useEffect(() => {
    // 跳转到独立登录页面
    router.push('/login.html')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl">正在跳转到登录页...</div>
      </div>
    </div>
  )
}
