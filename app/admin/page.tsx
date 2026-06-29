"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, ExternalLink, Trash2, RefreshCw, FileText, Tag } from "lucide-react";
import { GitHubService } from "@/lib/github";
import type { PostMeta } from "@/lib/github";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const r = await fetch("/content/posts/posts.json?t=" + Date.now());
      if (r.ok) {
        const data: PostMeta[] = await r.json();
        setPosts(data);
      }
    } catch {
      setMessage("加载文章列表失败");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    setToken(t);
    loadPosts();
  }, [loadPosts]);

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

  const handleDelete = async (post: PostMeta) => {
    if (!token) return;
    if (!confirm(`确定要删除「${post.title}」吗？此操作不可撤销。`)) return;
    try {
      const gh = new GitHubService(token);
      await gh.deletePost(post.slug);
      // Also update posts.json
      const updatedPosts = posts.filter((p) => p.slug !== post.slug);
      const jsonContent = JSON.stringify(updatedPosts, null, 2);
      await gh.writeFile(
        "public/content/posts/posts.json",
        jsonContent,
        `Delete blog post: ${post.slug}`
      );
      setMessage("文章已删除");
      loadPosts();
    } catch (err: any) {
      setMessage("删除失败: " + err.message);
    }
  };

  const handleRefresh = () => {
    loadPosts();
    setMessage("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">仪表盘</h1>
          <p className="text-sm text-deck-400 mt-0.5">管理博客文章和网站内容</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="px-3 py-2 rounded-xl border border-deck-600 text-xs text-deck-300 hover:border-accent/50 hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> 刷新
          </button>
          <button
            onClick={() => router.push("/admin/edit")}
            className="px-3 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent/90 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> 新建文章
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-2 rounded-xl bg-warm/10 border border-warm/20 text-sm text-warm">
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "总文章", value: posts.length, color: "text-accent" },
          { label: "标签数", value: allTags.length, color: "text-signal" },
          { label: "分类数", value: new Set(posts.map((p) => p.category)).size, color: "text-warm" },
          { label: "总字数", value: `${posts.length}篇`, color: "text-deck-300" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-deck-800 border border-deck-600 rounded-2xl p-4 text-center"
          >
            <div className={`text-2xl font-bold font-display ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-deck-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Posts list */}
      <div className="bg-deck-800 border border-deck-600 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-deck-600/50 flex items-center justify-between">
          <h2 className="font-display font-semibold text-sm">文章列表</h2>
          <span className="text-xs text-deck-400">{posts.length} 篇</span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-deck-400">加载中...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-sm text-deck-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            暂无文章
          </div>
        ) : (
          <div className="divide-y divide-deck-600/30">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-deck-700/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{post.title}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-deck-400">
                    <span>{post.date}</span>
                    {post.category && (
                      <span className="px-1.5 py-0.5 rounded-full bg-deck-700 border border-deck-600">
                        {post.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                    className="p-2 rounded-lg text-deck-400 hover:text-accent hover:bg-deck-700 transition-colors"
                    title="预览"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push(`/admin/edit?slug=${post.slug}`)}
                    className="p-2 rounded-lg text-deck-400 hover:text-accent hover:bg-deck-700 transition-colors"
                    title="编辑"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 rounded-lg text-deck-400 hover:text-warm hover:bg-warm/10 transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
