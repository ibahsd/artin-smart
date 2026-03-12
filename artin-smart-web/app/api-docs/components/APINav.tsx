export default function APINav() {
  const sections = [
    {
      title: '开始使用',
      items: [
        { id: 'intro', label: '简介' },
        { id: 'auth', label: '认证' },
        { id: 'quickstart', label: '快速开始' },
      ]
    },
    {
      title: '大模型 API',
      items: [
        { id: 'chat', label: 'Chat Completions' },
        { id: 'models', label: '模型列表' },
        { id: 'streaming', label: '流式响应' },
      ]
    },
    {
      title: 'AI 能力',
      items: [
        { id: 'speech', label: '语音识别' },
        { id: 'ocr', label: '文字识别' },
        { id: 'vision', label: '图像理解' },
      ]
    },
    {
      title: '用户管理',
      items: [
        { id: 'register', label: '注册用户' },
        { id: 'balance', label: '查询余额' },
        { id: 'usage', label: '使用统计' },
      ]
    },
    {
      title: '参考',
      items: [
        { id: 'errors', label: '错误码' },
        { id: 'pricing', label: '定价' },
        { id: 'limits', label: '限流' },
      ]
    },
  ]

  return (
    <div className="p-6">
      <a href="/" className="text-xl font-bold text-primary-600 block mb-8">
        ArtinSmart
      </a>
      <nav className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-gray-600 hover:text-primary-600 block py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
