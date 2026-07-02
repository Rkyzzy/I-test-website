import Link from "next/link";
import { Music, Gamepad2, Dumbbell, BookOpen, Film } from "lucide-react";

const INTEREST_CARDS = [
  {
    name: "音乐",
    desc: "我喜爱的专辑与音乐人",
    path: "/interests/music",
    icon: Music,
    color: "from-purple-500/20 to-pink-500/20",
    border: "hover:border-purple-500/50",
    accent: "text-purple-400",
  },
  {
    name: "运动",
    desc: "运动习惯与日常训练",
    path: "/interests/sports",
    icon: Dumbbell,
    color: "from-green-500/20 to-emerald-500/20",
    border: "hover:border-green-500/50",
    accent: "text-green-400",
  },
  {
    name: "游戏",
    desc: "玩过的、正在玩的游戏",
    path: "/interests/games",
    icon: Gamepad2,
    color: "from-orange-500/20 to-yellow-500/20",
    border: "hover:border-orange-500/50",
    accent: "text-orange-400",
  },
  {
    name: "书籍",
    desc: "阅读记录与推荐书目",
    path: "/interests/books",
    icon: BookOpen,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-blue-500/50",
    accent: "text-blue-400",
  },
  {
    name: "电影",
    desc: "喜欢的电影与观影笔记",
    path: "/interests/movies",
    icon: Film,
    color: "from-red-500/20 to-rose-500/20",
    border: "hover:border-red-500/50",
    accent: "text-red-400",
  },
];

export default function InterestsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-display font-bold text-gradient mb-4">
            兴趣
          </h1>
          <p className="text-deck-400 text-sm max-w-md mx-auto leading-relaxed">
            日常生活里让我保持好奇心的一些事情。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
          {INTEREST_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`card-surface w-full max-w-[280px] p-6 flex flex-col items-center text-center gap-4 ${item.border} transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${item.accent}`} />
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold text-deck-100 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-deck-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
