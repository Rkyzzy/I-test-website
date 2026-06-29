"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Plus } from "lucide-react";
import type { TechItem } from "@/lib/types";

interface SkillsSectionProps {
  techStack: TechItem[];
  editMode?: boolean;
  draftTechStack?: TechItem[];
  onTechStackChange?: (idx: number, field: string, val: string | number) => void;
  onTechStackAdd?: () => void;
  onTechStackRemove?: (idx: number) => void;
}

export default function SkillsSection({
  techStack,
  editMode,
  draftTechStack,
  onTechStackChange,
  onTechStackAdd,
  onTechStackRemove,
}: SkillsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const activeStack = draftTechStack ?? techStack;
  const sorted = [...activeStack].sort((a, b) => b.level - a.level);
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
            editMode && onTechStackChange ? (
              <div key={tech.name} className="card-surface p-5 space-y-3 relative group">
                <button
                  onClick={() => onTechStackRemove?.(activeStack.indexOf(tech))}
                  className="absolute top-2 right-2 p-1 rounded-lg text-deck-500 hover:text-warm hover:bg-warm/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="移除此技能"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  value={tech.name}
                  onChange={(e) => onTechStackChange(activeStack.indexOf(tech), "name", e.target.value)}
                  className="w-full bg-transparent text-2xl font-display font-bold text-accent outline-none border-b border-transparent focus:border-accent/30 transition-colors"
                />
                <input
                  type="text"
                  value={tech.category}
                  onChange={(e) => onTechStackChange(activeStack.indexOf(tech), "category", e.target.value)}
                  className="w-full bg-transparent text-xs text-deck-400 uppercase tracking-wider outline-none border-b border-transparent focus:border-accent/30 transition-colors"
                  placeholder="分类"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={tech.level}
                    onChange={(e) => onTechStackChange(activeStack.indexOf(tech), "level", parseInt(e.target.value))}
                    className="flex-1 accent-accent h-1"
                  />
                  <span className="text-xs font-mono text-deck-400 w-4 text-right">{tech.level}</span>
                </div>
              </div>
            ) : (
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
            )
          ))}
        </div>

        {/* Rest - floating tags */}
        {editMode ? (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {rest.map((tech, i) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border border-deck-600 text-deck-300 group"
                >
                  {tech.name}
                  <button
                    onClick={() => onTechStackRemove?.(activeStack.indexOf(tech))}
                    className="p-0.5 rounded-full text-deck-500 hover:text-warm hover:bg-warm/10 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={onTechStackAdd}
                className="px-4 py-2 text-sm font-medium rounded-full border border-dashed border-accent/40 text-accent hover:bg-accent/10 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> 添加技能
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
