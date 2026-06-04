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
        <div class="mb-8 animate-fade-in">
          <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#30363d]">
            <img :src="profile.avatar" :alt="profile.name" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- 姓名和头衔 -->
        <h1 class="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
          {{ profile.name }}
        </h1>
        <p class="text-2xl md:text-3xl text-[#656d76] dark:text-[#8b949e] mb-6 animate-slide-up delay-100">
          {{ profile.title }}
        </p>

        <!-- 简介 -->
        <p class="text-lg text-[rgba(31,35,40,0.8)] dark:text-[rgba(230,237,243,0.8)] max-w-2xl mx-auto mb-8 animate-slide-up delay-200">
          {{ profile.bio }}
        </p>

        <!-- 社交链接 -->
        <div class="flex justify-center gap-4 mb-12 animate-slide-up delay-300">
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
        </div>

        <!-- CTA 按钮 -->
        <div class="flex justify-center gap-4 animate-slide-up delay-400">
          <button class="btn btn-primary">
            查看简历
          </button>
          <button class="btn btn-ghost">
            联系我
          </button>
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
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="skill in profile.skills.slice(0, 8)"
            :key="skill.name"
            class="card text-center group cursor-pointer"
          >
            <span class="text-lg font-medium group-hover:text-[#58a6ff] transition-colors">
              {{ skill.name }}
            </span>
            <div class="mt-3 flex justify-center gap-1">
              <span
                v-for="i in 5"
                :key="i"
                class="w-2 h-2 rounded-full transition-colors"
                :style="{ backgroundColor: i <= skill.level ? '#58a6ff' : (isDark ? '#30363d' : '#d0d7de') }"
              ></span>
            </div>
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
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">探索更多</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <router-link to="/blog" class="card group">
            <div class="text-4xl mb-4">📝</div>
            <h3 class="text-xl font-semibold mb-2 group-hover:text-[#58a6ff] transition-colors">博客</h3>
            <p class="text-[#656d76] dark:text-[#8b949e]">分享我的想法与技术文章</p>
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
import { h } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useThemeStore } from '@/stores/theme'

const profile = useProfileStore()
const themeStore = useThemeStore()
const isDark = themeStore.isDark

// 社交图标组件
const icons: Record<string, any> = {
  github: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
  ]),
  linkedin: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
  ]),
  mail: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
  ]),
  twitter: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' })
  ]),
}

function getSocialIcon(name: string) {
  return icons[name] || icons.github
}
</script>

<style scoped>
.particles {
  background-image: radial-gradient(circle at 1px 1px, rgba(88, 166, 255, 0.15) 1px, transparent 0);
  background-size: 40px 40px;
}
</style>
