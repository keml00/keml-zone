import { MessageCircle, Heart, ArrowUp } from "lucide-react";
import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-12 pb-8">
      <div className="section-container px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="text-xl font-extrabold tracking-tight flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#06b6d4] flex items-center justify-center text-white text-xs font-bold">
                K
              </span>
              <span className="gradient-text">Keml Studio</span>
            </a>
            <p className="text-sm text-[#64748b] leading-relaxed max-w-xs">
              Создаём современные сайты, Telegram-ботов, AI-решения и CRM-системы
              в Казани и Татарстане.
            </p>
            <VisitorCounter />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#94a3b8] mb-1">Услуги</p>
            {[
              "Лендинг под ключ",
              "Корпоративный сайт",
              "Интернет-магазин",
              "Telegram-бот",
              "AI чат-бот",
            ].map((s) => (
              <a
                key={s}
                href="#services"
                className="text-sm text-[#64748b] hover:text-[#a855f7] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#94a3b8] mb-1">Контакты</p>
            <a
              href="https://t.me/keml00"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a855f7] transition-colors"
            >
              <MessageCircle size={14} />
              @keml00
            </a>
            <a
              href="mailto:keml00@icloud.com"
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a855f7] transition-colors"
            >
              keml00@icloud.com
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a855f7] transition-colors mt-2"
            >
              <ArrowUp size={14} />
              Наверх
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-sm text-[#64748b]">
            &copy; {new Date().getFullYear()} Keml Studio. Все права защищены.
          </p>
          <p className="text-xs text-[#64748b] flex items-center gap-1">
            Сделано с <Heart size={12} className="text-[#ef4444]" /> в Казани
          </p>
        </div>
      </div>
    </footer>
  );
}
