# 开发适配日志 · Night Cockpit

> 细粒度开发记录、已完成项、待办列表、已知问题

---

## 已完成

### 项目搭建
- [x] 备份旧项目 `I-test-website` → `I-test-website-backup`
- [x] 新建 Next.js 15 项目，App Router 模式
- [x] 配置 TypeScript strict mode，路径别名 `@/*`
- [x] 配置 Tailwind v4 (`@tailwindcss/postcss`)
- [x] 配置 `output: export` 静态导出
- [x] 配置 `basePath` / `assetPrefix` 兼容 GitHub Pages 部署
- [x] 配置 `next/font` 加载 Space Grotesk + Inter + JetBrains Mono
- [x] 配置 PostCSS

### 设计系统
- [x] `app/globals.css` — `@theme` tokens：deck 色阶 × 9 + signal + accent + warm
- [x] 工具类：`.scan-line`、`.text-gradient`、`.glow-line`、`.card-surface`
- [x] 滚动条样式
- [x] reduce-motion 媒体查询
- [x] `::selection` 样式
- [x] 博客正文样式 `.blog-content`（h1-h3 / p / code / pre / ul/ol / blockquote / a / img）

### 数据层
- [x] `lib/types.ts` — SocialLink / Profile / TechItem / Education / Experience / SiteConfig
- [x] `lib/profile.ts` — 默认配置、教育经历、工作经历常量、`loadConfig()` 运行时加载
- [x] `lib/blog.ts` — `getAllPosts()` / `getPost()` / `getAllTags()` 从 `posts.json` 取数据
- [x] 复制 `public/data/`、`public/content/`、`public/avatar.png` 等静态资源

### 组件
- [x] **ThemeProvider** — React Context，支持 dark/light 切换，localStorage 持久化
- [x] **Navigation** — 固定顶部 + 滚动毛玻璃效果、桌面/移动端、active 路由高亮、主题切换/移动菜单按钮
- [x] **ScrollReveal** — 通用滚动动画包装器 (framer-motion useInView)
- [x] **ScanLines** — Canvas 签名动效 (LiDAR 扫描线 + 数据粒子)
- [x] **HeroSection** — 头像 / 姓名 (text-gradient) / 头衔 / Bio / 社交链接 / 向下指示器
- [x] **StatsBar** — 三列统计数字，滚动触发的计数动画 (useEffect + setInterval)
- [x] **SkillsSection** — Top 3 大卡片显示进度条 + 其余作为浮动标签
- [x] **QuickNav** — 四个导航卡片 (Blog / Education / Work / AI Chat)

### 页面
- [x] `/` 首页 — 组装 HeroSection + StatsBar + SkillsSection + QuickNav
- [x] `/education` 教育经历 — 交替左右布局时间线 + 渐变色中轴 + 滚动揭示
- [x] `/work` 工作与研究 — 工作经历卡片 + 研究方向 + 论文列表
- [x] `/blog` 博客列表 — 卡片展示 + 日期/标签元信息
- [x] `/blog/[slug]` 博客详情 — generateStaticParams 预生成 + react-markdown + remark-gfm
- [x] `/tags` 标签聚合 — 按标签分组博客文章
- [x] `/ai` AI 对话 — 占位页面
- [x] 404 页面 — 回到首页链接

### 构建验证
- [x] TypeScript 编译通过，无类型错误
- [x] 17 个静态页面全部生成
- [x] 页面数据正确 (8 篇博客 slug 完整)

---

## 待办 (TODO)

### P0 — 核心缺失功能

- [ ] **AI Chat 页面实现** — `/app/ai/page.tsx` 目前是占位。需要从备份中迁移聊天 UI 组件，对接 Cloudflare Workers proxy
- [ ] **Admin 面板迁移** — 从 Vue 版本的 `src/pages/Admin*.vue` + `src/stores/admin.ts` 迁移到 React，功能包括：
  - GitHub token 登录
  - Profile 在线编辑 (姓名/头衔/Bio/社交链接)
  - Tech Stack 编辑
  - 头像上传 (base64 → GitHub)
  - 博客 CRUD (Markdown 文件 → GitHub)
  - 保存 → GitHub Actions 部署

### P1 — 功能完善

- [ ] **浅色模式完整适配** — 主题 tokens 已预留，但需要把 light mode 的色值填进 CSS 变量体系。当前全局是深色优先
- [ ] **blog-content Markdown 样式打磨** — 代码高亮、表格样式、Task list 样式、水平线样式
- [ ] **学校 Logo 图片** — `public/data/sustech-logo.svg` 和 `public/data/berkeley-logo.svg` 不存在，需要从备份或网络补充
- [ ] **字体 fallback 设置** — next/font 配置中如果需要自定义 fallback，建议 `Space Grotesk: system-ui, sans-serif` 等
- [ ] **Profile 头像加载** — `/app/page.tsx` 写死了 avatarUrl，后续应跟 blog 一样从 `loadConfig()` 获取

### P2 — 体验提升

- [ ] **SEO 完善** — 为每个页面添加独立的 `generateMetadata`（title / description / keywords）
- [ ] **页面切换过渡** — 使用 Framer Motion 的 `AnimatePresence` + Layout Group
- [ ] **文章目录 TOC** — 博客详情页生成侧边目录 (Table of Contents)
- [ ] **阅读进度条** — 博客正文滚动时顶部显示进度
- [ ] **图片懒加载** — Education 页面的 Logo 图片 fallback 处理
- [ ] **代码高亮** — 集成 rehype-highlight 或 Prism 到 ReactMarkdown
- [ ] **分页 / 加载更多** — 博客列表如果文章过多需分页
- [ ] **Tags 页面链接** — Tags 页的博客卡片可点击跳转

