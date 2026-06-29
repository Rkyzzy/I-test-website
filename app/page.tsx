"use client";

import { useEffect, useState, useCallback } from "react";
import HeroSection from "@/components/hero/hero-section";
import StatsBar from "@/components/hero/stats-bar";
import SkillsSection from "@/components/hero/skills-section";
import QuickNav from "@/components/hero/quick-nav";
import { loadConfig } from "@/lib/profile";
import { useAdmin } from "@/components/admin/admin-context";
import EditModeBar from "@/components/admin/edit-mode-bar";
import { GitHubService } from "@/lib/github";
import type { SiteConfig, TechItem } from "@/lib/types";

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const { editMode, setEditMode } = useAdmin();

  // Draft state for inline editing
  const [draftBio, setDraftBio] = useState("");
  const [draftStats, setDraftStats] = useState({ yearsOfExperience: 3, projectsCompleted: 20, technologies: 15 });
  const [draftTechStack, setDraftTechStack] = useState<TechItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadConfig().then((cfg) => {
      setConfig(cfg);
      setDraftBio(cfg.profile.bio);
      setDraftTechStack([...cfg.techStack]);
      if (cfg.stats) {
        setDraftStats({
          yearsOfExperience: cfg.stats.yearsOfExperience,
          projectsCompleted: cfg.stats.projectsCompleted,
          technologies: cfg.stats.technologies,
        });
      }
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!config) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) { alert("未检测到登录 token"); return; }

      const gh = new GitHubService(token);
      const updatedConfig: SiteConfig = {
        ...config,
        profile: {
          ...config.profile,
          bio: draftBio,
        },
        stats: draftStats,
        techStack: draftTechStack,
      };
      await gh.saveConfig(updatedConfig);
      setConfig(updatedConfig);
      setEditMode(false);
    } catch (err: any) {
      alert("保存失败: " + err.message);
    } finally {
      setIsSaving(false);
    }
  }, [config, draftBio, draftTechStack, setEditMode]);

  const handleCancelEditing = useCallback(() => {
    if (!config) return;
    setDraftBio(config.profile.bio);
    setDraftStats({
      yearsOfExperience: config.stats?.yearsOfExperience ?? 3,
      projectsCompleted: config.stats?.projectsCompleted ?? 20,
      technologies: config.stats?.technologies ?? 15,
    });
    setDraftTechStack([...config.techStack]);
    setEditMode(false);
  }, [config, setEditMode]);

  const handleTechStackChange = useCallback((idx: number, field: string, val: string | number) => {
    setDraftTechStack((prev) => {
      const next = [...prev];
      if (idx >= 0 && idx < next.length) {
        (next as any)[idx][field] = val;
      }
      return next;
    });
  }, []);

  const handleTechStackAdd = useCallback(() => {
    setDraftTechStack((prev) => [...prev, { name: "新技术", category: "分类", level: 3 }]);
  }, []);

  const handleTechStackRemove = useCallback((idx: number) => {
    setDraftTechStack((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  if (!config) return null;

  return (
    <div className={editMode ? "pb-20" : ""}>
      <HeroSection
        name={config.profile.name}
        nameEn={config.profile.nameEn}
        title={config.profile.title}
        titleEn={config.profile.titleEn}
        bio={config.profile.bio}
        bioEn={config.profile.bioEn}
        avatarUrl={config.profile.avatarUrl}
        socialLinks={config.profile.socialLinks}
        editMode={editMode}
        draftBio={draftBio}
        onBioChange={setDraftBio}
      />
      <StatsBar
        yearsOfExperience={draftStats.yearsOfExperience}
        projectsCompleted={draftStats.projectsCompleted}
        technologies={draftStats.technologies}
        editMode={editMode}
        draftStats={draftStats}
        onStatsChange={(key, val) => setDraftStats((prev) => ({ ...prev, [key]: val }))}
      />
      <SkillsSection
        techStack={config.techStack}
        editMode={editMode}
        draftTechStack={draftTechStack}
        onTechStackChange={handleTechStackChange}
        onTechStackAdd={handleTechStackAdd}
        onTechStackRemove={handleTechStackRemove}
      />
      <QuickNav />

      {editMode && (
        <EditModeBar onSave={handleSave} onCancel={handleCancelEditing} isSaving={isSaving} />
      )}
    </div>
  );
}
