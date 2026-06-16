"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, Zap, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg" />

      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#a855f7] orb opacity-20 animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-[#06b6d4] orb opacity-15 animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7c3aed] orb opacity-[0.06]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070d] pointer-events-none" />

      <div className="section-container px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 glass-light rounded-full px-4 py-2">
              <Sparkles size={15} className="text-[#a855f7]" />
              <span className="text-sm text-[#94a3b8]">
                Premium digital agency в Казани
              </span>
            </div>
            <a
              href="#promo"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#ef4444]/10 to-[#f97316]/10 border border-[#ef4444]/25 rounded-full px-4 py-2 text-sm text-[#ef4444] font-semibold hover:from-[#ef4444]/20 hover:to-[#f97316]/20 hover:border-[#ef4444]/40 transition-all group"
            >
              <Zap size={13} className="group-hover:animate-pulse" />
              Скидки до 50%
              <ArrowRight size={13} />
            </a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight"
          >
            Разработка{" "}
            <span className="gradient-text">сайтов и AI</span>
            <br />
            решений для бизнеса
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mb-10 leading-relaxed"
          >
            Создаём сайты, Telegram-ботов, AI-автоматизацию и CRM-системы,
            которые приносят реальные результаты вашему бизнесу.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#order" className="btn-primary text-base">
              Обсудить проект
              <ArrowRight size={18} />
            </a>
            <a
              href="https://t.me/keml00"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base"
            >
              <MessageCircle size={18} />
              Telegram
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#64748b]"
          >
            {["Next.js", "React", "TypeScript", "Tailwind", "AI / GPT"].map(
              (tech, i) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[#64748b]"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-[#64748b]/40 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-[#a855f7] to-[#06b6d4]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
