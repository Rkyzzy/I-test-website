<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <h1 class="text-4xl font-bold mb-4">工作与研究</h1>
      <p class="text-light-muted dark:text-dark-muted mb-12">
        实习经历、全职工作、研究方向与学术成果
      </p>

      <!-- 工作经历 -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="text-2xl">💼</span> 工作经历
        </h2>
        <div class="space-y-0">
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="timeline-item"
          >
            <div class="card">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-semibold">{{ exp.title }}</h3>
                  <p class="text-accent-blue">{{ exp.company }}</p>
                </div>
                <span class="tag">{{ exp.period }}</span>
              </div>
              <p class="text-light-muted dark:text-dark-muted mb-4">
                {{ exp.description }}
              </p>
              <ul class="space-y-2">
                <li
                  v-for="(highlight, i) in exp.highlights"
                  :key="i"
                  class="flex items-start gap-2"
                >
                  <svg class="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="text-2xl">🎓</span> 教育背景
        </h2>
        <div class="space-y-0">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="timeline-item"
          >
            <div class="card">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-semibold">{{ edu.school }}</h3>
                  <p class="text-accent-blue">{{ edu.degree }} · {{ edu.major }}</p>
                </div>
                <span class="tag">{{ edu.period }}</span>
              </div>
              <p v-if="edu.honors" class="text-light-muted dark:text-dark-muted">
                {{ edu.honors }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 研究方向 -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="text-2xl">🔬</span> 研究方向
        </h2>
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">人工智能与机器学习</h3>
          <p class="text-light-muted dark:text-dark-muted leading-relaxed">
            研究重点包括深度学习模型的优化与压缩、知识蒸馏技术、
            以及在边缘设备上的部署优化。致力于将前沿研究成果转化为实际应用。
          </p>
        </div>
      </section>

      <!-- 论文发表 -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="text-2xl">📄</span> 论文发表
        </h2>
        <div class="space-y-4">
          <div
            v-for="(paper, index) in papers"
            :key="index"
            class="card group"
          >
            <h3 class="text-lg font-semibold mb-2 group-hover:text-accent-blue transition-colors">
              {{ paper.title }}
            </h3>
            <p class="text-sm text-light-muted dark:text-dark-muted mb-2">
              {{ paper.authors }}
            </p>
            <p class="text-sm text-accent-blue mb-3">
              {{ paper.venue }} · {{ paper.year }}
            </p>
            <p class="text-light-muted dark:text-dark-muted text-sm mb-4">
              {{ paper.abstract }}
            </p>
            <a
              v-if="paper.link"
              :href="paper.link"
              target="_blank"
              rel="noopener noreferrer"
              class="link text-sm inline-flex items-center gap-1"
            >
              阅读论文
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- 项目展示 -->
      <section>
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="text-2xl">🚀</span> 项目展示
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="card group cursor-pointer"
          >
            <div class="aspect-video rounded-lg overflow-hidden mb-4 bg-light-bg dark:bg-dark-bg">
              <img
                :src="project.cover"
                :alt="project.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 class="text-lg font-semibold mb-2 group-hover:text-accent-blue transition-colors">
              {{ project.name }}
            </h3>
            <p class="text-light-muted dark:text-dark-muted text-sm mb-4">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.techs"
                :key="tech"
                class="tag text-xs"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-4">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="link text-sm flex items-center gap-1"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="link text-sm flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const profile = useProfileStore()

const experiences = profile.experience

const education = profile.education

const papers = [
  {
    title: 'Efficient Knowledge Distillation for Edge Devices',
    authors: 'Author1, Author2, Author3',
    venue: 'NeurIPS 2024',
    year: '2024',
    abstract: '提出了一种针对边缘设备的高效知识蒸馏方法，在保持模型性能的同时大幅降低了计算资源需求。',
    link: '#',
  },
  {
    title: 'Lightweight Model Architecture Search',
    authors: 'Author1, Author2',
    venue: 'ICML 2023',
    year: '2023',
    abstract: '提出了一种自动搜索轻量级模型架构的方法，有效提升了模型在移动设备上的运行效率。',
    link: '#',
  },
]

const projects = [
  {
    name: 'AI Personal Assistant',
    description: '基于个人知识库构建的 AI 助手，能够回答关于个人的各种问题。',
    cover: 'https://picsum.photos/600/400?random=10',
    techs: ['Python', 'LangChain', 'GPT-4', 'Vector DB'],
    github: '#',
    demo: '#',
  },
  {
    name: 'Real-time Collaboration Platform',
    description: '支持多人实时协作的在线白板工具，支持绘图、文档和思维导图。',
    cover: 'https://picsum.photos/600/400?random=11',
    techs: ['Vue 3', 'WebSocket', 'Canvas', 'Redis'],
    github: '#',
    demo: '#',
  },
  {
    name: 'ML Model Compression Toolkit',
    description: '一站式模型压缩工具，支持剪枝、量化和知识蒸馏。',
    cover: 'https://picsum.photos/600/400?random=12',
    techs: ['Python', 'PyTorch', 'TensorRT'],
    github: '#',
  },
  {
    name: 'Developer Portfolio Template',
    description: '现代化的开发者作品集网站模板，支持博客和项目展示。',
    cover: 'https://picsum.photos/600/400?random=13',
    techs: ['Vue 3', 'Vite', 'Naive UI', 'Tailwind'],
    github: '#',
    demo: '#',
  },
]
</script>
