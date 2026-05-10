import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Match {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: string;
  compatibility_score: number;
  compatibility_breakdown: Record<string, number>;
  created_at: string;
}

const BuddyMatch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) { navigate("/auth?redirect=/buddy/match"); return; }
      const { data } = await supabase.from("buddy_matches").select("*").order("created_at", { ascending: false });
      setMatches((data ?? []) as Match[]);
      setLoading(false);
    })();
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Your Buddy Matches | Living With Arthritis UK</title>
        <link rel="canonical" href="https://livingwitharthritis.org.uk/buddy/match" />
      </Helmet>
      <Header />
      <main id="main-content">
        <PageHero badge="Buddy" title="Your matches" subtitle="Pending and active buddy pairings." />
        <section className="container mx-auto px-4 py-16 max-w-3xl space-y-4">
          {loading && <Loader2 className="h-6 w-6 animate-spin mx-auto" />}
          {!loading && matches.length === 0 && (
            <p className="text-muted-foreground">No matches yet. <Link to="/buddy" className="text-primary underline-offset-4 hover:underline">Request a buddy</Link>.</p>
          )}
          {matches.map((m) => (
            <Card key={m.id}>
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={m.status === "active" ? "default" : "secondary"}>{m.status}</Badge>
                  <span className="text-sm text-muted-foreground">Compatibility: {m.compatibility_score}/100</span>
                </div>
                <p className="text-sm text-muted-foreground">Created {new Date(m.created_at).toLocaleDateString("en-GB")}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default BuddyMatch;
