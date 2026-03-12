export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI 能力，<span className="text-primary-600">触手可及</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            一站式 AI API 服务平台，提供大语言模型、语音识别、OCR 等能力。
            简单接入，按需付费。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/auth" 
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-primary-700 transition"
            >
              立即开始
            </a>
            <a 
              href="#pricing" 
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg text-lg hover:bg-primary-50 transition"
            >
              了解定价
            </a>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              免费额度 $5
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              OpenAI 兼容
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              按量付费
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
