import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  // 从 localStorage 读取主题设置
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    isDark.value = storedTheme === 'dark'
  } else {
    // 检测系统偏好
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // 监听变化并应用到 HTML
  watch(
    isDark,
    (dark) => {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    },
    { immediate: true }
  )

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme,
  }
})
