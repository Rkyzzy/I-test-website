import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const postsDir = join(__dirname, '..', 'public', 'content', 'posts')

function parseFrontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null
  const fm = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) {
      let value = kv[2].trim()
      if (value.startsWith('[')) {
        try { value = JSON.parse(value.replace(/'/g, '"')) } catch {
          value = value.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''))
        }
      } else if (/^\d+$/.test(value)) {
        value = parseInt(value, 10)
      } else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      fm[kv[1]] = value
    }
  }
  return fm
}

const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))
const posts = []

for (const file of files) {
  const slug = file.replace(/\.md$/, '')
  const content = readFileSync(join(postsDir, file), 'utf-8')
  const fm = parseFrontmatter(content)
  if (fm) {
    posts.push({
      slug,
      title: fm.title || slug,
      excerpt: fm.excerpt || '',
      cover: fm.cover || '',
      date: fm.date || '',
      readTime: fm.readTime || Math.max(1, Math.ceil(content.length / 800)),
      tags: fm.tags || [],
      category: fm.category || '技术',
    })
  }
}

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const indexPath = join(postsDir, 'posts.json')
writeFileSync(indexPath, JSON.stringify(posts, null, 2))
console.log(`Generated posts.json with ${posts.length} posts from ${files.length} .md files`)
