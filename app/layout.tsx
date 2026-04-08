import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kevin's Blog",
  description: "Build fast, share fast. 独立开发者、自媒体人、AI魔法师。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Umami Analytics - 替换为你的 Umami 实例地址 */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="YOUR_UMAMI_WEBSITE_ID"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b border-gray-200 dark:border-gray-800">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-semibold hover:opacity-70 transition-opacity">
                  Kevin
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    文章
                  </Link>
                  <Link href="/thoughts" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    Thoughts
                  </Link>
                  <Link href="/projects" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    项目
                  </Link>
                  <Link href="/about" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    关于
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>© 2025 Kevin. Build fast, share fast.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
