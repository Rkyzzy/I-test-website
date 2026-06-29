---
title: "CLI-Anything 的生态"
date: "2026-06-22"
tags: ["CLI", "Agent", "CodeX", "Skill"]
category: "技术"
cover: ""
excerpt: "CLI-Anything 不是一个单一的 skill，而是一个由三套互补系统构成的 Agent-Native CLI 生态，核心理念是 "Making ALL Software Agent-Native"：让 AI Agent 能以 CLI 的方式控制一切软件"
readTime: 10
---



## 一、生态全景概述

CLI-Anything 不是一个单一的 skill，而是一个由三套互补系统构成的 Agent-Native CLI 生态，核心理念是 "Making ALL Software Agent-Native"：让 AI Agent 能以 CLI 的方式控制一切软件：

| 组件 | 定位 | 安装方式 | 适用场景 |
|------|------|----------|----------|
| CLI-Anything (HKUDS) | 桌面 GUI 软件 -> CLI 转换器 | pip install cli-anything-hub | 控制 Blender/GIMP/LibreOffice 等桌面应用 |
| OpenCLI (jackwener) | 网站 + Electron 应用 -> CLI 转换器 | npm install -g @jackwener/opencli | 控制网站(B站/知乎/Twitter)和 Electron 应用 |
| Super-CLI (leing2021) | 统一路由器 | npm install -g @leing2021/super-cli | 统一入口，自动路由到上述两个后端 |

## 二、各组件详解

### 2.1 CLI-Anything — 让桌面软件 Agent-Native

GitHub: https://github.com/HKUDS/CLI-Anything
CLI-Hub: https://hkuds.github.io/CLI-Anything/（在线浏览和搜索）
技术报告: https://arxiv.org/abs/2606.03854
Stars: 43.5K | Forks: 4K+

CLI-Anything 由香港大学数据科学实验室（HKUDS）主导，社区共建。它提供了一个 7 阶段自动生成管线，将任何桌面 GUI 软件（Blender、GIMP、FreeCAD、OBS Studio 等）自动转换为 AI Agent 可调用的 CLI 命令。

#### CLI-Hub 可用软件清单（共 96 个 CLI，35 个分类）

| 分类 | 软件列表 |
|------|----------|
| 3D | blender, freecad |
| AI | comfyui, dify-workflow, ollama, openwebui, minimax, novita 等 |
| AUDIO | audacity, elevenlabs, wavetone |
| AUTOMATION | eez-studio, macrocli, n8n |
| COMMUNICATION | feishu (飞书), wecom (企业微信), zoom |
| DATABASE | chromadb, openrefine |
| DESIGN | sketch, inkstitch |
| DEVOPS | 1password-cli, sentry, pm2, iterm2, jumpserver |
| DIAGRAMS | drawio, mermaid |
| GAME/GAMEDEV | godot, sbox, ueatelier, slay_the_spire_ii |
| GRAPHICS/IMAGE | gimp, inkscape, krita |
| KNOWLEDGE | joplin, obsidian, obsidian-cli |
| OFFICE | libreoffice, calibre, zotero, mubu |
| SCIENCE | qgis, arcgis-pro, stata, unimol_tools |
| SEARCH | exa, hacker-feeds-cli |
| STREAMING | obs-studio |
| TESTING | wiremock |
| VIDEO | kdenlive, openscreen, shotcut, videocaptioner |
| WEB | clibrowser, safari, shopify, sanity, mailchimp |

#### cli-hub 核心命令

| 命令 | 功能 |
|------|------|
| cli-hub list | 浏览注册表所有 CLI |
| cli-hub search <keyword> | 按关键词搜索 |
| cli-hub info <name> | 查看某个 CLI 的详细信息 |
| cli-hub install <name> | 安装 CLI harness |
| cli-hub update <name> | 更新已安装的 CLI |
| cli-hub uninstall <name> | 卸载 CLI |
| cli-hub launch <name> [args] | 运行已安装的 CLI |

### 2.2 OpenCLI — 让网站和 Electron 应用成为 CLI

GitHub: https://github.com/jackwener/opencli
Chrome Web Store 扩展: https://chromewebstore.google.com/detail/opencli/ildkmabpimmkaediidaifkhjpohdnifk

