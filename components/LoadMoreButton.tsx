'use client';

import { useState } from 'react';
import { Post } from '@/types';
import PostList from './PostList';

interface LoadMoreButtonProps {
  allPosts: Post[];
  initialCount: number;
  hasMore: boolean;
  total: number;
}

export default function LoadMoreButton({
  allPosts,
  initialCount,
  total,
}: LoadMoreButtonProps) {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [displayedPosts, setDisplayedPosts] = useState(allPosts.slice(0, initialCount));

  const handleLoadMore = () => {
    const newCount = displayCount + 10;
    setDisplayCount(newCount);
    setDisplayedPosts(allPosts.slice(0, newCount));
  };

  const currentHasMore = displayCount < total;

  return (
    <>
      {/* 显示更多文章 */}
      {displayedPosts.length > initialCount && (
        <PostList posts={displayedPosts.slice(initialCount)} />
      )}

      {/* 加载更多按钮 */}
      {currentHasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            加载更多 ({displayedPosts.length}/{total})
          </button>
        </div>
      )}
    </>
  );
}
