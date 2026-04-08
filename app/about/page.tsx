export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          About
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          关于我。
        </p>
      </header>

      <div className="space-y-16">
        {/* TLDR */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
            TLDR
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Kevin（多多），90后，青岛，INFP，ADHD确诊者。
            </p>
            <p>
              从985农学研究生退学，二学位转码成为程序员。
              2024年底离职，全职自媒体 + 独立开发。
            </p>
            <p>
              X 1.2w粉丝，全网1.8w+粉丝。
            </p>
          </div>
        </section>

        {/* 核心咒语 */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
            核心咒语
          </h2>
          <div className="space-y-4">
            <div className="group">
              <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
                Build fast, share fast
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                不追求完美，追求完成
              </p>
            </div>
            <div className="group">
              <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
                对抗遗忘，保持清醒
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                记录是为了建立坐标
              </p>
            </div>
            <div className="group">
              <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
                开心最重要
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                重复枯燥会杀死创造力
              </p>
            </div>
            <div className="group">
              <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
                不要证明，只管做
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                专注做事，nobody cares
              </p>
            </div>
          </div>
        </section>

        {/* 联系方式 */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
            联系方式
          </h2>
          <div className="space-y-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-gray-900 dark:text-gray-100">X (Twitter)</span>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-gray-900 dark:text-gray-100">GitHub</span>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="mailto:hello@kevin.blog"
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-gray-900 dark:text-gray-100">Email</span>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
