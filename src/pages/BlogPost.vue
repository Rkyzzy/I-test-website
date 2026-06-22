<template>
  <div class="min-h-screen" :class="{ 'md:pl-64': showToc }">
    <div class="fixed top-0 left-0 right-0 h-1 bg-[#d0d7de] dark:bg-[#30363d] z-50">
      <div
        class="h-full bg-[#58a6ff] transition-all duration-150"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <!-- TOC 侧边栏 (桌面端) -->
    <aside
      v-if="showToc && headings.length > 0"
      class="hidden md:block fixed left-0 top-16 bottom-0 w-60 overflow-y-auto p-6 border-r border-[#d0d7de] dark:border-[#30363d]"
    >
      <h3 class="text-sm font-semibold text-[#656d76] dark:text-[#8b949e] mb-4 uppercase tracking-wider">目录</h3>
      <nav class="space-y-1">
        <a
          v-for="(heading, i) in headings"
          :key="i"
          :href="'#' + heading.id"
          :class="[
            'block text-sm py-1 transition-colors rounded px-2',
            activeHeading === heading.id
              ? 'text-[#58a6ff] bg-[rgba(88,166,255,0.1)]'
              : 'text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff]',
          ]"
          :style="{ paddingLeft: (heading.level - 1) * 12 + 8 + 'px' }"
          @click.prevent="scrollToHeading(heading.id)"
        >
          {{ heading.text }}
        </a>
      </nav>
    </aside>

    <!-- 移动端 TOC 按钮 -->
    <button
      v-if="headings.length > 0"
      @click="mobileTocOpen = !mobileTocOpen"
      class="md:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#58a6ff] text-white shadow-lg flex items-center justify-center"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- 移动端 TOC 面板 -->
    <div
      v-if="mobileTocOpen"
      class="md:hidden fixed inset-0 z-50 bg-black/50"
      @click="mobileTocOpen = false"
    >
      <div
        class="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-[#0d1117] p-6 overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold">目录</h3>
          <button @click="mobileTocOpen = false" class="text-[#656d76] hover:text-[#58a6ff]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="space-y-2">
          <a
            v-for="heading in headings"
            :key="heading.id"
            :href="'#' + heading.id"
            class="block text-sm py-1.5 text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff] transition-colors"
            :style="{ paddingLeft: (heading.level - 1) * 12 + 'px' }"
            @click.prevent="scrollToHeading(heading.id); mobileTocOpen = false"
          >
            {{ heading.text }}
          </a>
        </nav>
      </div>
    </div>

    <article class="py-20 px-6">
      <div class="max-w-3xl mx-auto" :class="{ 'md:ml-auto md:mr-8': showToc && headings.length > 0 }">
        <button
          @click="goBack"
          class="mb-8 text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff] transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </button>

        <div v-if="!postFound" class="text-center py-20">
          <div class="text-6xl mb-4">404</div>
          <p class="text-[#656d76] dark:text-[#8b949e] mb-4">文章未找到</p>
          <router-link to="/blog" class="link">返回博客列表</router-link>
        </div>

        <template v-if="postFound">
          <header class="mb-12">
            <div class="flex items-center gap-3 mb-4 text-sm text-[#656d76] dark:text-[#8b949e]">
              <span>{{ postData.date }}</span>
              <span>·</span>
              <span>{{ postData.readTime }} 分钟阅读</span>
              <span class="tag !px-2 !py-0.5 !text-xs">{{ postData.category }}</span>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ postData.title }}</h1>

            <div class="flex gap-2 mb-8 flex-wrap">
              <span v-for="tag in postData.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </header>

          <div class="rounded-xl overflow-hidden mb-12">
            <img
              :src="postData.cover"
              :alt="postData.title"
              class="w-full"
            />
          </div>

          <!-- Markdown 渲染内容 -->
          <div class="blog-content" v-html="renderedContent"></div>

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

          <!-- 相关文章 -->
          <div v-if="relatedPosts.length > 0" class="mt-16 pt-8 border-t border-[#d0d7de] dark:border-[#30363d]">
            <h2 class="text-2xl font-bold mb-6">相关文章</h2>
            <div class="grid md:grid-cols-3 gap-4">
              <div
                v-for="related in relatedPosts"
                :key="related.slug"
                class="card cursor-pointer group !p-4"
                @click="navigateToPost(related.slug)"
              >
                <div class="aspect-video rounded-lg overflow-hidden mb-3 bg-[#f6f8fa] dark:bg-[#161b22]">
                  <img
                    :src="related.cover"
                    :alt="related.title"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 class="font-semibold mb-1 group-hover:text-[#58a6ff] transition-colors line-clamp-2">
                  {{ related.title }}
                </h3>
                <p class="text-xs text-[#656d76] dark:text-[#8b949e]">{{ related.date }}</p>
              </div>
            </div>
          </div>

          <!-- Giscus 评论 -->
          <div class="mt-12 pt-8 border-t border-[#d0d7de] dark:border-[#30363d]">
            <h2 class="text-2xl font-bold mb-6">评论</h2>
            <div id="giscus-comments" class="giscus"></div>
          </div>
        </template>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { loadPostBySlug, getRelatedPosts } from '@/services/blogService'
