"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { EDUCATION } from "@/lib/profile";
import { ExternalLink, MapPin } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="min-h-screen py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
            教育背景
          </h1>
          <p className="text-deck-400 text-lg mb-16">
            Academic Background · 从本科到研究生的求学之路
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-accent/10" />

          <div className="space-y-16">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-deck-900 z-10" />

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] card-surface p-6 group ${
                  i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}>
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {edu.isExchange && (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-warm/10 border border-warm/30 text-warm">
                          交换项目
                        </span>
                      )}
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-deck-600/50 text-deck-300 border border-deck-500/30">
                        {edu.period}
                      </span>
                    </div>

                    <div className="flex gap-4 items-start">
                      {/* Logo */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-deck-700 border border-deck-600 flex items-center justify-center overflow-hidden">
                        {edu.logo ? (
                          <Image
                            src={edu.logo}
                            alt={edu.school}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xl font-bold text-deck-400">
                            {edu.school.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-display font-semibold mb-0.5 group-hover:text-accent transition-colors">
                          {edu.school}
                        </h3>
                        <p className="text-sm text-deck-400 mb-2">{edu.schoolEn}</p>
                        <p className="text-sm text-accent font-medium mb-1">
                          {edu.degree} · {edu.major}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-deck-400">
                          <MapPin className="w-3 h-3" />
                          <span>{edu.location}</span>
                          <ExternalLink className="w-3 h-3 ml-2" />
                          <span className="group-hover:text-accent transition-colors">
                            访问官网
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <ScrollReveal delay={0.3} className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 text-deck-400">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-accent/50" />
            <span className="text-sm">持续学习，不断进步</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
