"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Menu, X, Lock } from "lucide-react";

const NAV_LINKS = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
  { name: "教育", path: "/education" },
  { name: "工作", path: "/work" },
  { name: "AI 对话", path: "/ai" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setIsAdmin(!!token);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-deck-900/80 backdrop-blur-xl border-b border-deck-600/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-display font-semibold tracking-tight hover:text-accent transition-colors"
        >
          周子越
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors ${
                pathname === link.path
                  ? "text-accent"
                  : "text-deck-300 hover:text-deck-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={isAdmin ? "/admin" : "/admin/login"}
            className={`w-9 h-9 rounded-full border border-deck-600 flex items-center justify-center hover:border-accent transition-colors ${
              isAdmin ? "text-signal" : "text-deck-400"
            }`}
            aria-label="Admin panel"
            title={isAdmin ? "管理后台" : "管理员登录"}
          >
            <Lock className="w-4 h-4" />
          </Link>
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full border border-deck-600 flex items-center justify-center hover:border-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-deck-300" />
            ) : (
              <Moon className="w-4 h-4 text-deck-300" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-deck-600 flex items-center justify-center"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-deck-300" />
            ) : (
              <Menu className="w-4 h-4 text-deck-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-deck-900/95 backdrop-blur-xl border-b border-deck-600/50">
          <div className="px-6 py-4 space-y-4">
            <Link
              href={isAdmin ? "/admin" : "/admin/login"}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium transition-colors ${
                isAdmin ? "text-signal" : "text-deck-300 hover:text-deck-100"
              }`}
            >
              管理后台
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? "text-accent"
                    : "text-deck-300 hover:text-deck-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
