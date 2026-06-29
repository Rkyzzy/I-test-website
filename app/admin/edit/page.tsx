"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Eye, ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { GitHubService } from "@/lib/github";
import type { PostMeta } from "@/lib/github";

const CATEGORIES = [
  "技术", "AI", "工具", "生活", "学习", "项目",
];

export default function AdminPostEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";

  const isEditing = !!slug;

  const [token, setToken] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState(slug);
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    setToken(t);
  }, []);

  // Load existing post
  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    const t = localStorage.getItem("admin_token");
    if (!t) return;

    (async () => {
      try {
        const gh = new GitHubService(t);
        const { content: mdContent } = await gh.getFile(
          `public/content/posts/${slug}.md`
        );
        if (mdContent) {
          const match = mdContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
          if (match) {
            const frontmatter = match[1];
            const body = match[2];
            setContent(body.trim());

            const yamlLines = frontmatter.split("\n");
            for (const line of yamlLines) {
              const [k, ...v] = line.split(":");
              const val = v.join(":").trim().replace(/^["']|["']$/g, "");
              switch (k.trim()) {
                case "title": setTitle(val); break;
                case "date": setDate(val); break;
                case "category": setCategory(val); break;
                case "tags":
                  setTags(val.replace(/^\[|\]$/g, "").split(",").map((s: string) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean));
                  break;
                case "excerpt": setExcerpt(val); break;
                case "cover": setCover(val); break;
              }
            }
          } else {
            setContent(mdContent);
          }
          setPostSlug(slug);
        }
      } catch (err: any) {
        setMessage("加载文章失败: " + err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]);

  const handleSave = useCallback(async () => {
    if (!token || !title.trim()) return;
    setIsSaving(true);
    setMessage("");

    try {
      const gh = new GitHubService(token);
      const finalSlug = postSlug || title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");

      const tagsYaml = tags.length > 0 ? `\n  [${tags.map((t) => `"${t}"`).join(", ")}]` : " []";
      const coverYaml = cover ? `\ncover: "${cover}"` : "";
      const excerptYaml = excerpt ? `\nexcerpt: "${excerpt.replace(/"/g, '\\"')}"` : "";

      const mdContent = `---
title: "${title}"
date: "${date}"
category: "${category}"${coverYaml}${excerptYaml}
tags:${tagsYaml}
---

${content.trim()}`;

      await gh.savePost(finalSlug, title, mdContent);

      try {
        const r = await fetch("/content/posts.json?t=" + Date.now());
        const existingPosts: PostMeta[] = r.ok ? await r.json() : [];
        const now = new Date().toISOString().split("T")[0];

        const updatedPost: PostMeta = {
          slug: finalSlug,
          title: title.trim(),
          date: date || now,
          category: category || "未分类",
          tags,
          excerpt: excerpt || title.trim(),
          cover: cover || "",
        };

        const idx = existingPosts.findIndex((p) => p.slug === finalSlug);
        let newPosts: PostMeta[];
        if (idx >= 0) {
          newPosts = [...existingPosts];
          newPosts[idx] = updatedPost;
        } else {
          newPosts = [updatedPost, ...existingPosts];
        }

        await gh.writeFile(
          "public/content/posts.json",
          JSON.stringify(newPosts, null, 2),
          `Update posts index: ${title}`
        );
      } catch {}

      setMessage(`文章已${isEditing ? "更新" : "发布"}！`);
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err: any) {
      setMessage("保存失败: " + err.message);
    } finally {
      setIsSaving(false);
    }
  }, [token, title, postSlug, content, date, category, tags, excerpt, cover, isEditing, router]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((x) => x !== t));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-1.5 text-sm text-deck-400 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 返回仪表盘
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2 rounded-xl border border-deck-600 text-xs text-deck-300 hover:border-accent/50 hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> {showPreview ? "编辑" : "预览"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent/90 transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isEditing ? "保存修改" : "发布文章"}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-2.5 rounded-xl border text-sm ${
          message.includes("失败") || message.includes("无效")
            ? "bg-warm/10 border-warm/20 text-warm"
            : "bg-signal/10 border-signal/20 text-signal"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="文章标题"
            className="w-full bg-transparent text-2xl font-display font-bold text-deck-100 placeholder-deck-500 outline-none border-none"
          />

          {showPreview ? (
            <div className="bg-deck-800 border border-deck-600 rounded-2xl p-6 min-h-[400px] blog-content text-deck-200 text-sm leading-relaxed whitespace-pre-wrap">
              {content || "（暂无内容）"}
            </div>
          ) : (
            <div className="bg-deck-800 border border-deck-600 rounded-2xl overflow-hidden">
              <div className="flex border-b border-deck-600/50">
                {["write", "preview"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setShowPreview(tab === "preview")}
                    className={`px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                      (tab === "preview") === showPreview
                        ? "text-accent border-accent"
                        : "text-deck-400 border-transparent hover:text-accent"
                    }`}
                  >
                    {tab === "write" ? "编辑" : "预览"}
                  </button>
                ))}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="使用 Markdown 编写文章内容..."
                className="w-full bg-transparent text-sm text-deck-200 placeholder-deck-500 outline-none resize-none font-mono p-5"
                style={{ minHeight: "400px" }}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-deck-800 border border-deck-600 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-semibold text-deck-400 uppercase tracking-wider">
              文章属性
            </h3>

            <div>
              <label className="block text-xs text-deck-400 mb-1">Slug</label>
              <input
                type="text"
                value={postSlug}
                onChange={(e) => setPostSlug(e.target.value)}
                placeholder="url-friendly-name"
                className="w-full bg-deck-900 border border-deck-600 rounded-xl px-3 py-2 text-xs text-deck-100 placeholder-deck-400 outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-deck-400 mb-1">发布日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-deck-900 border border-deck-600 rounded-xl px-3 py-2 text-xs text-deck-100 outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-deck-400 mb-1">分类</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c === category ? "" : c)}
                    className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                      c === category
                        ? "bg-accent/20 border-accent/40 text-accent"
                        : "bg-deck-900 border-deck-600 text-deck-400 hover:border-accent/30 hover:text-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-deck-400 mb-1">标签</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-deck-700 border border-deck-600 text-deck-300"
                  >
                    {t}
                    <button onClick={() => removeTag(t)} className="hover:text-warm">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addTag(); }
                  }}
                  placeholder="添加标签..."
                  className="flex-1 bg-deck-900 border border-deck-600 rounded-xl px-3 py-2 text-xs text-deck-100 placeholder-deck-400 outline-none focus:border-accent/50 transition-colors"
                />
                <button
                  onClick={addTag}
                  className="p-2 rounded-xl bg-deck-700 border border-deck-600 text-deck-400 hover:text-accent transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-deck-400 mb-1">封面图 URL</label>
              <input
                type="text"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                placeholder="https://..."
                className="w-full bg-deck-900 border border-deck-600 rounded-xl px-3 py-2 text-xs text-deck-100 placeholder-deck-400 outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-deck-400 mb-1">摘要</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="文章摘要..."
                rows={3}
                className="w-full bg-deck-900 border border-deck-600 rounded-xl px-3 py-2 text-xs text-deck-100 placeholder-deck-400 outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
