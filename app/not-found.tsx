import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold text-accent mb-4">404</h1>
        <p className="text-deck-300 text-lg mb-8">
          这个页面不存在，或已被移走
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors font-medium"
        >
          ← 回到首页
        </Link>
      </div>
    </div>
  );
}
