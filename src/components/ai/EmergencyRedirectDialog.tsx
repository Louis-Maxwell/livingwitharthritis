import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, AlertCircle } from "lucide-react";

interface EmergencyRedirectDialogProps {
  open: boolean;
  onClose: () => void;
  /** Optional category for tailored copy. */
  category?: string | null;
}

const COPY: Record<string, string> = {
  self_harm: "It sounds like you're going through something incredibly difficult. You are not alone â€” please reach out now.",
  cardiac: "These symptoms can indicate a heart problem. Please get help immediately.",
  stroke: "These symptoms can indicate a stroke. Time is critical â€” call 999 now.",
  septic_joint: "A hot, swollen joint with fever needs urgent assessment â€” please contact 999 or 112 or your GP today.",
  anaphylaxis: "These symptoms may indicate a severe allergic reaction. Call 999 immediately.",
  severe_bleed: "Please get urgent medical help.",
  default: "Some of what you described needs a real person, not online information. Please use one of the contacts below.",
};

export default function EmergencyRedirectDialog({
  open,
  onClose,
  category,
}: EmergencyRedirectDialogProps) {
  const message = COPY[category || "default"] ?? COPY.default;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
          </div>
          <DialogTitle className="text-center text-xl">Get help now</DialogTitle>
          <DialogDescription className="text-center">{message}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <a
            href="tel:999"
            className="flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/5 p-4 transition-colors hover:bg-destructive/10"
          >
            <div>
              <div className="font-semibold text-destructive">999</div>
              <div className="text-xs text-muted-foreground">Life-threatening emergency</div>
            </div>
            <Phone className="h-5 w-5 text-destructive" aria-hidden="true" />
          </a>
          <a
            href="tel:111"
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40"
          >
            <div>
              <div className="font-semibold text-foreground">999 or 112</div>
              <div className="text-xs text-muted-foreground">Urgent but not life-threatening</div>
            </div>
            <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
          </a>
          <a
            href="tel:116123"
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40"
          >
            <div>
              <div className="font-semibold text-foreground">Samaritans 116 123</div>
              <div className="text-xs text-muted-foreground">Free, 24/7 mental-health support</div>
            </div>
            <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
          </a>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* â”€â”€â”€ Helper used by callers to detect red flags client-side â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const RED_FLAG_PATTERNS: { category: string; pattern: RegExp }[] = [
  { category: "self_harm", pattern: /\b(suicide|kill myself|end my life|self[- ]harm|hurt myself|want to die)\b/i },
  { category: "cardiac", pattern: /\b(chest pain|crushing chest|left arm.*(pain|numb))\b/i },
  { category: "stroke", pattern: /\b(face droop|slurred speech|sudden weakness|can'?t move (one|my) (arm|leg|side))\b/i },
  { category: "septic_joint", pattern: /\b(hot.*swollen.*joint|red.*hot.*joint).*(fever|temperature)\b/i },
  { category: "anaphylaxis", pattern: /\b(throat closing|can'?t breathe|anaphyla|swollen tongue)\b/i },
  { category: "severe_bleed", pattern: /\b(uncontrolled bleeding|bleeding.*won'?t stop|coughing up blood)\b/i },
];

// eslint-disable-next-line react-refresh/only-export-components
export function detectClientRedFlag(text: string): { matched: boolean; category: string | null } {
  for (const { category, pattern } of RED_FLAG_PATTERNS) {
    if (pattern.test(text)) return { matched: true, category };
  }
  return { matched: false, category: null };
}
