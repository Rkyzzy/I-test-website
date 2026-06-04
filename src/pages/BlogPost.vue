<template>
  <div class="min-h-screen">
    <!-- 阅读进度条 -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-[#d0d7de] dark:bg-[#30363d] z-50">
      <div
        class="h-full bg-[#58a6ff] transition-all duration-150"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <article class="py-20 px-6">
      <div class="max-w-3xl mx-auto">
        <!-- 返回按钮 -->
        <button
          @click="goBack"
          class="mb-8 text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff] transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </button>

        <!-- 文章头部 -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4 text-sm text-[#656d76] dark:text-[#8b949e]">
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
        <div class="blog-content">
          <p>{{ post.content }}</p>
          <!-- 这里可以使用 markdown 渲染库 -->
        </div>

        <!-- 文章底部 -->
        <footer class="mt-16 pt-8 border-t border-[#d0d7de] dark:border-[#30363d]">
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
        <div class="mt-12 pt-8 border-t border-[#d0d7de] dark:border-[#30363d]">
          <h2 class="text-2xl font-bold mb-6">评论</h2>
          <div id="giscus-comments" class="giscus"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

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

function loadGiscus() {
  // 移除已存在的 giscus iframe
  const existingGiscus = document.querySelector('.giscus-frame')
  if (existingGiscus) {
    existingGiscus.remove()
  }

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Rkyzzy/I-test-website')
  script.setAttribute('data-repo-id', 'R_placeholder')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_placeholder')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', themeStore.isDark ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true
  
  const container = document.getElementById('giscus-comments')
  if (container) {
    container.appendChild(script)
  }
}

watch(() => themeStore.isDark, () => {
  // 主题切换时更新 giscus
  const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement
  if (iframe) {
    const theme = themeStore.isDark ? 'dark' : 'light'
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    )
  }
})

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress)
  loadGiscus()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
})
</script>

<style scoped>
.blog-content {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.blog-content p {
  margin-bottom: 1.5rem;
}

.blog-content h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.blog-content code {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #f6f8fa;
  color: #58a6ff;
}

.blog-content code {
  background-color: #161b22;
}
</style>
