const GITHUB_API = "https://api.github.com";
const OWNER = "Rkyzzy";
const REPO = "I-test-website";

export interface SiteConfig {
  profile: {
    name: string; nameEn: string; title: string; titleEn: string;
    bio: string; bioEn: string; avatarUrl: string;
    email: string; location: string;
    socialLinks: { name: string; url: string; icon: string }[];
  };
  techStack: { name: string; category: string; level: number }[];
}

export interface PostMeta {
  slug: string; title: string; date: string; category: string;
  tags: string[]; excerpt: string; cover: string;
}

export class GitHubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private headers() {
    return {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };
  }

  async getUser() {
    const r = await fetch(`${GITHUB_API}/user`, { headers: this.headers() });
    if (!r.ok) throw new Error("Token 无效或已过期");
    return r.json();
  }

  async getFile(path: string): Promise<{ content: string; sha: string }> {
    const r = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
      headers: this.headers(),
    });
    if (r.status === 404) return { content: "", sha: "" };
    if (!r.ok) throw new Error(`获取文件失败: ${r.status}`);
    const data = await r.json();
    return { content: atob(data.content), sha: data.sha };
  }

  async writeFile(path: string, content: string, message: string) {
    let sha: string | undefined;
    try {
      const existing = await this.getFile(path);
      if (existing.sha) sha = existing.sha;
    } catch {}

    const body: Record<string, unknown> = {
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: "main",
    };
    if (sha) body.sha = sha;

    const r = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`,
      { method: "PUT", headers: this.headers(), body: JSON.stringify(body) }
    );
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(`写入失败: ${r.status} — ${(err as any).message || ""}`);
    }
  }

  async deleteFile(path: string) {
    const { sha } = await this.getFile(path);
    if (!sha) return;
    const r = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`,
      {
        method: "DELETE",
        headers: this.headers(),
        body: JSON.stringify({ message: `Delete ${path}`, sha, branch: "main" }),
      }
    );
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(`删除失败: ${r.status} — ${(err as any).message || ""}`);
    }
  }

  async getConfig(): Promise<SiteConfig | null> {
    const { content } = await this.getFile("public/data/site-config.json");
    return content ? JSON.parse(content) : null;
  }

  async saveConfig(config: SiteConfig) {
    const existing = await this.getFile("public/data/site-config.json");
    await this.writeFile(
      "public/data/site-config.json",
      JSON.stringify(config, null, 2),
      "Update site config"
    );
  }

  async savePost(slug: string, title: string, mdContent: string) {
    await this.writeFile(
      `public/content/posts/${slug}.md`,
      mdContent,
      `Update blog post: ${title}`
    );
  }

  async deletePost(slug: string) {
    await this.deleteFile(`public/content/posts/${slug}.md`);
  }
}
