"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Сколько времени занимает разработка сайта?",
    a: "Лендинг делаем за 5-7 дней, корпоративный сайт — 2-3 недели, интернет-магазин — 3-6 недель. Сроки зависят от сложности проекта.",
  },
  {
    q: "Какие технологии вы используете?",
    a: "Мы работаем на Next.js, React, TypeScript, TailwindCSS. Для бэкенда используем Python/Node.js. Базы данных — PostgreSQL, SQLite. AI-решения на базе GPT и открытых моделей.",
  },
  {
    q: "Вы даёте гарантию на работу?",
    a: "Да. Предоставляем гарантию 30 дней на все работы. В течение этого срока бесплатно исправляем любые недочёты.",
  },
  {
    q: "Нужно ли платить за хостинг отдельно?",
    a: "Хостинг оплачивается отдельно. Мы помогаем с выбором и настройкой, рекомендуем оптимальные варианты под ваш проект.",
  },
  {
    q: "Работаете с самозанятыми и ИП?",
    a: "Да, работаем по договору ГПХ с самозанятыми, ИП и физлицами. Все официально, с актами и закрывающими документами.",
  },
  {
    q: "Делаете SEO-оптимизацию?",
    a: "Да, мы закладываем SEO-базу на этапе разработки: мета-теги, структура, скорость загрузки, OpenGraph, schema.org. Также предлагаем ежемесячное SEO-продвижение.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding relative">
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-label">
            <HelpCircle size={14} />
            FAQ
          </span>
          <h2 className="section-title">
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full glass-card rounded-[1rem] p-5 text-left flex items-center justify-between gap-4 transition-all duration-300 ${
                  openIndex === i ? "rounded-b-none border-b-0" : ""
                }`}
              >
                <span className="font-medium text-sm sm:text-base">
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full bg-[#a855f7]/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 bg-[#a855f7]/20" : ""
                  }`}
                >
                  <ChevronDown size={15} className="text-[#a855f7]" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="glass-card rounded-[1rem] rounded-t-none border-t-0 px-5 py-4 text-sm text-[#94a3b8] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
