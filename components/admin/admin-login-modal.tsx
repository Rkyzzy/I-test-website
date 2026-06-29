"use client";

import { useState, useEffect } from "react";
import { Shield, Loader2, X } from "lucide-react";
import { useAdmin } from "./admin-context";

export default function AdminLoginModal({ onClose }: { onClose: () => void }) {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAdmin();

  // Focus the input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("admin-token-input");
      el?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    if (!token.trim()) return;
    setIsLoading(true);
    setError("");

    try {
      const r = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token.trim()}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (!r.ok) throw new Error("Token 无效或已过期");
      const user = await r.json();
      if (user.login !== "Rkyzzy") {
        throw new Error(`仅 Rkyzzy 可以登录，当前用户: ${user.login}`);
      }
      localStorage.setItem("admin_token", token.trim());
      localStorage.setItem("admin_user", JSON.stringify(user));
      login(token.trim());
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm mx-4 bg-deck-900 border border-deck-600 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-deck-400 hover:text-deck-100 transition-colors"
          aria-label="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-lg font-display font-bold">管理员登录</h2>
            <p className="text-xs text-deck-400 mt-1">
              使用 GitHub Personal Access Token 登录
            </p>
          </div>

          <div className="space-y-3">
            <input
              id="admin-token-input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-deck-950 border border-deck-600 rounded-xl px-4 py-2.5 text-sm text-deck-100 placeholder-deck-400 outline-none focus:border-accent/50 transition-colors"
            />

            {error && (
              <p className="text-sm text-warm text-center">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={!token.trim() || isLoading}
              className="w-full py-2.5 rounded-xl bg-accent text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "登录"
              )}
            </button>

            <p className="text-xs text-deck-500 text-center pt-1">
              Token 需要 <span className="text-deck-300">repo</span> 权限
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
