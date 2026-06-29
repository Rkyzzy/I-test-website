"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/hero/hero-section";
import StatsBar from "@/components/hero/stats-bar";
import SkillsSection from "@/components/hero/skills-section";
import QuickNav from "@/components/hero/quick-nav";
import { loadConfig } from "@/lib/profile";
import type { SiteConfig } from "@/lib/types";

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  if (!config) return null;

  return (
    <>
      <HeroSection
        name={config.profile.name}
        nameEn={config.profile.nameEn}
        title={config.profile.title}
        titleEn={config.profile.titleEn}
        bio={config.profile.bio}
        avatarUrl={config.profile.avatarUrl}
        socialLinks={config.profile.socialLinks}
      />
      <StatsBar
        yearsOfExperience={3}
        projectsCompleted={20}
        technologies={15}
      />
      <SkillsSection techStack={config.techStack} />
      <QuickNav />
    </>
  );
}
