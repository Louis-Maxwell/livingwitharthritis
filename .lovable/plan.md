## Plan

1. **Remove the alarming “Live AI unavailable” prompt from chat answers**
   - Replace the fallback disclaimer with a softer, visitor-facing line such as: “This response is from our arthritis guidance library while the live assistant reconnects.”
   - Keep the medical safety disclaimer, but avoid making the chat feel broken.

2. **Make fallback answers cover more visitor questions**
   - Add targeted fallback coverage for common questions currently falling into generic replies, including vitamin D, vitamins, supplements, osteoarthritis basics, knee pain, inflammation, and general arthritis causes/symptoms.
   - Keep answers safe: no diagnosis, no prescription dosing, clear GP/pharmacist signposting.

3. **Fix the failure handling so visitors still see answers**
   - Update the chat hook so any failed backend fetch, failed JSON fallback, empty response, or service fallback signal inserts a useful assistant message instead of only showing an error toast.
   - Remove or soften the toast so users are not repeatedly told the AI is unavailable.

4. **Persist fallback assistant replies for signed-in users**
   - When the fallback answer is shown, save it to the current conversation just like a live AI answer, so chat history remains consistent.

5. **Verify behaviour**
   - Confirm the relevant files compile logically and that the chat path now always renders a visible assistant answer when fetch throws `Failed to fetch`.