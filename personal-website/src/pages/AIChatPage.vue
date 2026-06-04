<template>
  <div class="min-h-screen flex flex-col">
    <!-- 页面标题 -->
    <div class="py-8 px-6 border-b border-light-border dark:border-dark-border">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">AI 对话</h1>
        <p class="text-light-muted dark:text-dark-muted">
          与基于我的知识训练的 AI 对话助手交流
        </p>
      </div>
    </div>

    <!-- 聊天区域 -->
    <div class="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      <!-- 消息列表 -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- 欢迎消息 -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <div class="w-20 h-20 rounded-full bg-accent-blue/10 flex items-center justify-center mb-6">
            <span class="text-4xl">🤖</span>
          </div>
          <h2 class="text-2xl font-semibold mb-2">你好！我是 AI 助手</h2>
          <p class="text-light-muted dark:text-dark-muted max-w-md mb-8">
            我是基于主人的知识库训练的 AI。你可以问我关于他的技能、经历、项目等问题。
          </p>

          <!-- 快捷问题 -->
          <div class="flex flex-wrap justify-center gap-3">
            <button
              v-for="q in quickQuestions"
              :key="q"
              @click="sendMessage(q)"
              class="tag cursor-pointer hover:border-accent-blue hover:text-accent-blue"
            >
              {{ q }}
            </button>
          </div>
        </div>

        <!-- 消息 -->
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            'flex gap-4 animate-fade-in',
            msg.role === 'user' ? 'flex-row-reverse' : ''
          ]"
        >
          <!-- 头像 -->
          <div
            :class="[
              'w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center',
              msg.role === 'user' ? 'bg-accent-blue' : 'bg-accent-green'
            ]"
          >
            <span v-if="msg.role === 'user'">👤</span>
            <span v-else>🤖</span>
          </div>

          <!-- 消息内容 -->
          <div
            :class="[
              'max-w-[70%] rounded-2xl px-4 py-3',
              msg.role === 'user'
                ? 'bg-accent-blue text-white'
                : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border'
            ]"
          >
            <p class="whitespace-pre-wrap">{{ msg.content }}</p>
          </div>
        </div>

        <!-- 加载动画 -->
        <div v-if="isLoading" class="flex gap-4 animate-fade-in">
          <div class="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center">
            <span>🤖</span>
          </div>
          <div class="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl px-4 py-3">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-accent-green rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-accent-green rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-accent-green rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="p-6 border-t border-light-border dark:border-dark-border">
        <div class="flex gap-4">
          <n-input
            v-model:value="inputMessage"
            type="textarea"
            :rows="1"
            :autosize="{ minRows: 1, maxRows: 4 }"
            placeholder="输入你的问题..."
            class="flex-1"
            @keydown.enter.exact.prevent="handleSend"
          />
          <button
            @click="handleSend"
            :disabled="!inputMessage.trim() || isLoading"
            class="btn btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
          <button
            v-if="messages.length > 0"
            @click="clearChat"
            class="btn btn-ghost self-end"
            title="清空对话"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const profile = useProfileStore()

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const quickQuestions = [
  '你能介绍一下自己吗？',
  '你擅长哪些技术？',
  '你参与过什么项目？',
  '你的研究方向是什么？',
]

// 模拟 AI 回复
const aiResponses = {
  intro: `你好！我是基于 ${profile.name} 的知识和经历训练的 AI 助手。

${profile.name} 是一位 ${profile.title}，${profile.bio}

如果你想了解更多关于我的训练者，可以问我关于他的技能、工作经历、项目经验等任何问题！`,

  skills: `我的训练者 ${profile.name} 掌握以下技能：

**编程语言：** JavaScript, TypeScript, Python

**前端框架：** Vue.js, React, Node.js

**工具：** Git, Docker, Linux

**其他：** 系统设计、团队协作、项目管理

如果你想了解某个具体领域，可以问我更多细节！`,

  projects: `让我介绍一下 ${profile.name} 参与过的一些项目：

**AI Personal Assistant** - 基于个人知识库构建的 AI 助手

**Real-time Collaboration Platform** - 支持多人实时协作的在线工具

**ML Model Compression Toolkit** - 模型压缩工具

想了解某个项目的详细信息吗？`,

  research: `${profile.name} 的研究方向主要包括：

**人工智能与机器学习**
- 深度学习模型优化与压缩
- 知识蒸馏技术
- 边缘设备部署优化

如果你对这个方向感兴趣，可以问我更多相关问题！`,
}

function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('介绍') || msg.includes('自己') || msg.includes('关于')) {
    return aiResponses.intro
  }
  if (msg.includes('技能') || msg.includes('擅长') || msg.includes('技术')) {
    return aiResponses.skills
  }
  if (msg.includes('项目')) {
    return aiResponses.projects
  }
  if (msg.includes('研究') || msg.includes('方向')) {
    return aiResponses.research
  }

  return `感谢你的问题！关于"${userMessage}"

作为 ${profile.name} 的 AI 助手，我可以帮助你了解他/她的背景和经历。

你可以问我：
- 关于他/她的技能和经验
- 他/她参与过的项目
- 研究方向
- 工作经历

或者你也可以用中文问我任何关于他/她的问题！`
}

async function handleSend() {
  const message = inputMessage.value.trim()
  if (!message || isLoading.value) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: message,
  })

  inputMessage.value = ''
  isLoading.value = true
  await scrollToBottom()

  // 模拟 AI 响应延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

  // 添加 AI 回复
  const response = getAIResponse(message)
  messages.value.push({
    role: 'assistant',
    content: response,
  })

  isLoading.value = false
  await scrollToBottom()
}

async function sendMessage(message: string) {
  inputMessage.value = message
  await handleSend()
}

function clearChat() {
  messages.value = []
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 加载历史记录
onMounted(() => {
  const saved = localStorage.getItem('ai-chat-history')
  if (saved) {
    try {
      messages.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load chat history')
    }
  }
})

// 保存历史记录
import { watch } from 'vue'
watch(
  messages,
  (newMessages) => {
    localStorage.setItem('ai-chat-history', JSON.stringify(newMessages))
  },
  { deep: true }
)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
