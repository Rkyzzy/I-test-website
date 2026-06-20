<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">标签</h1>
      <p class="text-[#656d76] dark:text-[#8b949e] mb-12">
        按标签浏览文章，共 {{ totalArticles }} 篇文章
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <div
          v-for="tag in tagCloud"
          :key="tag.name"
          class="group cursor-pointer text-center transition-all duration-300 hover:-translate-y-1"
          @click="goToTag(tag.name)"
        >
          <div
            class="inline-flex items-center justify-center rounded-xl transition-all duration-300"
            :class="[
              'bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] hover:border-[#58a6ff]',
              tagSizeClass(tag.count),
            ]"
          >
            <span
              class="font-semibold transition-colors group-hover:text-[#58a6ff]"
              :class="tagTextClass(tag.count)"
            >
              {{ tag.name }}
            </span>
            <span
              class="ml-2 text-[#656d76] dark:text-[#8b949e] font-normal"
              :class="tagCountClass(tag.count)"
            >
              {{ tag.count }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="tagCloud.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🏷️</div>
        <p class="text-[#656d76] dark:text-[#8b949e]">暂无标签</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { blogPosts } from '@/content/blog/posts'

const router = useRouter()

const tagCloud = computed(() => {
  const tagMap = new Map<string, number>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const totalArticles = computed(() => blogPosts.length)

function tagSizeClass(count: number): string {
  if (count >= 4) return 'px-6 py-4'
  if (count >= 2) return 'px-5 py-3'
  return 'px-4 py-2.5'
}

function tagTextClass(count: number): string {
  if (count >= 4) return 'text-xl'
  if (count >= 2) return 'text-lg'
  return 'text-base'
}

function tagCountClass(count: number): string {
  if (count >= 4) return 'text-lg'
  if (count >= 2) return 'text-base'
  return 'text-sm'
}

function goToTag(tag: string) {
  router.push({ path: '/blog', query: { tag } })
}
</script>
