export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const BASE_PATH = process.env.NODE_ENV === "production" ? "/I-test-website" : "";

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${BASE_PATH}/content/posts.json?t=${Date.now()}`);
    if (!res.ok) return [];
    const posts: BlogPost[] = await res.json();
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
