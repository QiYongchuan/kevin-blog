import { getAllThoughts } from "@/lib/api";
import { formatDate } from "@/lib/utils";

// ISR: 每10分钟重新生成页面
export const revalidate = 600;

export default async function ThoughtsPage() {
  const thoughts = await getAllThoughts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* TLDR 标题区 */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight">
          TLDR
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto border-l-4 border-gray-200 dark:border-gray-700 pl-6 text-left">
          这里记录我在日常生活中的碎片化、未经（太多）思想审查的想法。
        </p>
      </section>

      {/* Thoughts 卡片列表 */}
      <div className="space-y-6">
        {thoughts.map((thought) => (
          <article
            key={thought.id}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {thought.content}
              </div>
            </div>
            <time className="block mt-4 text-sm text-gray-400 dark:text-gray-500 text-right tabular-nums">
              {formatDate(thought.created_at)}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}
