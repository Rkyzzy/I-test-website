"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScanLines from "./scan-lines";
import { SocialLink } from "@/lib/types";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { BASE_PATH } from "@/lib/profile";

interface HeroProps {
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioEn?: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
  editMode?: boolean;
  draftBio?: string;
  onBioChange?: (val: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function HeroSection({
  name,
  nameEn,
  title,
  titleEn,
  bio,
  bioEn,
  avatarUrl,
  socialLinks,
  editMode,
  draftBio,
  onBioChange,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ScanLines />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deck-900/0 via-deck-900/50 to-deck-900" />

      {/* Scan line decoration */}
      <div className="scan-line" style={{ top: "30%" }} />
      <div className="scan-line" style={{ top: "70%" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Avatar */}
        <motion.div variants={item} className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-accent/30 ring-1 ring-accent/20 ring-offset-2 ring-offset-deck-900">
            <Image
              src={avatarUrl || `${BASE_PATH}/avatar.png`}
              alt={name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-3"
        >
          <span className="text-gradient">{name}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-deck-400 font-display font-medium mb-2"
        >
          {nameEn}
        </motion.p>

        {/* Title */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-accent font-display font-medium mb-6"
        >
          {titleEn} · {title}
        </motion.p>

        {/* Bio - editable in edit mode */}
        {editMode && onBioChange ? (
          <motion.div variants={item} className="mb-10 max-w-2xl mx-auto">
            <label className="block text-xs text-deck-500 mb-1.5 text-left font-mono">
              个人简介 (拖拽右下角调整高度)
            </label>
            <textarea
              value={draftBio ?? bio}
              onChange={(e) => onBioChange(e.target.value)}
              className="w-full bg-deck-800 border border-accent/40 rounded-xl px-4 py-3 text-base text-deck-100 placeholder-deck-400 outline-none focus:border-accent transition-colors resize-y min-h-[100px] leading-relaxed"
              rows={4}
            />
          </motion.div>
        ) : (
          <motion.p
            variants={item}
            className="text-base md:text-lg text-deck-300/80 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {bio}
          </motion.p>
        )}

        {/* Social Links */}
        <motion.div variants={item} className="flex justify-center gap-4 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-11 h-11 rounded-full border border-deck-600 flex items-center justify-center hover:border-accent hover:text-accent hover:-translate-y-1 transition-all duration-300"
              title={link.name}
            >
              {iconMap[link.icon] || <ExternalLink className="w-5 h-5" />}
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent mx-auto animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
