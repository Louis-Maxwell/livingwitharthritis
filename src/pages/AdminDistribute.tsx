import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useBlogArticlesList } from "@/hooks/useBlogArticles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Copy, ExternalLink, Sparkles, Send } from "lucide-react";

interface Draft {
  id: string;
  slug: string;
  title: string;
  medium_markdown: string | null;
  linkedin_article: string | null;
  twitter_thread: string | null;
  facebook_post: string | null;
  reddit_post: string | null;
  pinterest_description: string | null;
  generated_at: string;
}

const SITE_URL = "https://livingwitharthritis.org.uk";

const channelLinks = (canonical: string, title: string) => ({
  medium: "https://medium.com/new-story",
  linkedin: `https://www.linkedin.com/article/new/?title=${encodeURIComponent(title)}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonical)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`,
  reddit: `https://www.reddit.com/r/arthritis/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(canonical)}`,
  pinterest: `https://www.pinterest.com/pin-builder/?url=${encodeURIComponent(canonical)}&description=${encodeURIComponent(title)}`,
});

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text).then(
    () => toast({ title: `${label} copied` }),
    () => toast({ title: "Copy failed", variant: "destructive" }),
  );
}

export default function AdminDistribute() {
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { data: posts, isLoading: postsLoading } = useBlogArticlesList();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [pinging, setPinging] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("syndication_drafts")
      .select("*")
      .order("generated_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setDrafts((data ?? []) as Draft[]));
  }, [isAdmin]);

  const draftsBySlug = useMemo(() => {
    const m: Record<string, Draft> = {};
    drafts.forEach((d) => { if (!m[d.slug]) m[d.slug] = d; });
    return m;
  }, [drafts]);

  const selectedDraft = selectedSlug ? draftsBySlug[selectedSlug] : null;
  const selectedPost = posts?.find((p) => p.slug === selectedSlug);

  const generatePack = async (slug: string) => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-syndication-pack", {
        body: { slug },
      });
      if (error) throw error;
      const draft = (data as { draft: Draft })?.draft;
      if (draft) {
        setDrafts((prev) => [draft, ...prev]);
        setSelectedSlug(slug);
        toast({ title: "Syndication pack generated" });
      }
    } catch (e) {
      toast({
        title: "Generation failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const pingIndexNow = async () => {
    setPinging(true);
    try {
      const urls = (posts ?? []).map((p) => `${SITE_URL}/blog/${p.slug}`);
      const { data, error } = await supabase.functions.invoke("indexnow-ping", {
        body: { urls },
      });
      if (error) throw error;
      toast({
        title: "Submitted to search engines",
        description: `${(data as { submitted?: number })?.submitted ?? 0} URLs sent to IndexNow`,
      });
    } catch (e) {
      toast({
        title: "IndexNow failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setPinging(false);
    }
  };

  if (adminLoading) return <div className="p-10">Loading…</div>;
  if (!isAdmin) {
    return (
      <div className="p-10 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admins only</h1>
        <Link to="/auth" className="underline">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Distribute Blogs — Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Distribute</h1>
            <p className="text-muted-foreground mt-1">
              Generate ready-to-paste posts for Medium, LinkedIn, Twitter, Reddit, Facebook and Pinterest. Copy, paste, publish.
            </p>
          </div>
          <Button onClick={pingIndexNow} disabled={pinging || postsLoading} variant="outline">
            {pinging ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Submit all URLs to search engines
          </Button>
        </header>

        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          {/* Post list */}
          <Card className="p-3 max-h-[75vh] overflow-y-auto">
            {postsLoading && <div className="p-4">Loading posts…</div>}
            {(posts ?? []).map((p) => {
              const has = !!draftsBySlug[p.slug];
              const active = selectedSlug === p.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`w-full text-left p-3 rounded-md mb-1 transition ${active ? "bg-primary/10" : "hover:bg-muted"}`}
                >
                  <div className="font-medium text-sm line-clamp-2">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <span>{p.category}</span>
                    {has && <span className="text-primary">• pack ready</span>}
                  </div>
                </button>
              );
            })}
          </Card>

          {/* Detail */}
          <div>
            {!selectedSlug && (
              <Card className="p-10 text-center text-muted-foreground">
                Select a post to generate or view its syndication pack.
              </Card>
            )}

            {selectedSlug && selectedPost && (
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                    <a
                      href={`${SITE_URL}/blog/${selectedPost.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground inline-flex items-center gap-1 mt-1 underline"
                    >
                      View live post <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <Button onClick={() => generatePack(selectedSlug)} disabled={generating}>
                    {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    {selectedDraft ? "Regenerate pack" : "Generate pack"}
                  </Button>
                </div>

                {!selectedDraft && (
                  <p className="text-muted-foreground">No pack yet. Click <strong>Generate pack</strong> to create drafts for all channels.</p>
                )}

                {selectedDraft && (
                  <DraftTabs draft={selectedDraft} title={selectedPost.title} />
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DraftTabs({ draft, title }: { draft: Draft; title: string }) {
  const canonical = `${SITE_URL}/blog/${draft.slug}`;
  const links = channelLinks(canonical, title);

  const channels: Array<{ key: string; label: string; content: string | null; openUrl: string }> = [
    { key: "medium", label: "Medium", content: draft.medium_markdown, openUrl: links.medium },
    { key: "linkedin", label: "LinkedIn", content: draft.linkedin_article, openUrl: links.linkedin },
    { key: "twitter", label: "Twitter / X", content: draft.twitter_thread, openUrl: links.twitter },
    { key: "facebook", label: "Facebook", content: draft.facebook_post, openUrl: links.facebook },
    { key: "reddit", label: "Reddit", content: draft.reddit_post, openUrl: links.reddit },
    { key: "pinterest", label: "Pinterest", content: draft.pinterest_description, openUrl: links.pinterest },
  ];

  return (
    <Tabs defaultValue="medium" className="mt-2">
      <TabsList className="flex-wrap h-auto">
        {channels.map((c) => (
          <TabsTrigger key={c.key} value={c.key}>{c.label}</TabsTrigger>
        ))}
      </TabsList>

      {channels.map((c) => (
        <TabsContent key={c.key} value={c.key} className="mt-4">
          <div className="flex gap-2 mb-3">
            <Button size="sm" onClick={() => copyText(c.content ?? "", c.label)} disabled={!c.content}>
              <Copy className="w-4 h-4 mr-1" /> Copy
            </Button>
            <a href={c.openUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">
                <ExternalLink className="w-4 h-4 mr-1" /> Open {c.label}
              </Button>
            </a>
          </div>
          <Textarea
            value={c.content ?? ""}
            readOnly
            className="min-h-[420px] font-mono text-xs"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
