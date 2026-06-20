"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Dynamic Grid & Orb Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-75" />

      {/* Decorative Premium Glow Orbs */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#a855f7] orb opacity-[0.18] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-[#06b6d4] orb opacity-[0.14] animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7c3aed] orb opacity-[0.04]" />

      {/* Soft Bottom Transition Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070d] pointer-events-none" />

      {/* Main Content Container */}
      <div className="section-container px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Top Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 glass-light rounded-full px-4 py-2 border border-white/5 shadow-lg">
              <Sparkles size={14} className="text-[#a855f7] animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-[#e2e8f0]">
                Premium Digital Studio в Казани
              </span>
            </div>
            
            <a
              href="#promo"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#ef4444]/10 to-[#f97316]/10 border border-[#ef4444]/25 rounded-full px-4 py-2 text-xs sm:text-sm text-[#ef4444] font-semibold hover:from-[#ef4444]/20 hover:to-[#f97316]/20 hover:border-[#ef4444]/45 transition-all duration-300 group"
            >
              <Zap size={13} className="group-hover:animate-bounce" />
              Акция: скидки до 50%
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Glowing Center Core Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a855f7] to-[#06b6d4] blur-md opacity-25 absolute -z-10 animate-pulse-glow"
          />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-8 tracking-tight text-white"
          >
            Разработка{" "}
            <span className="gradient-text drop-shadow-[0_0_35px_rgba(168,85,247,0.18)]">
              сайтов в Казани
            </span>
            <br />
            и умных AI-решений
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#94a3b8] max-w-2xl mb-12 leading-relaxed font-normal"
          >
            Создаём современные веб-сайты, внедряем автоворонки и Telegram-ботов под ключ, 
            автоматизируем бизнес с помощью нейросетей. Повышаем вашу прибыль и снижаем рутину.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#order" className="btn-primary text-base px-8 justify-center shadow-lg shadow-[#a855f7]/25 hover:shadow-[#a855f7]/40">
              Обсудить проект
              <ArrowRight size={18} />
            </a>
            <a
              href="https://t.me/keml00"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 justify-center hover:bg-white/[0.03]"
            >
              <MessageCircle size={18} className="text-[#06b6d4]" />
              Написать в Telegram
            </a>
          </motion.div>

          {/* Technologies Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold tracking-wider uppercase text-[#64748b]"
          >
            {["Next.js", "React", "TypeScript", "TailwindCSS v4", "YandexGPT API"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 text-[#8a99ad] transition-all cursor-default"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
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
