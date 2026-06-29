"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { TechItem } from "@/lib/types";

interface SkillsSectionProps {
  techStack: TechItem[];
}

export default function SkillsSection({ techStack }: SkillsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const sorted = [...techStack].sort((a, b) => b.level - a.level);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

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
            技术栈
          </h2>
          <div className="glow-line max-w-[200px] mx-auto" />
        </motion.div>

        {/* Top 3 - Large */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {top3.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-surface p-6"
            >
              <div className="text-2xl font-display font-bold text-accent mb-1">
                {tech.name}
              </div>
              <div className="text-xs text-deck-400 mb-4 uppercase tracking-wider">
                {tech.category}
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
                      j < tech.level
                        ? "bg-accent"
                        : "bg-deck-600"
                    }`}
                    style={{
                      transitionDelay: inView ? `${i * 100 + j * 80}ms` : "0ms",
                      width: inView ? undefined : "0%",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest - floating tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {rest.map((tech) => (
            <span
              key={tech.name}
              className="px-4 py-2 text-sm font-medium rounded-full border border-deck-600 text-deck-300 hover:border-accent hover:text-accent transition-all duration-300"
            >
              {tech.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
