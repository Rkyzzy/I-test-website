"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { useAdmin } from "@/components/admin/admin-context";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { Calendar, Tag, Edit, Plus, Trash2 } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { isAdmin, editMode } = useAdmin();

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex items-start justify-between mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
                博客
              </h1>
              <p className="text-deck-400 text-lg">
                Thoughts, learnings, and deep dives
              </p>
            </div>
            {isAdmin && editMode && (
              <Link
                href="/admin/edit"
                className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                <Plus className="w-4 h-4" /> 新建文章
              </Link>
            )}
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <div className="relative group">
                {isAdmin && editMode && (
                  <div className="absolute -right-3 -top-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/edit?slug=${post.slug}`}
                      className="p-2 rounded-lg bg-deck-700 border border-deck-600 text-deck-300 hover:text-accent hover:border-accent/50 transition-colors shadow-lg"
                      title="编辑此文章"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      className="p-2 rounded-lg bg-deck-700 border border-deck-600 text-deck-300 hover:text-warm hover:border-warm/50 transition-colors shadow-lg"
                      title="删除此文章"
                      onClick={() => {
                        if (confirm(`确定要删除「${post.title}」吗？`)) {
                          const token = localStorage.getItem("admin_token");
                          if (token) {
                            import("@/lib/github").then(({ GitHubService }) => {
                              const gh = new GitHubService(token);
                              gh.deletePost(post.slug).then(() => {
                                // Also remove from posts.json index
                                return gh.getFile("public/content/posts.json").then(({ content }) => {
                                  if (content) {
                                    const posts2 = JSON.parse(content);
                                    const updated = posts2.filter((p: any) => p.slug !== post.slug);
                                    return gh.writeFile("public/content/posts.json", JSON.stringify(updated, null, 2), "Delete post: " + post.title);
                                  }
                                });
                              }).then(() => {
                                // Refresh posts
                                getAllPosts().then(setPosts);
                              }).catch((err: Error) => alert("删除失败: " + err.message));
                            });
                          }
                        }
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
