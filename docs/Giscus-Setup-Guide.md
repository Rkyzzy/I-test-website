# Giscus 评论系统配置指南

## 🎯 概述

Giscus 是一个基于 GitHub Discussions 的评论系统，它允许访客在你的网站上使用 GitHub 账号发表评论。评论会自动同步到 GitHub Discussions。

## 📋 配置步骤

### 1. 启用 GitHub Discussions

1. 打开你的 GitHub 仓库：https://github.com/Rkyzzy/I-test-website
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Discussions**（讨论）
4. 勾选 **Enable discussions**（启用讨论）

### 2. 生成 Giscus 配置

1. 打开 Giscus 官网：https://giscus.app/zh-CN
2. 在 "GitHub 仓库" 输入框中填入：`Rkyzzy/I-test-website`
3. 在 "页面 ↔️ 讨论映射" 部分选择：**路径名**
4. 在 "讨论分类" 部分：
   - 选择 **New discussion**（新建讨论）
   - 分类标题输入：`Announcements`（公告）
5. 勾选 **包含评论数量**（可选）
6. 勾选 **启用反应**（可选）

### 3. 获取配置信息

在页面下方，你会看到生成的配置代码，类似这样：

```html
<script
  src="https://giscus.app/client.js"
  data-repo="Rkyzzy/I-test-website"
  data-repo-id="R_placeholder"
  data-category="Announcements"
  data-category-id="DIC_placeholder"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="light"
  data-lang="zh-CN"
  data-loading="lazy"
  crossorigin="anonymous"
  async
></script>
```

### 4. 更新代码中的占位符

你需要将 `src/pages/BlogPost.vue` 中的占位符替换为真实的值：

```javascript
script.setAttribute('data-repo-id', '你的真实 repo-id')  // 替换 R_placeholder
script.setAttribute('data-category-id', '你的真实 category-id')  // 替换 DIC_placeholder
```

### 5. 测试评论功能

完成以上配置后：

1. 打开你的博客文章页面
2. 滚动到页面底部，你应该能看到评论框
3. 使用 GitHub 账号登录并发表评论
4. 检查 GitHub 仓库的 Discussions 页面，确认评论已同步

## ✨ 功能特点

- ✅ **免费** - 不需要任何付费服务
- ✅ **基于 GitHub** - 使用 GitHub 账号评论，无需额外注册
- ✅ **自动同步** - 评论自动同步到 GitHub Discussions
- ✅ **主题支持** - 支持浅色/深色主题自动切换
- ✅ **中文支持** - 支持中文界面
- ✅ **隐私保护** - 不追踪用户数据

## 🔧 自定义选项

### 评论框位置

当前设置为 `data-input-position="bottom"`（评论框在底部），可以改为：

- `top` - 评论框在顶部
- `bottom` - 评论框在底部

### 主题设置

当前设置为根据网站主题自动切换：

- 浅色模式：`light`
- 深色模式：`dark`

### 语言设置

当前设置为中文：`data-lang="zh-CN"`

可用的语言选项包括：`en`, `zh-CN`, `zh-TW`, `ko`, `ja` 等。

## 🐛 常见问题

### Q: 评论没有显示？

A: 请检查：
1. GitHub Discussions 是否已启用
2. Giscus 配置中的 repo-id 和 category-id 是否正确
3. 浏览器控制台是否有错误信息

### Q: 如何修改评论分类？

A: 在 Giscus 配置页面修改 category 设置，并更新代码中的 `data-category-id`。

### Q: 评论是否会被审核？

A: Giscus 使用 GitHub Discussions，所有评论都会显示在 Discussions 中，你可以在 GitHub 后台管理评论。

## 📚 相关资源

- [Giscus 官网](https://giscus.app/zh-CN)
- [Giscus GitHub](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)

## 🎉 完成后

完成配置后，你的博客文章页面底部就会显示评论框了！访客可以使用 GitHub 账号登录并发表评论。
