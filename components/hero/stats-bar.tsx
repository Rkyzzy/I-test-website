"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatsBarProps {
  yearsOfExperience: number;
  projectsCompleted: number;
  technologies: number;
  editMode?: boolean;
  draftStats?: { yearsOfExperience: number; projectsCompleted: number; technologies: number };
  onStatsChange?: (key: string, val: number) => void;
}

function Counter({
  value,
  label,
  editKey,
  editMode,
  onStatsChange,
  suffix = "+",
}: {
  value: number;
  label: string;
  editKey?: string;
  editMode?: boolean;
  onStatsChange?: (key: string, val: number) => void;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(`${value}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const steps = 30;
    const increment = value / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(`${value}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplay(`${Math.round(current)}${suffix}`);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [inView, value, suffix]);

  return (
    <div ref={ref} className="text-center">
      {editMode && editKey && onStatsChange ? (
        <div>
          <input
            type="number"
            value={value}
            onChange={(e) => onStatsChange(editKey, parseInt(e.target.value) || 0)}
            className="w-24 text-center text-4xl md:text-5xl font-display font-bold text-accent mb-1 bg-deck-800 border border-accent/40 rounded-xl outline-none focus:border-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="text-sm text-deck-400 font-medium">{label}</div>
        </div>
      ) : (
        <>
          <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-1">
            {display}
          </div>
          <div className="text-sm text-deck-400 font-medium">{label}</div>
        </>
      )}
    </div>
  );
}

export default function StatsBar({
  yearsOfExperience,
  projectsCompleted,
  technologies,
  editMode,
  draftStats,
  onStatsChange,
}: StatsBarProps) {
  return (
    <section className="py-16 px-6 border-y border-deck-600/30">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          <Counter value={yearsOfExperience} label="年经验" editKey="yearsOfExperience" editMode={editMode} onStatsChange={onStatsChange} />
          <Counter value={projectsCompleted} label="完成项目" editKey="projectsCompleted" editMode={editMode} onStatsChange={onStatsChange} />
          <Counter value={technologies} label="技术栈" editKey="technologies" editMode={editMode} onStatsChange={onStatsChange} />
        </div>
      </div>
    </section>
  );
}
