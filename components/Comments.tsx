'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

interface CommentsProps {
  postId: string;
}

// 使用 localStorage 存储评论（简单方案，适合静态部署）
const STORAGE_KEY = 'blog-comments';

function getStoredComments(postId: string): Comment[] {
  if (typeof window === 'undefined') return [];
  try {
    const allComments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return allComments[postId] || [];
  } catch {
    return [];
  }
}

function storeComment(postId: string, comment: Comment) {
  if (typeof window === 'undefined') return;
  try {
    const allComments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!allComments[postId]) {
      allComments[postId] = [];
    }
    allComments[postId].unshift(comment);
    // 只保留最近 50 条
    if (allComments[postId].length > 50) {
      allComments[postId] = allComments[postId].slice(0, 50);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
  } catch (error) {
    console.error('Failed to store comment:', error);
  }
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = getStoredComments(postId);
    setComments(stored);
    setLoading(false);
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      content: content.trim(),
      author: author.trim() || '匿名',
      createdAt: new Date().toISOString(),
    };

    storeComment(postId, comment);
    setComments((prev) => [comment, ...prev]);
    setContent('');
    setAuthor('');
    setShowForm(false);
    setSubmitting(false);
  };

  return (
    <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        评论 ({comments.length})
      </h3>

      {/* 评论列表 */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"
            />
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {comment.author}
                </span>
                <time className="text-sm text-gray-400 dark:text-gray-500">
                  {formatDate(comment.createdAt)}
                </time>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          暂无评论，成为第一个留言的人吧
        </p>
      )}

      {/* 发表评论按钮 */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-8 w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          写评论...
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              昵称（可选）
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="匿名"
              maxLength={20}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              评论内容 *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下你的想法..."
              required
              maxLength={1000}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none"
            />
            <p className="mt-1 text-sm text-gray-400 text-right">
              {content.length}/1000
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="flex-1 py-2 px-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '提交中...' : '发表评论'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
