import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/hooks/useAdmin";
import {
  KEYWORDS_1000,
  ORGANIC_KEYWORDS,
  PAID_KEYWORDS,
  type KeywordEntry,
  type KeywordGroup,
  type KeywordIntent,
  type KeywordCategory,
} from "@/data/keywords-1000";
import { Download, Search, TrendingUp } from "lucide-react";

const INTENTS: KeywordIntent[] = [
  "informational",
  "commercial",
  "transactional",
  "navigational",
];

const CATEGORIES: KeywordCategory[] = [
  "condition",
  "symptom",
  "treatment",
  "medication",
  "exercise",
  "tai-chi",
  "diet",
  "supplement",
  "physio",
  "surgery",
  "donation",
  "support",
  "product",
  "local-service",
];

function toCsv(rows: KeywordEntry[]): string {
  const header = "keyword,intent,category,targetPage,group";
  const body = rows
    .map(
      (r) =>
        `"${r.keyword.replace(/"/g, '""')}",${r.intent},${r.category},${r.targetPage},${r.group}`,
    )
    .join("\n");
  return `${header}\n${body}`;
}

export default function AdminKeywordStrategy() {
  const { isAdmin, isLoading } = useAdmin();

  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<KeywordGroup | "all">("all");
  const [intent, setIntent] = useState<KeywordIntent | "all">("all");
  const [category, setCategory] = useState<KeywordCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return KEYWORDS_1000.filter((k) => {
      if (group !== "all" && k.group !== group) return false;
      if (intent !== "all" && k.intent !== intent) return false;
      if (category !== "all" && k.category !== category) return false;
      if (q && !k.keyword.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, group, intent, category]);

  const exportCsv = () => {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keywords-${group}-${intent}-${category}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          Loading…
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Keyword Strategy: 1,000 Keywords"
        description="Admin dashboard for browsing the 1,000-keyword UK arthritis strategy (500 organic + 500 paid) by intent, category and target page."
        path="/admin/keyword-strategy"
        noindex
      />
      <Header />

      <main id="main-content" className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" aria-hidden />
          <div>
            <h1 className="text-3xl font-bold">Keyword Strategy</h1>
            <p className="text-muted-foreground">
              {ORGANIC_KEYWORDS.length} organic + {PAID_KEYWORDS.length} paid
              = {KEYWORDS_1000.length} UK-focused arthritis keywords
            </p>
          </div>
        </div>

        <Card className="mb-6 p-4">
          <div className="grid gap-3 md:grid-cols-5">
            <div className="md:col-span-2">
              <label className="text-sm font-medium" htmlFor="kw-search">
                Search
              </label>
              <div className="relative mt-1">
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="kw-search"
                  className="pl-9"
                  placeholder="e.g. knee, tai chi, donate…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Group</label>
              <Select
                value={group}
                onValueChange={(v) => setGroup(v as KeywordGroup | "all")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All groups</SelectItem>
                  <SelectItem value="organic">Organic (SEO)</SelectItem>
                  <SelectItem value="paid">Paid (PPC)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Intent</label>
              <Select
                value={intent}
                onValueChange={(v) => setIntent(v as KeywordIntent | "all")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All intents</SelectItem>
                  {INTENTS.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={category}
                onValueChange={(v) =>
                  setCategory(v as KeywordCategory | "all")
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filtered.length}</strong> of{" "}
              {KEYWORDS_1000.length}
            </p>
            <Button onClick={exportCsv} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" aria-hidden />
              Export CSV
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="max-h-[70vh] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background">
                <tr className="text-left">
                  <th className="p-3 font-semibold">Keyword</th>
                  <th className="p-3 font-semibold">Intent</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">Target page</th>
                  <th className="p-3 font-semibold">Group</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((k) => (
                  <tr key={`${k.group}-${k.keyword}`} className="border-t">
                    <td className="p-3">{k.keyword}</td>
                    <td className="p-3">
                      <Badge variant="outline">{k.intent}</Badge>
                    </td>
                    <td className="p-3">{k.category}</td>
                    <td className="p-3">
                      <a
                        href={k.targetPage}
                        className="text-primary underline underline-offset-2"
                      >
                        {k.targetPage}
                      </a>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={k.group === "organic" ? "secondary" : "default"}
                      >
                        {k.group}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No keywords match those filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
