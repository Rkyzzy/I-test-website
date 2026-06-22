import type { BlogPost } from '@/content/blog/posts'
import { blogPosts as hardcodedPosts, categories, getAllTags, getRelatedPosts, paginatePosts, getPostBySlug, extractHeadings } from '@/content/blog/posts'

const REMOTE_INDEX_URL = '/content/posts/posts.json'
const REMOTE_CONTENT_BASE = '/content/posts/'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Rkyzzy/I-test-website/main/public/content/posts'

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  cover: string
  date: string
  readTime: number
  tags: string[]
  category: string
}

export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  category: string
  cover: string
  excerpt: string
  readTime: number
}

let remotePostsMeta: PostMeta[] | null = null
let remotePostsCache: Map<string, BlogPost> | null = null

function parseFrontmatter(md: string): { frontmatter: PostFrontmatter | null; content: string } {
  const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: null, content: md }
  
  const frontmatter: any = {}
  const yamlLines = match[1].split('\n')
  for (const line of yamlLines) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) {
      let value: any = kv[2].trim()
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'))
        } catch {
          value = value.slice(1, -1).split(',').map((s: string) => s.trim().replace(/"/g, ''))
        }
      } else if (/^\d+$/.test(value)) {
        value = parseInt(value, 10)
      } else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      frontmatter[kv[1]] = value
    }
  }
  return { frontmatter: frontmatter as PostFrontmatter, content: match[2].trim() }
}

async function fetchRemoteIndex(): Promise<PostMeta[]> {
  if (remotePostsMeta) return remotePostsMeta
  
  try {
    const resp = await fetch(REMOTE_INDEX_URL)
    if (resp.ok) {
      remotePostsMeta = await resp.json()
      return remotePostsMeta!
    }
  } catch {}
  
  try {
    const resp = await fetch(`${GITHUB_RAW_BASE}/posts.json`)
    if (resp.ok) {
      remotePostsMeta = await resp.json()
      return remotePostsMeta!
    }
  } catch {}
  
  return []
}

async function fetchRemotePost(slug: string): Promise<BlogPost | null> {
  if (remotePostsCache?.has(slug)) {
    return remotePostsCache.get(slug)!
  }
  
  let mdContent: string | null = null
  
  try {
    const resp = await fetch(`${REMOTE_CONTENT_BASE}${slug}.md`)
    if (resp.ok) {
      mdContent = await resp.text()
    }
  } catch {}
  
  if (!mdContent) {
    try {
      const resp = await fetch(`${GITHUB_RAW_BASE}/${slug}.md`)
      if (resp.ok) {
        mdContent = await resp.text()
      }
    } catch {}
  }
  
  if (!mdContent) return null
  
  const { frontmatter, content } = parseFrontmatter(mdContent)
  if (!frontmatter) return null
  
  const post: BlogPost = {
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    cover: frontmatter.cover,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    tags: frontmatter.tags,
    category: frontmatter.category,
    content,
  }
  
  if (!remotePostsCache) remotePostsCache = new Map()
  remotePostsCache.set(slug, post)
  
  return post
}

export async function loadAllPosts(): Promise<BlogPost[]> {
  const hardcoded = [...hardcodedPosts]
  const remote = await fetchRemoteIndex()
  
  const slugSet = new Set(hardcoded.map(p => p.slug))
  for (const meta of remote) {
    if (!slugSet.has(meta.slug)) {
      hardcoded.push({
        slug: meta.slug,
        title: meta.title,
        excerpt: meta.excerpt,
        cover: meta.cover,
        date: meta.date,
        readTime: meta.readTime,
        tags: meta.tags,
        category: meta.category,
        content: '',
      })
    }
  }
  
  return hardcoded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function loadPostBySlug(slug: string): Promise<BlogPost | null> {
  const remote = await fetchRemotePost(slug)
  if (remote) return remote
  
  const hardcoded = getPostBySlug(slug)
  return hardcoded || null
}

export async function slugExists(slug: string): Promise<boolean> {
  const hardcoded = getPostBySlug(slug)
  if (hardcoded) return true
  
  const remote = await fetchRemotePost(slug)
  return remote !== null
}

export { categories, getAllTags, getRelatedPosts, paginatePosts, getPostBySlug, extractHeadings }
export type { BlogPost }
