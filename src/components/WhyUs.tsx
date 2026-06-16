"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Bot,
  Palette,
  HeadphonesIcon,
  Infinity,
  ShieldCheck,
  Star,
} from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Скорость",
    desc: "Лендинг за 5-7 дней. MVP за 2 недели. Работаем без дедлайн-стресса.",
  },
  {
    icon: Bot,
    title: "AI автоматизация",
    desc: "Внедряем искусственный интеллект для оптимизации бизнес-процессов.",
  },
  {
    icon: Palette,
    title: "Современный дизайн",
    desc: "Трендовый UI/UX 2026: glassmorphism, неон, микроанимации.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка 24/7",
    desc: "Всегда на связи. Отвечаем в Telegram, почте и по телефону.",
  },
  {
    icon: Infinity,
    title: "Работа под ключ",
    desc: "Берём на себя всё: от идеи до хостинга и аналитики.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия качества",
    desc: "Фиксируем сроки и бюджет. Прозрачная отчётность на каждом этапе.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <Star size={14} />
            Преимущества
          </span>
          <h2 className="section-title">
            Почему выбирают <span className="gradient-text">нас</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Мы не просто делаем сайты — мы создаём инструменты для роста
            вашего бизнеса.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.07,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card rounded-[1.25rem] p-6 card-hover text-center group"
            >
              <div className="icon-wrap icon-wrap-large mx-auto mb-5">
                <r.icon size={24} className="text-[#a855f7]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
