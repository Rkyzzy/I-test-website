<template>
  <n-config-provider :theme="themeStore.isDark ? darkTheme : lightTheme" :theme-overrides="themeOverrides">
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
            <div class="flex items-center gap-3">
              <!-- 管理员按钮 -->
              <button
                v-if="adminStore.isAdmin"
                @click="showAdminPanel = !showAdminPanel"
                class="px-3 py-1.5 rounded-full bg-[#58a6ff] text-white text-sm font-medium hover:bg-[#0969da] transition-colors flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                编辑模式
              </button>
              
              <button
                v-else
                @click="showLoginModal = true"
                class="w-10 h-10 rounded-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] flex items-center justify-center hover:border-[#58a6ff] transition-colors"
                title="管理员登录"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-6 6H7a6 6 0 00-6 6M3 19a18 18 0 0012 0m-6 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              
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
              <component :is="Component" :is-admin-panel="showAdminPanel" />
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

        <!-- 登录弹窗 -->
        <AdminLoginModal v-model:show="showLoginModal" />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, provide } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { useProfileStore } from '@/stores/profile'
import { useAdminStore } from '@/stores/admin'
import AdminLoginModal from '@/components/AdminLoginModal.vue'

const themeStore = useThemeStore()
const profile = useProfileStore()
const adminStore = useAdminStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const showLoginModal = ref(false)
const showAdminPanel = ref(false)

const navLinks = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '教育', path: '/education' },
  { name: '工作', path: '/work' },
  { name: 'AI 对话', path: '/ai' },
]

provide('isAdminPanel', showAdminPanel)

const themeOverrides = computed(() => {
  const isDark = themeStore.isDark
  
  return {
    common: {
      primaryColor: '#58a6ff',
      primaryColorHover: '#79b8ff',
      primaryColorPressed: '#388bfd',
      borderRadius: '8px',
      // 基础颜色
      textColorBase: isDark ? '#e6edf3' : '#1f2328',
      textColor1: isDark ? '#e6edf3' : '#1f2328',
      textColor2: isDark ? '#8b949e' : '#656d76',
      textColor3: isDark ? '#6e7781' : '#8b949e',
      textColorDisabled: isDark ? '#484f58' : '#d0d7de',
      placeholderColor: isDark ? '#6e7781' : '#8b949e',
      // 背景颜色
      bodyColor: isDark ? '#0d1117' : '#ffffff',
      cardColor: isDark ? '#161b22' : '#ffffff',
      modalColor: isDark ? '#161b22' : '#ffffff',
      popoverColor: isDark ? '#161b22' : '#ffffff',
      tableColor: isDark ? '#0d1117' : '#ffffff',
      inputColor: isDark ? '#0d1117' : '#ffffff',
      inputColorDisabled: isDark ? '#21262d' : '#f6f8fa',
      // 边框颜色
      borderColor: isDark ? '#30363d' : '#d0d7de',
      dividerColor: isDark ? '#30363d' : '#d0d7de',
      // 高亮颜色
      successColor: '#3fb950',
      warningColor: '#d29922',
      errorColor: '#f85149',
      infoColor: '#58a6ff',
    },
    Button: {
      borderRadiusMedium: '8px',
      colorPrimary: '#58a6ff',
      colorHoverPrimary: '#79b8ff',
      colorPressedPrimary: '#388bfd',
      textColorPrimary: '#ffffff',
      textColorHoverPrimary: '#ffffff',
      textColorPressedPrimary: '#ffffff',
      // 浅色按钮
      color: isDark ? '#21262d' : '#f6f8fa',
      colorHover: isDark ? '#30363d' : '#eaeef2',
      colorPressed: isDark ? '#484f58' : '#d0d7de',
      textColor: isDark ? '#e6edf3' : '#1f2328',
      textColorHover: isDark ? '#e6edf3' : '#1f2328',
      textColorPressed: isDark ? '#e6edf3' : '#1f2328',
      borderColor: isDark ? '#30363d' : '#d0d7de',
      borderHover: isDark ? '#58a6ff' : '#58a6ff',
      borderPressed: isDark ? '#388bfd' : '#388bfd',
    },
    Card: {
      borderRadius: '12px',
      color: isDark ? '#161b22' : '#ffffff',
      colorEmbedded: isDark ? '#0d1117' : '#f6f8fa',
      borderColor: isDark ? '#30363d' : '#d0d7de',
      textColor: isDark ? '#e6edf3' : '#1f2328',
      titleTextColor: isDark ? '#e6edf3' : '#1f2328',
      subtitleTextColor: isDark ? '#8b949e' : '#656d76',
      actionColor: isDark ? '#21262d' : '#f6f8fa',
    },
    Input: {
      borderRadius: '8px',
      color: isDark ? '#0d1117' : '#ffffff',
      colorFocus: isDark ? '#0d1117' : '#ffffff',
      borderColor: isDark ? '#30363d' : '#d0d7de',
      borderHover: isDark ? '#58a6ff' : '#58a6ff',
      borderFocus: isDark ? '#58a6ff' : '#58a6ff',
      textColor: isDark ? '#e6edf3' : '#1f2328',
      placeholderColor: isDark ? '#6e7781' : '#8b949e',
    },
  }
})

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  adminStore.init()
  profile.loadConfig()
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
