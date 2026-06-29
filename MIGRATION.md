# 个人网站重构 · 版本文档

> 迁移记录：Vue 3 + Vite → Next.js 15 + React + Tailwind v4 + Framer Motion

---

## v2.0.0 — Night Cockpit 重构

### 定位

以"夜间驾驶舱"（Night Cockpit）为设计概念的开发者个人主页。深色基调呼应自动驾驶主题，融合 LiDAR 扫描线、数据粒子、微光效等视觉语言。

**目标**：让访客在 3 秒内感知这是一个真正从事前沿 AI 的人，而不只是一个模板化的开发人员简历。

### 架构变更

| 维度 | v1 (Vue) | v2 (React) |
|------|----------|------------|
| 框架 | Vue 3 + Vite + vue-router | Next.js 15 (App Router) |
| 语言 | TypeScript | TypeScript |
| CSS | Tailwind v3 + Naive UI | Tailwind v4 (CSS-first `@theme`) |
| 动效 | @vueuse/motion | Framer Motion 12 |
| 字体 | 手动 Google Fonts | `next/font` (优化加载) |
| 图标 | 内联 SVG | Lucide React |
| 状态管理 | Pinia | React Context + hooks |
| 构建 | Vite | Next.js static export (`output: export`) |
| 部署 | GitHub Pages | 兼容 GitHub Pages / Vercel |

### 设计系统：Night Cockpit Tokens

```
背景  ：oklch(0.07 0.03 260)  近黑蓝
表面  ：oklch(0.10~0.14 0.04 250)  深灰蓝
主体  ：oklch(0.92 0.01 250)  白带微蓝
强调  ：oklch(0.62 0.19 220)  电光蓝 (accent)
信号  ：oklch(0.75 0.18 160)  磷光绿 (signal)
温暖  ：oklch(0.68 0.15 30)   暖橙 (warm)
```

字体：Space Grotesk (展示) + Inter (正文) + JetBrains Mono (代码)

### MileStone 记录

| # | 日期 | 内容 | 状态 |
|---|------|------|------|
| M1 | 2026-06-29 | 设计提案：Night Cockpit 概念、色彩、字体、动效、布局方案 | ✅ |
| M2 | 2026-06-29 | 备份旧项目，创建 Next.js 项目骨架 | ✅ |
| M3 | 2026-06-29 | 设计系统落地：Tailwind v4 tokens、CSS utilities | ✅ |
| M4 | 2026-06-29 | 核心页面组件：Navigation、Hero (ScanLines Canvas)、StatsBar、SkillsSection、QuickNav | ✅ |
| M5 | 2026-06-29 | 页面路由：Home / Education / Work / Blog / Tags / AI / 404 | ✅ |
| M6 | 2026-06-29 | 博客系统迁移：generateStaticParams + react-markdown 渲染 | ✅ |
| M7 | 2026-06-29 | 构建验证：17 个静态页面全部生成 | ✅ |
| M8 | — | AI 对话页面前端实现 | ⏳ |
| M9 | — | Admin 面板迁移（GitHub CMS） | ⏳ |
| M10 | — | 部署配置（Vercel / GitHub Actions） | ⏳ |
| M11 | — | 浅色模式完整适配 | ⏳ |
| M12 | — | 性能优化 / SEO / 元信息完善 | ⏳ |

---

### 关键技术决策

1. **选择 Framer Motion 而非 GSAP** — React 生态首选动效库，Layout Animation、Scroll-triggered、AnimatePresence 原生支持
2. **静态导出而非 SSR** — 个人网站无需实时服务端，GitHub Pages 兼容；后续可无缝切 Vercel
3. **客户端数据获取** — site-config.json 由 GitHub Admin 更新，运行时 fetch 而非构建时注入，保持后台编辑能力
4. **Tailwind v4** — CSS-first 配置方式，`@theme` 定义设计令牌，无 JS 配置冗余
5. **Lucide React** — 轻量图标库，Tree-shakeable

### 项目结构

```
I-test-website/
├── app/                        # App Router 页面
│   ├── layout.tsx              # 根布局 + next/font + ThemeProvider
│   ├── page.tsx                # 首页 (Hero + Stats + Skills + QuickNav)
│   ├── globals.css             # 设计系统 + Tailwind v4
│   ├── not-found.tsx           # 404
│   ├── blog/                   # 博客
│   │   ├── page.tsx            # 列表
│   │   └── [slug]/{page,client}.tsx  # 详情 (SSG)
│   ├── education/page.tsx      # 教育经历
│   ├── work/page.tsx           # 工作与研究
│   ├── tags/page.tsx           # 标签聚合
│   ├── ai/page.tsx             # AI 对话 (占位)
│   └── admin/                  # (待建)
├── components/
│   ├── theme-provider.tsx      # 主题 Context
│   ├── navigation.tsx          # 导航栏
│   ├── hero/                   # Hero 区域
│   │   ├── scan-lines.tsx      # Canvas LiDAR 扫描线
│   │   ├── hero-section.tsx    # 主内容
│   │   ├── stats-bar.tsx       # 统计面板
│   │   ├── skills-section.tsx  # 技术栈
│   │   └── quick-nav.tsx       # 探索导航
│   └── ui/
│       └── scroll-reveal.tsx   # 滚动动效 HOC
├── lib/
│   ├── types.ts                # 类型定义
│   ├── profile.ts              # 个人数据
│   └── blog.ts                 # 博客数据
├── public/
│   ├── data/site-config.json   # 动态配置
│   └── content/posts.json      # 博客索引
└── next.config.ts
```


### 部署架构

```
codex/restructure → PR → main (merge)
                             ↓
                   GitHub Actions (deploy.yml)
                             ↓
                   npm ci → npm run build (env BASE_PATH)
                             ↓
                   out/ → peaceiris/actions-gh-pages
                             ↓
                   github.com/Rkyzzy/I-test-website
                   gh-pages branch @ rkyzzy.xyz
```

| 分支 | BASE_PATH | 部署路径 | URL |
|------|-----------|----------|-----|
| main | "" (空) | 根目录 | https://rkyzzy.xyz/ |
| 其他 | /preview/<branch> | preview/<branch>/ | https://rkyzzy.xyz/preview/<branch>/ |

- `public/CNAME`: rkyzzy.xyz
- `output: export` 静态导出，无 Node.js 服务端依赖
- `trailingSlash: true` 确保 GitHub Pages 路由正确
- 预览分支 404 fallback 自动重定向到根路径

### MileStone 更新

| # | 日期 | 内容 | 状态 |
|---|------|------|------|
| M8 | 2026-06-29 | 部署配置：Git init + remote + deploy.yml + CNAME | ✅ |
| M9 | — | GitHub 推送：codex/restructure → main (PR) | 🚀 待合并 |
| M10 | — | AI 对话页面前端实现 | ⏳ |
| M11 | — | Admin 面板迁移（GitHub CMS） | ⏳ |
| M12 | — | 浅色模式完整适配 | ⏳ |
| M13 | — | 性能优化 / SEO / 元信息完善 | ⏳ |

### MileStone 更新 v2

| # | 日期 | 内容 | 状态 |
|---|------|------|------|
| M10 | 2026-06-29 | AI Chat 页面迁移 (Vue→React, Cloudflare Worker) | ✅ |
| M11 | 2026-06-29 | Admin 面板迁移 (Login/Dashboard/PostEditor) | ✅ |
| M12 | 2026-06-29 | 昼夜模式修复 (light mode CSS variables) | ✅ |
