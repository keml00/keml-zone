export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2, 11);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

export async function sendChatMessage(visitorId: string, name: string, text: string) {
  try {
    const res = await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "chat", visitorId, name, message: text }),
    });
    return res.json();
  } catch {
    return { ok: false };
  }
}

export async function pollChatMessages(visitorId: string, since = 0) {
  try {
    const res = await fetch(`/api/chat/poll?visitorId=${visitorId}&since=${since}`, {
      cache: "no-store",
    });
    return res.json();
  } catch {
    return { ok: true, messages: [], total: 0 };
  }
}

export async function sendToTelegram(data: {
  type: "order" | "chat";
  name: string;
  message: string;
  telegram?: string;
}) {
  try {
    let visitorId = localStorage.getItem("chat_visitor_id");
    if (!visitorId) {
      visitorId = generateId();
      localStorage.setItem("chat_visitor_id", visitorId);
    }
    const res = await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, visitorId }),
    });
    return res.json();
  } catch {
    return { ok: false };
  }
}
