"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-1">管理员登录</h1>
          <p className="text-sm text-deck-400">
            使用 GitHub Personal Access Token 登录
          </p>
        </div>

        <div className="bg-deck-800 border border-deck-600 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-deck-300 mb-1.5">
              GitHub Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-deck-900 border border-deck-600 rounded-xl px-4 py-2.5 text-sm text-deck-100 placeholder-deck-400 outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-warm">{error}</p>
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
        </div>
      </div>
    </div>
  );
}