### P3 — 运维

- [ ] **部署配置** — Vercel 部署（推荐）或 GitHub Actions static export
- [ ] **Favicon** — 需要设计新的 favicon.svg
- [ ] **Robots / Sitemap** — static export 下需要 `next-sitemap` 或手动生成
- [ ] **GitHub Stars 组件** — 备份中有 `/workers/ai-proxy`，需要迁移
- [ ] **Vercel proxy** — 备份中有 `/vercel-proxy/`，需要迁移

### 已知问题 / 待确认

| # | 问题 | 状态 |
|---|------|------|
| Q1 | 博客 posts.json 通过 GitHub Actions 自动生成，`generateStaticParams` 在每次构建时读取，但如果构建时 posts.json 尚无内容会返回空数组 | 需确认 CI 流程 |
| Q2 | `@tailwindcss/postcss` v4 与 Next.js 15 的兼容性在重载时偶尔延迟 | 可接受 |
| Q3 | Framer Motion `ease` 数组在 TypeScript strict 下需要 `as [number, number, number, number]` | 已修复 |
| Q4 | 旧版 Avatar 使用 base64 data URL，在新版中可能无法通过 Image 组件渲染 | 改用静态路径 |

### 恢复开发指引

```bash
# 1. 进入项目
cd /Users/rkyzzy/Documents/Personal Page/I-test-website

# 2. 安装依赖 (如需要)
npm install

# 3. 启动开发服务器
npx next dev -p 5173

# 4. 验证构建
npx next build

# 5. 旧版备份
cd /Users/rkyzzy/Documents/Personal Page/I-test-website-backup
# Vue 版本，用于参考迁移
```

### 开发备忘

- 所有 "use client" 组件不能用 `generateStaticParams`，需要 Server/Client 拆分为两个文件
- Tailwind v4 不再需要 `tailwind.config.js`，所有配置在 CSS 中用 `@theme` 完成
- `output: export` 模式下动态路由必须提供 `generateStaticParams`
- Next.js 15 中 `params` 类型为 `Promise<{ slug: string }>`，需要 `await params`
- `framer-motion` ease 数组需显式声明为 tuple：`as [number, number, number, number]`


---

## v2.0.0 追加 (2026-06-29)

### 新增已完成 (部署基建)

- [x] **Git 初始化** — `git init` + `git remote add origin`, `codex/restructure` 分支
- [x] **`.gitignore`** — Next.js 标准忽略规则（node_modules /.next / out）
- [x] **`public/CNAME`** — `rkyzzy.xyz` 自定义域名文件
- [x] **`next.config.ts` 改造** — `basePath` / `assetPrefix` 由环境变量 `BASE_PATH` 控制
  - `BASE_PATH=""` (默认) → 部署到根域名
  - `BASE_PATH="/preview/<branch>"` → 预览子路径
  - 添加 `trailingSlash: true`
- [x] **`.github/workflows/deploy.yml`** — GitHub Actions 自动部署工作流
  - `on: push branches-ignore: gh-pages`
  - 分支判断：`main` → 根目录；其他 → `preview/<safe-branch>/`
  - 构建：`npm ci` → `npm run build`（传入 `BASE_PATH` 环境变量）
  - 部署：`peaceiris/actions-gh-pages@v4`，`publish_dir: out`，`cname: rkyzzy.xyz`
- [x] **`codex/restructure` 初始 commit + push** — 46 files, 6226 insertions
  - 构建验证通过：17 个静态页面全部生成

### 更新后的 P0 — 待办

- [ ] **AI Chat 页面实现** — `/app/ai/page.tsx` 目前是占位。需要从备份中迁移聊天 UI 组件，对接 Cloudflare Workers proxy
- [ ] **Admin 面板迁移** — 从 Vue 版本的 `src/pages/Admin*.vue` + `src/stores/admin.ts` 迁移到 React

### 更新后的 P1 — 待办

- [ ] **浅色模式完整适配** — 主题 tokens 已预留，但需要把 light mode 的色值填进 CSS 变量体系
- [ ] **blog-content Markdown 样式打磨** — 代码高亮、表格样式、Task list 样式、水平线样式
- [ ] **学校 Logo 图片** — `public/data/sustech-logo.svg` 和 `public/data/berkeley-logo.svg` 缺失
- [ ] **字体 fallback 设置** — next/font 配置中自定义 fallback
- [ ] **Profile 头像加载** — `/app/page.tsx` 写死了 avatarUrl，后续应跟 blog 一样从 `loadConfig()` 获取

### 更新后的 P2 — 待办

- [ ] **SEO 完善** — 为每个页面添加独立的 `generateMetadata`
- [ ] **页面切换过渡** — Framer Motion `AnimatePresence` + Layout Group
- [ ] **文章目录 TOC** — 博客详情页生成侧边目录
- [ ] **阅读进度条** — 博客正文滚动时顶部显示进度
- [ ] **代码高亮** — 集成 rehype-highlight 或 Prism 到 ReactMarkdown
- [ ] **分页 / 加载更多** — 博客列表如果文章过多需分页
- [ ] **Tags 页面链接** — Tags 页的博客卡片可点击跳转

### 部署指引

```bash
# 开发
cd /Users/rkyzzy/Documents/Personal Page/I-test-website
npm run dev

# 构建验证
BASE_PATH="" npm run build    # 主站构建
BASE_PATH="/preview/test" npm run build  # 预览分支构建

# 推送到远程 (PR → main)
git push origin codex/restructure
# 去 GitHub 创建 PR → Merge → 自动部署
```
