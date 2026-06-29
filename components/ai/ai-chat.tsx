"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Trash2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "介绍一下你自己",
  "你目前在做什么工作？",
  "你平时有什么兴趣爱好？",
  "聊聊你的朋友们",
];

const WORKER_URL = "https://ai.rkyzzy.xyz";
const STORAGE_KEY = "ai-chat-history";

function BouncingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-signal rounded-full animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [configReady, setConfigReady] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(input);
  inputRef.current = input;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch {}
    }
    setConfigReady(true);
  }, []);

  // Persist messages
  useEffect(() => {
    if (messages.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  const adjustTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, []);

  const sendToAI = useCallback(
    async (messagesToSend: Message[]): Promise<string> => {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesToSend,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as any).error || `请求失败 (${response.status})`);
      }
      const data = await response.json();
      return (
        (data as any).choices?.[0]?.message?.content ||
        "抱歉，我没有理解你的问题。"
      );
    },
    []
  );

  const handleSend = useCallback(async () => {
    const msg = inputRef.current.trim();
    if (!msg || isLoading) return;

    setError("");
    const newMessages: Message[] = [
      ...messagesRef.current,
      { role: "user", content: msg },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendToAI(newMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err: any) {
      console.error("AI request failed:", err);
      setError("对话请求失败，请稍后再试。");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "抱歉，我现在无法回答问题。请稍后再试。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, sendToAI]);

  const handleQuickQuestion = useCallback(
    (q: string) => {
      setInput(q);
      // Use setTimeout to ensure state is updated before sending
      setTimeout(() => {
        inputRef.current = q;
        handleSend();
      }, 50);
    },
    [handleSend]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError("");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!configReady) return null;

  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-y-auto space-y-4 scroll-smooth">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-2">
              你好！我是 AI 助手
            </h2>
            <p className="text-deck-400 max-w-md mb-8">
              我是基于我的主人的知识训练的 AI。你可以问我关于他的技能、经历、项目等问题。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickQuestion(q)}
                  className="px-3 py-1.5 text-sm border border-deck-500 rounded-full text-deck-300 hover:border-accent hover:text-accent transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 items-start ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
                    msg.role === "user"
                      ? "bg-accent text-white"
                      : "bg-signal/20 text-signal border border-signal/30"
                  }`}
                >
                  {msg.role === "user" ? "U" : "AI"}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 whitespace-pre-wrap text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent/20 text-deck-100"
                      : "bg-deck-800 border border-deck-600 text-deck-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-signal/20 border border-signal/30 flex items-center justify-center text-sm text-signal flex-shrink-0">
                  AI
                </div>
                <div className="bg-deck-800 border border-deck-600 rounded-2xl px-4 py-3">
                  <BouncingDots />
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-deck-600/50 pt-4 mt-2">
        {error && (
          <p className="text-sm text-warm text-center mb-2">{error}</p>
        )}
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextarea();
              }}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题... (Shift+Enter 换行)"
              disabled={isLoading}
              rows={1}
              className="w-full bg-deck-800 border border-deck-600 rounded-xl px-4 py-3 text-sm text-deck-100 placeholder-deck-400 resize-none outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-xl bg-accent disabled:bg-deck-600 disabled:text-deck-400 text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="w-11 h-11 rounded-xl border border-deck-600 text-deck-400 hover:text-warm hover:border-warm/50 flex items-center justify-center transition-colors flex-shrink-0"
              title="清空对话"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
