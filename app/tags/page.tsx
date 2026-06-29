"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export default function TagsPage() {
  const [tags, setTags] = useState<Record<string, BlogPost[]>>({});

  useEffect(() => {
    getAllPosts().then((posts) => {
      const map: Record<string, BlogPost[]> = {};
      posts.forEach((p) => {
        p.tags?.forEach((t) => {
          if (!map[t]) map[t] = [];
          map[t].push(p);
        });
      });
      setTags(map);
    });
  }, []);

  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16">
            标签
          </h1>
        </ScrollReveal>

        {Object.entries(tags).map(([tag, posts]) => (
          <ScrollReveal key={tag} className="mb-12">
            <h2 className="text-2xl font-display font-semibold mb-4 text-accent">
              # {tag}
            </h2>
            <div className="space-y-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-surface block p-4 group flex justify-between items-center"
                >
                  <span className="group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  <span className="text-sm text-deck-400">{post.date}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        ))}

        {Object.keys(tags).length === 0 && (
          <p className="text-deck-400">暂无标签</p>
        )}
      </div>
    </div>
  );
}
