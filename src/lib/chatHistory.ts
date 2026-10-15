/**
 * Anonymous chatbot thread for this browser tab only.
 * There is no account system and no server history. Messages can include
 * health details, so they stay in sessionStorage and any older localStorage
 * copy is deleted on read. Mirrors chatProfile.ts.
 */

const STORAGE_KEY = "arthritis_chat_anon_history_v1";
const MAX_MESSAGES = 30;

export interface StoredChatMessage {
  role: "user" | "assistant";
  content: string;
  id?: string;
}

function dropLegacyLocalCopy(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode */
  }
}

export function loadAnonChatHistory(): StoredChatMessage[] {
  if (typeof window === "undefined") return [];
  dropLegacyLocalCopy();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
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
    dropLegacyLocalCopy();
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* quota or private mode — ignore, same as chatProfile.ts */
  }
}

export function clearAnonChatHistory(): void {
  if (typeof window === "undefined") return;
  try {
    dropLegacyLocalCopy();
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
