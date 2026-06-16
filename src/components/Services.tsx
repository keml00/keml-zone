"use client";

import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Bot,
  Cpu,
  Layout,
  BarChart3,
  HeadphonesIcon,
  Database,
} from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Лендинг под ключ",
    price: "от 35 000 ₽",
    range: "35 000 – 90 000 ₽",
    desc: "Одностраничный сайт для презентации продукта или услуги с высоким уровнем конверсии.",
  },
  {
    icon: Globe,
    title: "Корпоративный сайт",
    price: "от 70 000 ₽",
    range: "70 000 – 180 000 ₽",
    desc: "Многостраничный сайт для компании с каталогом, новостями и контактами.",
  },
  {
    icon: ShoppingCart,
    title: "Интернет-магазин",
    price: "от 120 000 ₽",
    range: "от 120 000 ₽",
    desc: "Полноценный интернет-магазин с корзиной, оплатой и личным кабинетом.",
  },
  {
    icon: Bot,
    title: "Telegram-бот",
    price: "от 20 000 ₽",
    range: "от 20 000 ₽",
    desc: "Чат-бот для Telegram: автоворонки, заказы, уведомления и интеграции.",
  },
  {
    icon: Cpu,
    title: "AI чат-бот для бизнеса",
    price: "от 35 000 ₽",
    range: "от 35 000 ₽",
    desc: "Умный AI-ассистент на основе GPT для консультаций и обработки заявок 24/7.",
  },
  {
    icon: Database,
    title: "CRM и автоматизация",
    price: "от 50 000 ₽",
    range: "от 50 000 ₽",
    desc: "Внедрение CRM, автоматизация воронок продаж и бизнес-процессов.",
  },
  {
    icon: BarChart3,
    title: "SEO продвижение",
    price: "от 25 000 ₽/мес",
    range: "от 25 000 ₽/мес",
    desc: "Вывод сайта в топ Яндекса и Google. Оптимизация и рост трафика.",
  },
  {
    icon: HeadphonesIcon,
    title: "Техническая поддержка",
    price: "от 10 000 ₽/мес",
    range: "от 10 000 ₽/мес",
    desc: "Обновления, хостинг, безопасность и техническое сопровождение сайта.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/25 to-transparent" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <SparklesIcon />
            Услуги
          </span>
          <h2 className="section-title">
            Что мы <span className="gradient-text">предлагаем</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Актуальные цены на рынке Казани и Татарстана. Прозрачно, без
            скрытых платежей.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-card rounded-[1.25rem] p-6 card-hover group cursor-default"
            >
              <div className="icon-wrap mb-5">
                <s.icon size={22} className="text-[#a855f7]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-2xl font-bold gradient-text mb-3">{s.price}</p>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{s.desc}</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-[#64748b]">{s.range}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SparklesIcon() {
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
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </svg>
  );
}
