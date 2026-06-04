<template>
  <div class="min-h-screen">
    <!-- 阅读进度条 -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-light-border dark:bg-dark-border z-50">
      <div
        class="h-full bg-accent-blue transition-all duration-150"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <article class="py-20 px-6">
      <div class="max-w-3xl mx-auto">
        <!-- 返回按钮 -->
        <button
          @click="goBack"
          class="mb-8 text-light-muted dark:text-dark-muted hover:text-accent-blue transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </button>

        <!-- 文章头部 -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4 text-sm text-light-muted dark:text-dark-muted">
            <span>{{ post.date }}</span>
            <span>·</span>
            <span>{{ post.readTime }} 分钟阅读</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ post.title }}</h1>

          <div class="flex gap-2 mb-8">
            <span v-for="tag in post.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- 文章封面 -->
        <div class="rounded-xl overflow-hidden mb-12">
          <img
            :src="post.cover"
            :alt="post.title"
            class="w-full"
          />
        </div>

        <!-- 文章内容 -->
        <div class="prose dark:prose-invert max-w-none">
          <p>{{ post.content }}</p>
          <!-- 这里可以使用 markdown 渲染库 -->
        </div>

        <!-- 文章底部 -->
        <footer class="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
          <div class="flex justify-between items-center">
            <button
              @click="sharePost"
              class="btn btn-ghost flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
              分享文章
            </button>
          </div>
        </footer>

        <!-- Giscus 评论 -->
        <div class="mt-12">
          <div id="comments"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const readingProgress = ref(0)

const post = ref({
  title: 'Vue 3 入门指南',
  date: '2024-01-15',
  readTime: 8,
  tags: ['技术', '前端', 'Vue'],
  cover: 'https://picsum.photos/1200/600?random=1',
  content: `这是一篇关于 Vue 3 入门的文章。Vue 3 是 Vue.js 的最新主要版本，带来了许多新特性和改进。

## 组合式 API

Vue 3 引入了组合式 API，这是一种新的编写组件逻辑的方式。通过 setup 函数，我们可以在同一个地方组织相关的代码。

## 响应式系统

Vue 3 的响应式系统基于 ES6 Proxy，相比 Vue 2 的 Object.defineProperty 更加高效和强大。

## TypeScript 支持

Vue 3 从一开始就是用 TypeScript 编写的，提供了完善的类型支持。

让我们开始探索 Vue 3 的世界吧！`,
})

function goBack() {
  router.back()
}

function sharePost() {
  navigator.clipboard.writeText(window.location.href)
  alert('链接已复制到剪贴板')
}

function updateReadingProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = Math.min((scrollTop / docHeight) * 100, 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
})
</script>

<style scoped>
.prose {
  @apply text-lg leading-relaxed;
}

.prose p {
  @apply mb-6;
}

.prose h2 {
  @apply text-2xl font-bold mt-12 mb-6;
}

.prose code {
  @apply px-2 py-1 rounded bg-light-card dark:bg-dark-card text-accent-blue;
}
</style>
