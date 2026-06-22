<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- 顶部操作栏 -->
      <div class="flex items-center justify-between mb-8">
        <button
          @click="goBack"
          class="text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff] transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </button>

        <div class="flex items-center gap-3">
          <n-button @click="handlePreview" quaternary :disabled="!form.title">
            <template #icon>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </template>
            预览
          </n-button>
          <n-button
            type="primary"
            :loading="isSaving"
            :disabled="!isFormValid"
            @click="handleSave"
          >
            {{ isEditing ? '保存修改' : '发布文章' }}
          </n-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 编辑区 -->
        <div class="lg:col-span-2 space-y-4">
          <!-- 标题 -->
          <n-input
            v-model:value="form.title"
            placeholder="文章标题"
            size="large"
            :input-props="{ style: 'font-size: 1.5rem; font-weight: 700;' }"
          />

          <!-- 内容编辑 -->
          <div class="card">
            <div class="flex items-center border-b border-[#d0d7de] dark:border-[#30363d]">
              <button
                v-for="tab in editorTabs"
                :key="tab.key"
                @click="activeEditorTab = tab.key"
                :class="[
                  'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                  activeEditorTab === tab.key
                    ? 'text-[#58a6ff] border-[#58a6ff]'
                    : 'text-[#656d76] dark:text-[#8b949e] border-transparent hover:text-[#58a6ff]'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>

            <textarea
              v-if="activeEditorTab === 'write'"
              v-model="form.content"
              placeholder="使用 Markdown 编写文章内容..."
              class="markdown-editor"
            ></textarea>

            <div
              v-else
              class="blog-content p-6 min-h-[400px]"
              v-html="renderedPreview"
            ></div>
          </div>
        </div>

        <!-- 右侧属性面板 -->
        <div class="space-y-4">
          <div class="card !p-4 space-y-4">
            <h3 class="font-semibold text-sm text-[#656d76] dark:text-[#8b949e] uppercase tracking-wider">文章属性</h3>

            <n-form-item label="Slug">
              <n-input
                v-model:value="form.slug"
                placeholder="url-friendly-name"
                :disabled="isEditing"
              />
            </n-form-item>

            <n-form-item label="发布日期">
              <n-date-picker
                v-model:value="form.dateTimestamp"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
              />
            </n-form-item>

            <n-form-item label="分类">
              <n-select
                v-model:value="form.category"
                :options="categoryOptions"
                placeholder="选择分类"
              />
            </n-form-item>

            <n-form-item label="标签">
              <n-dynamic-tags
                v-model:value="form.tags"
                placeholder="添加标签"
              />
            </n-form-item>

            <n-form-item label="封面图 URL">
              <n-input
                v-model:value="form.cover"
                placeholder="https://..."
              />
            </n-form-item>

            <n-form-item label="摘要">
              <n-input
                v-model:value="form.excerpt"
                type="textarea"
                :rows="3"
                placeholder="文章摘要..."
              />
            </n-form-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import { GitHubService } from '@/services/github'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const adminStore = useAdminStore()

const isEditing = computed(() => route.params.slug !== 'new' && !!route.params.slug)
const isSaving = ref(false)
const activeEditorTab = ref<string>('write')

const editorTabs = [
  { key: 'write', label: '编辑' },
  { key: 'preview', label: '预览' },
]

const categoryOptions = [
  { label: '技术', value: '技术' },
  { label: '思考', value: '思考' },
  { label: '生活', value: '生活' },
  { label: '前端', value: '前端' },
  { label: '后端', value: '后端' },
]

const form = ref({
  title: '',
  slug: '',
  dateTimestamp: Date.now(),
  category: '技术',
  tags: [] as string[],
  cover: '',
  excerpt: '',
  content: '',
})

