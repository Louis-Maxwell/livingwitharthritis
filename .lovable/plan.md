## Plan: make Arthritis AI reliably answer visitors

### What I found
- The deployed chat backend is working: a direct backend test returned a streamed Arthritis AI answer successfully.
- The failures shown in the preview are happening before the request reaches the backend: the Lovable preview fetch proxy is blocking all backend fetches, including regular database reads and both streaming/non-streaming chat calls.
- The current chat already has a JSON fallback, but it still depends on browser fetch to the hosted backend, so it cannot recover when the preview proxy blocks every backend request.

### Fix approach
1. **Keep the real AI backend as the primary path**
   - Leave the existing hosted chat function as the production implementation.
   - Keep streaming responses for normal visitors on the published site.
   - Keep the existing non-streaming `?stream=0` fallback for environments that block SSE only.

2. **Add a visitor-visible fallback answer path**
   - Add a small built-in fallback responder in the frontend for common arthritis questions when both backend fetch attempts fail.
   - Cover the visible quick prompts and common typed topics: anti-inflammatory foods, osteoarthritis exercises, rheumatoid arthritis basics, when to see a doctor, supplements, flare-ups, pain relief, diet, and general arthritis guidance.
   - Render the fallback as a normal assistant message so visitors can still see useful answers instead of a failed toast.
   - Make the fallback clearly general guidance and safe, not a diagnosis.

3. **Improve the failure UX**
   - Stop removing the visitor’s message after a backend/network failure.
   - Show the fallback assistant answer in the chat window.
   - Use a softer toast such as “Live AI is temporarily unavailable, showing guidance from our arthritis knowledge base.”

4. **Keep safety protections**
   - Preserve existing emergency/red-flag detection before sending.
   - Ensure fallback answers include urgent-care signposting where appropriate.
   - Do not add diagnosis, prescription dosing, or unsafe medical claims.

5. **Validate**
   - Confirm the backend still responds through the direct edge-function test.
   - Confirm the frontend code path can produce a visible assistant answer even when fetch throws `Failed to fetch`.

### Technical notes
- Likely files to edit:
  - `src/hooks/useStreamingChat.ts`
  - optionally a new helper such as `src/lib/arthritisChatFallback.ts`
- No database migration is needed.
- No new secrets are needed.
- No change to the Lovable Cloud configuration is needed.