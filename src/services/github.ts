const GITHUB_API_BASE = 'https://api.github.com'
const OWNER = 'Rkyzzy'
const REPO = 'I-test-website'
const CONFIG_FILE_PATH = 'public/data/site-config.json'

export interface SiteConfig {
  profile: {
    name: string
    nameEn: string
    title: string
    titleEn: string
    bio: string
    bioEn: string
    avatarUrl: string
    email: string
    location: string
    socialLinks: {
      name: string
      url: string
      icon: string
    }[]
  }
  techStack: {
    name: string
    category: string
    level: number // 1-5
  }[]
}

export class GitHubService {
  private token: string

  constructor(token: string) {
    this.token = token
  }

  private getHeaders() {
    return {
      'Authorization': `token ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  }

  // 获取文件内容
  async getFileContent(path: string): Promise<{ content: string; sha: string }> {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${OWNER}/${REPO}/contents/${path}`, {
      headers: this.getHeaders()
    })

    if (!response.ok) {
      if (response.status === 404) {
        return { content: '', sha: '' }
      }
      throw new Error(`获取文件失败: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = atob(data.content)
    return { content, sha: data.sha }
  }

  // 写入文件
  async writeFile(path: string, content: string, message: string, sha?: string): Promise<void> {
    try {
      // 先尝试获取文件的 SHA（如果存在）
      if (!sha) {
        try {
          const existingFile = await this.getFileContent(path)
          if (existingFile.sha) {
            sha = existingFile.sha
          }
        } catch (err) {
          // 文件不存在，可以继续创建
          console.log('文件不存在，将创建新文件')
        }
      }

      const body: any = {
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: 'main'
      }

      if (sha) {
        body.sha = sha
      }

      const response = await fetch(`${GITHUB_API_BASE}/repos/${OWNER}/${REPO}/contents/${path}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || response.statusText
        throw new Error(`写入文件失败: ${response.status} - ${errorMessage}`)
      }
    } catch (error) {
      console.error('GitHub API 错误:', error)
      throw error
    }
  }

  // 获取配置
  async getConfig(): Promise<SiteConfig | null> {
    try {
      const { content } = await this.getFileContent(CONFIG_FILE_PATH)
      if (!content) return null
      return JSON.parse(content)
    } catch (err) {
      console.error('获取配置失败:', err)
      return null
    }
  }

  // 保存配置
  async saveConfig(config: SiteConfig, sha?: string): Promise<void> {
    const content = JSON.stringify(config, null, 2)
    await this.writeFile(CONFIG_FILE_PATH, content, 'Update site config', sha)
  }

  // 上传图片 (base64)
  async uploadImage(base64Data: string, filename: string): Promise<string> {
    const path = `public/images/${filename}`
    const content = base64Data.split(',')[1]
    
    // 先获取文件SHA (如果存在)
    let sha: string | undefined
    try {
      const result = await this.getFileContent(path)
      sha = result.sha
    } catch {}

    await this.writeFile(path, atob(content), `Upload image ${filename}`, sha)
    
    // 返回图片URL
    return `https://${OWNER}.github.io/${REPO}/images/${filename}`
  }

  // 保存博客文章
  async savePost(slug: string, title: string, mdContent: string): Promise<void> {
    const mdPath = `public/content/posts/${slug}.md`
    const postMessage = `Update blog post: ${title}`
    await this.writeFile(mdPath, mdContent, postMessage)
  }

  // 删除博客文章
  async deletePost(slug: string): Promise<void> {
    const mdPath = `public/content/posts/${slug}.md`
    const indexPath = 'public/content/posts/posts.json'

    try {
      const { sha } = await this.getFileContent(mdPath)
      if (sha) {
        const deleteResp = await fetch(`${GITHUB_API_BASE}/repos/${OWNER}/${REPO}/contents/${mdPath}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
          body: JSON.stringify({
            message: `Delete blog post: ${slug}`,
            sha,
            branch: 'main',
          }),
        })
        if (!deleteResp.ok) {
          const err = await deleteResp.json().catch(() => ({}))
          throw new Error(err.message || '删除文件失败')
        }
      }
    } catch (err: any) {
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        // 文件不存在，继续
      } else {
        throw err
      }
    }

    // Also update posts.json to remove the deleted post
    try {
      const { content: indexContent } = await this.getFileContent(indexPath)
      if (indexContent) {
        let posts: Record<string, any>[] = JSON.parse(indexContent)
        posts = posts.filter((p: Record<string, any>) => p.slug !== slug)
        await this.writeFile(indexPath, JSON.stringify(posts, null, 2), 'Update posts index: ' + slug)
      }
    } catch (err: any) {
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        // 文件不存在，忽略
      } else {
        throw err
      }
    }
  }
}
