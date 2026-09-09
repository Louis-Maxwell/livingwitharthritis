/**
 * Compatibility layer for the unified local chat engine.
 * Prefer `@/lib/chatbot/optimizedChatService` (chatService / getLocalAnswer).
 *
 * All answers are GENERAL UK guidance only — never diagnosis or prescribing —
 * and signpost professional care (GP / NHS 111 / 999).
 */

import { getLocalAnswer, matchKnowledge } from "@/lib/chatbot/optimizedChatService";
import { SAFETY_DISCLAIMER } from "@/lib/chatbot/knowledgeBase";

export const FALLBACK_DISCLAIMER = SAFETY_DISCLAIMER;

/**
 * Return a scored local answer for any visitor question.
 * Always returns useful content with site links where relevant.
 */
export function getFallbackAnswer(userInput: string): string {
  return getLocalAnswer(userInput);
}

/** Expose match metadata for tests / debugging. */
export function getFallbackMatch(userInput: string) {
  return matchKnowledge(userInput);
}
