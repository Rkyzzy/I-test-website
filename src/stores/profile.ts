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

export const useProfileStore = defineStore('profile', () => {
  // 基本信息
  const name = ref('周子越')
  const title = ref('Algorithm Engineer · 算法工程师')
  const bio = ref('专注于人工智能与机器学习领域，致力于将前沿研究成果转化为实际应用。')
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
