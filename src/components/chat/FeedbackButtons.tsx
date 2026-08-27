import { useState } from "react";
import { ThumbsUp, ThumbsDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FeedbackButtonsProps {
  messageId?: string;
  conversationId?: string | null;
  sessionKey?: string;
  userMessage?: string;
  assistantMessage: string;
}

export function FeedbackButtons({
  messageId,
  conversationId,
  sessionKey,
  userMessage,
  assistantMessage,
}: FeedbackButtonsProps) {
  const [submitted, setSubmitted] = useState<"up" | "down" | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (rating: 1 | -1, withComment?: string) => {
    if (saving) return;
    setSaving(true);
    try {
      // Supabase feedback insert removed - functionality to be restored later
      setSubmitted(rating === 1 ? "up" : "down");
      setShowComment(false);
      toast.success("Thanks for the feedback.");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
        <Check className="h-3 w-3 text-primary" />
        <span>Thanks — your feedback helps us improve.</span>
      </div>
    );
  }

  return (
    <div className="mt-1.5">
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={saving}
          onClick={() => submit(1)}
          aria-label="Helpful"
          title="Helpful"
          className={cn(
            "h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors",
            saving && "opacity-50 cursor-not-allowed",
          )}
        >
          <ThumbsUp className="h-3 w-3" />
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => setShowComment((v) => !v)}
          aria-label="Not helpful"
          title="Not helpful"
          className={cn(
            "h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors",
            saving && "opacity-50 cursor-not-allowed",
          )}
        >
          <ThumbsDown className="h-3 w-3" />
        </button>
      </div>

      {showComment && (
        <div className="mt-1.5 rounded-lg border border-border/50 bg-background p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-foreground">What was wrong?</span>
            <button
              type="button"
              onClick={() => setShowComment(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close feedback form"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 500))}
            placeholder="Optional — tell us more (max 500 chars)"
            rows={2}
            className="w-full text-xs bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 border border-border/40 rounded p-1.5"
          />
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              disabled={saving}
              onClick={() => submit(-1, comment)}
              className="text-[11px] font-medium bg-primary text-primary-foreground rounded px-2.5 py-1 hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? "Sending…" : "Send feedback"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
