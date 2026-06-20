import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SiteConfig } from '@/services/github'

interface SocialLink {
  name: string
  icon: string
  url: string
}

interface Experience {
  title: string
  company: string
  period: string
  description: string
  highlights: string[]
}

interface Skill {
  name: string
  level: number // 1-5
  category: 'language' | 'framework' | 'tool' | 'other'
}

interface Education {
  school: string
  schoolEn: string
  degree: string
  major: string
  period: string
  honors?: string
  logo: string
  url: string
  location: string
  isExchange?: boolean
}

// 获取base路径
const BASE_PATH = '/I-test-website/'

const DEFAULT_CONFIG: SiteConfig = {
  profile: {
    name: '周子越',
    nameEn: 'Ziyue Zhou',
    title: '算法工程师',
    titleEn: 'Algorithm Engineer',
    bio: '专注于自动驾驶中的视觉-语言-行动模型、智能体建模与世界模型研究，致力于将前沿AI技术落地到百万辆级的量产产品中。',
    bioEn: 'Focused on VLA, VLN, agentic modeling, and world models for autonomous driving. Passionate about shipping cutting-edge AI to millions of production vehicles.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    email: '982993741@qq.com',
    location: 'Shenzhen, China',
    socialLinks: [
      { name: 'GitHub', icon: 'github', url: 'https://github.com/Rkyzzy' },
      { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourname' },
      { name: 'Email', icon: 'mail', url: 'mailto:contact@example.com' },
    ]
  },
  techStack: [
    { name: 'Python', category: 'Programming Language', level: 4 },
    { name: 'PyTorch', category: 'Deep Learning', level: 4 },
    { name: 'TensorFlow', category: 'Deep Learning', level: 4 },
    { name: 'Vue.js', category: 'Frontend', level: 4 },
    { name: 'TypeScript', category: 'Programming Language', level: 4 },
    { name: 'Go', category: 'Programming Language', level: 4 },
    { name: 'Docker', category: 'DevOps', level: 4 },
    { name: 'Kubernetes', category: 'DevOps', level: 4 },
  ]
}

export const useProfileStore = defineStore('profile', () => {
  // 配置数据
  const config = ref<SiteConfig>({ ...DEFAULT_CONFIG })
  const configSha = ref<string>('')
  const isLoading = ref(false)
  
  // 基本信息（计算属性）
  const name = computed(() => config.value.profile.name)
  const title = computed(() => `${config.value.profile.titleEn} · ${config.value.profile.title}`)
  const bio = computed(() => config.value.profile.bio)
  const avatar = computed(() => config.value.profile.avatarUrl)
  const socialLinks = computed<SocialLink[]>(() => config.value.profile.socialLinks.map(sl => ({
    name: sl.name,
    icon: sl.icon,
    url: sl.url
  })))
  
  // 教育经历（固定）
  const education = ref<Education[]>([
    {
      school: '南洋理工大学',
      schoolEn: 'Nanyang Technological University',
      degree: 'Master of Science',
      major: 'Artificial Intelligence',
      period: '2022 - 2024',
      location: 'Singapore',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nanyang_Technological_University_logo.svg/320px-Nanyang_Technological_University_logo.svg.png',
      url: 'https://www.ntu.edu.sg',
    },
    {
      school: '南方科技大学',
      schoolEn: 'Southern University of Science and Technology',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science and Technology',
      period: '2018 - 2022',
      location: 'Shenzhen, China',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/SUSTech_Logo.svg/320px-SUSTech_Logo.svg.png',
      url: 'https://www.sustech.edu.cn',
    },
    {
      school: '加州大学伯克利分校',
      schoolEn: 'University of California, Berkeley',
      degree: 'Exchange Student',
      major: 'Computer Science',
      period: '2020',
      location: 'Berkeley, CA, USA',
      isExchange: true,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/320px-Seal_of_University_of_California%2C_Berkeley.svg.png',
      url: 'https://www.berkeley.edu',
    },
  ])

  // 工作经历
  const experience = ref<Experience[]>([
    {
      title: '算法工程师',
      company: '理想汽车 (Li Auto)',
      period: '2024 - 至今',
      description: '从事自动驾驶前沿研究，主要方向为 VLA、VLN、Agentic Modeling、World Model',
      highlights: [
        '工作成果跑在百万车主的车上，合入 OTA 主线',
        '在发布会上被介绍',
      ],
    },
    {
      title: '算法工程师',
      company: '小马智行 (Pony.ai)',
      period: '此前',
      description: 'Robotaxi 数据闭环体系中的大模型感知算法',
      highlights: [
        '负责大模型感知算法研发',
      ],
    },
    {
      title: '算法工程师',
      company: '德赛西威新加坡 (Desay SV)',
      period: '此前',
      description: '车端 MapTR 类在线建图算法',
      highlights: [
        '负责车端在线建图算法研发',
      ],
    },
  ])

  // 技能（从techStack转换）
  const skills = computed<Skill[]>(() => {
    return config.value.techStack.map((tech) => ({
      name: tech.name,
      level: tech.level,
      category: 'other' as const
    }))
  })

  // 技术栈
  const techStack = computed(() => config.value.techStack)

  // 统计数据
  const stats = ref({
    yearsOfExperience: 3,
    projectsCompleted: 20,
    technologies: 15,
  })

  // 加载配置
  async function loadConfig() {
    isLoading.value = true
    try {
      const configUrl = `${BASE_PATH}data/site-config.json?t=${Date.now()}`
      const response = await fetch(configUrl)
      if (response.ok) {
        const data = await response.json()
        config.value = { ...DEFAULT_CONFIG, ...data }
        console.log('配置加载成功:', config.value.profile.name)
      } else {
        console.error('配置加载失败:', response.status, response.statusText)
      }
    } catch (err) {
      console.error('加载配置失败:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 更新配置
  function updateConfig(newConfig: Partial<SiteConfig>) {
    config.value = { ...config.value, ...newConfig }
  }

  // 更新个人信息
  function updateProfile(data: Partial<{
    name: string
    title: string
    bio: string
    avatar: string
  }>) {
    if (data.name) config.value.profile.name = data.name
    if (data.title) config.value.profile.title = data.title
    if (data.bio) config.value.profile.bio = data.bio
    if (data.avatar) config.value.profile.avatarUrl = data.avatar
  }

  return {
    config,
    configSha,
    isLoading,
    name,
    title,
    bio,
    avatar,
    socialLinks,
    education,
    experience,
    skills,
    techStack,
    stats,
    loadConfig,
    updateConfig,
    updateProfile,
  }
})
