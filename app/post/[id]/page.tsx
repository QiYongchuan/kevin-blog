import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, getAllPosts } from "@/lib/api";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Comments from "@/components/Comments";
import { formatDate } from "@/lib/utils";

// ISR: 每10分钟重新生成页面
export const revalidate = 600;

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} - Kevin's Blog`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 mb-12 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回
      </Link>

      {/* Article Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
          <time className="tabular-nums">{formatDate(post.created_at)}</time>
          {post.labels.length > 0 && (
            <div className="flex gap-2">
              {post.labels.map((label) => (
                <span
                  key={label}
                  className="text-gray-400 dark:text-gray-500"
                >
                  #{label}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose dark:prose-invert max-w-none">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Comments Section */}
      <Comments postId={id} />

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  );
}
