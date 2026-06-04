import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  degree: string
  major: string
  period: string
  honors?: string
}

export const useProfileStore = defineStore('profile', () => {
  // 基本信息 - 需要用户提供
  const name = ref('Your Name')
  const title = ref('Full Stack Developer')
  const bio = ref('Passionate about building great products and pushing the boundaries of technology.')
  const avatar = ref('/avatar.png')

  // 社交链接
  const socialLinks = ref<SocialLink[]>([
    { name: 'GitHub', icon: 'github', url: 'https://github.com/username' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/username' },
    { name: 'Email', icon: 'mail', url: 'mailto:email@example.com' },
  ])

  // 教育经历
  const education = ref<Education[]>([
    {
      school: 'University Name',
      degree: 'Bachelor/Master',
      major: 'Computer Science',
      period: '2020 - 2024',
      honors: 'GPA: 3.8/4.0',
    },
  ])

  // 工作经历
  const experience = ref<Experience[]>([
    {
      title: 'Software Engineer',
      company: 'Company Name',
      period: '2024 - Present',
      description: 'Building awesome products.',
      highlights: [
        'Developed feature X',
        'Improved performance by 50%',
      ],
    },
  ])

  // 技能
  const skills = ref<Skill[]>([
    { name: 'JavaScript', level: 5, category: 'language' },
    { name: 'TypeScript', level: 4, category: 'language' },
    { name: 'Python', level: 4, category: 'language' },
    { name: 'Vue.js', level: 5, category: 'framework' },
    { name: 'React', level: 4, category: 'framework' },
    { name: 'Node.js', level: 4, category: 'framework' },
    { name: 'Git', level: 5, category: 'tool' },
    { name: 'Docker', level: 3, category: 'tool' },
  ])

  // 统计数据
  const stats = ref({
    yearsOfExperience: 3,
    projectsCompleted: 20,
    technologies: 15,
  })

  // 更新个人信息
  function updateProfile(data: Partial<{
    name: string
    title: string
    bio: string
    avatar: string
  }>) {
    if (data.name) name.value = data.name
    if (data.title) title.value = data.title
    if (data.bio) bio.value = data.bio
    if (data.avatar) avatar.value = data.avatar
  }

  return {
    name,
    title,
    bio,
    avatar,
    socialLinks,
    education,
    experience,
    skills,
    stats,
    updateProfile,
  }
})
