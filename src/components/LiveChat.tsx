"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, CheckCheck, Clock } from "lucide-react";
import { generateId, formatDate, sendChatMessage, pollChatMessages } from "@/lib/utils";

interface Message {
  text: string;
  time: Date;
  isUser: boolean;
  id?: number;
}

const WELCOME_MESSAGE =
  "Здравствуйте! Напишите нам, и мы ответим в ближайшее время.";

export default function LiveChat() {
  const [ready, setReady] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: WELCOME_MESSAGE, time: new Date(0), isUser: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [serverTotal, setServerTotal] = useState(0);
  const [adminOnline, setAdminOnline] = useState(false);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPollingRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const seenIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    let id = localStorage.getItem("chat_visitor_id");
    if (!id) {
      id = generateId();
      localStorage.setItem("chat_visitor_id", id);
    }
    setVisitorId(id);

    const savedName = localStorage.getItem("chat_user_name") || "";
    setName(savedName);
    if (savedName) setShowNameInput(false);

    setReady(true);
  }, []);

  useEffect(() => {
    if (!visitorId || historyLoaded) return;
    (async () => {
      try {
        const data = await pollChatMessages(visitorId, 0);
        if (data.ok && data.messages?.length > 0) {
          const parsed = data.messages.map((m: { text: string; time: string; isAdmin: boolean; id?: number }, i: number) => ({
            text: m.text,
            time: new Date(m.time),
            isUser: !m.isAdmin,
            id: m.id || i,
          }));
          parsed.forEach((m: Message) => { if (m.id) seenIdsRef.current.add(m.id); });
          setMessages(parsed);
        }
        if (data.ok) setServerTotal(data.total || 0);
      } catch {}
      setHistoryLoaded(true);
    })();
  }, [visitorId, historyLoaded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const poll = useCallback(async () => {
    if (!visitorId || !open) return;
    if (isPollingRef.current) return;
    isPollingRef.current = true;
    try {
      const data = await pollChatMessages(visitorId, serverTotal);
      if (data.ok) {
        if (data.messages?.length > 0) {
          const deduped = data.messages.filter(
            (m: { isAdmin: boolean; id?: number }) => m.isAdmin && m.id && !seenIdsRef.current.has(m.id)
          );
          if (deduped.length > 0) {
            const newMsgs = deduped.map((m: { text: string; time: string; id?: number }) => ({
              text: m.text,
              time: new Date(m.time),
              isUser: false,
              id: m.id,
            }));
            newMsgs.forEach((m: Message) => { if (m.id) seenIdsRef.current.add(m.id); });
            setMessages((prev) => [...prev, ...newMsgs]);
            setAdminOnline(true);
          }
        }
        setServerTotal(data.total || 0);
      }
    } catch {}
    isPollingRef.current = false;
  }, [visitorId, open, serverTotal]);

  useEffect(() => {
    if (!open) return;
    poll();
    pollTimerRef.current = setInterval(() => {
      if (!isPollingRef.current) poll();
    }, 3000);
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [open, poll]);

  useEffect(() => {
    if (messages.length > 1) {
      const hasAdminReply = messages.some(
        (m) => !m.isUser && m.time.getTime() > 0
      );
      setAdminOnline(hasAdminReply);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !name.trim() || loading || !historyLoaded) return;
    setLoading(true);
    const userMsg: Message = { text: text.trim(), time: new Date(), isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setText("");

    try {
      const res = await sendChatMessage(visitorId, name.trim(), text.trim());
      if (res?.ok) {
        setServerTotal((prev) => prev + 1);
      }
    } catch {}

    setLoading(false);
  };

  const handleNameSubmit = () => {
    if (!name.trim()) return;
    localStorage.setItem("chat_user_name", name.trim());
    setShowNameInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showNameInput) {
        handleNameSubmit();
      } else {
        handleSend();
      }
    }
  };

  if (!ready) return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#a855f7] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-[#a855f7]/30 cursor-pointer hover:shadow-xl hover:shadow-[#a855f7]/40 transition-shadow"
        aria-label="Чат"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && messages.length > 1 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center">
            {messages.filter((m) => !m.isUser && m.time.getTime() > 0).length || "!"}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-1.5rem)] glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
          >
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#a855f7]/5 to-[#06b6d4]/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold gradient-text">Чат с нами</p>
                  <p className="text-xs text-[#64748b] flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full inline-block ${
                        adminOnline ? "bg-[#22c55e]" : "bg-[#64748b]"
                      }`}
                    />
                    {adminOnline ? "Мы онлайн" : "Мы ответим в ближайшее время"}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#07070d]/50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.isUser ? "justify-end" : "justify-start"} ${
                    i === 0 ? "opacity-80" : ""
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.isUser
                        ? "bg-gradient-to-r from-[#a855f7] to-[#06b6d4] text-white rounded-tr-sm"
                        : "bg-[#1a1a2e] text-[#cbd5e1] rounded-tl-sm border border-white/5"
                    }`}
                  >
                    {!m.isUser && i === 0 ? null : (
                      <div
                        className={`flex items-center gap-1 mb-1 ${
                          m.isUser ? "justify-end" : ""
                        }`}
                      >
                        {!m.isUser && i > 0 && (
                          <Bot size={11} className="text-[#a855f7]" />
                        )}
                        <span
                          className={`text-[10px] ${
                            m.isUser ? "text-white/60" : "text-[#64748b]"
                          }`}
                        >
                          {m.isUser ? "Вы" : i === 0 ? "Keml Studio" : "Админ"}
                        </span>
                      </div>
                    )}
                    <p className="leading-relaxed">{m.text}</p>
                    {m.time.getTime() > 0 && (
                      <div
                        className={`flex items-center gap-1 mt-1 ${
                          m.isUser ? "justify-end" : ""
                        }`}
                      >
                        <span
                          className={`text-[10px] ${
                            m.isUser ? "text-white/50" : "text-[#64748b]"
                          }`}
                        >
                          {formatDate(m.time)}
                        </span>
                        {m.isUser && (
                          <CheckCheck size={11} className="text-white/50" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-white/5 bg-[#11111e]">
              {showNameInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ваше имя..."
                    className="flex-1 bg-[#0a0a12] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#a855f7] transition-all"
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="btn-primary py-2.5 px-4 text-sm"
                    disabled={!name.trim()}
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Введите сообщение..."
                    rows={1}
                    className="flex-1 bg-[#0a0a12] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#a855f7] transition-all resize-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!text.trim() || loading}
                    className="btn-primary py-2.5 px-4 text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