const isFormValid = computed(() => {
  return form.value.title.trim() && form.value.slug.trim() && form.value.content.trim()
})

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
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
      } catch {}
    }
    return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`
  },
})

const renderedPreview = computed(() => {
  return md.render(form.value.content)
})

function formatDate(timestamp: number): string {
  const d = new Date(timestamp)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function loadExistingPost() {
  if (!isEditing.value) return

  const slug = route.params.slug as string
  if (!slug) return

  try {
    // Try to load from remote
    const resp = await fetch(`/content/posts/${slug}.md`)
    if (resp.ok) {
      const mdText = await resp.text()
      const match = mdText.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (match) {
        const fm: any = {}
        for (const line of match[1].split('\n')) {
          const kv = line.match(/^(\w+):\s*(.*)$/)
          if (kv) {
            let value: any = kv[2].trim()
            if (value.startsWith('[')) {
              try {
                value = JSON.parse(value.replace(/'/g, '"'))
              } catch {
                value = value.slice(1, -1).split(',').map((s: string) => s.trim().replace(/"/g, ''))
              }
            } else if (/^\d+$/.test(value)) {
              value = parseInt(value, 10)
            } else if (value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            fm[kv[1]] = value
          }
        }
        form.value.title = fm.title || ''
        form.value.dateTimestamp = new Date(fm.date || '').getTime() || Date.now()
        form.value.category = fm.category || '技术'
        form.value.tags = fm.tags || []
        form.value.cover = fm.cover || ''
        form.value.excerpt = fm.excerpt || ''
        form.value.slug = slug
        form.value.content = match[2].trim()
        return
      }
    }

    message.error('文章不存在或无法加载')
    router.push('/admin')
  } catch (err) {
    console.error('Failed to load post:', err)
    message.error('加载文章失败')
    router.push('/admin')
  }
}

async function handleSave() {
  if (!isFormValid.value) {
    message.warning('请填写标题、Slug 和内容')
    return
  }

  if (!adminStore.token) {
    message.error('请先登录管理员账号')
    router.push('/')
    return
  }

  isSaving.value = true

  const slug = form.value.slug.toLowerCase().replace(/[^\w\u4e00-\u9fff-]+/g, '-').replace(/^-|-$/g, '')
  const dateStr = formatDate(form.value.dateTimestamp)

  const mdContent = `---
title: "${form.value.title}"
date: "${dateStr}"
tags: [${form.value.tags.map(t => `"${t}"`).join(', ')}]
category: "${form.value.category}"
cover: "${form.value.cover}"
excerpt: "${form.value.excerpt}"
readTime: ${Math.max(1, Math.ceil(form.value.content.length / 800))}
---

${form.value.content}
`

  const github = new GitHubService(adminStore.token)

  try {
    await github.savePost(slug, form.value.title, mdContent)
    message.success(isEditing.value ? '文章已更新' : '文章已发布')
    router.push('/admin')
  } catch (err: any) {
    message.error(err.message || '保存失败')
  } finally {
    isSaving.value = false
  }
}

function handlePreview() {
  activeEditorTab.value = activeEditorTab.value === 'write' ? 'preview' : 'write'
}

function goBack() {
  router.push('/admin')
}

onMounted(() => {
  if (!adminStore.isAdmin) {
    message.warning('请先登录管理员账号')
    router.push('/')
    return
  }

  if (isEditing.value) {
    loadExistingPost()
  }
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

.markdown-editor {
  width: 100%;
  min-height: 400px;
  padding: 1.5rem;
  border: none;
  outline: none;
  resize: vertical;
  font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.7;
  background: transparent;
  color: var(--n-text-color, #1f2328);
}

.dark .markdown-editor {
  color: var(--n-text-color, #e6edf3);
}

.markdown-editor::placeholder {
  color: #8b949e;
}

:deep(.blog-content) {
  color: var(--n-text-color, #1f2328);
  font-size: 1rem;
  line-height: 1.8;
}

:deep(.blog-content h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #d0d7de;
}

:deep(.blog-content h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

:deep(.blog-content p) {
  margin-bottom: 1rem;
}

:deep(.blog-content code:not(pre code)) {
  padding: 0.2em 0.4em;
  border-radius: 4px;
  background: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
  font-size: 0.875em;
  background: rgba(88, 166, 255, 0.15) !important;
}

:deep(.blog-content a) {
  color: var(--n-primary-color, #0969da);
}

:deep(.blog-content pre) {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.blog-content pre code) {
  display: block;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
