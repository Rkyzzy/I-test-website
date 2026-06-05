<template>
  <n-config-provider :theme="themeStore.isDark ? darkTheme : undefined" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="min-h-screen" :class="{ dark: themeStore.isDark }">
        <!-- 顶部导航 -->
        <header
          :class="[
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            isScrolled ? 'glass border-b border-[#d0d7de] dark:border-[#30363d]' : ''
          ]"
        >
          <nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <!-- Logo -->
            <router-link to="/" class="text-xl font-bold hover:text-[#58a6ff] transition-colors">
              {{ profile.name }}
            </router-link>

            <!-- 导航链接 -->
            <div class="hidden md:flex items-center gap-8">
              <router-link
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                class="text-sm font-medium text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                active-class="text-[#58a6ff]"
              >
                {{ link.name }}
              </router-link>
            </div>

            <!-- 右侧操作 -->
            <div class="flex items-center gap-4">
              <!-- 主题切换 -->
              <button
                @click="themeStore.toggleTheme"
                class="w-10 h-10 rounded-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] flex items-center justify-center hover:border-[#58a6ff] transition-colors"
                :title="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'"
              >
                <svg v-if="themeStore.isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </button>

              <!-- 移动端菜单按钮 -->
              <button
                @click="isMobileMenuOpen = !isMobileMenuOpen"
                class="md:hidden w-10 h-10 rounded-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] flex items-center justify-center"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </nav>

          <!-- 移动端菜单 -->
          <div
            v-show="isMobileMenuOpen"
            class="md:hidden glass border-b border-[#d0d7de] dark:border-[#30363d]"
          >
            <div class="px-6 py-4 space-y-4">
              <router-link
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                @click="isMobileMenuOpen = false"
                class="block text-sm font-medium text-[#656d76] dark:text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                active-class="text-[#58a6ff]"
              >
                {{ link.name }}
              </router-link>
            </div>
          </div>
        </header>

        <!-- 主内容 -->
        <main class="pt-16">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

        <!-- 页脚 -->
        <footer class="py-8 px-6 border-t border-[#d0d7de] dark:border-[#30363d]">
          <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#656d76] dark:text-[#8b949e]">
            <p>© 2024 {{ profile.name }}. All rights reserved.</p>
            <div class="flex gap-6">
              <a
                v-for="link in profile.socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-[#58a6ff] transition-colors"
              >
                {{ link.name }}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { darkTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { useProfileStore } from '@/stores/profile'

const themeStore = useThemeStore()
const profile = useProfileStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '教育', path: '/education' },
  { name: '工作', path: '/work' },
  { name: 'AI 对话', path: '/ai' },
]

const themeOverrides = {
  common: {
    primaryColor: '#58a6ff',
    primaryColorHover: '#79b8ff',
    primaryColorPressed: '#388bfd',
  },
  Button: {
    borderRadiusMedium: '8px',
  },
  Card: {
    borderRadius: '12px',
  },
  Input: {
    borderRadius: '8px',
  },
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
