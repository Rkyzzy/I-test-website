---
title: "Vue 3 入门指南：组合式 API 与响应式系统详解"
date: "2024-01-15"
tags: ["Vue", "前端", "JavaScript"]
category: "技术"
cover: "https://picsum.photos/seed/vue3/1200/600"
excerpt: "Vue 3 是 Vue.js 的最新主要版本，带来了组合式 API、Proxy 响应式系统、TypeScript 支持等重磅特性。本文带你系统入门 Vue 3 的核心概念。"
readTime: 8
---

## 前言

Vue 3 于 2020 年 9 月正式发布，是 Vue.js 框架的一次重大升级。它不仅带来了性能上的提升，更重要的是引入了**组合式 API（Composition API）**，让组件逻辑的组织变得更加灵活。

## 组合式 API

组合式 API 是 Vue 3 最核心的新特性。与选项式 API 不同，组合式 API 允许我们按照逻辑关注点组织代码，而不是按照选项类型：

```vue
<script setup>
import { ref, computed, onMounted } from "vue"

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

function increment() {
  count.value++
}

onMounted(() => {
  console.log('component mounted')
})
</script>
```

## 响应式系统

Vue 3 的响应式系统基于 ES6 的 **Proxy** 实现，相比 Vue 2 的 Object.defineProperty 有以下优势：

- 支持数组索引和长度的变化检测
- 支持属性的动态添加和删除
- 更少的性能开销

## TypeScript 支持

Vue 3 使用 TypeScript 编写，提供了完善的类型推断支持。
