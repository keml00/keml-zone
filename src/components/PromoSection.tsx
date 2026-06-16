"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Gift, ArrowRight, Sparkles, Timer } from "lucide-react";

const saleEnd = new Date();
saleEnd.setDate(saleEnd.getDate() + 14);

function useTimer() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = saleEnd.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const promos = [
  {
    title: "Лендинг под ключ",
    oldPrice: "70 000 ₽",
    newPrice: "35 000 ₽",
    badge: "-50%",
    desc: "Одностраничный сайт с премиум-дизайном",
  },
  {
    title: "Telegram-бот",
    oldPrice: "40 000 ₽",
    newPrice: "20 000 ₽",
    badge: "-50%",
    desc: "Чат-бот с автоворонками и интеграциями",
  },
  {
    title: "AI чат-бот",
    oldPrice: "70 000 ₽",
    newPrice: "35 000 ₽",
    badge: "-50%",
    desc: "Умный AI-ассистент на базе GPT",
  },
  {
    title: "CRM автоматизация",
    oldPrice: "100 000 ₽",
    newPrice: "50 000 ₽",
    badge: "-50%",
    desc: "Внедрение CRM и автоматизация процессов",
  },
];

export default function PromoSection() {
  const t = useTimer();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/5 via-transparent to-[#06b6d4]/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#a855f7] rounded-full blur-[200px] opacity-[0.08] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#ef4444] rounded-full blur-[200px] opacity-[0.05]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-label section-label-warm">
            <Zap size={13} />
            Акция
          </span>
          <h2 className="section-title">
            Скидки до <span className="gradient-text-warm">50%</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Сейчас берём проекты за полцены для пополнения портфолио и кейсов.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-[1.5rem] p-6 sm:p-8 text-center gradient-border-warm neon-glow-warm relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#ef4444] rounded-full blur-[80px] opacity-15" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#f97316] rounded-full blur-[80px] opacity-10" />

            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#ef4444]" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#ef4444]">
                Ограниченное предложение
              </span>
              <Sparkles size={18} className="text-[#ef4444]" />
            </div>

            <p className="text-lg sm:text-xl text-[#94a3b8] mb-6">
              Сейчас действуют скидки до 50% на разработку сайтов, Telegram-ботов
              и AI-автоматизацию.
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
              {[
                { label: "Дней", value: t.days },
                { label: "Часов", value: t.hours },
                { label: "Минут", value: t.minutes },
                { label: "Секунд", value: t.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-[1rem] bg-[#0a0a12] border border-[#a855f7]/15 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold gradient-text font-mono">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-[#64748b] mt-1.5 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-[#94a3b8]">
              <Timer size={14} />
              <span>Предложение ограничено по времени</span>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card rounded-[1.25rem] p-6 card-hover relative overflow-hidden group"
            >
              <div className="absolute -top-3 -right-3">
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  whileInView={{ rotate: -15, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-full flex items-center justify-center shadow-lg shadow-[#ef4444]/30"
                >
                  <span className="text-sm font-black text-white">{p.badge}</span>
                </motion.div>
              </div>

              <h3 className="text-base font-semibold mb-4 pr-12">{p.title}</h3>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold gradient-text-warm">
                  {p.newPrice}
                </span>
                <span className="text-sm text-[#64748b] line-through">
                  {p.oldPrice}
                </span>
              </div>

              <p className="text-sm text-[#94a3b8] mb-5">{p.desc}</p>

              <a
                href="#order"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#ef4444]/30 transition-all hover:-translate-y-0.5"
              >
                Получить скидку
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
