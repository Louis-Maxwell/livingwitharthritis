/**
 * Anonymous (not-signed-in) chatbot conversation persistence.
 * Signed-in users already get server-backed history via chat_conversations/
 * chat_messages (see useStreamingChat.ts); anonymous visitors previously
 * lost their thread on every refresh. Mirrors the load/save/clear shape of
 * chatProfile.ts.
 */

const STORAGE_KEY = "arthritis_chat_anon_history_v1";
const MAX_MESSAGES = 30;

export interface StoredChatMessage {
  role: "user" | "assistant";
  content: string;
  id?: string;
}

export function loadAnonChatHistory(): StoredChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is StoredChatMessage =>
          m &&
          typeof m === "object" &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
      .slice(-MAX_MESSAGES);
  } catch {
    return [];
  }
}

export function saveAnonChatHistory(messages: StoredChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const trimmed = messages.slice(-MAX_MESSAGES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* quota or private mode — ignore, same as chatProfile.ts */
  }
}

export function clearAnonChatHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
