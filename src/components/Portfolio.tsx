"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, FolderKanban } from "lucide-react";

const projects = [
  {
    title: "VPN Service Landing",
    desc: "Современный лендинг для VPN сервиса с интеграцией Telegram-бота и платёжной системы.",
    tags: ["Next.js", "Tailwind", "Telegram Bot"],
    link: "#",
  },
  {
    title: "AI Чат-бот для E-commerce",
    desc: "Умный AI-ассистент для онлайн-магазина с обработкой заказов и консультациями 24/7.",
    tags: ["AI", "GPT", "Python", "Telegram"],
    link: "#",
  },
  {
    title: "CRM Автоматизация",
    desc: "Полная автоматизация воронки продаж для оптовой компании с интеграцией 1С.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Telegram Бот для доставки",
    desc: "Бот для приёма заказов с корзиной, оплатой через ЮKassa и уведомлениями.",
    tags: ["Python", "aiogram", "SQLite"],
    link: "#",
  },
  {
    title: "Корпоративный сайт",
    desc: "Многостраничный сайт для IT-компании с блогом, кейсами и вакансиями.",
    tags: ["Next.js", "Sanity CMS", "Tailwind"],
    link: "#",
  },
  {
    title: "AI Аналитика вакансий",
    desc: "Сервис автоматического анализа вакансий с помощью AI для HR-отдела.",
    tags: ["Python", "GPT", "Streamlit"],
    link: "#",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <FolderKanban size={14} />
            Портфолио
          </span>
          <h2 className="section-title">
            Наши <span className="gradient-text">проекты</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Кейсы, которыми мы гордимся. Каждый проект — это результат
            внимательного подхода к задачам бизнеса.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.link}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group glass-card rounded-[1.25rem] p-6 card-hover block relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#a855f7]/10 to-[#06b6d4]/5 rounded-full blur-2xl" />

              <div className="flex items-center justify-between mb-4 relative">
                <div className="icon-wrap">
                  <ExternalLink size={18} className="text-[#a855f7]" />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#64748b] group-hover:text-[#a855f7] transition-colors -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all duration-300 relative">
                {p.title}
              </h3>
              <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed relative">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 relative">
                {p.tags.map((t, j) => (
                  <span
                    key={j}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#a855f7]/8 text-[#a855f7] border border-[#a855f7]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
