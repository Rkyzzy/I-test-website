<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">博客</h1>
      <p class="text-[#656d76] dark:text-[#8b949e] mb-12">
        记录思考，分享技术，持续成长
      </p>

      <div class="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
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

        <n-select
          v-model:value="selectedCategory"
          :options="categoryOptions"
          class="min-w-[120px]"
          placeholder="分类"
        />

        <div class="flex gap-2 flex-wrap">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="selectedTag = selectedTag === tag ? null : tag"
            :class="[
              'tag cursor-pointer',
              selectedTag === tag && 'border-[#58a6ff] text-[#58a6ff]'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <article
          v-for="post in currentPosts"
          :key="post.slug"
          class="card cursor-pointer group"
          @click="navigateToPost(post.slug)"
        >
          <div class="flex gap-6">
            <div class="hidden md:block w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-sm text-[#656d76] dark:text-[#8b949e]">
                  {{ post.date }}
                </span>
                <span class="text-sm text-[#656d76] dark:text-[#8b949e]">·</span>
                <span class="text-sm text-[#656d76] dark:text-[#8b949e]">
                  {{ post.readTime }} 分钟阅读
                </span>
                <span class="text-xs tag !px-2 !py-0.5 !text-xs">{{ post.category }}</span>
              </div>

              <h2 class="text-xl font-semibold mb-2 group-hover:text-[#58a6ff] transition-colors">
                {{ post.title }}
              </h2>

              <p class="text-[#656d76] dark:text-[#8b949e] mb-4 line-clamp-2">
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

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-12">
        <button
          :disabled="currentPage <= 1"
          @click="currentPage = currentPage - 1"
          class="btn btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <span class="text-sm text-[#656d76] dark:text-[#8b949e]">
          第 {{ currentPage }} / {{ totalPages }} 页
        </span>

        <button
          :disabled="currentPage >= totalPages"
          @click="currentPage = currentPage + 1"
          class="btn btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div v-if="filteredPosts.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-[#656d76] dark:text-[#8b949e]">暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  categories,
  getAllTags,
  getPostsByCategory,
  paginatePosts,
} from '@/content/blog/posts'

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')
const selectedTag = ref<string | null>(null)
const selectedCategory = ref<string>('全部')
const currentPage = ref(1)
const perPage = 6

const allTags = getAllTags()

onMounted(() => {
  const tagFromQuery = route.query.tag as string | undefined
  if (tagFromQuery) {
    selectedTag.value = tagFromQuery
  }
})

const categoryOptions = categories.map(c => ({ label: c, value: c }))

const filteredPosts = computed(() => {
  let posts = getPostsByCategory(selectedCategory.value)

  if (selectedTag.value) {
    posts = posts.filter(p => p.tags.includes(selectedTag.value!))
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    posts = posts.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  return posts
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / perPage))

const currentPosts = computed(() => {
  const result = paginatePosts(filteredPosts.value, currentPage.value, perPage)
  return result.posts
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
