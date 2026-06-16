import { NextRequest, NextResponse } from "next/server";
import { addAdminReply } from "@/lib/chat-store";

export const dynamic = "force-dynamic";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const { visitorId, text } = await req.json();

    if (!visitorId || !text?.trim()) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    await addAdminReply(visitorId, text.trim());

    if (TG_TOKEN) {
      try {
        let chatId = TG_CHAT_ID;
        if (!chatId) {
          const res = await fetch(
            `https://api.telegram.org/bot${TG_TOKEN}/getUpdates?limit=1`,
            { cache: "no-store", signal: AbortSignal.timeout(20000) }
          );
          const data: any = await res.json();
          if (data.ok && data.result?.[0]?.message?.chat?.id) {
            chatId = data.result[0].message.chat.id.toString();
          }
        }

        if (chatId) {
          const tgText = `📤 <b>Ответ отправлен клиенту</b>\n[vid:${visitorId}]\n\n${esc(text.trim())}`;
          await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: tgText, parse_mode: "HTML" }),
          });
        }
      } catch (e) {
        console.error("Failed to forward admin reply to Telegram:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("admin/reply error:", e);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
