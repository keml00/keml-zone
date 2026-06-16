import { NextRequest, NextResponse } from "next/server";
import { addVisitorMessage, getSavedChatId, saveChatId } from "@/lib/chat-store";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const { type, visitorId, name, telegram, message } = await req.json();

    if (!visitorId || !name || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    try {
      await addVisitorMessage(visitorId, name, message);
    } catch (e) {
      console.error("addVisitorMessage error:", e);
    }

    if (!TG_TOKEN) {
      return NextResponse.json({ ok: true, warning: "No Telegram bot configured." });
    }

    let chatId = await getSavedChatId();

    if (!chatId) {
      try {
        const res = await fetch(
          `https://api.telegram.org/bot${TG_TOKEN}/getUpdates?limit=5`,
          { cache: "no-store", signal: AbortSignal.timeout(20000) }
        );
        const data: any = await res.json();
        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result) {
            const chat = update.message?.chat || update.my_chat_member?.chat;
            if (chat?.id) {
              const found = chat.id.toString();
              chatId = found;
              await saveChatId(found);
              break;
            }
          }
        }
      } catch (e) {
        console.error("resolveChatId error:", e);
      }
    }

    if (!chatId) {
      return NextResponse.json({
        ok: true,
        needSetup: true,
        warning: "Напишите боту @kemlzone_bot в Telegram любое сообщение, затем нажмите 'Проверить' в админ-панели.",
      });
    }

    const safeMessage = message.length > 4000 ? message.slice(0, 4000) + "…" : message;

    const text = type === "order"
      ? `🆕 <b>Новая заявка!</b>\n\n👤 Имя: ${esc(name)}\n💬 Telegram: ${esc(telegram || "не указан")}\n📝 Описание:\n${esc(safeMessage)}`
      : `💬 <b>Сообщение из чата</b>\n\n[vid:${visitorId}]\n👤 ${esc(name)}\n📝 ${esc(safeMessage)}`;

    const sent = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      signal: AbortSignal.timeout(20000),
    });
    const sentData = await sent.json();

    if (!sentData.ok) {
      console.error("Telegram sendMessage error:", sentData);
      return NextResponse.json({
        ok: false,
        error: `Ошибка Telegram: ${sentData.description || "неизвестная"}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send error:", e);
    return NextResponse.json({ ok: false, error: "Ошибка отправки." });
  }
}
