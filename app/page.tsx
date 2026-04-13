import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/api";

// ISR: 每10分钟重新生成页面
export const revalidate = 600;

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* TLDR Section - 极简风格 */}
      <section className="mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight">
          TLDR
        </h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          <p>
            INFP+ADHD创作者，用AI当魔法棒的魔法师。
          </p>
          <p className="text-gray-400 dark:text-gray-500 italic">
            Build fast, share fast. 在废墟上重建意义。
          </p>
        </div>
      </section>

      {/* Posts Section - 按年份分组 */}
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
