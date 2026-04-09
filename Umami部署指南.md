# Umami 部署指南 (Vercel + Supabase)

## 概述
将 Umami 部署到 Vercel，使用 Supabase 作为 PostgreSQL 数据库。

---

## 步骤 1: 创建 Supabase 项目

1. 访问 https://supabase.com
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 填写:
   - Name: `umami-db`
   - Database Password: 生成一个强密码（保存好！）
5. 等待项目创建完成 (~2分钟)
6. 进入 Project Settings → Database
7. 找到 Connection string (URI)，格式:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
   ```
8. **复制保存这个连接字符串**

---

## 步骤 2: 一键部署 Umami 到 Vercel

点击这个按钮直接部署:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umami-software/umami&env=DATABASE_URL,HASH_SALT&project-name=umami-analytics&repository-name=umami-analytics)

或手动操作:
1. Fork https://github.com/umami-software/umami 到你的 GitHub
2. 在 Vercel 导入该仓库

---

## 步骤 3: 配置环境变量

在 Vercel Project Settings → Environment Variables 中添加:

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `postgresql://postgres:密码@db.xxx.supabase.co:5432/postgres` | Supabase 连接字符串 |
| `HASH_SALT` | 随机字符串(32位以上) | 用于密码加密，随便生成 |
| `TRACKER_SCRIPT_NAME` | `analytics.js` | 可选，伪装脚本名防拦截 |

---

## 步骤 4: 初始化数据库

Umami 会自动创建表，但首次需要手动触发:
1. 部署完成后访问你的 Vercel 域名
2. 默认登录: `admin` / `umami`
3. 进入 Settings → Profile 修改密码

---

## 步骤 5: 添加网站并获取追踪代码

1. 登录 Umami 后台
2. 点击 "Websites" → "Add website"
3. 填写:
   - Name: `多多的博客`
   - Domain: `你的域名或pages.dev域名`
4. 点击 "Get tracking code"
5. **复制 `data-website-id` 值**

---

## 步骤 6: 配置到博客

修改 `app/layout.tsx`:

```tsx
<script
  defer
  src="https://你的umami域名.com/analytics.js"
  data-website-id="你的-website-id"
/>
```

---

## 重新部署博客

```bash
cd C:\Users\Qyc\Desktop\Great_thing\my-blog
npm run build
npx wrangler pages deploy dist --project-name=kevin-blog
```

---

## 完成！

访问 Umami 后台即可看到实时统计数据。
