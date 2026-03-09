import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList, CalendarIcon, Plus, Trash2, Edit2, TrendingDown,
  TrendingUp, Minus, Activity, Moon, Pill, Zap, StickyNote, ArrowLeft
} from "lucide-react";

const JOINT_OPTIONS = [
  "Left Knee", "Right Knee", "Left Hip", "Right Hip",
  "Left Hand", "Right Hand", "Left Shoulder", "Right Shoulder",
  "Left Ankle", "Right Ankle", "Left Wrist", "Right Wrist",
  "Lower Back", "Upper Back", "Neck", "Left Elbow", "Right Elbow",
  "Left Foot", "Right Foot", "Jaw",
];

const MOOD_OPTIONS = [
  { value: "great", label: "😊 Great", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  { value: "good", label: "🙂 Good", color: "bg-sky-100 text-sky-700 border-sky-300" },
  { value: "neutral", label: "😐 Okay", color: "bg-amber-100 text-amber-700 border-amber-300" },
  { value: "low", label: "😔 Low", color: "bg-orange-100 text-orange-700 border-orange-300" },
  { value: "bad", label: "😢 Bad", color: "bg-rose-100 text-rose-700 border-rose-300" },
];

interface JournalEntry {
  id: string;
  entry_date: string;
  pain_level: number;
  joints_affected: string[];
  stiffness_duration: number;
  mood: string;
  activities: string;
  medications: string;
  triggers: string;
  notes: string;
  sleep_quality: number | null;
  created_at: string;
}

const PainJournal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [entryDate, setEntryDate] = useState<Date>(new Date());
  const [painLevel, setPainLevel] = useState(5);
  const [jointsAffected, setJointsAffected] = useState<string[]>([]);
  const [stiffnessDuration, setStiffnessDuration] = useState(0);
  const [mood, setMood] = useState("neutral");
  const [activities, setActivities] = useState("");
  const [medications, setMedications] = useState("");
  const [triggers, setTriggers] = useState("");
  const [notes, setNotes] = useState("");
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("pain_journal_entries")
      .select("*")
      .order("entry_date", { ascending: false })
      .limit(100);
    if (!error && data) setEntries(data as JournalEntry[]);
  };

  const resetForm = () => {
    setEntryDate(new Date());
    setPainLevel(5);
    setJointsAffected([]);
    setStiffnessDuration(0);
    setMood("neutral");
    setActivities("");
    setMedications("");
    setTriggers("");
    setNotes("");
    setSleepQuality(null);
    setEditingId(null);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEntryDate(new Date(entry.entry_date));
    setPainLevel(entry.pain_level);
    setJointsAffected(entry.joints_affected);
    setStiffnessDuration(entry.stiffness_duration);
    setMood(entry.mood);
    setActivities(entry.activities);
    setMedications(entry.medications);
    setTriggers(entry.triggers);
    setNotes(entry.notes);
    setSleepQuality(entry.sleep_quality);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);

    const payload = {
      user_id: user.id,
      entry_date: format(entryDate, "yyyy-MM-dd"),
      pain_level: painLevel,
      joints_affected: jointsAffected,
      stiffness_duration: stiffnessDuration,
      mood,
      activities: activities.slice(0, 1000),
      medications: medications.slice(0, 500),
      triggers: triggers.slice(0, 500),
      notes: notes.slice(0, 2000),
      sleep_quality: sleepQuality,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase
        .from("pain_journal_entries")
        .update(payload)
        .eq("id", editingId));
    } else {
      ({ error } = await supabase
        .from("pain_journal_entries")
        .insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Entry updated" : "Entry saved", description: "Your symptom journal has been recorded." });
      resetForm();
      setShowForm(false);
      fetchEntries();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("pain_journal_entries").delete().eq("id", id);
    if (!error) {
      toast({ title: "Entry deleted" });
      fetchEntries();
    }
  };

  const toggleJoint = (joint: string) => {
    setJointsAffected(prev =>
      prev.includes(joint) ? prev.filter(j => j !== joint) : [...prev, joint]
    );
  };

  const painColor = (level: number) => {
    if (level <= 2) return "text-emerald-600";
    if (level <= 4) return "text-amber-500";
    if (level <= 6) return "text-orange-500";
    return "text-rose-600";
  };

  const painTrend = () => {
    if (entries.length < 2) return null;
    const recent = entries.slice(0, 3).reduce((s, e) => s + e.pain_level, 0) / Math.min(3, entries.length);
    const older = entries.slice(3, 6);
    if (older.length === 0) return null;
    const olderAvg = older.reduce((s, e) => s + e.pain_level, 0) / older.length;
    const diff = recent - olderAvg;
    if (Math.abs(diff) < 0.5) return { icon: Minus, label: "Stable", color: "text-amber-500" };
    if (diff < 0) return { icon: TrendingDown, label: "Improving", color: "text-emerald-600" };
    return { icon: TrendingUp, label: "Increasing", color: "text-rose-600" };
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <ClipboardList className="w-12 h-12 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Pain & Symptom Journal</h1>
          <p className="text-muted-foreground text-center max-w-md">Sign in to track your daily symptoms, identify patterns, and share insights with your healthcare team.</p>
          <Button onClick={() => navigate("/auth")} size="lg" className="min-h-[44px]">Sign In to Start Tracking</Button>
        </div>
        <Footer />
      </>
    );
  }

  const trend = painTrend();

  return (
    <>
      <Helmet>
        <title>Pain & Symptom Journal | Living With Arthritis</title>
        <meta name="description" content="Track your arthritis symptoms daily. Log pain levels, affected joints, medications, mood and more to identify patterns and share with your GP." />
      </Helmet>

      <Header />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><ClipboardList className="w-3.5 h-3.5 mr-1.5" /> Symptom Tracker</Badge>}
        title={<>Your Pain & Symptom <span className="text-primary">Journal</span></>}
        subtitle="Track daily symptoms, identify patterns and share meaningful data with your healthcare team."
      />

      <main id="main-content" className="py-8 lg:py-12">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">

          {/* Summary cards */}
          {entries.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border border-border/40">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{entries.length}</p>
                  <p className="text-xs text-muted-foreground">Total Entries</p>
                </CardContent>
              </Card>
              <Card className="border border-border/40">
                <CardContent className="p-4 text-center">
                  <p className={cn("text-2xl font-bold", painColor(entries[0]?.pain_level ?? 0))}>{entries[0]?.pain_level ?? "-"}/10</p>
                  <p className="text-xs text-muted-foreground">Latest Pain</p>
                </CardContent>
              </Card>
              <Card className="border border-border/40">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{(entries.reduce((s, e) => s + e.pain_level, 0) / entries.length).toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Avg Pain Level</p>
                </CardContent>
              </Card>
              {trend && (
                <Card className="border border-border/40">
                  <CardContent className="p-4 text-center flex flex-col items-center gap-1">
                    <trend.icon className={cn("w-6 h-6", trend.color)} />
                    <p className={cn("text-sm font-semibold", trend.color)}>{trend.label}</p>
                    <p className="text-xs text-muted-foreground">Pain Trend</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mb-8">
            <Button onClick={() => { resetForm(); setShowForm(!showForm); }} className="min-h-[44px] gap-2">
              {showForm ? <><ArrowLeft className="w-4 h-4" /> Back to History</> : <><Plus className="w-4 h-4" /> New Entry</>}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <Card className="border border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg">{editingId ? "Edit Entry" : "New Journal Entry"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    {/* Date */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal min-h-[44px]", !entryDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {entryDate ? format(entryDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={entryDate} onSelect={(d) => d && setEntryDate(d)} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d > new Date()} />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Pain level */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Activity className="w-4 h-4" /> Pain Level: <span className={cn("font-bold text-lg", painColor(painLevel))}>{painLevel}/10</span></Label>
                      <Slider value={[painLevel]} onValueChange={([v]) => setPainLevel(v)} min={0} max={10} step={1} className="py-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>No pain</span><span>Moderate</span><span>Worst</span>
                      </div>
                    </div>

                    {/* Joints */}
                    <div className="space-y-2">
                      <Label>Joints Affected</Label>
                      <div className="flex flex-wrap gap-2">
                        {JOINT_OPTIONS.map(j => (
                          <button
                            key={j}
                            type="button"
                            onClick={() => toggleJoint(j)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all min-h-[36px]",
                              jointsAffected.includes(j)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40"
                            )}
                          >
                            {j}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stiffness */}
                    <div className="space-y-2">
                      <Label>Morning Stiffness (minutes)</Label>
                      <Input type="number" min={0} max={480} value={stiffnessDuration} onChange={e => setStiffnessDuration(Number(e.target.value))} className="min-h-[44px]" />
                    </div>

                    {/* Mood */}
                    <div className="space-y-2">
                      <Label>Mood</Label>
                      <div className="flex flex-wrap gap-2">
                        {MOOD_OPTIONS.map(m => (
                          <button
                            key={m.value}
                            type="button"
                            onClick={() => setMood(m.value)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all min-h-[36px]",
                              mood === m.value ? m.color + " border-2" : "bg-muted/50 text-muted-foreground border-border"
                            )}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sleep quality */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Moon className="w-4 h-4" /> Sleep Quality</Label>
                      <Select value={sleepQuality?.toString() ?? ""} onValueChange={v => setSleepQuality(v ? Number(v) : null)}>
                        <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Rate your sleep" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 — Very Poor</SelectItem>
                          <SelectItem value="2">2 — Poor</SelectItem>
                          <SelectItem value="3">3 — Fair</SelectItem>
                          <SelectItem value="4">4 — Good</SelectItem>
                          <SelectItem value="5">5 — Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Activities */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Activity className="w-4 h-4" /> Activities Today</Label>
                      <Input placeholder="e.g. 20 min walk, knee exercises, gardening" value={activities} onChange={e => setActivities(e.target.value)} className="min-h-[44px]" />
                    </div>

                    {/* Medications */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Pill className="w-4 h-4" /> Medications / Supplements</Label>
                      <Input placeholder="e.g. Paracetamol 500mg, turmeric supplement" value={medications} onChange={e => setMedications(e.target.value)} className="min-h-[44px]" />
                    </div>

                    {/* Triggers */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Zap className="w-4 h-4" /> Possible Triggers</Label>
                      <Input placeholder="e.g. cold weather, stress, poor sleep, heavy lifting" value={triggers} onChange={e => setTriggers(e.target.value)} className="min-h-[44px]" />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><StickyNote className="w-4 h-4" /> Additional Notes</Label>
                      <Textarea placeholder="Any other observations or details to remember..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
                    </div>

                    <Button onClick={handleSubmit} disabled={saving} size="lg" className="w-full min-h-[44px]">
                      {saving ? "Saving..." : editingId ? "Update Entry" : "Save Entry"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                {entries.length === 0 ? (
                  <Card className="border border-dashed border-border/60">
                    <CardContent className="p-12 text-center">
                      <ClipboardList className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">Start tracking your symptoms to identify patterns over time.</p>
                      <Button onClick={() => setShowForm(true)} className="min-h-[44px] gap-2"><Plus className="w-4 h-4" /> Add Your First Entry</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-foreground">Your Journal History</h2>
                    {entries.map((entry, i) => {
                      const moodInfo = MOOD_OPTIONS.find(m => m.value === entry.mood);
                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Card className="border border-border/40 hover:border-primary/20 transition-all">
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <span className="text-sm font-semibold text-foreground">{format(new Date(entry.entry_date), "EEEE, d MMMM yyyy")}</span>
                                    <span className={cn("text-sm font-bold", painColor(entry.pain_level))}>Pain: {entry.pain_level}/10</span>
                                    {moodInfo && <span className={cn("text-xs px-2 py-0.5 rounded-full border", moodInfo.color)}>{moodInfo.label}</span>}
                                    {entry.sleep_quality && <span className="text-xs text-muted-foreground">💤 Sleep: {entry.sleep_quality}/5</span>}
                                  </div>

                                  {entry.joints_affected.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                      {entry.joints_affected.map(j => (
                                        <span key={j} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{j}</span>
                                      ))}
                                    </div>
                                  )}

                                  {entry.stiffness_duration > 0 && <p className="text-xs text-muted-foreground mb-1">⏱ Morning stiffness: {entry.stiffness_duration} min</p>}
                                  {entry.activities && <p className="text-xs text-muted-foreground mb-1">🏃 {entry.activities}</p>}
                                  {entry.medications && <p className="text-xs text-muted-foreground mb-1">💊 {entry.medications}</p>}
                                  {entry.triggers && <p className="text-xs text-muted-foreground mb-1">⚡ Triggers: {entry.triggers}</p>}
                                  {entry.notes && <p className="text-xs text-muted-foreground mt-2 italic">"{entry.notes}"</p>}
                                </div>

                                <div className="flex gap-1 shrink-0">
                                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleEdit(entry)} aria-label="Edit entry">
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive" onClick={() => handleDelete(entry.id)} aria-label="Delete entry">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default PainJournal;
