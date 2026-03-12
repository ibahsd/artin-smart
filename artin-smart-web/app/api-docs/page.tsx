import { Metadata } from 'next'
import APINav from './components/APINav'
import APIContent from './components/APIContent'

export const metadata: Metadata = {
  title: 'API 文档 - ArtinSmart',
  description: 'ArtinSmart API 完整参考文档',
}

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <aside className="w-64 bg-white border-r min-h-screen sticky top-0">
            <APINav />
          </aside>
          <main className="flex-1 p-8">
            <APIContent />
          </main>
        </div>
      </div>
    </div>
  )
}
