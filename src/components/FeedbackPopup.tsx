import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquareHeart } from "lucide-react";

const FEEDBACK_KEY = "oa_feedback_dismissed";

const categories = [
  { id: "navigation", label: "Ease of Navigation" },
  { id: "speed", label: "Website Speed" },
];

export default function FeedbackPopup() {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});

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
    });
  };

  const allRated = categories.every((c) => ratings[c.id]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="sm:max-w-md !fixed !left-auto !right-6 !bottom-6 !top-auto !translate-x-0 !translate-y-0 !duration-500 data-[state=open]:!slide-in-from-right-full data-[state=open]:!slide-in-from-bottom-0 data-[state=closed]:!slide-out-to-right-full data-[state=closed]:!slide-out-to-bottom-0 data-[state=open]:!fade-in-100 data-[state=closed]:!fade-out-100 p-0 gap-0 rounded-2xl border-border/50 overflow-hidden">
        {/* Coloured header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent px-6 pt-6 pb-4 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-2">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              Quick Survey
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">We'd love your feedback!</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Rate your experience so far (1 = poor, 5 = excellent)</DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-5 bg-primary/[0.02] space-y-6">
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
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border/30 bg-primary/[0.02]">
          <Button variant="ghost" size="sm" onClick={handleDismiss}>Skip</Button>
          <Button size="sm" disabled={!allRated} onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}