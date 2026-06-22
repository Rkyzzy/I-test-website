export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  cover: string
  date: string
  readTime: number
  tags: string[]
  category: string
  content: string
}

export const blogPosts: BlogPost[] = []

export const categories = ['全部', '技术', '思考', '生活']

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  blogPosts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag))
}

export function getRelatedPosts(post: BlogPost, count: number = 3): BlogPost[] {
  return blogPosts
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.tags.filter(t => post.tags.includes(t)).length
      const bScore = b.tags.filter(t => post.tags.includes(t)).length
      return bScore - aScore
    })
    .slice(0, count)
}

export function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: { level: number; text: string; id: string }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].replace(/[`*~]/g, '').trim()
    const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '')
    headings.push({ level: match[1].length, text, id })
  }
  return headings
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === '全部') return blogPosts
  return blogPosts.filter(p => p.category === category)
}

export function paginatePosts(posts: BlogPost[], page: number, perPage: number = 6) {
  const start = (page - 1) * perPage
  return {
    posts: posts.slice(start, start + perPage),
    totalPages: Math.ceil(posts.length / perPage),
    total: posts.length,
  }
}
