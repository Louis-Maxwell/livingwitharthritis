import { memo, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const GOAL = 50000;

const FundraisingProgressSection = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalRaised, setTotalRaised] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("amount")
        .eq("status", "completed");

      if (!error && data) {
        const sum = data.reduce((acc, d) => acc + Number(d.amount), 0);
        setTotalRaised(sum);
      }
    };
    fetchTotal();
  }, []);

  const progressPercent = Math.min((totalRaised / GOAL) * 100, 100);

  const handleDonate = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: {
          amount: 25,
          currency: "GBP",
          fundType: "general",
          donorName: "Supporter",
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formattedRaised = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalRaised);

  const formattedGoal = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(GOAL);

  return (
    <section className="py-24 lg:py-32 bg-accent/20 section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl border border-border/20 p-10 lg:p-14 text-center shadow-soft">
          <Heart className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Help us reach our <span className="text-primary italic">goal</span>
          </h2>
          <p className="text-muted-foreground mb-8">Every donation helps us provide free physiotherapy and support to more people.</p>
          <div className="max-w-md mx-auto mb-3">
            <Progress value={progressPercent} className="h-3 rounded-full" />
          </div>
          <div className="flex justify-between text-sm mb-8 max-w-md mx-auto">
            <span className="text-primary font-bold">{formattedRaised} raised</span>
            <span className="text-muted-foreground">{formattedGoal} goal</span>
          </div>
          <Button
            className="rounded-full btn-gold px-8 h-12"
            onClick={handleDonate}
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
            ) : (
              <><Heart className="w-4 h-4 mr-2" /> Donate Now</>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

FundraisingProgressSection.displayName = "FundraisingProgressSection";
export default FundraisingProgressSection;
