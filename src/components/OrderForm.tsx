"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, MessageCircle, User, FileText } from "lucide-react";
import { sendToTelegram } from "@/lib/utils";

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", telegram: "", description: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;
    setStatus("loading");
    try {
      await sendToTelegram({
        type: "order",
        name: form.name,
        telegram: form.telegram,
        message: form.description,
      });
      setStatus("success");
      setForm({ name: "", telegram: "", description: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section id="order" className="section-padding relative">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/25 to-transparent" />
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-label">
            <FileText size={14} />
            Заявка
          </span>
          <h2 className="section-title">
            Обсудим ваш <span className="gradient-text">проект</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Оставьте заявку — мы свяжемся с вами в ближайшее время
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="glass-card rounded-[1.5rem] p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2 text-[#94a3b8]">
              Ваше имя <span className="text-[#a855f7]">*</span>
            </label>
            <div className="relative">
              <User
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
              />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Иван"
                className="w-full bg-[#0a0a12] border border-white/8 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#94a3b8]">
              Telegram для связи
            </label>
            <div className="relative">
              <MessageCircle
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
              />
              <input
                type="text"
                value={form.telegram}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                placeholder="@username"
                className="w-full bg-[#0a0a12] border border-white/8 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#94a3b8]">
              Описание задачи <span className="text-[#a855f7]">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={4}
              placeholder="Расскажите о вашем проекте..."
              className="w-full bg-[#0a0a12] border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full justify-center text-base disabled:opacity-60"
          >
            {status === "loading" ? (
              <Loader2 size={20} className="animate-spin" />
            ) : status === "success" ? (
              <>
                <CheckCircle size={20} />
                Отправлено!
              </>
            ) : (
              <>
                Отправить заявку
                <Send size={18} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
