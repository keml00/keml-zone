import { NextRequest, NextResponse } from "next/server";
import { addAdminReply } from "@/lib/chat-store";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function extractVisitorId(text: string): string | null {
  const match = text.match(/\[vid:([a-f0-9-]+)\]/);
  return match ? match[1] : null;
}

export async function POST(req: NextRequest) {
  try {
    if (!TG_TOKEN) {
      return NextResponse.json({ ok: false, error: "Bot not configured" });
    }

    const update = await req.json();

    if (!update.message || !update.message.text) {
      return NextResponse.json({ ok: true });
    }

    const msg = update.message;
    if (msg.from?.is_bot) {
      return NextResponse.json({ ok: true });
    }

    let targetVisitorId: string | null = null;

    if (msg.reply_to_message?.text) {
      targetVisitorId = extractVisitorId(msg.reply_to_message.text);
    }

    if (targetVisitorId) {
      await addAdminReply(targetVisitorId, msg.text);
      console.log(`[webhook] Admin reply saved for visitor ${targetVisitorId}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("webhook error:", e);
    return NextResponse.json({ ok: false, error: "Internal error" });
  }
}

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");
  const secret = req.nextUrl.searchParams.get("secret");

  if (action === "setup" && TG_TOKEN) {
    const baseUrl = req.nextUrl.origin;
    const webhookUrl = `${baseUrl}/api/telegram-webhook`;

    if (secret !== TG_TOKEN) {
      return NextResponse.json({ ok: false, error: "Invalid secret. Use ?action=setup&secret=YOUR_BOT_TOKEN" });
    }

    const res = await fetch(
      `https://api.telegram.org/bot${TG_TOKEN}/setWebhook?url=${encodeURIComponent(webhookUrl)}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return NextResponse.json(data);
  }

  if (action === "status" && TG_TOKEN) {
    const res = await fetch(
      `https://api.telegram.org/bot${TG_TOKEN}/getWebhookInfo`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return NextResponse.json(data);
  }

  return NextResponse.json({
    ok: false,
    error: 'Use ?action=setup&secret=YOUR_TOKEN or ?action=status',
    note: 'Webhook allows Telegram to push replies to your site instantly.'
  });
}
