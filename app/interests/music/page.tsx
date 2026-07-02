import RecordWall from "@/components/record-wall/record-wall";
import { Music } from "lucide-react";

export default function MusicPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-purple-400 mb-3 text-xs font-medium uppercase tracking-widest">
            <Music className="w-4 h-4" />
            Interests
          </div>
          <h1 className="text-3xl font-display font-bold text-gradient mb-3">
            音乐
          </h1>
          <p className="text-deck-400 text-sm max-w-md mx-auto">
            滚动浏览我喜欢的专辑——横滑查看完整列表。
          </p>
        </div>

        <div className="relative -mx-2 sm:-mx-6 lg:-mx-0">
          <RecordWall />
        </div>

        <div className="mt-20 max-w-2xl mx-auto text-center">
          <h2 className="text-lg font-display font-semibold text-deck-200 mb-4">
            唱片墙
          </h2>
          <p className="text-sm text-deck-400 leading-relaxed">
            这里是我最近在听的、曾经着迷的、反复回味的专辑。
            点击卡片可以查看详细页（开发中）——目前先享受浏览的乐趣。
          </p>
        </div>
      </div>
    </div>
  );
}
