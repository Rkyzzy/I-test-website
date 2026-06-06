<template>
  <n-modal v-model:show="showModal" preset="card" title="管理员登录" style="width: 500px">
    <div class="login-modal">
      <div v-if="!isAuthenticated">
        <p class="description">请输入您的 GitHub Personal Access Token (PAT) 来验证身份。</p>
        <p class="hint">Token 需要拥有 repo 权限。</p>
        
        <n-form-item label="GitHub Token">
          <n-input
            v-model:value="tokenInput"
            type="password"
            show-password-on="click"
            placeholder="ghp_xxxxxxxxxxxxxx"
            @keypress.enter="handleLogin"
          />
        </n-form-item>
        
        <div class="token-help">
          <n-button text type="primary" @click="showTokenGuide = !showTokenGuide">
            如何获取 Token?
          </n-button>
          <div v-if="showTokenGuide" class="guide-content">
            <ol>
              <li>访问 <a href="https://github.com/settings/tokens/new" target="_blank">GitHub Settings → Tokens</a></li>
              <li>选择 "Personal access tokens" → "Tokens (classic)"</li>
              <li>点击 "Generate new token" → "Generate new token (classic)"</li>
              <li>勾选 repo 权限</li>
              <li>点击 "Generate token" 并复制</li>
            </ol>
          </div>
        </div>
        
        <n-space justify="end" style="margin-top: 20px">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" :loading="isLoading" @click="handleLogin">
            登录
          </n-button>
        </n-space>
      </div>
      
      <div v-else class="authenticated">
        <div class="user-info">
          <n-avatar :src="user?.avatar_url" size="large" />
          <div class="user-details">
            <div class="user-name">{{ user?.name || user?.login }}</div>
            <div class="user-username">@{{ user?.login }}</div>
          </div>
        </div>
        
        <n-alert v-if="error" type="error" style="margin-top: 20px">
          {{ error }}
        </n-alert>
        
        <n-alert v-else-if="isAdmin" type="success" style="margin-top: 20px">
          ✓ 已验证为管理员身份
        </n-alert>
        
        <n-alert v-else type="warning" style="margin-top: 20px">
          ⚠️ 您不是管理员，仅 {{ ADMIN_USERNAME }} 可以进行编辑
        </n-alert>
        
        <n-space justify="end" style="margin-top: 20px">
          <n-button @click="handleLogout" type="error" quaternary>退出登录</n-button>
          <n-button type="primary" @click="showModal = false">关闭</n-button>
        </n-space>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useMessage } from 'naive-ui'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const adminStore = useAdminStore()
const message = useMessage()

const showModal = computed({
  get: () => props.show,
  set: (v) => emit('update:show', v)
})

const tokenInput = ref('')
const showTokenGuide = ref(false)
const isLoading = computed(() => adminStore.isLoading)
const isAuthenticated = computed(() => adminStore.isAuthenticated)
const isAdmin = computed(() => adminStore.isAdmin)
const user = computed(() => adminStore.user)
const error = computed(() => adminStore.error)
const ADMIN_USERNAME = adminStore.ADMIN_USERNAME

watch(showModal, (val) => {
  if (val) {
    tokenInput.value = adminStore.token || ''
  }
})

async function handleLogin() {
  if (!tokenInput.value.trim()) {
    message.warning('请输入 Token')
    return
  }
  
  adminStore.setToken(tokenInput.value.trim())
  const success = await adminStore.verifyToken()
  
  if (success) {
    message.success('登录成功！')
    showModal.value = false
  } else {
    message.error(adminStore.error || '登录失败')
  }
}

function handleLogout() {
  adminStore.logout()
  message.info('已退出登录')
}
</script>

<style scoped>
.login-modal {
  padding: 10px 0;
}

.description {
  color: var(--n-text-color-2);
  margin-bottom: 20px;
  line-height: 1.6;
}

.hint {
  color: var(--n-text-color-3);
  font-size: 13px;
  margin-bottom: 20px;
}

.token-help {
  margin-top: 10px;
}

.guide-content {
  margin-top: 10px;
  padding: 15px;
  background: var(--n-color-info-soft);
  border-radius: 8px;
  font-size: 13px;
  color: var(--n-text-color-2);
}

.guide-content ol {
  margin: 0;
  padding-left: 20px;
}

.guide-content li {
  margin-bottom: 8px;
}

.guide-content a {
  color: var(--n-primary-color);
  text-decoration: underline;
}

.authenticated {
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.user-details {
  text-align: left;
}

.user-name {
  font-weight: 600;
  font-size: 16px;
}

.user-username {
  color: var(--n-text-color-2);
  font-size: 14px;
}
</style>
