# Local chatbot (no live LLM)

Visitor chat uses a **canned UK-safe knowledge base** after Cloudflare Worker removal:

- `src/lib/chatbot/knowledgeBase.ts` — topics, chips, urgent red-flag terms
- `src/lib/chatbot/optimizedChatService.ts` — scoring (synonyms, light typos, multi-intent), cache, rate limit, streaming
- `src/lib/arthritisChatFallback.ts` — compatibility wrapper
- `src/hooks/useStreamingChat.ts` — UI streaming hook

Answers are educational only (no diagnosis/doses). Low-confidence queries get clarifying chips + hub links, never a dead-end. Urgent symptom keywords surface NHS 111 / 999 / Samaritans signposting.
