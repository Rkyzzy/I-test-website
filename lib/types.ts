export interface SocialLink {
  name: string
  icon: string
  url: string
}

export interface Profile {
  name: string
  nameEn: string
  title: string
  titleEn: string
  bio: string
  bioEn: string
  avatarUrl: string
  email: string
  location: string
  socialLinks: SocialLink[]
}

export interface TechItem {
  name: string
  category: string
  level: number
}

export interface Education {
  school: string
  schoolEn: string
  degree: string
  major: string
  period: string
  location: string
  logo: string
  url: string
  isExchange?: boolean
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  highlights: string[]
}

export interface SiteConfig {
  profile: Profile
  techStack: TechItem[]
  stats?: {
    yearsOfExperience: number;
    projectsCompleted: number;
    technologies: number;
  };
}
