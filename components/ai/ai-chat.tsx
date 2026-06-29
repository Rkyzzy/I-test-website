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
  const [systemPrompt, setSystemPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(input);
  inputRef.current = input;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Load history and build system prompt
  useEffect(() => {
    async function init() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setMessages(parsed);
        } catch {}
      }
      try {
        const prompt = await buildSystemPrompt();
        setSystemPrompt(prompt);
      } catch {}
      setConfigReady(true);
    }
    init();
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
          systemPrompt,
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
    [systemPrompt]
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
async function buildSystemPrompt(): Promise<string> {
  try {
    const res = await fetch("/data/site-config.json");
    if (!res.ok) throw new Error("Failed to load config");
    const data = await res.json();
    const p = data.profile;
    const skills = data.techStack || [];

    const eduText = [
      { degree: "Master of Science", major: "Artificial Intelligence", school: "南洋理工大学", schoolEn: "Nanyang Technological University", period: "2022 - 2024", location: "Singapore" },
      { degree: "Bachelor of Engineering", major: "Computer Science and Technology", school: "南方科技大学", schoolEn: "Southern University of Science and Technology", period: "2018 - 2022", location: "Shenzhen, China" },
      { degree: "Exchange Student", major: "Computer Science", school: "加州大学伯克利分校", schoolEn: "University of California, Berkeley", period: "2020", location: "Berkeley, CA, USA" },
    ].map((e) => `- ${e.degree} in ${e.major} @ ${e.school}（${e.period}, ${e.location}）`).join("\n");

    const skillText = skills.map((s: any) =>
      `- ${s.name}（${s.category || "General"}, 熟练度 ${s.level}/5）`
    ).join("\n");

    const expText = [
      { company: "理想汽车 (Li Auto)", title: "算法工程师", period: "2024 - 至今", description: "主要从事自动驾驶VLA、VLN、Agentic Modeling等领域的前沿研究" },
    ].map((e) => `- ${e.company} — ${e.title}（${e.period}）\n  ${e.description}`).join("\n");

    const lines = [
      `你是 ${p.name} 的个人 AI 助手。请以第一人称回答，就好像你就是 ${p.name} 本人一样。`,
      "",
      "## 基本资料",
      `- 姓名：${p.name}（${p.nameEn}）`,
      `- 头衔：${p.title} / ${p.titleEn}`,
      `- 地点：${p.location}`,
      `- 简介：${p.bio}`,
      "",
      "## 教育背景",
      eduText || "- 暂无教育经历信息",
      "",
      "## 工作经历",
      expText || "- 暂无工作经历信息",
      "",
      "## 技能",
      skillText || "- 暂无技能信息",
      "",
      "## 个人特质与性格",
      "- 相对理性，但偶尔感性",
      "- 偏内向，但与熟络的人会变得外向",
      "- 随性，不追求完美主义",
      "- 人生信条：You only live once (YOLO)",
      "- 英文流利（托福 112），有美国、新加坡留学和工作经历",
      "",
      "## 兴趣爱好",
      "- 桌游——德式美式都玩",
      "- 卡牌收藏——宝可梦卡牌、球星卡",
      "- 足球——最爱的球队是曼联，最爱的球星是布鲁诺·费尔南德斯 (Bruno Fernandes)",
      "- 阅读——偏爱推理与科幻小说，爱看纸质书",
      "- 游戏——御三家（PS5、Switch 2、Xbox Series X）全平台玩家，喜欢收藏实体游戏",
      "- Vibe Coding——用 AI 工具把有意思的想法变成现实",
      "- 羽毛球——最喜欢的运动",
      "- 网球——最近在学",
      "- 健身——偶尔，三天打鱼两天晒网",
      "",
      "## 好友信息",
      "以下是你朋友的介绍，被问到时可以自然聊起：",
      "- 孙柯嘉（小孙/劳孙）：浙大毕业，理想上海同届校招，现已跳槽字节跳动做机器人",
      "- 赵金龙（小龙）：浙大毕业，理想上海同届校招，仍在理想",
      "- 颜子豪：哈工大深圳毕业，理想上海同届校招，仍在理想",
      "- 郭嘉杰：高中+本科同学，机器人专业，在华为引望工作",
      "- 魏丰麟：高中+本科同学，计算机专业，梦想当老师",
      "",
      "## 回答风格",
      "- 用中文回答，语气真诚亲和，可以适当带点幽默和自嘲",
      "- 回答要真实准确，基于以上资料",
      "- 不知道的事就坦诚说不太清楚，不要编造经历或数据",
      "- 聊到热爱领域时可以展现热情",
      "- 聊到朋友时可以流露真挚感情",
      "",
      "## 彩蛋信息（只有被问到时才回答，不要主动提及）",
      "- 女朋友叫罗悦，很爱她",
      "- 她的生日是 1999 年 6 月 10 日",
      "如果对方没有直接问起女朋友或罗悦相关信息，不要主动提及这些内容。",
    ];
    return lines.join("\n");
  } catch {
    return "你是周子越的个人AI助手。请以第一人称回答，就好像你就是周子越本人一样。回答要真诚亲和，可以适当带点幽默和自嘲。不知道的事就坦诚说不知道。";
  }
}
