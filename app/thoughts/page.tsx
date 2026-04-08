import { getAllThoughts } from "@/lib/api";
import { formatDate } from "@/lib/utils";

// ISR: 每10分钟重新生成页面
export const revalidate = 600;

export default async function ThoughtsPage() {
  const thoughts = await getAllThoughts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Thoughts
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          碎片化的思考，随时记录的想法。
        </p>
      </header>

      <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
        {thoughts.map((thought) => (
          <div
            key={thought.id}
            className="py-8 group"
          >
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-3 text-lg">
              {thought.content}
            </p>
            <time className="text-sm text-gray-400 dark:text-gray-500 tabular-nums">
              {formatDate(thought.created_at)}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}