OpenCLI 是一个统一 CLI 枢纽，把网站、Electron 桌面应用和本地 CLI 工具全部注册到 opencli <site> <command> 的接口下。OpenCLI daemon 已在本机运行（端口 19825）。

#### 100+ 网站适配器（部分命令无需浏览器扩展）

| 站点 | 部分可用命令 |
|------|-------------|
| B站 | hot, search, history, feed, ranking, download, video, comments 等 |
| 小红书 | search, note, comments, feed, user, download, publish 等 |
| 知乎 | hot, search, question, download, answer, comment 等 |
| Twitter/X | trending, search, timeline, post, download, profile, follow 等 |
| Reddit | hot, popular, search, subreddit, read, comment 等 |
| HackerNews | top, new, best, ask, show, jobs, search 等 |
| LinkedIn | connect, inbox, search, profile-read, timeline 等 |
| Claude | ask, send, new, status, read, history |
| Gemini | new, ask, image, deep-research |
| NotebookLM | status, list, open, summary, note-list, source-list |
| Amazon | bestsellers, search, product, offer |
| 更多 | 抖音、微博、微信读书、小宇宙、1688、夸克、Spotify、牛客、arXiv、Pixiv、豆瓣 等 100+ 站点 |

#### Electron 桌面应用适配器（通过 CDP）

支持控制：Cursor、Trae CN、Codex、Antigravity、ChatGPT App、ChatWise、Discord、Doubao、Trae SOLO 及其它 Electron 应用。

#### 外部 CLI 枢纽

支持直接调用：gh, docker, vercel, wrangler, obsidian, longbridge, lark-cli, ntn(notion), tg(tg-cli), discord(discord-cli), wx(wx-cli), dws(DingTalk Workspace), wecom-cli(企业微信) 等。
也可以注册自定义本地 CLI：opencli external register <name>。

#### opencli 核心命令

| 命令 | 功能 |
|------|------|
| opencli list | 查看所有已注册命令 |
| opencli doctor | 诊断浏览器连通性 |
| opencli <site> <command> | 运行适配器命令 |
| opencli browser <session> <cmd> | 实时驱动浏览器 |
| opencli external register <name> | 注册本地 CLI |
| opencli plugin install github:user/repo | 安装社区插件 |

#### 认证策略

| 策略 | 说明 | 是否需要浏览器 |
|------|------|---------------|
| PUBLIC | 纯 HTTP 请求，无需认证 | 否 |
| COOKIE | 从已登录 Chrome 提取凭证 | 是（需 OpenCLI 扩展） |
| INTERCEPT | 拦截浏览器请求获取签名 | 是（需 OpenCLI 扩展） |
| UI | 完整 DOM 交互 | 是（需 OpenCLI 扩展） |
| LOCAL | 指向本地或开发环境 API | 否 |

#### 输出格式

所有命令支持：table（默认）、json、yaml、md、csv。AI Agent 推荐使用 -f json。

#### 已安装的 Codex Skills

| Skill | 位置 | 用途 |
|-------|------|------|
| opencli-browser | ~/.agents/skills/opencli-browser/ | 实时驱动 Chrome 页面 |
| opencli-usage | ~/.agents/skills/opencli-usage/ | 命令和站点快速参考 |
| opencli-adapter-author | ~/.agents/skills/opencli-adapter-author/ | 为新站点写适配器 |
| opencli-autofix | ~/.agents/skills/opencli-autofix/ | 修复已有适配器 |
| opencli-browser-sitemap | ~/.agents/skills/opencli-browser-sitemap/ | 使用 sitemap 上下文操作浏览器 |

### 2.3 Super-CLI — 统一路由器

Super-CLI 是一个极简路由器，将 OpenCLI 和 CLI-Anything 统一到一个入口下：

```
super-cli <target> [args]
  target = "browser"       -> opencli browser [args]
  cli-anything-<target> 在 PATH 上 -> 直接运行
  其他                     -> opencli <target> [args]
```

| 命令 | 说明 |
|------|------|
| super-cli list | 列出所有可用目标（Web + 桌面） |
| super-cli doctor | 诊断 Node、Python、OpenCLI 和 cli-hub |
| super-cli <target> [args] | 自动路由到正确后端执行 |
| super-cli make <source> | 引导创建新 CLI 适配器 |

