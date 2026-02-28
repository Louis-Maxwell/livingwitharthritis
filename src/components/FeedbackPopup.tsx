import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      <DialogContent className="sm:max-w-md !fixed !left-auto !right-6 !bottom-6 !top-auto !translate-x-0 !translate-y-0 !duration-500 data-[state=open]:!slide-in-from-right-full data-[state=open]:!slide-in-from-bottom-0 data-[state=closed]:!slide-out-to-right-full data-[state=closed]:!slide-out-to-bottom-0 data-[state=open]:!fade-in-100 data-[state=closed]:!fade-out-100">
        <DialogHeader>
          <DialogTitle className="text-xl">We'd love your feedback!</DialogTitle>
          <DialogDescription>Rate your experience so far (1 = poor, 5 = excellent)</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
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

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={handleDismiss}>Skip</Button>
          <Button size="sm" disabled={!allRated} onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
