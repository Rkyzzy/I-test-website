<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- 动态背景 -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-[rgba(88,166,255,0.1)] via-transparent to-[rgba(63,185,80,0.1)]"></div>
        <div class="particles absolute inset-0"></div>
      </div>

      <!-- 内容 -->
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <!-- 头像 -->
        <div class="mb-8 animate-fade-in relative inline-block">
          <div 
            class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#30363d] relative group"
            :class="{ 'cursor-pointer': isAdminPanel }"
            @click="isAdminPanel && triggerAvatarUpload"
          >
            <img :src="profile.avatar" :alt="profile.name" class="w-full h-full object-cover" />
            <div v-if="isAdminPanel" class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
          </div>
          <input 
            type="file" 
            ref="avatarInput" 
            accept="image/*" 
            class="hidden" 
            @change="handleAvatarUpload" 
          />
        </div>

        <!-- 姓名和头衔 -->
        <div class="animate-slide-up">
          <div v-if="isAdminPanel" class="mb-2">
            <n-input
              v-model:value="editingProfile.name"
              size="large"
              text
              class="text-5xl md:text-7xl font-bold"
            />
          </div>
          <h1 v-else class="text-5xl md:text-7xl font-bold mb-2">
            {{ profile.name }}
          </h1>
        </div>
        <h2 class="text-2xl md:text-3xl text-[#656d76] dark:text-[#8b949e] mb-4 animate-slide-up delay-50">
          {{ profile.config.nameEn }}
        </h2>
        <div class="animate-slide-up delay-100 mb-6">
          <div v-if="isAdminPanel" class="mb-2">
            <n-input
              v-model:value="editingProfile.title"
              size="large"
              text
              class="text-2xl md:text-3xl"
            />
            <n-input
              v-model:value="editingProfile.titleEn"
              size="large"
              text
              class="text-2xl md:text-3xl mt-2"
              placeholder="英文标题"
            />
          </div>
          <p v-else class="text-2xl md:text-3xl text-[#656d76] dark:text-[#8b949e]">
            {{ profile.title }}
          </p>
        </div>

        <!-- 简介 -->
        <div class="mb-8 animate-slide-up delay-200">
          <div v-if="isAdminPanel">
            <n-input
              v-model:value="editingProfile.bio"
              type="textarea"
              placeholder="个人简介"
              :autosize="{ minRows: 2, maxRows: 4 }"
            />
            <n-input
              v-model:value="editingProfile.bioEn"
              type="textarea"
              placeholder="个人简介 (英文)"
              :autosize="{ minRows: 2, maxRows: 4 }"
              class="mt-2"
            />
          </div>
          <p v-else class="text-lg text-[rgba(31,35,40,0.8)] dark:text-[rgba(230,237,243,0.8)] max-w-2xl mx-auto">
            {{ profile.bio }}
          </p>
        </div>

        <!-- 社交链接 -->
        <div class="flex justify-center gap-4 mb-12 animate-slide-up delay-300">
          <div v-if="isAdminPanel" class="w-full max-w-md">
            <n-dynamic-input
              v-model:value="editingProfile.socialLinks"
              :on-create="() => ({ name: '', url: '', icon: 'github' })"
            >
              <template #="{ value, index, remove }">
                <n-space>
                  <n-input v-model:value="value.name" placeholder="名称" style="width: 100px" />
                  <n-select
                    v-model:value="value.icon"
                    :options="iconOptions"
                    placeholder="图标"
                    style="width: 120px"
                  />
                  <n-input v-model:value="value.url" placeholder="链接" style="flex: 1" />
                  <n-button type="error" @click="remove()" quaternary>
                    <template #icon>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </template>
                  </n-button>
                </n-space>
              </template>
            </n-dynamic-input>
          </div>
          <template v-else>
            <a
              v-for="link in profile.socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 rounded-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] flex items-center justify-center hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all duration-200 hover:-translate-y-1"
            >
              <component :is="getSocialIcon(link.icon)" class="w-5 h-5" />
            </a>
          </template>
        </div>

        <!-- 保存按钮 -->
        <div v-if="isAdminPanel" class="flex justify-center gap-4 mb-12 animate-slide-up delay-400">
          <n-button type="primary" :loading="saving" @click="saveProfile">
            保存更改
          </n-button>
          <n-button @click="resetProfile">
            重置
          </n-button>
        </div>

        <!-- 向下滚动提示 -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-[#656d76] dark:text-[#8b949e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- 技能概览 Section -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">技术栈</h2>
        
        <div v-if="isAdminPanel" class="mb-8">
          <n-dynamic-tags v-model:value="editingTechStack" :on-create="() => ({ name: '新技能', category: '' })">
            <template #="{ index, closable, tag, disabled }">
              <div class="flex items-center gap-2">
                <n-input v-model:value="tag.name" size="small" style="width: 120px" />
                <n-input v-model:value="tag.category" size="small" placeholder="分类" style="width: 100px" />
                <n-button v-if="closable" type="error" @click="removeTechStack(index)" quaternary circle>
                  <template #icon>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </template>
                </n-button>
              </div>
            </template>
          </n-dynamic-tags>
          <n-space class="mt-4">
            <n-button type="primary" :loading="saving" @click="saveProfile">
              保存技术栈
            </n-button>
            <n-button @click="resetTechStack">
              重置
            </n-button>
          </n-space>
        </div>
        
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="skill in profile.skills.slice(0, 8)"
            :key="skill.name"
            class="card text-center group cursor-pointer"
          >
            <span class="text-lg font-medium group-hover:text-[#58a6ff] transition-colors">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据 Section -->
    <section class="py-20 px-6 bg-[#f6f8fa] dark:bg-[#161b22]/50">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-4xl md:text-5xl font-bold text-[#58a6ff] mb-2">
              {{ profile.stats.yearsOfExperience }}+
            </div>
            <div class="text-[#656d76] dark:text-[#8b949e]">年经验</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold text-[#3fb950] mb-2">
              {{ profile.stats.projectsCompleted }}+
            </div>
            <div class="text-[#656d76] dark:text-[#8b949e]">完成项目</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold text-[#d29922] mb-2">
              {{ profile.stats.technologies }}+
            </div>
            <div class="text-[#656d76] dark:text-[#8b949e]">技术栈</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速导航 Section -->
    <section class="py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">探索更多</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <router-link to="/blog" class="card group">
            <div class="text-4xl mb-4">📝</div>
            <h3 class="text-xl font-semibold mb-2 group-hover:text-[#58a6ff] transition-colors">博客</h3>
            <p class="text-[#656d76] dark:text-[#8b949e]">分享我的想法与技术文章</p>
          </router-link>
          <router-link to="/education" class="card group">
            <div class="text-4xl mb-4">🎓</div>
            <h3 class="text-xl font-semibold mb-2 group-hover:text-[#58a6ff] transition-colors">教育</h3>
            <p class="text-[#656d76] dark:text-[#8b949e]">本科、交换与研究生求学经历</p>
          </router-link>
          <router-link to="/work" class="card group">
            <div class="text-4xl mb-4">💼</div>
            <h3 class="text-xl font-semibold mb-2 group-hover:text-[#58a6ff] transition-colors">工作</h3>
            <p class="text-[#656d76] dark:text-[#8b949e]">实习、工作与研究方向</p>
          </router-link>
          <router-link to="/ai" class="card group">
            <div class="text-4xl mb-4">🤖</div>
            <h3 class="text-xl font-semibold mb-2 group-hover:text-[#58a6ff] transition-colors">AI 对话</h3>
            <p class="text-[#656d76] dark:text-[#8b949e]">与我训练的 AI 对话</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h, ref, inject, watch, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useThemeStore } from '@/stores/theme'
import { useAdminStore } from '@/stores/admin'
import { GitHubService } from '@/services/github'
import { useMessage } from 'naive-ui'
import type { SiteConfig } from '@/services/github'

const profile = useProfileStore()
const themeStore = useThemeStore()
const adminStore = useAdminStore()
const message = useMessage()
const isDark = themeStore.isDark

const isAdminPanel = inject('isAdminPanel', ref(false))
const avatarInput = ref<HTMLInputElement | null>(null)
const saving = ref(false)

const editingProfile = ref<SiteConfig['profile']>({ ...profile.config.profile })
const editingTechStack = ref([...profile.config.techStack])

const iconOptions = [
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Email', value: 'mail' },
  { label: 'Twitter', value: 'twitter' },
]

watch(() => profile.config, (newConfig) => {
  editingProfile.value = { ...newConfig.profile }
  editingTechStack.value = [...newConfig.techStack]
}, { deep: true })

// 社交图标组件
const icons: Record<string, any> = {
  github: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
  ]),
  linkedin: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
  ]),
  mail: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' })
  ]),
  twitter: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' })
  ]),
}

