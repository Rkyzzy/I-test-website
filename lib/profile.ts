import type { Education, Experience, SiteConfig } from "./types";

export const BASE_PATH = process.env.NODE_ENV === "production" ? "/I-test-website" : "";

const DEFAULT_CONFIG: SiteConfig = {
  profile: {
    name: "周子越",
    nameEn: "Ziyue Zhou",
    title: "算法工程师",
    titleEn: "Algorithm Engineer",
    bio: "专注于自动驾驶中的视觉-语言-行动模型、智能体建模与世界模型研究，致力于将前沿AI技术落地到百万辆级的量产产品中。",
    bioEn: "Focused on VLA, VLN, agentic modeling, and world models for autonomous driving. Passionate about shipping cutting-edge AI to millions of production vehicles.",
    avatarUrl: `${BASE_PATH}/avatar.png`,
    email: "982993741@qq.com",
    location: "Shenzhen, China",
    socialLinks: [
      { name: "GitHub", icon: "github", url: "https://github.com/Rkyzzy" },
      { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/yourname" },
      { name: "Email", icon: "mail", url: "mailto:982993741@qq.com" },
    ],
  },
  techStack: [
    { name: "Python", category: "Programming Language", level: 5 },
    { name: "PyTorch", category: "Deep Learning", level: 5 },
    { name: "TensorFlow", category: "Deep Learning", level: 4 },
    { name: "Vue.js", category: "Frontend", level: 4 },
    { name: "TypeScript", category: "Programming Language", level: 4 },
    { name: "Go", category: "Programming Language", level: 4 },
    { name: "Docker", category: "DevOps", level: 4 },
    { name: "Kubernetes", category: "DevOps", level: 4 },
  ],
};

export const EDUCATION: Education[] = [
  {
    school: "南洋理工大学",
    schoolEn: "Nanyang Technological University",
    degree: "Master of Science",
    major: "Artificial Intelligence",
    period: "2022 - 2024",
    location: "Singapore",
    logo: `${BASE_PATH}/school-ntu.png`,
    url: "https://www.ntu.edu.sg",
  },
  {
    school: "南方科技大学",
    schoolEn: "Southern University of Science and Technology",
    degree: "Bachelor of Engineering",
    major: "Computer Science and Technology",
    period: "2018 - 2022",
    location: "Shenzhen, China",
    logo: `${BASE_PATH}/data/sustech-logo.svg`,
    url: "https://www.sustech.edu.cn",
  },
  {
    school: "加州大学伯克利分校",
    schoolEn: "University of California, Berkeley",
    degree: "Exchange Student",
    major: "Computer Science",
    period: "2020",
    location: "Berkeley, CA, USA",
    isExchange: true,
    logo: `${BASE_PATH}/data/berkeley-logo.svg`,
    url: "https://www.berkeley.edu",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    title: "算法工程师",
    company: "理想汽车 (Li Auto)",
    period: "2024 - 至今",
    description:
      "从事自动驾驶前沿研究，主要方向为 VLA、VLN、Agentic Modeling、World Model",
    highlights: [
      "工作成果跑在百万车主的车上，合入 OTA 主线",
      "在发布会上被介绍",
    ],
  },
  {
    title: "算法工程师",
    company: "小马智行 (Pony.ai)",
    period: "此前",
    description: "Robotaxi 数据闭环体系中的大模型感知算法",
    highlights: ["负责大模型感知算法研发"],
  },
  {
    title: "算法工程师",
    company: "德赛西威新加坡 (Desay SV)",
    period: "此前",
    description: "车端 MapTR 类在线建图算法",
    highlights: ["负责车端在线建图算法研发"],
  },
];

export async function loadConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${BASE_PATH}/data/site-config.json?t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      return { ...DEFAULT_CONFIG, ...data };
    }
  } catch (err) {
    console.error("Failed to load config:", err);
  }
  return DEFAULT_CONFIG;
}
