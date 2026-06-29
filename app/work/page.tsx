"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { EXPERIENCE } from "@/lib/profile";
import { Check, Briefcase, GraduationCap, FlaskConical, BookOpen } from "lucide-react";

export default function WorkPage() {
  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
            工作与研究
          </h1>
          <p className="text-deck-400 text-lg mb-16">
            实习经历、全职工作、研究方向与学术成果
          </p>
        </ScrollReveal>

        {/* Work Experience */}
        <section className="mb-20">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-accent" /> 工作经历
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-surface p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-display font-semibold">{exp.title}</h3>
                    <p className="text-accent text-sm">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-deck-600/50 text-deck-300 border border-deck-500/30">
                    {exp.period}
                  </span>
                </div>
                <p className="text-deck-400 text-sm mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-deck-300">
                      <Check className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Direction */}
        <section className="mb-20">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-accent" /> 研究方向
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="card-surface p-6">
              <h3 className="text-lg font-display font-semibold mb-4">
                人工智能与机器学习
              </h3>
              <p className="text-deck-400 leading-relaxed">
                研究重点包括 VLA、VLN、智能体建模、世界模型在自动驾驶中的应用。
                致力于将前沿研究成果转化为百万辆级量产产品中的实际功能。
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Papers */}
        <section className="mb-20">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-accent" /> 论文发表
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {[
              {
                title: "Efficient Knowledge Distillation for Edge Devices",
                authors: "Author1, Author2, Author3",
                venue: "NeurIPS 2024",
                year: "2024",
                abstract: "提出了一种针对边缘设备的高效知识蒸馏方法，在保持模型性能的同时大幅降低了计算资源需求。",
              },
              {
                title: "Lightweight Model Architecture Search",
                authors: "Author1, Author2",
                venue: "ICML 2023",
                year: "2023",
                abstract: "提出了一种自动搜索轻量级模型架构的方法，有效提升了模型在移动设备上的运行效率。",
              },
            ].map((paper, i) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-surface p-6 group"
              >
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-accent transition-colors">
                  {paper.title}
                </h3>
                <p className="text-sm text-deck-400 mb-1">{paper.authors}</p>
                <p className="text-sm text-accent mb-3">{paper.venue} · {paper.year}</p>
                <p className="text-deck-400 text-sm">{paper.abstract}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
