"use client";

import { useEffect, useRef } from "react";

export default function ScanLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let anim: number;
    let scanY = 0;
    let scanDir = 1;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawParticles(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
      for (let i = 0; i < 30; i++) {
        const x = ((i * 137.5 + t * 0.02) % w);
        const y = ((i * 311.7 + t * 0.03) % h);
        const size = Math.sin(t * 0.001 + i) * 0.5 + 1;
        const alpha = Math.sin(t * 0.002 + i * 0.7) * 0.15 + 0.2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.62 0.19 220 / ${alpha})`;
        ctx.fill();
      }
    }

    function animate(t: number) {
      resize();
      const w = canvas!.width;
      const h = canvas!.height;

      ctx!.clearRect(0, 0, w, h);

      // Scan line
      scanY += scanDir * 0.4;
      if (scanY > h - 40 || scanY < 40) scanDir *= -1;

      // Scan glow
      const gradient = ctx!.createRadialGradient(w / 2, scanY, 0, w / 2, scanY, 120);
      gradient.addColorStop(0, "oklch(0.62 0.19 220 / 0.12)");
      gradient.addColorStop(0.5, "oklch(0.62 0.19 220 / 0.04)");
      gradient.addColorStop(1, "oklch(0.62 0.19 220 / 0)");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, w, h);

      // Scan line
      ctx!.beginPath();
      ctx!.moveTo(0, scanY);
      ctx!.lineTo(w, scanY);
      ctx!.strokeStyle = "oklch(0.62 0.19 220 / 0.6)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Scan line glow
      ctx!.beginPath();
      ctx!.moveTo(0, scanY);
      ctx!.lineTo(w, scanY);
      ctx!.strokeStyle = "oklch(0.62 0.19 220 / 0.15)";
      ctx!.lineWidth = 8;
      ctx!.filter = "blur(3px)";
      ctx!.stroke();
      ctx!.filter = "none";

      // Data particles
      drawParticles(ctx!, w, h, t);

      anim = requestAnimationFrame(animate);
    }

    anim = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
