import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "周子越 (Ziyue Zhou) | 个人网站",
  description: "Algorithm Engineer at Li Auto. VLA, VLN, Agentic Modeling, World Model.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-deck-900 text-deck-100 antialiased">
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <footer className="py-8 px-6 border-t border-deck-600/30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-deck-400">
              <p>© 2024 周子越. All rights reserved.</p>
              <div className="flex gap-6">
                <a
                  href="https://github.com/Rkyzzy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yourname"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:982993741@qq.com"
                  className="hover:text-accent transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
