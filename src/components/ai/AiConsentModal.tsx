import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, AlertTriangle } from "lucide-react";

const STORAGE_KEY = "lwa_ai_consent_v1";

interface AiConsentModalProps {
  /** Called once the user accepts. */
  onAccept?: () => void;
  /** Called when the user cancels — parent should redirect them away. */
  onCancel?: () => void;
}

/**
 * First-use AI consent modal.
 * Stores acceptance in localStorage so we only ask once per browser.
 */
export default function AiConsentModal({ onAccept, onCancel }: AiConsentModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setOpen(false);
    onAccept?.();
  };

  const cancel = () => {
    setOpen(false);
    onCancel?.();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && cancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <DialogTitle className="text-center text-xl">Before you start</DialogTitle>
          <DialogDescription className="text-center">
            A short note about the AI assistant.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm text-foreground/80">
          <p>
            Arthritis AI is a general-purpose language model used to surface educational
            information about arthritis. <strong>It is not a clinician</strong> and cannot
            diagnose, prescribe, or replace a GP.
          </p>
          <ul className="space-y-2 rounded-lg bg-muted/40 p-4 text-sm">
            <li>
              <strong>What we send:</strong> only the messages you type in this chat.
              We do not send your name, email, or location.
            </li>
            <li>
              <strong>Storage:</strong> messages are kept only for the current session
              unless you sign in. Signed-in chats are stored on your account.
            </li>
            <li>
              <strong>Safety:</strong> we filter for emergency cues and refuse harmful
              requests.
            </li>
          </ul>
          <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-xs">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
            <span>
              In a medical emergency call <strong>999</strong>. For urgent advice call{" "}
              <strong>NHS 111</strong>. Mental-health crisis: <strong>Samaritans 116 123</strong>.
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Read more on our{" "}
            <Link to="/ai-safety" className="text-primary underline">
              AI safety page
            </Link>
            .
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={cancel} className="flex-1">
            Cancel
          </Button>
          <Button onClick={accept} className="flex-1">
            I understand — continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
