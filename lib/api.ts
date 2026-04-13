import { Post, Project, Thought } from '@/types';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
const REPO_OWNER = 'QiYongchuan';
const REPO_NAME = 'MyGitBlog';

// GitHub API 类型定义
interface GitHubUser {
  login: string;
}

interface GitHubLabel {
  name: string;
}

interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  created_at: string;
  user: GitHubUser;
  labels: (string | GitHubLabel)[];
}

interface GitHubComment {
  id: number;
  body: string;
  user: GitHubUser;
  created_at: string;
}

// 解码 Unicode 转义序列（如 \\u003e -> >）
function decodeUnicode(str: string): string {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

// GitHub API 基础配置
async function fetchGitHubAPI(url: string) {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    console.error('GitHub API error:', response.status, response.statusText);
    return null;
  }
  return response.json();
}

// 从 GitHub Issues 获取文章
export async function getAllPosts(): Promise<Post[]> {
  try {
    // 先获取所有 issues（不分页，最多 100 条）
    const issues = await fetchGitHubAPI(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&per_page=100&sort=created&direction=desc`
    );

    if (!issues || !Array.isArray(issues)) {
      console.warn('Failed to fetch posts, using fallback data');
      return getFallbackPosts();
    }

    // 过滤逻辑：
    // 1. 作者自己创建的
    // 2. 不包含 hidden/hide 标签
    // 3. 不包含 thought 标签（thought 只显示在 thoughts 页面）
    const authorIssues = issues.filter((issue: GitHubIssue) => {
      if (!issue.user || issue.user.login !== REPO_OWNER) return false;

      const labels = issue.labels?.map((label: string | GitHubLabel) =>
        typeof label === 'string' ? label : label.name
      ) || [];

      // 排除 hidden/hide 标签
      if (labels.some((l: string) => l.toLowerCase() === 'hide' || l.toLowerCase() === 'hidden')) {
        return false;
      }

      // 排除 thought 标签（只在 thoughts 页面显示）
      if (labels.some((l: string) => l.toLowerCase() === 'thought')) {
        return false;
      }

      return true;
    });

    const posts: Post[] = authorIssues.map((issue: GitHubIssue) => ({
      id: issue.number,
      title: decodeUnicode(issue.title),
      content: decodeUnicode(issue.body || ''),
      created_at: issue.created_at,
      labels: issue.labels?.map((label: string | GitHubLabel) =>
        typeof label === 'string' ? label : label.name
      ) || [],
    }));

    return posts.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return getFallbackPosts();
  }
}

// 分页获取文章
export async function getPostsPaginated(page: number = 1, pageSize: number = 10): Promise<{ posts: Post[]; hasMore: boolean; total: number }> {
  try {
    const issues = await fetchGitHubAPI(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&per_page=100&sort=created&direction=desc`
    );

    if (!issues || !Array.isArray(issues)) {
      return { posts: getFallbackPosts(), hasMore: false, total: 3 };
    }

    // 同样的过滤逻辑
    const authorIssues = issues.filter((issue: GitHubIssue) => {
      if (!issue.user || issue.user.login !== REPO_OWNER) return false;

      const labels = issue.labels?.map((label: string | GitHubLabel) =>
        typeof label === 'string' ? label : label.name
      ) || [];

      if (labels.some((l: string) => l.toLowerCase() === 'hide' || l.toLowerCase() === 'hidden')) {
        return false;
      }

      if (labels.some((l: string) => l.toLowerCase() === 'thought')) {
        return false;
      }

      return true;
    });

    const sortedPosts = authorIssues.map((issue: GitHubIssue) => ({
      id: issue.number,
      title: decodeUnicode(issue.title),
      content: decodeUnicode(issue.body || ''),
      created_at: issue.created_at,
      labels: issue.labels?.map((label: string | GitHubLabel) =>
        typeof label === 'string' ? label : label.name
      ) || [],
    })).sort((a: Post, b: Post) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const total = sortedPosts.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
    const hasMore = endIndex < total;

    return { posts: paginatedPosts, hasMore, total };
  } catch (error) {
    console.error('Error fetching posts:', error);
    const fallbackPosts = getFallbackPosts();
    return { posts: fallbackPosts, hasMore: false, total: fallbackPosts.length };
  }
}

// 获取 Issue 评论
async function getIssueComments(issueNumber: number): Promise<string[]> {
  try {
    const comments = await fetchGitHubAPI(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${issueNumber}/comments`
    );

    if (!comments || !Array.isArray(comments)) return [];

    // 只返回作者自己的评论内容
    return comments
      .filter((comment: GitHubComment) => comment.user?.login === REPO_OWNER)
      .map((comment: GitHubComment) => decodeUnicode(comment.body || ''));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

// 获取单篇文章（包含作者自己的评论）
export async function getPostById(id: number): Promise<Post | null> {
  try {
    const [issue, authorComments] = await Promise.all([
      fetchGitHubAPI(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${id}`
      ),
      getIssueComments(id),
    ]);

    if (!issue) return null;

    // 合并正文和作者自己的评论
    let fullContent = decodeUnicode(issue.body || '');
    if (authorComments.length > 0) {
      fullContent += '\n\n---\n\n' + authorComments.join('\n\n---\n\n');
    }

    return {
      id: issue.number,
      title: decodeUnicode(issue.title),
      content: fullContent,
      created_at: issue.created_at,
      labels: issue.labels?.map((label: string | GitHubLabel) =>
        typeof label === 'string' ? label : label.name
      ) || [],
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// 备用数据（当 API 失败时使用）
function getFallbackPosts(): Post[] {
  return [
    {
      id: 148,
      title: 'Tailscale + SSH 多设备并网完整教程（详细版本）',
      content: '文章加载中...',
      created_at: '2026-03-27',
      labels: ['教程', '技术'],
    },
    {
      id: 145,
      title: '工资是毒药，商单也是，ADHDer、注意力狩猎场、流量焦虑与长期主义',
      content: '文章加载中...',
      created_at: '2026-03-05',
      labels: ['思考'],
    },
    {
      id: 144,
      title: '我需要一个活人感的真诚表达的地方，拒绝ai纯粹手写',
      content: '文章加载中...',
      created_at: '2026-03-05',
      labels: ['随笔'],
    },
  ];
}

// 项目数据（从 JSON 文件或手动维护）
const projects: Project[] = [
  {
    id: '1',
    title: 'AI内容生成器',
    description: '基于GPT-4的自动化内容创作工具，支持多平台发布',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    link: 'https://example.com/project1',
    platform: 'website',
    category: 'personal',
    date: '2025-03-01',
  },
  {
    id: '2',
    title: '品牌社交媒体运营',
    description: '为某科技品牌提供小红书+微博全案运营服务',
    cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    link: 'https://xiaohongshu.com',
    platform: 'xiaohongshu',
    category: 'commercial',
    date: '2025-02-15',
  },
  {
    id: '3',
    title: 'Twitter/X 内容创作',
    description: 'AI 工作流优化实践分享，获得大量互动和转发',
    cover: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop',
    link: 'https://x.com/nopinduoduo/status/2039915824216261101',
    platform: 'twitter',
    category: 'commercial',
    date: '2025-01-20',
  },
  {
    id: '4',
    title: '个人知识库系统',
    description: '基于Obsidian的知识管理和发布系统',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    link: 'https://github.com/QiYongchuan',
    platform: 'website',
    category: 'personal',
    date: '2024-12-10',
  },
  {
    id: '5',
    title: '公众号排版工具',
    description: 'Markdown转公众号排版的在线工具，支持自定义样式',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    link: 'https://mp.weixin.qq.com',
    platform: 'wechat',
    category: 'personal',
    date: '2024-11-25',
  },
  {
    id: '6',
    title: '某电商品牌年度 campaign',
    description: '负责创意策划和内容执行，全网曝光量500w+',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    link: 'https://example.com/project6',
    platform: 'xiaohongshu',
    category: 'commercial',
    date: '2024-10-15',
  },
  {
    id: '7',
    title: 'AI图像生成工作流',
    description: '自动化图像生成和后期处理的工作流工具',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
    link: 'https://example.com/project7',
    platform: 'website',
    category: 'experiment',
    date: '2024-09-20',
  },
  {
    id: '8',
    title: '个人博客系统',
    description: 'Next.js + TypeScript + Tailwind CSS 构建的极简博客',
    cover: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop',
    link: 'https://github.com/QiYongchuan/MyGitBlog',
    platform: 'website',
    category: 'personal',
    date: '2024-08-15',
  },
  {
    id: '9',
    title: 'Chrome 扩展开发',
    description: '浏览器扩展开发实验，探索 Manifest V3 新特性',
    cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    link: 'https://github.com/QiYongchuan',
    platform: 'website',
    category: 'experiment',
    date: '2024-07-10',
  },
];

export async function getAllProjects(): Promise<Project[]> {
  return projects.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  if (category === 'all') return getAllProjects();
  return projects.filter(project => project.category === category);
}

// Thoughts 数据（从带 thought 标签的 Issues 获取）
export async function getAllThoughts(): Promise<Thought[]> {
  try {
    const issues = await fetchGitHubAPI(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&labels=thought&per_page=10&sort=created&direction=desc`
    );

    if (!issues || !Array.isArray(issues)) {
      return getFallbackThoughts();
    }

    const thoughts: Thought[] = issues.map((issue: GitHubIssue) => ({
      id: String(issue.number),
      content: decodeUnicode(issue.body || issue.title),
      created_at: issue.created_at,
    }));

    return thoughts.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch {
    return getFallbackThoughts();
  }
}

function getFallbackThoughts(): Thought[] {
  return [
    {
      id: '1',
      content: 'Build fast, share fast. 完成比完美重要100倍。',
      created_at: '2025-04-07T10:30:00Z',
    },
    {
      id: '2',
      content: 'ADHD不是缺陷，是另一种思考方式。学会与之共处，而不是对抗。',
      created_at: '2025-04-06T15:20:00Z',
    },
    {
      id: '3',
      content: '今天完成了一个新功能，虽然还有很多bug，但已经可以用了。发布！',
      created_at: '2025-04-05T09:45:00Z',
    },
    {
      id: '4',
      content: '记录是为了建立坐标。没有记录，时间就像流沙。',
      created_at: '2025-04-04T20:10:00Z',
    },
    {
      id: '5',
      content: '不要证明，只管做。nobody cares。',
      created_at: '2025-04-03T14:30:00Z',
    },
  ];
}
