"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles } from "lucide-react";

export default function FloatingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = sessionStorage.getItem("banner-closed");
    if (!hidden) setVisible(true);
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem("banner-closed", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="glass-card rounded-[1.25rem] p-4 pl-5 pr-12 border border-[#ef4444]/15 shadow-2xl shadow-[#ef4444]/10 relative">
            <button
              onClick={close}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#64748b] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Закрыть"
            >
              <X size={14} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[0.75rem] bg-gradient-to-br from-[#ef4444] to-[#f97316] flex items-center justify-center shrink-0 shadow-lg shadow-[#ef4444]/20">
                <Gift size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold flex items-center gap-1.5">
                  Скидки до <span className="gradient-text-warm">50%</span>
                  <Sparkles size={12} className="text-[#ef4444]" />
                </p>
                <p className="text-xs text-[#94a3b8] truncate">
                  Сейчас проекты за полцены
                </p>
              </div>
              <a
                href="#order"
                onClick={close}
                className="shrink-0 btn-sale text-xs py-2 px-4"
              >
                Получить
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
