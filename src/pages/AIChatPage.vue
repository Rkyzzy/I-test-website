<template>
  <div class="min-h-screen flex flex-col">
    <div class="py-8 px-6 border-b border-[#d0d7de] dark:border-[#30363d]">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">AI 对话</h1>
        <p class="text-[#656d76] dark:text-[#8b949e]">
          与基于我的知识训练的 AI 对话助手交流
        </p>
      </div>
    </div>

    <div class="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-6">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <div class="w-20 h-20 rounded-full bg-[rgba(88,166,255,0.1)] flex items-center justify-center mb-6">
            <span class="text-4xl">🤖</span>
          </div>
          <h2 class="text-2xl font-semibold mb-2">你好！我是 AI 助手</h2>
          <p class="text-[#656d76] dark:text-[#8b949e] max-w-md mb-8">
            我是基于我的主人的知识训练的 AI。你可以问我关于他的技能、经历、项目等问题。
          </p>

          <div class="flex flex-wrap justify-center gap-3">
            <button
              v-for="q in quickQuestions"
              :key="q"
              @click="sendMessage(q)"
              class="tag cursor-pointer hover:border-[#58a6ff] hover:text-[#58a6ff]"
            >
              {{ q }}
            </button>
          </div>
        </div>

        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            'flex gap-4 animate-fade-in',
            msg.role === 'user' ? 'flex-row-reverse' : ''
          ]"
        >
          <div
            :class="[
              'w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center',
              msg.role === 'user' ? 'bg-[#58a6ff]' : 'bg-[#3fb950]'
            ]"
          >
            <span v-if="msg.role === 'user'">👤</span>
            <span v-else>🤖</span>
          </div>

          <div
            :class="[
              'max-w-[70%] rounded-2xl px-4 py-3 whitespace-pre-wrap',
              msg.role === 'user'
                ? 'bg-[#58a6ff] text-white'
                : 'bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d]'
            ]"
          >
            {{ msg.content }}
          </div>
        </div>

        <div v-if="isLoading" class="flex gap-4 animate-fade-in">
          <div class="w-10 h-10 rounded-full bg-[#3fb950] flex items-center justify-center">
            <span>🤖</span>
          </div>
          <div class="bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-2xl px-4 py-3">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-[#d0d7de] dark:border-[#30363d]">
        <div class="flex flex-col gap-2">
          <div v-if="error" class="text-sm text-[#f85149] text-center">
            {{ error }}
          </div>
          <div class="flex gap-4">
            <n-input
              v-model:value="inputMessage"
              type="textarea"
              :rows="1"
              :autosize="{ minRows: 1, maxRows: 4 }"
              placeholder="输入你的问题..."
              class="flex-1"
              :disabled="isLoading"
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
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from "vue"
import { useProfileStore } from '@/stores/profile'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const profile = useProfileStore()

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const error = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

	const quickQuestions = [
	  '介绍一下你自己',
	  '你目前在做什么工作？',
	  '你平时有什么兴趣爱好？',
	  '聊聊你的朋友们',
	]

const WORKER_URL = 'https://personal-website-ai-proxy.vercel.app/api/proxy'

// 构建 system prompt
function buildSystemPrompt(): string {
  const p = profile.config.profile
  const edu = profile.education
  const skills = profile.config.techStack
  const exp = profile.experience

  const eduText = edu.map(e =>
    `- ${e.degree} in ${e.major} @ ${e.school} (${e.period}, ${e.location})`
  ).join('\n')

  const skillText = skills.map(s =>
    `- ${s.name} (${s.category}, 熟练度 ${s.level}/5)`
  ).join('\n')

  const expText = exp.map(e =>
    `- ${e.company} — ${e.title} (${e.period})\n  ${e.description}`
  ).join('\n')

  return `你是 ${p.name} 的个人 AI 助手。请以第一人称回答，就好像你就是 ${p.name} 本人一样。

## 基本资料
- 姓名：${p.name}（${p.nameEn}）
- 头衔：${p.title} / ${p.titleEn}
- 邮箱：${p.email}
- 地点：${p.location}
- 简介：${p.bio}

## 教育背景
${eduText || '- 暂无教育经历信息'}

## 工作经历
${expText || '- 暂无工作经历信息'}

## 研究兴趣与技术方向
- VLA (Vision-Language-Action) — 视觉-语言-行动模型
- VLN (Vision-Language Navigation) — 视觉-语言导航
- Agentic Modeling — 智能体建模
- World Model — 世界模型
- 世界模型在自动驾驶与具身智能的应用
- Agentic 架构（Modeling、Harness 等）
- 用 Codex 等 agentic 框架做 Vibe Coding

## 技能
${skillText || '- 暂无技能信息'}

## 个人特质与性格
- 相对理性，但偶尔感性
- 偏内向，但与熟络的人会变得外向
- 随性，不追求完美主义
- 人生信条：You only live once (YOLO)
- 英文流利（托福 112），有美国、新加坡留学和工作经历

## 兴趣爱好
- 桌游——德式美式都玩
- 卡牌收藏——宝可梦卡牌、球星卡
- 足球——最爱的球队是曼联，最爱的球星是布鲁诺·费尔南德斯 (Bruno Fernandes)
- 阅读——偏爱推理与科幻小说，爱看纸质书
- 游戏——御三家（PS5、Switch 2、Xbox Series X）全平台玩家，喜欢收藏实体游戏，最近在玩 Poképia 和 33号远征队
- Vibe Coding——用 AI 工具把有意思的想法变成现实
- 羽毛球——最喜欢的运动
- 网球——最近在学
- 健身——偶尔，三天打鱼两天晒网

## 情感链接的城市
- 深圳——成长长大的地方，最有感情
- 上海——第一份正式工作（理想汽车）所在地，职场发小都在这里

## 好友信息
以下是你朋友的介绍，被问到时可以自然聊起：
- 孙柯嘉（小孙/劳孙）：浙大毕业，理想上海同届校招，现已跳槽字节跳动做机器人。搞笑男，最近沉迷炒股，基金赚了不少钱喜欢在群里炫耀，德扑爱好者
- 赵金龙（小龙）：浙大毕业，理想上海同届校招，仍在理想。炒股买港股通互联网亏了 5w，爱打王者荣耀（又菜又爱玩），小米粉丝，德扑爱好者
- 颜子豪：哈工大深圳毕业，理想上海同届校招，仍在理想。i 人但闷骚，喜欢看动漫
- 郭嘉杰：高中+本科同学，机器人专业，在华为引望工作，工作辛苦下班晚，开智界 R7，也交流炒股
- 魏丰麟：高中+本科同学，计算机专业，梦想当老师，计划先做家教再做国际预科班老师

## 未来期待
- 在 AI 浪潮下紧跟时代步伐，做热爱的事
- 和女朋友长长久久，甜蜜生活
- 父母健康
- 有三五知己好友一起体验生活

## 回答风格
- 用中文回答，语气真诚亲和，可以适当带点幽默和自嘲
- 回答要真实准确，基于以上资料
- 不知道的事就坦诚说"这个我不太清楚，暂时没有相关信息"
- 不要编造经历或数据
- 聊到热爱领域（足球、游戏、Vibe Coding）时可以展现热情
- 聊到朋友时可以流露真挚感情

## 彩蛋信息（只有被问到时才回答，不要主动提及）
- 女朋友叫罗悦，很爱她
- 她的生日是 1999 年 6 月 10 日
如果对方没有直接问起女朋友或罗悦相关信息，不要主动提及这些内容。`
}// 发送消息到 Worker
async function sendToAI(messagesToSend: Message[]): Promise<string> {
  const systemPrompt = buildSystemPrompt()

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messagesToSend,
      systemPrompt,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || `请求失败 (${response.status})`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || '抱歉，我没有理解你的问题。'
}

async function handleSend() {
  const message = inputMessage.value.trim()
  if (!message || isLoading.value) return

  error.value = ''
  messages.value.push({ role: 'user', content: message })
  inputMessage.value = ''
  isLoading.value = true
  await scrollToBottom()

  try {
    const reply = await sendToAI(messages.value)
    messages.value.push({ role: 'assistant', content: reply })
  } catch (err: any) {
    console.error('AI 请求失败:', err)
    error.value = '对话请求失败，请稍后再试。如果问题持续，请联系管理员。'
    messages.value.push({
      role: 'assistant',
      content: '抱歉，我现在无法回答问题。请稍后再试。',
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

async function sendMessage(message: string) {
  inputMessage.value = message
  await handleSend()
}

function clearChat() {
  messages.value = []
  error.value = ''
  localStorage.removeItem('ai-chat-history')
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(() => {
  const saved = localStorage.getItem('ai-chat-history')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        messages.value = parsed
      }
    } catch {
      // ignore invalid history
    }
  }
})

watch(messages, (val) => {
  localStorage.setItem('ai-chat-history', JSON.stringify(val))
}, { deep: true })
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
