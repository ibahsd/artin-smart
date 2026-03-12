const plans = [
  {
    name: '免费版',
    price: '$0',
    description: '适合个人开发者体验',
    features: [
      '$5 免费额度',
      '标准响应速度',
      '基础模型访问',
      '社区支持',
    ],
    cta: '免费开始',
    popular: false,
  },
  {
    name: '专业版',
    price: '按量',
    description: '适合生产环境使用',
    features: [
      '无免费额度限制',
      '优先响应速度',
      '全部模型访问',
      '技术支持',
      '详细使用统计',
    ],
    cta: '立即使用',
    popular: true,
  },
  {
    name: '企业版',
    price: '定制',
    description: '适合大规模业务',
    features: [
      '专属资源池',
      '极速响应',
      '自定义模型',
      '专属客户经理',
      'SLA 保障',
    ],
    cta: '联系我们',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">定价方案</h2>
          <p className="text-lg text-gray-600">按需付费，无隐藏费用</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-primary-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-900 shadow'
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-3 py-1 bg-primary-500 text-sm rounded-full mb-4">
                  最受欢迎
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`mb-4 ${plan.popular ? 'text-primary-100' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="text-4xl font-bold mb-6">{plan.price}</div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-3 ${plan.popular ? 'text-primary-200' : 'text-green-500'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-white text-primary-600 hover:bg-gray-100'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">API 定价</h3>
          <div className="inline-block bg-white rounded-xl shadow p-6">
            <table className="text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 pr-8">服务</th>
                  <th className="pb-3">价格</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-3 pr-8">GPT-4</td>
                  <td className="py-3">$0.03/1K tokens (输入) / $0.06/1K tokens (输出)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-8">GPT-3.5-Turbo</td>
                  <td className="py-3">$0.0005/1K tokens (输入) / $0.0015/1K tokens (输出)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-8">语音识别</td>
                  <td className="py-3">$0.006/分钟</td>
                </tr>
                <tr>
                  <td className="py-3 pr-8">OCR</td>
                  <td className="py-3">$0.001/张</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
