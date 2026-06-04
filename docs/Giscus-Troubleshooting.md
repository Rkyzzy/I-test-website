# Giscus 无法使用问题排查指南

## ❓ 问题：无法在该仓库上使用 Giscus

当你在 Giscus 网站输入仓库信息时，如果看到「无法在该仓库上使用 Giscus」，请按以下步骤排查：

---

## 📋 必备条件检查清单

### ✅ 1. 仓库必须是公开的（Public）

**如何检查：**
1. 打开你的仓库：https://github.com/Rkyzzy/I-test-website
2. 查看仓库名称旁边的标签
   - 绿色的 **Public** = ✅ 可以使用
   - 红色的 **Private** = ❌ 无法使用

**如果是 Private 仓库，如何改为 Public：**
1. 点击 **Settings**（设置）
2. 滚动到底部找到 **Danger Zone**（危险区域）
3. 点击 **Change repository visibility**（更改仓库可见性）
4. 选择 **Change to public**（改为公开）
5. 确认操作

⚠️ **重要提示：** 把仓库改为公开后，所有代码都会公开可见。

---

### ✅ 2. 必须安装 Giscus App（最常见原因！）

**如何安装 Giscus：**
1. 访问：https://github.com/apps/giscus
2. 点击绿色的 **Install**（安装）按钮
3. 在 "Repository access"（仓库访问权限）选项中：
   - 选择 **Only select repositories**（仅选择仓库）
   - 勾选 `Rkyzzy/I-test-website`
4. 点击 **Install**（安装）确认

**安装后，你的仓库页面的 **Settings** → **Integrations** 中应该能看到 Giscus。**

---

### ✅ 3. 必须启用 GitHub Discussions

**如何启用：**
1. 打开仓库 **Settings**（设置）
2. 在左侧菜单找到 **Discussions**（讨论）
3. 勾选 **Enable discussions**（启用讨论）
4. 点击 **Save**（保存）

---

## 🚀 完整配置步骤（按顺序执行）

### 第一步：确保仓库公开且启用 Discussions
1. 检查仓库可见性（必须是 Public）
2. 启用 Discussions

### 第二步：安装 Giscus App
1. 访问 https://github.com/apps/giscus
2. 点击 Install
3. 选择你的仓库并安装

### 第三步：获取 Giscus 配置
1. 访问 https://giscus.app/zh-CN
2. 再次输入：`Rkyzzy/I-test-website`
3. 现在应该可以正常配置了！
4. 按照页面提示完成设置
5. 复制生成的配置代码中的：
   - `data-repo-id` 的值
   - `data-category-id` 的值

### 第四步：更新代码
把这些值告诉我，我会帮你更新到网站代码中。

---

## 🔧 常见问题

### Q: 仓库改为公开后，之前的 Private 代码会不会泄露？
A: 是的，公开仓库后所有代码都会公开可见。如果这是个问题，我们可以考虑其他评论方案（如 Utterances 或 Disqus）。

### Q: 安装 Giscus App 需要什么权限？
A: Giscus 只需要访问你的 Discussions 权限，不会读取你的其他仓库数据。

### Q: 仓库是公开的，也安装了 App，但还是不行？
A: 请稍等 1-2 分钟，GitHub 的权限同步需要一点时间。

### Q: 不想把仓库改为公开，还有其他选择吗？
A: 有的！我们可以使用：
- **Utterances** - 基于 Issues，同样要求公开仓库
- **Disqus** - 第三方评论系统，不需要 GitHub
- **Remark42** - 自建评论系统

---

## 📞 如果还是不行

如果按照以上步骤操作后仍然有问题，请告诉我：
1. 你的仓库现在是 Public 还是 Private？
2. 是否成功安装了 Giscus App？
3. 在 Giscus 网站上看到的具体错误信息是什么？

我会根据你的具体情况帮你解决！
