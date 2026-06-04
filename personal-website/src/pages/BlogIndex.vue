<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <h1 class="text-4xl font-bold mb-4">博客</h1>
      <p class="text-light-muted dark:text-dark-muted mb-12">
        记录思考，分享技术，持续成长
      </p>

      <!-- 搜索和筛选 -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <n-input
          v-model:value="searchQuery"
          placeholder="搜索文章..."
          clearable
          class="md:w-64"
        >
          <template #prefix>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </template>
        </n-input>

        <div class="flex gap-2 flex-wrap">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="selectedTag = selectedTag === tag ? null : tag"
            :class="[
              'tag cursor-pointer',
              selectedTag === tag && 'border-accent-blue text-accent-blue'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="space-y-6">
        <article
          v-for="post in filteredPosts"
          :key="post.slug"
          class="card cursor-pointer group"
          @click="navigateToPost(post.slug)"
        >
          <div class="flex gap-6">
            <!-- 缩略图 -->
            <div class="hidden md:block w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <!-- 内容 -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-sm text-light-muted dark:text-dark-muted">
                  {{ post.date }}
                </span>
                <span class="text-sm text-light-muted dark:text-dark-muted">·</span>
                <span class="text-sm text-light-muted dark:text-dark-muted">
                  {{ post.readTime }} 分钟阅读
                </span>
              </div>

              <h2 class="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                {{ post.title }}
              </h2>

              <p class="text-light-muted dark:text-dark-muted mb-4 line-clamp-2">
                {{ post.excerpt }}
              </p>

              <div class="flex gap-2">
                <span v-for="tag in post.tags" :key="tag" class="tag text-xs">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredPosts.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-light-muted dark:text-dark-muted">暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const selectedTag = ref<string | null>(null)

const tags = ['技术', '思考', '生活', '前端', '后端']

// 示例文章数据
const posts = ref([
  {
    slug: 'getting-started-with-vue3',
    title: 'Vue 3 入门指南',
    excerpt: 'Vue 3 是 Vue.js 的最新主要版本，带来了许多新特性和改进。本文将带你快速上手 Vue 3 的核心概念。',
    cover: 'https://picsum.photos/400/300?random=1',
    date: '2024-01-15',
    readTime: 8,
    tags: ['技术', '前端', 'Vue'],
  },
  {
    slug: 'design-patterns-in-frontend',
    title: '前端设计模式实践',
    excerpt: '设计模式是软件开发中的重要知识。本文探讨了如何在前端开发中应用常见的设计模式。',
    cover: 'https://picsum.photos/400/300?random=2',
    date: '2024-01-10',
    readTime: 12,
    tags: ['技术', '前端'],
  },
  {
    slug: 'my-learning-philosophy',
    title: '我的学习方法论',
    excerpt: '高效学习是每个工程师必备的技能。这篇文章分享了我多年来总结的学习方法和思考。',
    cover: 'https://picsum.photos/400/300?random=3',
    date: '2024-01-05',
    readTime: 6,
    tags: ['思考', '生活'],
  },
])

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = !searchQuery.value ||
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesTag = !selectedTag.value || post.tags.includes(selectedTag.value)
    
    return matchesSearch && matchesTag
  })
})

function navigateToPost(slug: string) {
  router.push(`/blog/${slug}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
