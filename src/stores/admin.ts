import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const ADMIN_USERNAME = 'Rkyzzy'
const GITHUB_TOKEN_KEY = 'github_admin_token'
const GITHUB_USER_KEY = 'github_admin_user'

export const useAdminStore = defineStore('admin', () => {
  const token = ref<string | null>(localStorage.getItem(GITHUB_TOKEN_KEY))
  const user = ref<any | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAdmin = computed(() => {
    return !!token.value && !!user.value && user.value.login === ADMIN_USERNAME
  })

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // 设置token
  function setToken(newToken: string) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem(GITHUB_TOKEN_KEY, newToken)
    } else {
      localStorage.removeItem(GITHUB_TOKEN_KEY)
    }
  }

  // 验证token并获取用户信息
  async function verifyToken() {
    if (!token.value) return false
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token.value}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Token 无效或已过期')
      }
      
      const userData = await response.json()
      user.value = userData
      localStorage.setItem(GITHUB_USER_KEY, JSON.stringify(userData))
      
      if (userData.login !== ADMIN_USERNAME) {
        throw new Error(`您不是管理员，仅 ${ADMIN_USERNAME} 可以登录`)
      }
      
      return true
    } catch (err: any) {
      error.value = err.message
      logout()
      return false
    } finally {
      isLoading.value = false
    }
  }

  // 从localStorage恢复用户信息
  function restoreUser() {
    const savedUser = localStorage.getItem(GITHUB_USER_KEY)
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        user.value = null
      }
    }
  }

  // 登出
  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(GITHUB_TOKEN_KEY)
    localStorage.removeItem(GITHUB_USER_KEY)
    error.value = null
  }

  // 初始化
  function init() {
    if (token.value) {
      restoreUser()
      verifyToken()
    }
  }

  return {
    token,
    user,
    isLoading,
    error,
    isAdmin,
    isAuthenticated,
    setToken,
    verifyToken,
    logout,
    init,
    ADMIN_USERNAME
  }
})
