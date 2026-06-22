<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">管理后台</h1>
          <p class="text-[#656d76] dark:text-[#8b949e] mt-1">管理博客文章和网站内容</p>
        </div>
        <div class="flex gap-3">
          <n-button @click="handleRefresh" :loading="isLoading" quaternary>
            刷新
          </n-button>
          <n-button type="primary" @click="createNewPost">
            <template #icon>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </template>
            新建文章
          </n-button>
        </div>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card !p-4 text-center">
          <div class="text-2xl font-bold text-[#58a6ff]">{{ allPosts.length }}</div>
          <div class="text-sm text-[#656d76] dark:text-[#8b949e]">总文章</div>
        </div>
        <div class="card !p-4 text-center">
          <div class="text-2xl font-bold text-[#3fb950]">{{ remotePosts.length }}</div>
          <div class="text-sm text-[#656d76] dark:text-[#8b949e]">远程文章</div>
        </div>
        <div class="card !p-4 text-center">
          <div class="text-2xl font-bold text-[#d29922]">{{ hardcodedPosts.length }}</div>
          <div class="text-sm text-[#656d76] dark:text-[#8b949e]">内置文章</div>
        </div>
        <div class="card !p-4 text-center">
          <div class="text-2xl font-bold text-[#f85149]">{{ allTags.length }}</div>
          <div class="text-sm text-[#656d76] dark:text-[#8b949e]">标签数</div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="card">
        <div class="flex items-center justify-between p-4 border-b border-[#d0d7de] dark:border-[#30363d]">
          <h2 class="font-semibold">文章列表</h2>
          <n-select
            v-model:value="filterSource"
            :options="sourceOptions"
            size="small"
            style="width: 120px"
          />
        </div>

        <div v-if="isLoading" class="p-8 text-center text-[#656d76] dark:text-[#8b949e]">
          加载中...
        </div>

        <div v-else-if="filteredPosts.length === 0" class="p-8 text-center text-[#656d76] dark:text-[#8b949e]">
          暂无文章
        </div>

        <div v-else class="divide-y divide-[#d0d7de] dark:divide-[#30363d]">
          <div
            v-for="post in filteredPosts"
            :key="post.slug"
            class="flex items-center gap-4 p-4 hover:bg-[#f6f8fa] dark:hover:bg-[#161b22] transition-colors"
          >
            <div class="w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-[#f6f8fa] dark:bg-[#161b22]">
              <img
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium truncate">{{ post.title }}</div>
              <div class="text-xs text-[#656d76] dark:text-[#8b949e] flex items-center gap-2 mt-0.5">
                <span>{{ post.date }}</span>
                <span class="tag !px-1.5 !py-0 !text-xs">{{ post.category }}</span>
                <span class="tag !px-1.5 !py-0 !text-xs" :class="isRemotePost(post.slug) ? 'text-[#3fb950]' : 'text-[#8b949e]'">
                  {{ isRemotePost(post.slug) ? '可编辑' : '内置' }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <n-button size="tiny" quaternary @click="previewPost(post.slug)">
                预览
              </n-button>
              <n-button
                v-if="isRemotePost(post.slug)"
                size="tiny"
                secondary
                @click="editPost(post.slug)"
              >
                编辑
              </n-button>
              <n-button
                v-if="isRemotePost(post.slug)"
                size="tiny"
                type="error"
                quaternary
                @click="deletePost(post)"
              >
                删除
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useDialog } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import { GitHubService } from '@/services/github'
import { loadAllPosts, getAllTags } from '@/services/blogService'
import type { BlogPost } from '@/content/blog/posts'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const adminStore = useAdminStore()

const allPosts = ref<BlogPost[]>([])
const remotePostSlugs = ref<Set<string>>(new Set())
const isLoading = ref(true)
const filterSource = ref<'all' | 'remote' | 'builtin'>('all')

const hardcodedPosts = computed(() => allPosts.value.filter(p => !remotePostSlugs.value.has(p.slug)))
const remotePosts = computed(() => allPosts.value.filter(p => remotePostSlugs.value.has(p.slug)))
const allTags = computed(() => getAllTags())

const sourceOptions = [
  { label: '全部', value: 'all' },
  { label: '可编辑', value: 'remote' },
  { label: '内置', value: 'builtin' },
]

const filteredPosts = computed(() => {
  if (filterSource.value === 'remote') return remotePosts.value
  if (filterSource.value === 'builtin') return hardcodedPosts.value
  return allPosts.value
})

function isRemotePost(slug: string): boolean {
  return remotePostSlugs.value.has(slug)
}

async function loadPosts() {
  isLoading.value = true
  try {
    const posts = await loadAllPosts()
    allPosts.value = posts
    
    // Determine which posts are remote by checking the index
    const resp = await fetch('/content/posts/posts.json')
    if (resp.ok) {
      const remoteMeta: any[] = await resp.json()
      remotePostSlugs.value = new Set(remoteMeta.map(m => m.slug))
    }
  } catch (err) {
    console.error('Failed to load posts:', err)
    message.error('加载文章失败')
  } finally {
    isLoading.value = false
  }
}

async function handleRefresh() {
  await loadPosts()
  message.success('已刷新')
}

function createNewPost() {
  router.push('/admin/posts/new')
}

function editPost(slug: string) {
  router.push(`/admin/posts/${slug}`)
}

function previewPost(slug: string) {
  window.open(`/blog/${slug}`, '_blank')
}

function deletePost(post: BlogPost) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除「${post.title}」吗？此操作不可撤销。`,
    positiveText: '确认删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (!adminStore.token) {
        message.error('请先登录管理员账号')
        return
      }
      
      const github = new GitHubService(adminStore.token)
      
      try {
        await github.deletePost(post.slug)
        message.success('文章已删除')
        await loadPosts()
      } catch (err: any) {
        message.error(err.message || '删除失败')
      }
    },
  })
}

onMounted(() => {
  if (!adminStore.isAdmin) {
    message.warning('请先登录管理员账号')
    router.push('/')
    return
  }
  loadPosts()
})
</script>

<style scoped>
.card {
  background: var(--n-card-color, #fff);
  border: 1px solid var(--n-border-color, #d0d7de);
  border-radius: 12px;
}

.dark .card {
  background: var(--n-card-color, #161b22);
  border-color: var(--n-border-color, #30363d);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  background: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
  border: 1px solid rgba(88, 166, 255, 0.2);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
