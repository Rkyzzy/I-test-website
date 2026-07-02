"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { useAdmin } from "./admin/admin-context";
import { Moon, Sun, Menu, X, Lock, PenLine, LogOut, ChevronDown } from "lucide-react";
import AdminLoginModal from "./admin/admin-login-modal";

interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
}

const NAV_LINKS: NavItem[] = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
  {
    name: "兴趣",
    path: "/interests",
    children: [
      { name: "运动", path: "/interests/sports" },
      { name: "游戏", path: "/interests/games" },
      { name: "音乐", path: "/interests/music" },
      { name: "书籍", path: "/interests/books" },
      { name: "电影", path: "/interests/movies" },
    ],
  },
  { name: "教育", path: "/education" },
  { name: "工作", path: "/work" },
  { name: "AI 对话", path: "/ai" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { isAdmin, editMode, setEditMode, logout } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [interestsOpen, setInterestsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close interests dropdown when navigating
  useEffect(() => {
    setInterestsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

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
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.path} className="relative">
                <button
                  onClick={() => setInterestsOpen(!interestsOpen)}
                  onMouseEnter={() => setInterestsOpen(true)}
                  onMouseLeave={() => setInterestsOpen(false)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${
                    isActive(link.path)
                      ? "text-accent"
                      : "text-deck-300 hover:text-deck-100"
                  }`}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      interestsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {interestsOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    onMouseEnter={() => setInterestsOpen(true)}
                    onMouseLeave={() => setInterestsOpen(false)}
                  >
                    <div className="bg-deck-800 border border-deck-600 rounded-xl py-2 min-w-[130px] shadow-xl backdrop-blur-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            pathname === child.path
                              ? "text-accent bg-accent/5"
                              : "text-deck-300 hover:text-deck-100 hover:bg-deck-700/50"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors ${
                  link.path === "/"
                    ? pathname === "/"
                      ? "text-accent"
                      : "text-deck-300 hover:text-deck-100"
                    : isActive(link.path)
                    ? "text-accent"
                    : "text-deck-300 hover:text-deck-100"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center hover:border-accent transition-colors ${
                  editMode
                    ? "border-signal text-signal bg-signal/10"
                    : "border-deck-600 text-deck-400"
                }`}
                aria-label="编辑模式"
                title={editMode ? "退出编辑模式" : "进入编辑模式"}
              >
                <PenLine className="w-4 h-4" />
              </button>
              <Link
                href="/admin"
                className="w-9 h-9 rounded-full border border-deck-600 flex items-center justify-center hover:border-accent transition-colors text-deck-400"
                aria-label="管理后台"
                title="管理后台"
              >
                <Lock className="w-4 h-4" />
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="w-9 h-9 rounded-full border border-deck-600 flex items-center justify-center hover:border-warm transition-colors text-deck-400"
                aria-label="退出登录"
                title="退出登录"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAdminModal(true)}
              className="w-9 h-9 rounded-full border border-deck-600 flex items-center justify-center hover:border-accent transition-colors text-deck-400"
              aria-label="管理员登录"
              title="管理员登录"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
          {showAdminModal && (
            <AdminLoginModal onClose={() => setShowAdminModal(false)} />
          )}
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
            {isAdmin && (
              <>
                <div className="flex items-center gap-2 px-2 py-1 text-xs text-deck-500 border-b border-deck-600/30 pb-2 mb-2">
                  <Lock className="w-3 h-3" />
                  管理员模式
                </div>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-signal transition-colors"
                >
                  管理后台
                </Link>
                <button
                  onClick={() => { setEditMode(!editMode); setMobileOpen(false); }}
                  className={`block text-sm font-medium transition-colors ${
                    editMode ? "text-signal" : "text-deck-300 hover:text-deck-100"
                  }`}
                >
                  {editMode ? "退出编辑模式" : "进入编辑模式"}
                </button>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="block text-sm font-medium text-warm transition-colors"
                >
                  退出登录
                </button>
              </>
            )}
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.path}>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${
                      isActive(link.path)
                        ? "text-accent"
                        : "text-deck-300"
                    }`}
                    onClick={() => setInterestsOpen(!interestsOpen)}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        interestsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {interestsOpen && (
                    <div className="ml-4 mt-2 space-y-2 border-l border-deck-600/50 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={`block text-sm transition-colors ${
                            pathname === child.path
                              ? "text-accent"
                              : "text-deck-400 hover:text-deck-100"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium transition-colors ${
                    link.path === "/"
                      ? pathname === "/"
                        ? "text-accent"
                        : "text-deck-300 hover:text-deck-100"
                      : isActive(link.path)
                      ? "text-accent"
                      : "text-deck-300 hover:text-deck-100"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
