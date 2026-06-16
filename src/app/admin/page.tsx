"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Send,
  RefreshCw,
  Users,
  Eye,
  ShoppingCart,
  Bot,
  User,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Message {
  text: string;
  time: string;
  isAdmin: boolean;
}

interface Session {
  name: string;
  messages: Message[];
  unread?: number;
  lastTime?: string;
}

export default function AdminPage() {
  const [sessions, setSessions] = useState<Record<string, Session>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState({ visitors: 0, views: 0, orders: 0 });
  const [telegramInfo, setTelegramInfo] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      const data = await res.json();
      if (data.ok) {
        setSessions(data.sessions || {});
        setOrder(data.order || []);
        setStats(data.stats || { visitors: 0, views: 0, orders: 0 });
        setTelegramInfo(data.telegramInfo || "");
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadData();
    const id = setInterval(loadData, 3000);
    return () => clearInterval(id);
  }, [loadData]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected, sessions]);

  const handleReply = async () => {
    if (!replyText.trim() || !selected || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: selected, text: replyText.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        setReplyText("");
        await loadData();
      }
    } catch {}
    setSending(false);
  };

  const selectedSession = selected ? sessions[selected] : null;

  return (
    <div className="min-h-screen bg-[#07070d] pt-24 pb-12">
      <div className="section-container px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Админ-панель</span>
          </h1>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs text-[#64748b]">{telegramInfo}</span>
            <button
              onClick={loadData}
              className="text-xs text-[#a855f7] hover:text-white transition-colors flex items-center gap-1"
            >
              <RefreshCw size={12} />
              Обновить
            </button>
          </div>

          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Посетители", value: stats.visitors, color: "text-[#a855f7]" },
              { icon: Eye, label: "Просмотры", value: stats.views, color: "text-[#06b6d4]" },
              { icon: ShoppingCart, label: "Заявки", value: stats.orders, color: "text-[#a855f7]" },
              { icon: MessageCircle, label: "Чаты", value: Object.keys(sessions).length, color: "text-[#06b6d4]" },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon size={16} className={s.color} />
                  <p className="text-xs text-[#94a3b8]">{s.label}</p>
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <MessageCircle size={16} className="text-[#a855f7]" />
                  Чаты
                </h2>
                <span className="text-xs text-[#64748b]">{order.length} активных</span>
              </div>

              <div className="overflow-y-auto max-h-[600px]">
                {order.length === 0 && (
                  <div className="p-8 text-center text-sm text-[#64748b]">
                    Пока нет чатов
                  </div>
                )}
                {order.map((id) => {
                  const session = sessions[id];
                  if (!session) return null;
                  const lastMsg = session.messages[session.messages.length - 1];
                  return (
                    <button
                      key={id}
                      onClick={() => setSelected(id)}
                      className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors ${
                        selected === id ? "bg-[#a855f7]/8 border-l-2 border-l-[#a855f7]" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold flex items-center gap-1.5">
                          <User size={12} className="text-[#64748b]" />
                          {session.name}
                        </span>
                        {lastMsg && (
                          <span className="text-[10px] text-[#64748b]">
                            {new Date(lastMsg.time).toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                      {lastMsg && (
                        <p className="text-xs text-[#64748b] truncate">
                          {lastMsg.isAdmin ? "🟣 Вы: " : "⚪ "}
                          {lastMsg.text}
                        </p>
                      )}
                      <div className="flex gap-1 mt-1.5">
                        {session.messages.filter((m) => !m.isAdmin).length > 0 && (
                          <span className="text-[10px] text-[#a855f7]">
                            {session.messages.filter((m) => !m.isAdmin).length} сообщ.
                          </span>
                        )}
                        {session.messages.filter((m) => m.isAdmin).length > 0 && (
                          <span className="text-[10px] text-[#06b6d4]">
                            {session.messages.filter((m) => m.isAdmin).length} ответов
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

              <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden flex flex-col">
              {selected && selectedSession ? (() => {
                const currentId: string = selected;
                return (<>
                  <div className="p-4 border-b border-white/5">
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <User size={14} className="text-[#a855f7]" />
                      {sessions[currentId]?.name || "Гость"}
                    </p>
                    <p className="text-[10px] text-[#64748b]">
                      ID: {currentId} · {selectedSession.messages.length} сообщений
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px] min-h-[300px]">
                    {selectedSession.messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.isAdmin ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                            m.isAdmin
                              ? "bg-[#1a1a2e] text-[#cbd5e1] rounded-tl-sm border border-white/5"
                              : "bg-gradient-to-r from-[#a855f7] to-[#06b6d4] text-white rounded-tr-sm"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-1 mb-1 ${
                              m.isAdmin ? "" : "justify-end"
                            }`}
                          >
                            {m.isAdmin && <Bot size={11} className="text-[#a855f7]" />}
                            <span
                              className={`text-[10px] ${
                                m.isAdmin ? "text-[#64748b]" : "text-white/60"
                              }`}
                            >
                              {m.isAdmin ? "Админ" : sessions[currentId]?.name || "Клиент"}
                            </span>
                          </div>
                          <p>{m.text}</p>
                          <p
                            className={`text-[10px] mt-1 ${
                              m.isAdmin ? "text-[#64748b]" : "text-white/60"
                            }`}
                          >
                            {new Date(m.time).toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>

                  <div className="p-4 border-t border-white/5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleReply();
                          }
                        }}
                        placeholder="Напишите ответ..."
                        className="flex-1 bg-[#0a0a12] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#a855f7] transition-all"
                      />
                      <button
                        onClick={handleReply}
                        disabled={!replyText.trim() || sending}
                        className="btn-primary py-2.5 px-4 text-sm disabled:opacity-50"
                      >
                        {sending ? (
                          <RefreshCw size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-[#64748b] mt-2">
                      Ответ отправится клиенту на сайт. Чтобы ответить через Telegram — нажмите Reply на сообщении бота с [vid:...]
                    </p>
                    </div>
                  </>)})() : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <MessageCircle size={40} className="text-[#64748b]/30 mx-auto mb-3" />
                    <p className="text-sm text-[#64748b]">Выберите чат слева</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <ExternalLink size={14} className="text-[#06b6d4]" />
              Telegram — настройка подключения
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed mb-3">
              Чтобы сообщения с сайта приходили в Telegram, бот должен знать ваш
              chat_id. Напишите боту <strong>@kemlzone_bot</strong> в Telegram
              любое сообщение, затем нажмите кнопку ниже.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={async () => {
                  try {
                    const r = await fetch("/api/chat/setup");
                    const d = await r.json();
                    if (d.ok) {
                      setTelegramInfo(`Chat ID: ${d.chatId} (${d.title}) — подключён!`);
                    } else {
                      setTelegramInfo(`❌ ${d.error}`);
                    }
                  } catch {
                    setTelegramInfo("❌ Ошибка соединения");
                  }
                  loadData();
                }}
                className="text-xs px-4 py-2 rounded-full bg-gradient-to-r from-[#a855f7] to-[#06b6d4] text-white font-semibold hover:shadow-lg hover:shadow-[#a855f7]/30 transition-all"
              >
                🔄 Проверить и подключить
              </button>
              {telegramInfo && (
                <span className="text-xs text-[#94a3b8]">{telegramInfo}</span>
              )}
              <a
                href="/api/telegram-webhook?action=status"
                target="_blank"
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#94a3b8] hover:border-[#a855f7] transition-colors"
              >
                Статус вебхука
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
