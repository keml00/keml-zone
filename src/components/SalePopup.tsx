"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, ArrowRight, Zap } from "lucide-react";

export default function SalePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("popup-shown");
    if (shown) return;

    const timer = setTimeout(() => setShow(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("popup-shown", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-card rounded-[1.75rem] p-8 sm:p-10 max-w-md w-full pointer-events-auto relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#a855f7] rounded-full blur-[120px] opacity-15" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#ef4444] rounded-full blur-[100px] opacity-10" />

              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#64748b] hover:text-white hover:bg-white/10 transition-all"
                aria-label="Закрыть"
              >
                <X size={15} />
              </button>

              <div className="text-center relative z-[1]">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                  className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-[#ef4444] to-[#f97316] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#ef4444]/30"
                >
                  <Gift size={30} className="text-white" />
                </motion.div>

                <div className="flex items-center justify-center gap-1.5 mb-3">
                  <Zap size={13} className="text-[#ef4444]" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#ef4444]">
                    Специальное предложение
                  </span>
                  <Zap size={13} className="text-[#ef4444]" />
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  Скидки до <span className="gradient-text-warm">50%</span>
                </h3>

                <p className="text-sm text-[#94a3b8] mb-6 leading-relaxed">
                  Сейчас берём проекты за полцены для пополнения портфолио и
                  кейсов. Успейте заказать по специальной цене!
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="#order"
                    onClick={close}
                    className="btn-primary justify-center text-base"
                  >
                    Получить скидку
                    <ArrowRight size={18} />
                  </a>
                  <button
                    onClick={close}
                    className="text-sm text-[#64748b] hover:text-white transition-colors py-1.5"
                  >
                    Нет, спасибо
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
