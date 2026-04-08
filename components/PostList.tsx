'use client';

import Link from 'next/link';
import { Post } from '@/types';
import { formatDate, groupByYear } from '@/lib/utils';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const groupedPosts = groupByYear(posts);
  const sortedYears = Object.keys(groupedPosts).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="space-y-16">
      {sortedYears.map((year) => (
        <div key={year}>
          <h2 className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-6 tracking-wider">
            {year}
          </h2>
          <ul className="space-y-1">
            {groupedPosts[year].map((post) => (
              <li key={post.id}>
                <Link
                  href={`/post/${post.id}`}
                  className="group flex items-baseline py-2 hover:opacity-60 transition-opacity"
                >
                  <span className="text-base text-gray-900 dark:text-gray-100 flex-shrink-0">
                    {post.title}
                  </span>
                  <span className="flex-1 border-b border-dotted border-gray-300 dark:border-gray-700 mx-4 min-w-[2rem]" />
                  <span className="text-sm text-gray-400 dark:text-gray-600 flex-shrink-0 tabular-nums">
                    {formatDate(post.created_at)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