所有命令支持 -f json 结构化输出。


## 三、用法速查

### 3.1 查看各大平台热门内容

```
opencli bilibili hot --limit 10
opencli hackernews top --limit 10 -f json
opencli zhihu hot --limit 10
opencli twitter trending -f json
```

### 3.2 搜索和获取内容

```
opencli bilibili search "TypeScript" --limit 10
opencli zhihu search "AI Agent" -f json
opencli twitter profile elonmusk -f json
```

### 3.3 下载内容

```
opencli bilibili download BV1xxx --output ./videos
opencli xiaohongshu download "https://www.xiaohongshu.com/..." --output ./xhs
opencli zhihu download "https://zhuanlan.zhihu.com/p/xxx" --download-images
opencli weixin download --url "https://mp.weixin.qq.com/s/xxx" --output ./weixin
```

### 3.4 CLI-Hub 管理

```
cli-hub list                    # 浏览所有可用 CLI
cli-hub search image            # 搜索图像相关 CLI
cli-hub info gimp               # 查看 CLI 详情
cli-hub install gimp            # 安装
cli-hub launch gimp --help      # 运行
```

### 3.5 Super-CLI 统一入口

```
super-cli list                  # 发现目标
super-cli doctor                # 检查环境
super-cli zhihu hot -f json    # 自动路由调用
super-cli make https://example.com  # 引导创建新 CLI
```

## 四、最佳实践

1. 始终使用 -f json：AI Agent 和脚本中推荐使用 -f json 获得结构化输出。

2. 先用 PUBLIC 策略的命令：不需要浏览器扩展的命令可以直接用，如 HackerNews、部分知乎和 B 站命令。

3. 安装 OpenCLI Chrome 扩展：如果要使用 COOKIE/INTERCEPT/UI 策略的命令（如关注、点赞、发布等），必须安装浏览器扩展。

4. 给 Chrome profile 起别名：如果使用多个 Chrome 账号，用 opencli profile rename <contextId> work 区分。

5. 善用 opencli list：不要死记命令，opencli list 是唯一的真相来源。

6. 浏览器操作时先 state 再行动：不要硬编码选择器，先取 DOM 快照再确定目标，每次页面变化后重新 state。

7. 用 network 替代屏幕抓取：抓 API 响应比抓渲染后的 DOM 更可靠。

8. 善用输出格式切换：
   - opencli bilibili hot -f json     # 给 AI 或 jq
   - opencli bilibili hot -f table    # 给人看（默认）
   - opencli bilibili hot -f markdown # 放进文档

9. 定期更新 CLI-Hub：cli-hub update <name> 保持最新版本。

10. 安全注意事项：只安装信任来源的 CLI-Hub harness；CLI-Anything 给 Agent 提供了浏览器控制能力，只在信任的 Agent 环境中使用。

## 五、适用场景

### 内容创作者
- 一键采集 B 站/小红书/Twitter 热门话题
- 下载各平台媒体文件到本地
- 导出知乎/微信公众号文章为 Markdown
- 多平台内容管理（发布、点赞、关注）

### 开发者
- 自动采集 GitHub/HackerNews 技术讨论
- 导出知乎/公众号文章作为技术文档素材
- 通过 opencli gh、opencli docker 等统一调用本地工具
- 从各大平台抓取 API 数据

### 分析师/研究员
- 自动采集 LinkedIn、Twitter、Reddit 的行业信息
- 使用 CLI-Hub 的 exa 语义搜索、hacker-feeds-cli 多源聚合
- AI Agent 自动完成社交媒体分析报告

### 设计师/3D 创作者
- 通过 CLI 控制 Blender/FreeCAD 完成 3D 建模
- GIMP/Krita/Inkscape 的图像处理流水线
- Sketch 设计文件生成

### AI Agent 自动化
- Browser Use：让 AI Agent 通过已登录的 Chrome 执行网页操作
- 复杂工作流编排：链式调用多个 opencli 命令完成多步骤任务
- 自定义适配器：为内部系统或私有网站编写适配器

