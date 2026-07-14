import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  MessageCircle, Plus, ArrowLeft, Eye, Pin,
  Clock, User, Send, Shield, AlertCircle, Search, ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CATEGORIES = ["General", "Exercise", "Nutrition", "Medication", "Emotional Support", "Newly Diagnosed", "Flare-Ups"];

type Topic = {
  id: string;
  title: string;
  body: string;
  category: string;
  status: string;
  is_pinned: boolean;
  reply_count: number;
  view_count: number;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};

type Reply = {
  id: string;
  topic_id: string;
  user_id: string | null;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type Profile = {
  user_id: string;
  display_name: string;
  avatar_initial: string | null;
  condition: string | null;
  bio: string | null;
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function AvatarChip({ userId, profiles }: { userId: string | null; profiles: Profile[] }) {
  const profile = profiles.find((p) => p.user_id === userId);
  const name = profile?.display_name ?? "Community Member";
  const initial = profile?.avatar_initial ?? name[0]?.toUpperCase() ?? "?";
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-primary">{initial}</span>
      </div>
      <div>
        <span className="text-xs font-semibold text-foreground">{name}</span>
        {profile?.condition && (
          <span className="ml-1.5 text-xs text-muted-foreground">· {profile.condition}</span>
        )}
      </div>
    </div>
  );
}

// ——— Thread detail view ———
function ThreadView({
  topic,
  profiles,
  onBack,
  currentUserId,
}: {
  topic: Topic;
  profiles: Profile[];
  onBack: () => void;
  currentUserId: string | null;
}) {
  const qc = useQueryClient();
  const [replyText, setReplyText] = useState("");

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["forum_replies", topic.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_replies")
        .select("*")
        .eq("topic_id", topic.id)
        .eq("status", "published")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Reply[];
    },
  });

  const postReply = useMutation({
    mutationFn: async (content: string) => {
      if (!currentUserId) throw new Error("not-logged-in");
      const { error } = await supabase.from("forum_replies").insert({
        topic_id: topic.id,
        user_id: currentUserId,
        content: content.trim(),
        status: "published",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setReplyText("");
      toast.success("Reply posted!");
      qc.invalidateQueries({ queryKey: ["forum_replies", topic.id] });
      qc.invalidateQueries({ queryKey: ["forum_topics"] });
    },
    onError: (err: Error) => {
      if (err.message === "not-logged-in") {
        toast.error("Please sign in to post replies.");
      } else {
        toast.error("Failed to post reply. Please try again.");
      }
    },
  });

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to discussions
      </button>

      {/* Topic card */}
      <Card className="border border-border/40">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {topic.is_pinned && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Pin className="w-3 h-3" /> Pinned
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">{topic.category}</Badge>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo(topic.created_at)}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">{topic.title}</h2>
          <AvatarChip userId={topic.user_id} profiles={profiles} />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{topic.body}</p>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{topic.view_count} views</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{topic.reply_count} replies</span>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Loading replies…</div>
      ) : replies.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No replies yet — be the first to respond!
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{replies.length} {replies.length === 1 ? "Reply" : "Replies"}</h3>
          {replies.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="border border-border/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <AvatarChip userId={r.user_id} profiles={profiles} />
                    <span className="text-xs text-muted-foreground shrink-0">{timeAgo(r.created_at)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2 whitespace-pre-wrap">{r.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply box — posting temporarily unavailable */}
      <Card className="border border-border/40 bg-muted/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">Posting is temporarily unavailable</p>
              <p>Replies are paused while we upgrade the forum. You can still read discussions — thank you for your patience.</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

// ——— New topic form ———
function NewTopicForm({
  onCancel,
  onSuccess,
  currentUserId,
}: {
  onCancel: () => void;
  onSuccess: () => void;
  currentUserId: string | null;
}) {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");

  const createTopic = useMutation({
    mutationFn: async () => {
      if (!currentUserId) throw new Error("not-logged-in");
      const { error } = await supabase.from("forum_topics").insert({
        title: title.trim(),
        body: body.trim(),
        category,
        user_id: currentUserId,
        status: "published",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Topic posted!");
      qc.invalidateQueries({ queryKey: ["forum_topics"] });
      onSuccess();
    },
    onError: (err: Error) => {
      if (err.message === "not-logged-in") {
        toast.error("Please sign in to create a topic.");
      } else {
        toast.error("Failed to create topic. Please try again.");
      }
    },
  });

  return (
    <Card className="border border-primary/30 bg-primary/5">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Start a New Discussion
          </h3>
          <button onClick={onCancel} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="topic-title" className="text-xs">Title *</Label>
          <Input
            id="topic-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What would you like to discuss?"
            maxLength={200}
            className="text-sm"
          />
          <span className="text-xs text-muted-foreground">{title.length}/200</span>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="topic-category" className="text-xs">Category *</Label>
          <select
            id="topic-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="topic-body" className="text-xs">Your message *</Label>
          <Textarea
            id="topic-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your question, experience or story…"
            className="min-h-[120px] text-sm resize-none"
            maxLength={5000}
          />
          <span className="text-xs text-muted-foreground">{body.length}/5000</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background rounded-lg px-3 py-2 border border-border/40">
          <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
          All posts are reviewed against our community guidelines. Please be respectful and supportive.
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
          <Button
            size="sm"
            onClick={() => createTopic.mutate()}
            disabled={!title.trim() || !body.trim() || createTopic.isPending || !currentUserId}
            className="gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            {createTopic.isPending ? "Posting…" : "Post Discussion"}
          </Button>
        </div>

        {!currentUserId && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background rounded-lg p-3 border border-border/40">
            <AlertCircle className="w-4 h-4 text-primary shrink-0" />
            <span>
              <Link to="/auth" className="text-primary font-medium hover:underline">Sign in</Link> to post.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ——— Main Forum Component ———
export default function PeerSupportForum() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUserId(data.user?.id ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setCurrentUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const { data: topics = [], isLoading: topicsLoading } = useQuery({
    queryKey: ["forum_topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_topics")
        .select("*")
        .eq("status", "published")
        .order("is_pinned", { ascending: false })
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as Topic[];
    },
  });

  // Collect all unique user_ids
  const userIds = [...new Set([
    ...topics.map((t) => t.user_id),
  ].filter(Boolean) as string[])];

  const { data: profiles = [] } = useQuery({
    queryKey: ["forum_profiles", userIds.join(",")],
    enabled: userIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_initial, condition, bio")
        .in("user_id", userIds);
      if (error) throw error;
      return data as Profile[];
    },
  });

  const filtered = topics.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchQ = !searchQ || t.title.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchQ;
  });

  if (selectedTopic) {
    return (
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <ThreadView
            topic={selectedTopic}
            profiles={profiles}
            onBack={() => setSelectedTopic(null)}
            currentUserId={currentUserId}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="peer-forum" className="py-16 lg:py-20 bg-muted/10">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Peer Support Forum</h2>
              <p className="text-sm text-muted-foreground">Share, support and connect with others</p>
            </div>
          </div>
          <Button
            size="sm"
            disabled
            aria-disabled="true"
            title="New discussions are temporarily paused"
            className="gap-1.5 self-start sm:self-auto opacity-60 cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> New Discussion
          </Button>
        </div>

        {/* Posting temporarily disabled notice */}
        <div className="mb-6 rounded-lg border border-border/40 bg-muted/30 p-4 flex items-start gap-3 text-sm">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Posting is temporarily unavailable</p>
            <p className="text-muted-foreground">You can browse existing discussions. New topics and replies are paused while we upgrade the forum.</p>
          </div>
        </div>


        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search discussions…"
              className="pl-9 text-sm"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["All", ...CATEGORIES.slice(0, 4)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Moderation notice */}
        <div className="flex items-start gap-2.5 text-xs text-muted-foreground bg-background border border-border/40 rounded-lg px-4 py-3 mb-6">
          <Shield className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <span>This forum is moderated. Posts are reviewed to ensure a safe, supportive environment for all members. Please be kind and respectful.</span>
        </div>

        {/* Topic list */}
        {topicsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {searchQ || activeCategory !== "All"
                ? "No discussions match your search."
                : "No discussions yet — be the first to start one!"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  className="w-full text-left group"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <Card className="border border-border/40 hover:border-primary/30 transition-all hover:shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            {topic.is_pinned && (
                              <Pin className="w-3.5 h-3.5 text-primary shrink-0" />
                            )}
                            <Badge variant="outline" className="text-xs">{topic.category}</Badge>
                          </div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug mb-2 line-clamp-2">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                            {topic.body}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <AvatarChip userId={topic.user_id} profiles={profiles} />
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(topic.created_at)}</span>
                            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{topic.reply_count}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{topic.view_count}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Guest CTA */}
        {!currentUserId && (
          <div className="mt-8 text-center">
            <Card className="border border-border/40 bg-muted/20 inline-block w-full">
              <CardContent className="p-6">
                <User className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Join the Community</h3>
                <p className="text-sm text-muted-foreground mb-4">Sign in to post topics, reply to discussions, and connect with others.</p>
                <Button asChild size="sm">
                  <Link to="/auth">Sign In / Create Account</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
