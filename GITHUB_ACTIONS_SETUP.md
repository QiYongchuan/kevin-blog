# GitHub Actions 自动部署配置

## 概述
每次 GitHub Issue 创建/编辑/删除时，自动触发 Cloudflare Pages 重新构建。

---

## 步骤 1: 配置 GitHub Secrets

进入仓库 Settings → Secrets and variables → Actions → New repository secret

### 需要添加的 Secrets:

#### 1. NEXT_PUBLIC_GITHUB_TOKEN
- 值: 你现有的 GitHub Token (ghp_开头那个)

#### 2. CLOUDFLARE_API_TOKEN
获取方式:
1. 打开 https://dash.cloudflare.com/profile/api-tokens
2. 点击 "Create Token"
3. 选择 "Custom token"
4. 配置:
   - Token name: `GitHub Actions Deploy`
   - Permissions:
     - Zone:Read (可选)
     - Account:Read
     - Cloudflare Pages:Edit
   - Account Resources: Include - 你的账户
   - Zone Resources: Include - All zones (或指定域名)
5. 点击 Continue → Create Token
6. **复制保存** (只显示一次)

#### 3. CLOUDFLARE_ACCOUNT_ID
获取方式:
1. 打开 https://dash.cloudflare.com
2. 右侧栏能看到 Account ID (格式: 32位字符)
3. 或者进入任意域名，右侧也有 Account ID

---

## 步骤 2: 推送 workflow 文件

```bash
cd C:\Users\Qyc\Desktop\Great_thing\my-blog
git add .github/workflows/deploy.yml
git commit -m "添加自动部署 workflow"
git push
```

---

## 步骤 3: 测试

1. 去 GitHub Issues 创建/编辑一个 issue
2. 进入仓库 Actions 标签页
3. 应该能看到 workflow 正在运行
4. 约 2-3 分钟后，网站自动更新

---

## 故障排查

如果 workflow 失败:
1. 检查 Actions 日志看错误信息
2. 确认 3 个 secrets 都正确配置
3. 确认 Cloudflare API Token 有 Pages:Edit 权限
