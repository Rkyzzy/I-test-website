"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ui/scroll-reveal";

const AIChat = dynamic(() => import("@/components/ai/ai-chat"), { ssr: false });

export default function AIChatPage() {
  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-1">
              AI 对话
            </h1>
            <p className="text-deck-400">
              与基于我的知识训练的 AI 助手对话
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-deck-800/50 border border-deck-600/50 rounded-2xl p-6">
            <AIChat />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
