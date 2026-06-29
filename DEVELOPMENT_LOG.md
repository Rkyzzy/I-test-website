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

## v2.0.0 追加 (2026-06-29) — AI Chat + Admin + Theme

### 新增已完成

#### AI Chat 页面
- [x] **`components/ai/ai-chat.tsx`** — 完整 AI 对话组件
  - 快捷提问（4 个预置问题）
  - 消息气泡（user/assistant 双向排版）
  - 自动调整高度的文本输入框 (Shift+Enter 换行)
  - 加载动画（弹跳圆点）
  - 错误提示 + 容错处理
  - localStorage 历史持久化
  - 调用 Cloudflare Worker `ai.rkyzzy.xyz` (DeepSeek 后端)
- [x] **`app/ai/page.tsx`** — 替换占位页面，集成 AIChat 组件

#### Admin 面板
- [x] **`lib/github.ts`** — GitHub API 服务
  - `getFile()` / `writeFile()` / `deleteFile()` — GitHub Contents API
  - `savePost()` — 保存博客 markdown
  - `saveConfig()` / `getConfig()` — 配置管理
- [x] **`app/admin/layout.tsx`** — Admin 布局
  - 置顶导航栏 + 返回/路由/退出
  - Auth guard（未登录时提示跳转）
- [x] **`app/admin/login/page.tsx`** — 管理员登录
  - GitHub PAT (Personal Access Token) 输入
  - 验证 token + 校验用户名 `Rkyzzy`
  - 持久化到 localStorage
- [x] **`app/admin/page.tsx`** — 仪表盘
  - 统计卡片（总文章/标签数/分类数）
  - 文章列表（预览/编辑/删除）
  - 新建文章按钮
- [x] **`app/admin/edit/page.tsx`** — 文章编辑器
  - 编辑/新建双模式（slug query param 区分）
  - 加载现有文章的 frontmatter + markdown 内容
  - 标题/Slug/日期/分类/标签/封面/摘要 编辑
  - 写/预览 双栏模式
  - 保存到 GitHub API + 更新 posts.json 索引

#### 昼夜模式修复
- [x] **`app/globals.css`** — 添加 `.light` CSS 变量
  - 背景: oklch(0.97 0.005 250) 亮白
  - 文字色阶完整映射 (deck-100~400)
  - 表面色/border/滚动条/选择样式
  - Card hover/box-shadow
  - Blog content 段落/代码/引用
  - 关键 utility 类 override (!important 覆盖 dark 默认值)

#### 构建验证
- [x] 20/20 页面全部生成 (新增 3 个 admin 页面)
- [x] TypeScript 编译通过，无类型错误

### 更新后的 TODO

#### P0
- [ ] 学校 Logo 图片补充 (sustech-logo.svg, berkeley-logo.svg)

#### P1
- [ ] blog-content Markdown 样式打磨（代码高亮已安装但未启用）
- [ ] 字体 fallback 设置
- [ ] Profile 头像从 `loadConfig()` 获取

#### P2
- [ ] SEO 完善（每个页面独立的 generateMetadata）
- [ ] 页面切换过渡 (AnimatePresence)
- [ ] 文章目录 TOC
- [ ] 阅读进度条
- [ ] 代码高亮集成 (rehype-highlight 已装)
- [ ] 分页 / 加载更多
- [ ] Tags 页面链接可点击跳转

### 已知问题
| # | 问题 | 状态 |
|---|------|------|
| Q5 | Admin 编辑器预览模式使用纯文本，非 Markdown 渲染 | 可接受，后续可集成 react-markdown |
| Q6 | AI Chat Worker 未部署到 Cloudflare（需手动 `wrangler deploy`） | 待处理 |

### 新发现的问题 (2026-06-29 测试反馈)

| # | 问题 | 原因分析 | 优先级 |
|---|------|----------|--------|
| Q7 | AI Chat 请求失败，只返回"抱歉，我现在无法回答问题" | 新 `sendToAI()` 未传递 `systemPrompt` 字段。Worker 源码 (`workers/ai-proxy/src/index.ts`) 请求体中需要 `{ messages, systemPrompt }`，但新版 `ai-chat.tsx` 只传了 `{ messages }`。旧版 Vue 调用了 `buildSystemPrompt()` 构建了完整的系统提示词。新版重构时移除了该函数，导致 Worker 收到空 prompt，请求失败 | **P0** |
| Q8 | Admin 面板无入口按钮 | 旧版 Vue 在导航栏主题切换按钮旁边有一个"管理员"按钮，点开是 AdminLoginModal。新版 React 的 Navigation 组件未实现此入口，需手动访问 `/admin/login` URL 才能进入 | **P0** |
| Q9 | Admin 编辑器预览模式使用纯文本显示 | 旧的 Vue 版使用 markdown-it + highlight.js 渲染 Markdown 预览。新版直接用 `<div>` 显示原始文本 | P2 |

### 更新后的 TODO (P0 修复)

#### P0 — 本轮修复
- [x] **AI Chat 修复**: 在 `sendToAI()` 中加入 `systemPrompt` 字段
  - 新增 `buildSystemPrompt()` 异步函数，从 `/data/site-config.json` 加载 profile/techStack
  - 内联教育经历（南科大/南洋理工/UC Berkeley）和工作经历（理想汽车）常量
  - 构建包含完整个人信息/技能/性格/兴趣/好友/回答风格的 system prompt
  - 请求 body 中加入 `{ messages, systemPrompt }` 字段
  - init effect 改为异步，先加载配置构建 prompt 再标记 configReady
- [x] **Admin 入口**: 在 Navigation 组件中添加管理员入口按钮
  - 添加 `<Lock>` 图标按钮，位于主题切换按钮左侧
  - 未登录时链接到 `/admin/login`（灰色），已登录链接到 `/admin`（signal 绿色）
  - 移动端菜单底部添加"管理后台"链接

### 已知问题更新
| # | 问题 | 状态 |
|---|------|------|
| Q7 | AI Chat 请求失败，只返回"抱歉，我现在无法回答问题" | ✅ **已修复** — 添加 systemPrompt |
| Q8 | Admin 面板无入口按钮 | ✅ **已修复** — 导航栏添加 Lock 图标链接 |
| Q9 | Admin 编辑器预览模式使用纯文本显示 | ⏳ P2 — 待后续处理 |

---

## v2.1.0 (2026-06-29) — Admin 弹窗登录 + 布局修复

### 修复
- [x] **Admin 登录改为弹窗** (`components/admin/admin-login-modal.tsx`)
  - Lock 按钮未登录时弹出模态登录弹窗，保持当前页面不跳转
  - 适配 Night Cockpit 设计系统（OKLCH 色阶、圆角、毛玻璃背板）
  - 支持 Enter 提交、loading 动画、错误提示
- [x] **Admin Layout Guard 修复** (`app/admin/layout.tsx`)
  - 添加 `initialized` 状态避免闪烁
  - Guard 按钮改用 `window.location.href` 导航，修复点击无反应问题
  - 按钮从纯文字改为完整样式（px-4 py-2 rounded-xl bg-accent）
- [x] **移动端菜单** — 仅已登录时显示"管理后台"链接

### 已知问题更新
| # | 问题 | 状态 |
|---|------|------|
| Q7 | AI Chat 请求失败 | ✅ **已修复** |
| Q8 | Admin 面板无入口按钮 | ✅ **已修复** |
| Q9 | Admin 编辑器预览纯文本 | ⏳ P2 |
| Q10 | `router.push` 在 admin layout guard 中不响应 | ✅ **已修复** — 改用 `window.location.href` |
