import { NextRequest, NextResponse } from "next/server";
import { pollTelegramReplies, getMessagesSince, getVisitorTotal } from "@/lib/chat-store";

export const dynamic = "force-dynamic";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function GET(req: NextRequest) {
  try {
    const visitorId = req.nextUrl.searchParams.get("visitorId");
    const since = parseInt(req.nextUrl.searchParams.get("since") || "0", 10);

    if (!visitorId) {
      return NextResponse.json({ ok: false, messages: [], total: 0 });
    }

    if (TG_TOKEN) {
      try {
        await pollTelegramReplies(TG_TOKEN);
      } catch (e) {
        console.error("pollTelegramReplies error:", e);
      }
    }

    let messages: { text: string; time: string; isAdmin: boolean }[] = [];
    let total = 0;

    try {
      messages = await getMessagesSince(visitorId, since);
      total = await getVisitorTotal(visitorId);
    } catch (e) {
      console.error("getMessages error:", e);
    }

    return NextResponse.json({ ok: true, messages, total });
  } catch (e) {
    console.error("poll route error:", e);
    return NextResponse.json({ ok: false, messages: [], total: 0 });
  }
}