import { extractHeadings } from '@/content/blog/posts'
import type { BlogPost } from '@/content/blog/posts'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

const readingProgress = ref(0)
const activeHeading = ref('')
const mobileTocOpen = ref(false)

const slug = computed(() => route.params.slug as string)
const postData = ref<BlogPost>({
  slug: '', title: '', excerpt: '', cover: '', date: '',
  readTime: 0, tags: [], category: '', content: '',
})
const relatedPosts = ref<BlogPost[]>([])
const headings = ref<{ level: number; text: string; id: string }[]>([])
const showToc = computed(() => headings.value.length > 0)
const postFound = computed(() => !!postData.value.content)
const isLoadingPost = ref(true)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        return `<pre class="hljs"><code>${highlighted}</code></pre>`
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`
  },
})

md.renderer.rules.heading_open = function(tokens: any[], idx: number) {
  const token = tokens[idx]
  const text = tokens[idx + 1]?.content || ""
  const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "")
  return "<" + token.tag + " id=\"" + id + "\">"
}

const renderedContent = computed(() => {
  if (!postData.value) return ''
  const content = postData.value.content
  return md.render(content)
})

onMounted(async () => {
  window.addEventListener('scroll', updateReadingProgress)
  window.addEventListener('scroll', updateActiveHeading)

  const post = await loadPostBySlug(slug.value)
  if (post) {
    postData.value = post
    relatedPosts.value = getRelatedPosts(post, 3)
    headings.value = extractHeadings(post.content)
  }
  isLoadingPost.value = false
  if (postFound.value) {
    loadGiscus()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
  window.removeEventListener('scroll', updateActiveHeading)
})

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/blog')
  }
}

function navigateToPost(slug: string) {
  router.push(`/blog/${slug}`)
}

async function sharePost() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // 可以用 message 替代 alert，但这里先保持简单
    alert('链接已复制到剪贴板')
  } catch {
    alert('复制失败，请手动复制地址栏链接')
  }
}

function updateReadingProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = Math.min((scrollTop / docHeight) * 100, 100)
}

function updateActiveHeading() {
  const headingElements = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3')
  let currentActive = ''
  for (const el of headingElements) {
    const rect = el.getBoundingClientRect()
    if (rect.top <= 100) {
      currentActive = el.id
    }
  }
  if (currentActive) {
    activeHeading.value = currentActive
  }
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function loadGiscus() {
  const existingScript = document.querySelector('script[src="https://giscus.app/client.js"]')
  if (existingScript) {
    existingScript.remove()
  }

  const container = document.getElementById('giscus-comments')
  if (!container) return
  container.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Rkyzzy/I-test-website')
  script.setAttribute('data-repo-id', 'R_kgDOSw0IUw')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOSw0IU84C-fiW')
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
  container.appendChild(script)
}

watch(() => themeStore.isDark, () => {
  const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement
  if (iframe?.contentWindow) {
    const theme = themeStore.isDark ? 'dark' : 'light'
    iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
  }
})
</script>

<style>
.blog-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #1f2328;
}

.dark .blog-content {
  color: #e6edf3;
}

.blog-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #d0d7de;
}

.dark .blog-content h2 {
  border-bottom-color: #30363d;
}

.blog-content h3 {
  font-size: 1.375rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}

.blog-content p {
  margin-bottom: 1.25rem;
}

.blog-content ul,
.blog-content ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

.blog-content ul li {
  list-style-type: disc;
}

.blog-content ol li {
  list-style-type: decimal;
}

.blog-content strong {
  font-weight: 700;
}

.blog-content blockquote {
  border-left: 4px solid #58a6ff;
  margin: 1.5rem 0;
  padding: 0.75rem 1.25rem;
  background: rgba(88, 166, 255, 0.05);
  border-radius: 0 8px 8px 0;
  color: #656d76;
}

.dark .blog-content blockquote {
  color: #8b949e;
  background: rgba(88, 166, 255, 0.08);
}

.blog-content code:not(pre code) {
  padding: 0.2em 0.4em;
  border-radius: 4px;
  background: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
  font-size: 0.875em;
}

.blog-content pre {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.blog-content pre code {
  display: block;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.blog-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.blog-content th,
.blog-content td {
  padding: 0.75rem 1rem;
  border: 1px solid #d0d7de;
  text-align: left;
}

.dark .blog-content th,
.dark .blog-content td {
  border-color: #30363d;
}

.blog-content th {
  background: #f6f8fa;
  font-weight: 600;
}

.dark .blog-content th {
  background: #161b22;
}

.blog-content a {
  color: #58a6ff;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.blog-content hr {
  border: none;
  border-top: 1px solid #d0d7de;
  margin: 2rem 0;
}

.dark .blog-content hr {
  border-top-color: #30363d;
}

.blog-content h2 id,
.blog-content h3 id {
  scroll-margin-top: 5rem;
}
</style>