function getSocialIcon(name: string) {
  return icons[name] || icons.github
}

function triggerAvatarUpload() {
  avatarInput.value?.click()
}

async function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    const base64 = e.target?.result as string
    editingProfile.value.avatarUrl = base64
    await saveProfile()
  }
  reader.readAsDataURL(file)
}

async function saveProfile() {
  if (!adminStore.token) {
    message.error('请先登录')
    return
  }

  saving.value = true
  try {
    const githubService = new GitHubService(adminStore.token)
    
    const newConfig: SiteConfig = {
      ...profile.config,
      profile: editingProfile.value,
      techStack: editingTechStack.value,
    }
    
    await githubService.saveConfig(newConfig)
    profile.updateConfig(newConfig)
    message.success('保存成功！GitHub Actions 正在部署更新...')
  } catch (error) {
    console.error('保存失败:', error)
    message.error('保存失败，请检查权限配置')
  } finally {
    saving.value = false
  }
}

function resetProfile() {
  editingProfile.value = { ...profile.config.profile }
}

function resetTechStack() {
  editingTechStack.value = [...profile.config.techStack]
}

function removeTechStack(index: number) {
  editingTechStack.value.splice(index, 1)
}
</script>

<style scoped>
.particles {
  background-image: radial-gradient(circle at 1px 1px, rgba(88, 166, 255, 0.15) 1px, transparent 0);
  background-size: 40px 40px;
}
</style>
