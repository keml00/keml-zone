import { NextResponse } from "next/server";
import { getSavedChatId, saveChatId } from "@/lib/chat-store";

export const dynamic = "force-dynamic";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function GET() {
  if (!TG_TOKEN) {
    return NextResponse.json({ ok: false, error: "Бот не настроен (нет токена)" });
  }

  const saved = await getSavedChatId();
  if (saved) {
    return NextResponse.json({ ok: true, chatId: saved, source: "saved" });
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TG_TOKEN}/getUpdates?limit=10`,
      { cache: "no-store",       signal: AbortSignal.timeout(20000) }
    );
    const data: any = await res.json();

    if (!data.ok || !Array.isArray(data.result)) {
      return NextResponse.json({ ok: false, error: "Ошибка Telegram API", details: data });
    }

    if (data.result.length === 0) {
      return NextResponse.json({
        ok: false,
        error: "Нет сообщений. Напишите боту @kemlzone_bot в Telegram любое сообщение и обновите страницу.",
      });
    }

    for (const update of data.result) {
      const chat = update.message?.chat || update.my_chat_member?.chat;
      if (chat?.id) {
        await saveChatId(chat.id.toString());
        return NextResponse.json({
          ok: true,
          chatId: chat.id.toString(),
          chatType: chat.type,
          title: chat.title || chat.first_name || "Unknown",
          source: "telegram",
        });
      }
    }

    return NextResponse.json({ ok: false, error: "Не удалось определить chat_id из полученных сообщений." });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: `Ошибка соединения с Telegram: ${e.message}` });
  }
}
