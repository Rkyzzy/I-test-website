"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function AIChatPage() {
  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
            AI 对话
          </h1>
          <p className="text-deck-400 text-lg mb-16">
            与我训练的 AI 互动
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="card-surface p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-deck-300 mb-4">
              AI 对话功能正在重构中，敬请期待
            </p>
            <p className="text-sm text-deck-400">
              旧版 AI 可以通过备份的 Vue 版本继续使用
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
