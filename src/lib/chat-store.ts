import { promises as fs } from "fs";
import path from "path";

const BASE = process.env.VERCEL ? "/tmp" : process.cwd();
const CHATS_FILE = path.join(BASE, "data", "chats.json");

export interface ChatMessage {
  id: number;
  text: string;
  time: string;
  isAdmin: boolean;
  msgId?: number;
}

interface ChatSession {
  name: string;
  messages: ChatMessage[];
}

interface ChatDataFile {
  order: string[];
  sessions: Record<string, ChatSession>;
  lastUpdateId: number;
}

function emptyData(): ChatDataFile {
  return { order: [], sessions: {}, lastUpdateId: 0 };
}

async function readChats(): Promise<ChatDataFile> {
  try {
    const raw = JSON.parse(await fs.readFile(CHATS_FILE, "utf-8"));
    // migrate old format (direct Record<string, ChatSession>)
    if (!raw.sessions && typeof raw === "object") {
      const sessions = { ...raw };
      delete (sessions as any).order;
      delete (sessions as any).lastUpdateId;
      return { order: Object.keys(sessions), sessions, lastUpdateId: 0 };
    }
    return { order: raw.order || [], sessions: raw.sessions || {}, lastUpdateId: raw.lastUpdateId || 0 };
  } catch {
    return emptyData();
  }
}

async function writeChats(data: ChatDataFile) {
  await fs.mkdir(path.dirname(CHATS_FILE), { recursive: true });
  await fs.writeFile(CHATS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

let msgCounter = Date.now();

export async function addVisitorMessage(
  visitorId: string,
  name: string,
  text: string
): Promise<ChatMessage> {
  const data = await readChats();
  if (!data.sessions[visitorId]) {
    data.sessions[visitorId] = { name, messages: [] };
    data.order.unshift(visitorId);
  } else {
    const idx = data.order.indexOf(visitorId);
    if (idx > 0) {
      data.order.splice(idx, 1);
      data.order.unshift(visitorId);
    }
  }
  const msg: ChatMessage = {
    id: ++msgCounter,
    text,
    time: new Date().toISOString(),
    isAdmin: false,
  };
  data.sessions[visitorId].messages.push(msg);
  await writeChats(data);
  return msg;
}

export async function addAdminReply(visitorId: string, text: string): Promise<ChatMessage> {
  const data = await readChats();
  if (!data.sessions[visitorId]) {
    data.sessions[visitorId] = { name: "Гость", messages: [] };
  }
  const msg: ChatMessage = {
    id: ++msgCounter,
    text,
    time: new Date().toISOString(),
    isAdmin: true,
  };
  data.sessions[visitorId].messages.push(msg);
  await writeChats(data);
  return msg;
}

export async function getMessagesSince(
  visitorId: string,
  sinceCount: number
): Promise<ChatMessage[]> {
  const data = await readChats();
  const session = data.sessions[visitorId];
  if (!session) return [];
  return session.messages.slice(sinceCount).map((m, i) => ({
    id: m.id || (sinceCount + i + 1),
    text: m.text,
    time: m.time,
    isAdmin: m.isAdmin,
    msgId: m.msgId,
  }));
}

export async function getVisitorTotal(visitorId: string): Promise<number> {
  const data = await readChats();
  return data.sessions[visitorId]?.messages?.length || 0;
}

const CONFIG_FILE = path.join(BASE, "data", "config.json");

interface Config {
  telegram_chat_id: string;
}

async function readConfig(): Promise<Config> {
  try {
    return JSON.parse(await fs.readFile(CONFIG_FILE, "utf-8"));
  } catch {
    return { telegram_chat_id: "" };
  }
}

async function writeConfig(config: Config) {
  await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true });
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
}

export async function getSavedChatId(): Promise<string | null> {
  const explicit = process.env.TELEGRAM_CHAT_ID;
  if (explicit) return explicit;
  const config = await readConfig();
  return config.telegram_chat_id || null;
}

export async function saveChatId(chatId: string) {
  await writeConfig({ telegram_chat_id: chatId });
}

export function extractVisitorId(text: string): string | null {
  const match = text.match(/\[vid:([a-f0-9-]+)\]/);
  return match ? match[1] : null;
}

export async function pollTelegramReplies(token?: string): Promise<number> {
  const botToken = token || process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return 0;

  try {
    const data = await readChats();
    const offset = data.lastUpdateId === 0 ? 0 : data.lastUpdateId + 1;
    const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset}&timeout=10`;
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    const tgData = await res.json();
    if (!tgData.ok || !Array.isArray(tgData.result) || tgData.result.length === 0) return 0;

    let newCount = 0;
    let maxUpdateId = data.lastUpdateId;

    for (const update of tgData.result) {
      if (update.update_id > maxUpdateId) maxUpdateId = update.update_id;

      const msg = update.message;
      if (!msg || !msg.text) continue;
      if (msg.from?.is_bot) continue;

      let targetVisitorId: string | null = null;

      if (msg.reply_to_message?.text) {
        targetVisitorId = extractVisitorId(msg.reply_to_message.text);
      }

      if (!targetVisitorId) continue;
      const session = data.sessions[targetVisitorId];
      if (!session) continue;

      const alreadyExists = session.messages.some(
        (m) => m.isAdmin && m.msgId === msg.message_id
      );
      if (alreadyExists) continue;

      session.messages.push({
        id: ++msgCounter,
        text: msg.text,
        time: new Date(msg.date * 1000).toISOString(),
        isAdmin: true,
        msgId: msg.message_id,
      });
      newCount++;
    }

    data.lastUpdateId = maxUpdateId;
    await writeChats(data);
    return newCount;
  } catch (e) {
    console.error("pollTelegramReplies error:", e);
    return 0;
  }
}
