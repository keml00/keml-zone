"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquareQuote } from "lucide-react";

const reviews = [
  {
    name: "Алексей",
    role: "Владелец интернет-магазина",
    text: "Сделали отличный магазин на Next.js. Всё летает, конверсия выросла на 40%. Отдельное спасибо за интеграцию с Telegram — теперь все заказы приходят моментально.",
    rating: 5,
  },
  {
    name: "Екатерина",
    role: "CEO маркетингового агентства",
    text: "Заказывали лендинг для нового продукта. Ребята сделали всё за 6 дней. Дизайн — огонь, анимации премиум. Рекомендую!",
    rating: 5,
  },
  {
    name: "Марат",
    role: "Директор логистической компании",
    text: "Внедрили CRM и Telegram-бота для клиентов. Автоматизировали 80% запросов. Окупилось за месяц. Очень доволен сотрудничеством.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">
            <MessageSquareQuote size={14} />
            Отзывы
          </span>
          <h2 className="section-title">
            Что говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Реальные отзывы реальных заказчиков из Казани и Татарстана.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card rounded-[1.25rem] p-6 card-hover relative"
            >
              <Quote
                size={36}
                className="absolute top-5 right-5 text-[#a855f7]/8"
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={15}
                    className="fill-[#a855f7] text-[#a855f7]"
                  />
                ))}
              </div>
              <p className="text-sm text-[#cbd5e1] mb-5 leading-relaxed relative z-[1]">
                &quot;{r.text}&quot;
              </p>
              <div className="flex items-center gap-3 relative z-[1]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a855f7] to-[#06b6d4] flex items-center justify-center text-white text-sm font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-xs text-[#64748b]">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
