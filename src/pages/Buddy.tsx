import { useEffect, useState } from "react";
import SeoHead from "@/components/SeoHead";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const TYPES = ["osteoarthritis", "rheumatoid arthritis", "psoriatic arthritis", "gout", "ankylosing spondylitis", "fibromyalgia", "lupus", "other"];
const REGIONS = ["London", "South East", "South West", "Midlands", "North West", "North East", "Yorkshire", "Wales", "Scotland", "Northern Ireland"];
const AGE = ["18-29", "30-44", "45-59", "60-74", "75+"];

const Buddy = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    role: "mentee" as "mentor" | "mentee",
    arthritis_type: "osteoarthritis",
    location_region: "London",
    mobility_level: "moderate" as "high" | "moderate" | "low",
    age_band: "45-59",
    bio: "",
  });
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) { navigate("/auth?redirect=/buddy"); return; }
      setUserId(s.session.user.id);
      const { data } = await supabase.from("buddy_profiles").select("*").eq("user_id", s.session.user.id).maybeSingle();
      if (data) {
        setForm({
          role: data.role as "mentor" | "mentee",
          arthritis_type: data.arthritis_type,
          location_region: data.location_region,
          mobility_level: data.mobility_level as "high" | "moderate" | "low",
          age_band: data.age_band,
          bio: data.bio ?? "",
        });
        setHasProfile(true);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    const payload = { ...form, user_id: userId };
    const { error } = hasProfile
      ? await supabase.from("buddy_profiles").update(payload).eq("user_id", userId)
      : await supabase.from("buddy_profiles").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Could not save", description: error.message, variant: "destructive" }); return; }
    setHasProfile(true);
    toast({ title: "Profile saved" });
  };

  const requestMatch = async () => {
    setRequesting(true);
    const { data, error } = await supabase.functions.invoke("request-buddy-match", { body: {} });
    setRequesting(false);
    if (error || !data?.ok) {
      toast({ title: "No match yet", description: data?.error?.message ?? "Please try again later.", variant: "destructive" });
      return;
    }
    toast({ title: "Match created!", description: "We've notified your mentor — you'll hear back soon." });
    navigate("/buddy/match");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <>
      <Helmet>
        <title>Buddy Matching | Living With Arthritis UK</title>
        <meta name="description" content="Get paired with someone who's been there. Free arthritis buddy mentoring — share experiences, get support, build community." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/buddy" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      </Helmet>
      <Header />
      <main id="main-content">
        <PageHero badge="Buddy" title="Find your arthritis buddy" subtitle="Get paired with someone who lives with the same condition — share what works, lift each other up." />
        <section className="container mx-auto px-4 py-16 max-w-2xl space-y-8">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={save} className="space-y-4">
                <div>
                  <Label>I want to:</Label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "mentor" | "mentee" })} className="w-full border border-input bg-background rounded-md h-10 px-3 mt-1">
                    <option value="mentee">Find a mentor (I'm seeking support)</option>
                    <option value="mentor">Mentor someone (I have experience to share)</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Arthritis type</Label>
                    <select value={form.arthritis_type} onChange={(e) => setForm({ ...form, arthritis_type: e.target.value })} className="w-full border border-input bg-background rounded-md h-10 px-3 mt-1 capitalize">
                      {TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Region</Label>
                    <select value={form.location_region} onChange={(e) => setForm({ ...form, location_region: e.target.value })} className="w-full border border-input bg-background rounded-md h-10 px-3 mt-1">
                      {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Mobility</Label>
                    <select value={form.mobility_level} onChange={(e) => setForm({ ...form, mobility_level: e.target.value as "high" | "moderate" | "low" })} className="w-full border border-input bg-background rounded-md h-10 px-3 mt-1 capitalize">
                      <option value="high">High</option><option value="moderate">Moderate</option><option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <Label>Age band</Label>
                    <select value={form.age_band} onChange={(e) => setForm({ ...form, age_band: e.target.value })} className="w-full border border-input bg-background rounded-md h-10 px-3 mt-1">
                      {AGE.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Short bio (optional)</Label>
                  <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} maxLength={500} placeholder="A sentence or two about yourself" />
                </div>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {hasProfile ? "Update profile" : "Save profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {hasProfile && form.role === "mentee" && (
            <Card className="border-primary/40">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-serif font-semibold">Ready to be matched?</h2>
                <p className="text-muted-foreground">We'll find a mentor with the closest profile to yours.</p>
                <Button onClick={requestMatch} disabled={requesting}>
                  {requesting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Request a buddy
                </Button>
                <p className="text-sm"><Link to="/buddy/match" className="text-primary underline-offset-4 hover:underline">View my matches</Link></p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </>
  );
};

export default Buddy;
