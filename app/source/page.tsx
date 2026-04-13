export default function SourcePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* TLDR Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight">
          TLDR
        </h1>
        <blockquote className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto border-l-4 border-gray-200 dark:border-gray-700 pl-6 text-left italic">
          用 Next.js + GitHub Issues 搭建的极简博客。内容即代码，Issue 即文章。
        </blockquote>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
          Tech Stack
        </h2>
        <div className="space-y-4">
          <div className="group">
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
              Next.js 14
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              App Router + Static Site Generation
            </p>
          </div>
          <div className="group">
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
              TypeScript
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              类型安全，更好的开发体验
            </p>
          </div>
          <div className="group">
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
              Tailwind CSS
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              原子化 CSS，快速构建界面
            </p>
          </div>
          <div className="group">
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
              GitHub Issues
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              CMS 即代码，Issue 即文章
            </p>
          </div>
          <div className="group">
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
              Cloudflare Pages
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              免费托管，全球 CDN 加速
            </p>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
          Open Source
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            这个博客的源代码完全开源。你可以 Fork 它，修改它，部署你自己的版本。
          </p>
          <a
            href="https://github.com/QiYongchuan/MyGitBlog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors group"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>QiYongchuan/MyGitBlog</span>
            <svg className="w-4 h-4 ml-1 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Inspiration Section */}
      <section>
        <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
          Inspiration
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            这个博客的设计灵感来自以下优秀的个人网站：
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>
              <a href="https://mazzzystar.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                mazzzystar.com
              </a>
              {' '}— 极简主义设计
            </li>
            <li>
              <a href="https://antfu.me" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                antfu.me
              </a>
              {' '}— 开源精神
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
