"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatsBarProps {
  yearsOfExperience: number;
  projectsCompleted: number;
  technologies: number;
}

function Counter({
  value,
  label,
  suffix = "+",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(`0${suffix}`);

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
      <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-1">
        {display}
      </div>
      <div className="text-sm text-deck-400 font-medium">{label}</div>
    </div>
  );
}

export default function StatsBar({
  yearsOfExperience,
  projectsCompleted,
  technologies,
}: StatsBarProps) {
  return (
    <section className="py-16 px-6 border-y border-deck-600/30">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          <Counter value={yearsOfExperience} label="年经验" />
          <Counter value={projectsCompleted} label="完成项目" />
          <Counter value={technologies} label="技术栈" />
        </div>
      </div>
    </section>
  );
}
