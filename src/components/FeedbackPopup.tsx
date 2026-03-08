import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquareHeart } from "lucide-react";

const FEEDBACK_KEY = "oa_feedback_dismissed";

const categories = [
  { id: "navigation", label: "Ease of Navigation" },
  { id: "speed", label: "Website Speed" },
];

const npsLabels: Record<number, string> = {
  0: "Not at all likely",
  5: "Neutral",
  10: "Extremely likely",
};

export default function FeedbackPopup() {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [nps, setNps] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (sessionStorage.getItem(FEEDBACK_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 60000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(FEEDBACK_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = async () => {
    sessionStorage.setItem(FEEDBACK_KEY, "1");
    setOpen(false);
    toast({ title: "Thank you!", description: "Your feedback helps us improve." });

    await supabase.from("feedback_responses").insert({
      navigation_rating: ratings.navigation,
      speed_rating: ratings.speed,
      nps_score: nps,
      comment: comment.trim() || null,
    } as any);
  };

  const allRated = categories.every((c) => ratings[c.id]);
  const canSubmit = nps !== null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="sm:max-w-md !fixed !left-auto !right-6 !bottom-6 !top-auto !translate-x-0 !translate-y-0 !duration-500 data-[state=open]:!slide-in-from-right-full data-[state=open]:!slide-in-from-bottom-0 data-[state=closed]:!slide-out-to-right-full data-[state=closed]:!slide-out-to-bottom-0 data-[state=open]:!fade-in-100 data-[state=closed]:!fade-out-100 p-0 gap-0 rounded-2xl border-border/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent px-6 pt-6 pb-4 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-2">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              Quick Survey · Step {step}/2
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              {step === 1 ? "We'd love your feedback!" : "One more question…"}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {step === 1
                ? "Rate your experience so far (1 = poor, 5 = excellent)"
                : "How likely are you to recommend us to a friend?"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-5 bg-primary/[0.02] space-y-5 max-h-[50vh] overflow-y-auto">
          {step === 1 ? (
            <>
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <p className="font-medium text-sm text-foreground">{cat.label}</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((n) => {
                      const selected = ratings[cat.id] === n;
                      return (
                        <button
                          key={n}
                          onClick={() => setRatings((r) => ({ ...r, [cat.id]: n }))}
                          className={`w-10 h-10 rounded-full border-2 text-sm font-bold transition-all ${
                            selected
                              ? "bg-primary text-primary-foreground border-primary scale-110"
                              : "border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Completely Dissatisfied</span>
                    <span>Completely Satisfied</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* NPS 0-10 */}
              <div className="space-y-3">
                <p className="font-medium text-sm text-foreground">
                  How likely are you to recommend us? (0–10)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => {
                    const selected = nps === n;
                    const color =
                      n <= 6
                        ? selected ? "bg-destructive text-destructive-foreground border-destructive" : "border-destructive/30 text-destructive hover:border-destructive"
                        : n <= 8
                        ? selected ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/30 text-amber-600 hover:border-amber-500"
                        : selected ? "bg-emerald-500 text-white border-emerald-500" : "border-emerald-400/30 text-emerald-600 hover:border-emerald-500";
                    return (
                      <button
                        key={n}
                        onClick={() => setNps(n)}
                        className={`w-9 h-9 rounded-lg border-2 text-xs font-bold transition-all ${
                          selected ? `${color} scale-110` : color
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Not at all likely</span>
                  <span>Extremely likely</span>
                </div>
              </div>

              {/* Free-text comment */}
              <div className="space-y-2">
                <p className="font-medium text-sm text-foreground">
                  Any suggestions? <span className="text-muted-foreground font-normal">(optional)</span>
                </p>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 2000))}
                  placeholder="Tell us how we can improve…"
                  className="resize-none h-20 text-sm bg-card"
                  maxLength={2000}
                />
                <p className="text-[11px] text-muted-foreground text-right">{comment.length}/2000</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-border/30 bg-primary/[0.02]">
          <Button variant="ghost" size="sm" onClick={handleDismiss}>Skip</Button>
          <div className="flex gap-2">
            {step === 2 && (
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>Back</Button>
            )}
            {step === 1 ? (
              <Button size="sm" disabled={!allRated} onClick={() => setStep(2)}>Next</Button>
            ) : (
              <Button size="sm" disabled={!canSubmit} onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
