"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-label">
            <Send size={14} />
            Контакты
          </span>
          <h2 className="section-title">
            Свяжитесь с <span className="gradient-text">нами</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Ответим на все вопросы и предложим лучшее решение для вашего бизнеса
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.a
              href="https://t.me/keml00"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-[1.25rem] p-6 card-hover flex flex-col items-center text-center gap-3 group"
            >
              <div className="icon-wrap icon-wrap-large group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-300">
                <MessageCircle size={24} className="text-[#a855f7]" />
              </div>
              <p className="font-semibold">Telegram</p>
              <p className="text-sm text-[#94a3b8]">@keml00</p>
            </motion.a>

            <motion.a
              href="mailto:keml00@icloud.com"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card rounded-[1.25rem] p-6 card-hover flex flex-col items-center text-center gap-3 group"
            >
              <div className="icon-wrap icon-wrap-large group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-300">
                <Mail size={24} className="text-[#a855f7]" />
              </div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-[#94a3b8]">keml00@icloud.com</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card rounded-[1.25rem] p-6 card-hover flex flex-col items-center text-center gap-3 group"
            >
              <div className="icon-wrap icon-wrap-large group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-300">
                <Clock size={24} className="text-[#a855f7]" />
              </div>
              <p className="font-semibold">Время работы</p>
              <p className="text-sm text-[#94a3b8]">
                Пн-Пт: 10:00 - 20:00
                <br />
                Сб-Вс: по договорённости
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
