// 文章数据类型
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  labels: string[];
}

// 项目数据类型
export interface Project {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
  platform: 'twitter' | 'xiaohongshu' | 'wechat' | 'website';
  category: 'commercial' | 'personal' | 'experiment';
  date: string;
}

// Thought 数据类型
export interface Thought {
  id: string;
  content: string;
  created_at: string;
}

// 项目分类
export type ProjectCategory = 'all' | 'commercial' | 'personal' | 'experiment';
