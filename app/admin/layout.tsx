"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_user");
    if (token && user) {
      try {
        const u = JSON.parse(user);
        if (u.login === "Rkyzzy") setAuthed(true);
      } catch {}
    }
  }, []);

  // Login page is always accessible
  const isLogin = pathname === "/admin/login";

  return (
    <div className="min-h-screen pb-20">
      {/* Admin top bar */}
      <div className="sticky top-0 z-40 bg-deck-900/80 backdrop-blur-md border-b border-deck-600/30">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-deck-400 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-display font-semibold text-sm tracking-wider">
              管理后台
            </span>
            {authed && !isLogin && (
              <nav className="flex gap-3 ml-4 text-sm">
                <button
                  onClick={() => router.push("/admin")}
                  className={`transition-colors ${
                    pathname === "/admin" ? "text-accent" : "text-deck-400 hover:text-deck-100"
                  }`}
                >
                  仪表盘
                </button>
                <button
                  onClick={() => router.push("/admin/edit")}
                  className={`transition-colors ${
                    pathname === "/admin/edit" ? "text-accent" : "text-deck-400 hover:text-deck-100"
                  }`}
                >
                  新建文章
                </button>
              </nav>
            )}
          </div>
          {authed && !isLogin && (
            <button
              onClick={() => {
                localStorage.removeItem("admin_token");
                localStorage.removeItem("admin_user");
                router.push("/admin/login");
              }}
              className="text-xs text-deck-400 hover:text-warm transition-colors"
            >
              退出
            </button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-6">
        {authed || isLogin ? children : (
          <div className="text-center py-20 text-deck-400">
            <p>请先登录</p>
            <button
              onClick={() => router.push("/admin/login")}
              className="mt-4 text-accent hover:underline"
            >
              前往登录
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
