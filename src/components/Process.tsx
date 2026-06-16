"use client";

import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Code,
  BugPlay,
  Rocket,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Анализ",
    desc: "Изучаем ваш бизнес, конкурентов и целевую аудиторию. Формируем ТЗ.",
    number: "01",
  },
  {
    icon: Palette,
    title: "Дизайн",
    desc: "Создаём современный UI/UX дизайн с учётом трендов 2026 года.",
    number: "02",
  },
  {
    icon: Code,
    title: "Разработка",
    desc: "Пишем чистый код на Next.js, React с фокусом на производительность.",
    number: "03",
  },
  {
    icon: BugPlay,
    title: "Тестирование",
    desc: "Тщательно тестируем на всех устройствах и браузерах.",
    number: "04",
  },
  {
    icon: Rocket,
    title: "Запуск",
    desc: "Деплоим на production, настраиваем аналитику и SEO.",
    number: "05",
  },
  {
    icon: HeartHandshake,
    title: "Поддержка",
    desc: "Обеспечиваем техническую поддержку и развитие проекта.",
    number: "06",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <ArrowRightIcon />
            Процесс
          </span>
          <h2 className="section-title">
            Как мы <span className="gradient-text">работаем</span>
          </h2>
          <p className="section-subtitle mx-auto">
            От идеи до запуска — прозрачный процесс с фиксированными сроками.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-gradient-to-r from-[#a855f7]/20 via-[#06b6d4]/20 to-[#a855f7]/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                <div className="glass-card rounded-[1.25rem] p-6 card-hover">
                  <span className="text-5xl font-black text-[#a855f7]/8 absolute top-3 right-4 select-none leading-none">
                    {s.number}
                  </span>
                  <div className="icon-wrap mb-5 relative">
                    <s.icon size={22} className="text-[#a855f7]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 relative">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed relative">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
