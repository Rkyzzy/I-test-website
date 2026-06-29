"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { Calendar, Tag } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
            博客
          </h1>
          <p className="text-deck-400 text-lg mb-16">
            Thoughts, learnings, and deep dives
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-surface block p-6 group"
              >
                <h2 className="text-xl font-display font-semibold mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-deck-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-deck-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-deck-600/50 text-deck-300"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
