

## Plan: Upgrade Chatbot Model

A single-line change in the chat edge function to switch from `google/gemini-2.5-flash-lite` to `google/gemini-3-flash-preview`.

### Change

**`supabase/functions/chat/index.ts`** (line 128)
- Change `model: "google/gemini-2.5-flash-lite"` to `model: "google/gemini-3-flash-preview"`

No other files need changes. The frontend streaming hook and chatbot widget remain the same. No API key needed — this model is available through the built-in Lovable AI gateway.

### Expected Improvement
- Better reasoning and more nuanced arthritis health responses
- Improved markdown formatting in answers
- Slightly higher latency than flash-lite, but significantly better quality

