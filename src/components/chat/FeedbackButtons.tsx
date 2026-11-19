import { useState } from "react";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";

interface FeedbackButtonsProps {
  messageId?: string;
  conversationId?: string | null;
  sessionKey?: string;
  userMessage?: string;
  assistantMessage: string;
}

/** A per-message marker only. No feedback endpoint or free-text collection. */
export function FeedbackButtons(_props: FeedbackButtonsProps) {
  const [marked, setMarked] = useState<"up" | "down" | null>(null);
  return (
    <div className="mt-1.5">
      <p className="text-[11px] text-muted-foreground">Mark for this chat only. Not sent to the charity.</p>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setMarked("up")} aria-label="Helpful" aria-pressed={marked === "up"}
          className="h-11 w-11 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ThumbsUp className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => setMarked("down")} aria-label="Not helpful" aria-pressed={marked === "down"}
          className="h-11 w-11 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ThumbsDown className="h-4 w-4" aria-hidden="true" />
        </button>
        <span role="status" className="text-[11px] text-muted-foreground">
          {marked && <><Check className="inline h-3 w-3 mr-1" aria-hidden="true" />{marked === "up" ? "Marked helpful" : "Marked not helpful"} for this chat.</>}
        </span>
      </div>
    </div>
  );
}
