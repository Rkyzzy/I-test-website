import fs from "fs";
import path from "path";
import BlogPostClient from "./client";

export function generateStaticParams() {
  try {
    const postsPath = path.join(process.cwd(), "public", "content", "posts.json");
    if (fs.existsSync(postsPath)) {
      const raw = fs.readFileSync(postsPath, "utf-8");
      const posts = JSON.parse(raw);
      return (posts as { slug: string }[]).map((post: { slug: string }) => ({
        slug: post.slug,
      }));
    }
  } catch (e) {
    console.error("Failed to generate static params:", e);
  }
  return [];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
