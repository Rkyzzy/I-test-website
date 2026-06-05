<template>
  <div class="min-h-screen py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <h1 class="text-4xl font-bold mb-4">教育背景</h1>
      <p class="text-[#656d76] dark:text-[#8b949e] mb-12">
        Academic Background · 从本科到研究生的求学之路
      </p>

      <!-- 时间线 -->
      <div class="relative">
        <!-- 时间线中轴 -->
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#58a6ff] via-[#3fb950] to-[#d29922]"></div>

        <!-- 教育经历 -->
        <div class="space-y-12">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="relative"
            :class="index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'"
          >
            <!-- 时间线节点 -->
            <div class="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#58a6ff] border-4 border-[#f6f8fa] dark:border-[#0d1117] z-10 shadow-lg"></div>

            <!-- 卡片 -->
            <div
              class="card ml-12 md:ml-0 group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              :class="{ 'md:text-right': index % 2 === 1 }"
            >
              <a :href="edu.url" target="_blank" rel="noopener noreferrer" class="block">
                <!-- 时间标签 -->
                <div class="inline-block mb-4">
                  <span v-if="edu.isExchange" class="tag bg-[#fff8c5] dark:bg-[#1a1a0e] text-[#4d3800] dark:text-[#d29922] border border-[#d29922]/30">
                    交换项目
                  </span>
                  <span class="tag ml-2">{{ edu.period }}</span>
                </div>

                <!-- 学校信息 -->
                <div class="flex flex-col md:flex-row gap-4 items-start" :class="{ 'md:flex-row-reverse': index % 2 === 1 }">
                  <!-- 学校Logo -->
                  <div class="flex-shrink-0">
                    <div class="w-20 h-20 rounded-xl overflow-hidden bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] flex items-center justify-center group-hover:border-[#58a6ff] transition-colors">
                      <img
                        v-if="edu.logo"
                        :src="edu.logo"
                        :alt="edu.school"
                        class="w-14 h-14 object-contain"
                        loading="lazy"
                        @error="handleImageError"
                      />
                      <span v-else class="text-2xl font-bold text-[#656d76]">
                        {{ edu.school.charAt(0) }}
                      </span>
                    </div>
                  </div>

                  <!-- 文字信息 -->
                  <div class="flex-grow">
                    <h3 class="text-2xl font-bold mb-1 group-hover:text-[#58a6ff] transition-colors">
                      {{ edu.school }}
                    </h3>
                    <p class="text-[#656d76] dark:text-[#8b949e] mb-3">
                      {{ edu.schoolEn }}
                    </p>

                    <div class="text-[#58a6ff] font-medium mb-3">
                      {{ edu.degree }} · {{ edu.major }}
                    </div>

                    <div class="flex items-center gap-2 text-sm text-[#656d76] dark:text-[#8b949e]" :class="{ 'md:justify-end': index % 2 === 1 }">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{{ edu.location }}</span>
                      <svg class="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      <span class="group-hover:text-[#58a6ff] transition-colors">访问官网</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-20 text-center">
        <div class="inline-flex items-center gap-2 text-[#656d76] dark:text-[#8b949e]">
          <span class="w-8 h-px bg-gradient-to-r from-transparent to-[#58a6ff]"></span>
          <span>持续学习，不断进步</span>
          <span class="w-8 h-px bg-gradient-to-l from-transparent to-[#58a6ff]"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const profile = useProfileStore()
const education = profile.education

function handleImageError(event: Event) {
  // 如果图片加载失败，隐藏img标签，显示首字母
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}
</script>
