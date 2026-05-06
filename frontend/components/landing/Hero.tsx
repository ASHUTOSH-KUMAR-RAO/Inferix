"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      { r: 220, g: 20, b: 20 },
      { r: 200, g: 10, b: 10 },
      { r: 255, g: 50, b: 30 },
      { r: 180, g: 0, b: 0 },
      { r: 240, g: 60, b: 40 },
    ];

    type Streak = {
      x: number;
      y: number;
      angle: number;
      length: number;
      width: number;
      color: { r: number; g: number; b: number };
      opacity: number;
      maxOpacity: number;
      phase: string;
      progress: number;
      speed: number;
      life: number;
      maxLife: number;
    };

    function createStreak(): Streak {
      const c = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * canvas!.width * 1.4 - canvas!.width * 0.2,
        y: -80,
        angle: (Math.PI / 180) * (48 + Math.random() * 22),
        length: 200 + Math.random() * 280,
        width: 40 + Math.random() * 110,
        color: c,
        opacity: 0,
        maxOpacity: 0.35 + Math.random() * 0.38,
        phase: "in",
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        life: 0,
        maxLife: 200 + Math.random() * 200,
      };
    }

    const streaks: Streak[] = [];
    for (let i = 0; i < 6; i++) {
      const s = createStreak();
      s.life = Math.random() * s.maxLife;
      s.opacity = s.maxOpacity * 0.5;
      s.phase = "hold";
      streaks.push(s);
    }

    function drawStreak(s: Streak) {
      if (!ctx) return;
      const dx = Math.cos(s.angle) * s.length;
      const dy = Math.sin(s.angle) * s.length;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
      const { r, g, b } = s.color;
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.3, `rgba(${r},${g},${b},${s.opacity})`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},${s.opacity * 0.8})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      const nx = -Math.sin(s.angle);
      const ny = Math.cos(s.angle);
      const hw = s.width / 2;
      ctx.beginPath();
      ctx.moveTo(s.x + nx * hw, s.y + ny * hw);
      ctx.lineTo(s.x + dx + nx * hw, s.y + dy + ny * hw);
      ctx.lineTo(s.x + dx - nx * hw, s.y + dy - ny * hw);
      ctx.lineTo(s.x - nx * hw, s.y - ny * hw);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.life += 1;
        s.progress += s.speed;
        if (s.phase === "in") {
          s.opacity = s.maxOpacity * Math.min(s.progress / 0.3, 1);
          if (s.progress >= 0.3) s.phase = "hold";
        } else if (s.phase === "hold") {
          s.opacity = s.maxOpacity * (0.85 + Math.sin(s.life * 0.04) * 0.15);
          if (s.life >= s.maxLife) s.phase = "out";
        } else if (s.phase === "out") {
          s.opacity = s.maxOpacity * Math.max(1 - (s.progress - 0.7) / 0.3, 0);
          if (s.opacity <= 0) {
            streaks.splice(i, 1);
            streaks.push(createStreak());
            continue;
          }
        }
        drawStreak(s);
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative h-[600px] bg-black overflow-hidden flex flex-col items-center justify-center text-center px-5">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl w-full">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center bg-[#0a0a0a]/90 border border-red-800/55 rounded-full mb-8 shadow-[0_0_24px_rgba(180,40,20,0.2)] cursor-pointer hover:border-red-600/80 transition-all"
        >
          <span className="text-[13px] font-medium text-white px-4 py-2">
            Introducing Inferix
          </span>
          <div className="w-px h-[18px] bg-white/12" />
          <span className="text-[13px] text-white/42 px-4 py-2">
            Run AI locally →
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="text-[clamp(40px,8vw,68px)] font-medium leading-[1.05] tracking-[-2.5px] text-white mb-5"
        >
          Your private AI,
          <br />
          <span className="text-white/22">running locally.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="text-[16px] text-white/38 leading-[1.75] max-w-[440px] mx-auto mb-10"
        >
          Run, benchmark, and compare Small Language Models on your own machine.
          No cloud. No cost. No compromise.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36 }}
          className="flex gap-3 justify-center flex-wrap"
        >
          <Link
            href="/sign-up"
            className="bg-white text-black text-[14px] font-medium px-6 py-3 rounded-[10px] hover:bg-white/88 transition-all"
          >
            Get started free
          </Link>
          <Link
            href="https://github.com/ASHUTOSH-KUMAR-RAO/Inferix"
            target="_blank"
            className="bg-white/05 border border-white/14 text-white/65 text-[14px] px-6 py-3 rounded-[10px] hover:bg-white/09 hover:text-white transition-all"
          >
            View on GitHub →
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/18 text-[11px] tracking-wide"
      >
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        scroll
      </motion.div>
    </section>
  );
}
