import { Metadata } from 'next'
import AdminNav from './components/AdminNav'
import Dashboard from './components/Dashboard'

export const metadata: Metadata = {
  title: '管理后台 - ArtinSmart',
  description: 'ArtinSmart 管理后台',
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
          <AdminNav />
        </aside>
        <main className="flex-1 p-8">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
