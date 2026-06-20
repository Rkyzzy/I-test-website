import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/pages/BlogIndex.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/pages/BlogPost.vue'),
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('@/pages/EducationPage.vue'),
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('@/pages/WorkPage.vue'),
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('@/pages/TagsPage.vue'),
  },
  {
    path: '/ai',
    name: 'AIChat',
    component: () => import('@/pages/AIChatPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
