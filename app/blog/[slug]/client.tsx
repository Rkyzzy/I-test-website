"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getPost } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) getPost(slug).then(setPost);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-deck-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-deck-400 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客列表
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-deck-400 mb-12">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>
        </ScrollReveal>

        <article className="blog-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
