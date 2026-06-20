import { NextRequest, NextResponse } from "next/server";
import { addVisitorMessage, getSavedChatId, saveChatId, addAdminReply, getMessagesSince } from "@/lib/chat-store";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const YANDEX_API_KEY = process.env.YANDEX_API_KEY || "";
const YANDEX_FOLDER_ID = process.env.YANDEX_FOLDER_ID || "";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Smart local fallback responder in case of 403 Forbidden or API errors
function getFallbackAIResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes("привет") || msg.includes("здравствуй") || msg.includes("добрый день") || msg.includes("ку")) {
    return "Привет! Я виртуальный ассистент Keml Studio. Буду рад помочь вам с разработкой сайтов, Telegram-ботов или AI-автоматизацией. Какой проект вы планируете?";
  }
  
  if (msg.includes("цен") || msg.includes("стоимост") || msg.includes("сколько стоит") || msg.includes("прайс") || msg.includes("руб")) {
    return "Стоимость разработки в Keml Studio: лендинги под ключ от 17 500 ₽, корпоративные сайты от 35 000 ₽, интернет-магазины от 60 000 ₽, а Telegram-боты от 10 000 ₽. Какой именно проект вас интересует?";
  }
  
  if (msg.includes("услуг") || msg.includes("делает") || msg.includes("умеет") || msg.includes("разработ")) {
    return "Мы создаем современные сайты любой сложности (Next.js, React, Tilda), разрабатываем Telegram-ботов (автоворонки, интеграции, корзины оплаты) и внедряем ИИ (чат-боты, автоматизация). Какой проект вы хотите реализовать?";
  }
  
  if (msg.includes("контакт") || msg.includes("связаться") || msg.includes("телефон") || msg.includes("написать") || msg.includes("телеграм") || msg.includes("tg")) {
    return "Вы можете связаться с руководителем студии напрямую в Telegram: @keml00, либо оставить заявку в форме обратной связи на главной странице сайта.";
  }

  if (msg.includes("срок") || msg.includes("когда") || msg.includes("быстро")) {
    return "Сроки зависят от сложности: простые лендинги и боты делаем за 5-10 дней, крупные корпоративные проекты — от 3-4 недель. У нас отлаженный процесс разработки. Рассказать подробнее?";
  }
  
  return "Отличный вопрос! Чтобы обсудить детали вашего проекта и предложить лучшее техническое решение, напишите, пожалуйста, нашему основателю в Telegram: @keml00 или оставьте контакты в форме заявки на сайте.";
}

// Generate response using YandexGPT (or fallback)
async function generateAIResponse(visitorId: string, userMessage: string): Promise<string> {
  try {
    // 1. Fetch chat history (max last 10 messages for context)
    const history = await getMessagesSince(visitorId, 0);
    const recentHistory = history.slice(-10);

    const systemPrompt = "Ты — полезный виртуальный ИИ-ассистент веб-студии Keml Studio (Казань, Татарстан). " +
      "Отвечай дружелюбно, профессионально, грамотно и только на русском языке. " +
      "Помогай клиентам с вопросами о разработке сайтов (лендинги от 17 500 руб., корпоративные от 35 000 руб., интернет-магазины от 60 000 руб.), Telegram-ботов (от 10 000 руб.) и AI-автоматизации бизнеса. " +
      "Отвечай коротко и емко (не более 2-3 предложений). В конце ответа предлагай написать руководителю в Telegram @keml00 или заполнить форму заявки на сайте.";

    const messages = [
      { role: "system", text: systemPrompt }
    ];

    // Add recent context
    for (const msg of recentHistory) {
      messages.push({
        role: msg.isAdmin ? "assistant" : "user",
        text: msg.text
      });
    }

    // Call Yandex Cloud LLM API
    const response = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
      method: "POST",
      headers: {
        "Authorization": `Api-Key ${YANDEX_API_KEY}`,
        "Content-Type": "application/json",
        "x-folder-id": YANDEX_FOLDER_ID
      },
      body: JSON.stringify({
        modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt/latest`,
        completionOptions: {
          stream: false,
          temperature: 0.6,
          maxTokens: "800"
        },
        messages
      }),
      signal: AbortSignal.timeout(10000) // 10s timeout
    });

    if (response.ok) {
      const data = await response.json();
      const text = data.result?.alternatives?.[0]?.message?.text;
      if (text) return text.trim();
    } else {
      const errData = await response.text();
      console.warn("YandexGPT API returned error status:", response.status, errData);
    }
  } catch (error) {
    console.error("Error generating YandexGPT response:", error);
  }

  // Fallback to local smart agent
  console.log("Using local AI assistant fallback response.");
  return getFallbackAIResponse(userMessage);
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

    // Send visitor message to Telegram
    const sent = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      signal: AbortSignal.timeout(20000),
    });
    const sentData = await sent.json();

    if (!sentData.ok) {
      console.error("Telegram sendMessage error:", sentData);
    }

    // Trigger AI response generation (only for chat messages, not new orders)
    if (type !== "order") {
      // Run in background and generate reply
      (async () => {
        try {
          const aiResponse = await generateAIResponse(visitorId, message);
          // Save reply
          await addAdminReply(visitorId, aiResponse);

          // Send AI response to Telegram to keep the admin informed
          const aiText = `🤖 <b>Ответ AI-помощника для ${esc(name)}:</b>\n\n${esc(aiResponse)}`;
          await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: aiText, parse_mode: "HTML" }),
            signal: AbortSignal.timeout(20000),
          });
        } catch (aiErr) {
          console.error("AI response flow error:", aiErr);
        }
      })();
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send error:", e);
    return NextResponse.json({ ok: false, error: "Ошибка отправки." });
  }
}

