"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenLine, GraduationCap, Briefcase, Bot } from "lucide-react";

const links = [
  { href: "/blog", icon: PenLine, label: "博客", desc: "技术思考与分享", delay: 0 },
  { href: "/education", icon: GraduationCap, label: "教育", desc: "NTU · SUSTech · UC Berkeley", delay: 0.1 },
  { href: "/work", icon: Briefcase, label: "工作", desc: "理想汽车 · 小马智行 · 德赛西威", delay: 0.2 },
  { href: "/ai", icon: Bot, label: "AI 对话", desc: "与我训练的 AI 互动", delay: 0.3 },
];

export default function QuickNav() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-3">
            探索
          </h2>
          <div className="glow-line max-w-[120px] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-4 gap-5">
          {links.map(({ href, icon: Icon, label, desc, delay }) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay }}
            >
              <Link
                href={href}
                className="card-surface block p-6 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-accent transition-colors">
                  {label}
                </h3>
                <p className="text-sm text-deck-400">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
