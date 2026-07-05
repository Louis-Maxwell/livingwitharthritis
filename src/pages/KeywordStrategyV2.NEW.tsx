import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Search, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useKeywords40k, { KeywordRecord } from "@/hooks/useKeywords40k";
import PAID_KEYWORDS from "@/data/keywords-paid.generated";

/**
 * /admin/keyword-strategy-v2 — Point 1, 2 & 4 combined admin surface
 *
 * Tab 1: 40K organic keyword browser (search, filter by category, see target page)
 * Tab 2: Keyword-gap flagging — reads a rank-data JSON (populate from your
 *        Semrush/GSC export) and flags positions 5-20 as refresh candidates.
 *        NOTE: no live Semrush API is connected here; this reads a static
 *        JSON you export periodically. See "How to populate rank data" below.
 * Tab 3: Paid keyword set — CSV export ready for Google Ad Grants upload.
 *
 * Rename to KeywordStrategyV2.tsx and register at /admin/keyword-strategy-v2
 * in App.tsx, or merge into the existing AdminKeywordStrategy.tsx.
 */

interface RankRecord {
  keyword: string;
  position: number;
  url: string;
  clicks?: number;
  impressions?: number;
}

function downloadCSV(rows: string[][], filename: string) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function KeywordStrategyV2() {
  const [tab, setTab] = useState<"organic" | "gaps" | "paid">("organic");
  const { keywords, loading, error, byCategory, totalCount } = useKeywords40k();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [rankData, setRankData] = useState<RankRecord[]>([]);
  const [rankFileError, setRankFileError] = useState("");

  const categories = ["All", ...Object.keys(byCategory)];

  const filtered = useMemo(() => {
    let result = keywords;
    if (categoryFilter !== "All") result = result.filter((k) => k.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((k) => k.keyword.includes(q));
    }
    return result.slice(0, 500); // cap render for performance
  }, [keywords, categoryFilter, search]);

  const gapCandidates = useMemo(
    () => rankData.filter((r) => r.position >= 5 && r.position <= 20).sort((a, b) => a.position - b.position),
    [rankData]
  );

  const handleRankFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRankFileError("");
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        // Accept either JSON array or a simple CSV (keyword,position,url,clicks,impressions)
        if (file.name.endsWith(".json")) {
          setRankData(JSON.parse(text));
        } else {
          const lines = text.trim().split("\n").slice(1); // skip header
          const parsed: RankRecord[] = lines.map((line) => {
            const [keyword, position, url, clicks, impressions] = line.split(",");
            return {
              keyword: keyword?.replace(/"/g, ""),
              position: Number(position),
              url: url?.replace(/"/g, ""),
              clicks: Number(clicks) || undefined,
              impressions: Number(impressions) || undefined,
            };
          });
          setRankData(parsed);
        }
      } catch {
        setRankFileError("Couldn't parse that file. Expected JSON array or CSV: keyword,position,url,clicks,impressions");
      }
    };
    reader.readAsText(file);
  };

  const exportOrganicCSV = () => {
    const rows = [["keyword", "category", "target_page", "source", "intent"]];
    keywords.forEach((k) => rows.push([k.keyword, k.category, k.target_page ?? "", k.source, k.intent]));
    downloadCSV(rows, "living-with-arthritis-40k-keywords.csv");
  };

  const exportPaidCSV = () => {
    const rows = [["keyword", "category", "target_page", "suggested_match_type"]];
    PAID_KEYWORDS.forEach((k) => rows.push([k.keyword, k.category, k.target_page, k.suggested_match_type]));
    downloadCSV(rows, "living-with-arthritis-ad-grants-keywords.csv");
  };

  const exportGapsCSV = () => {
    const rows = [["keyword", "position", "url", "clicks", "impressions"]];
    gapCandidates.forEach((r) => rows.push([r.keyword, String(r.position), r.url, String(r.clicks ?? ""), String(r.impressions ?? "")]));
    downloadCSV(rows, "living-with-arthritis-content-refresh-candidates.csv");
  };

  return (
    <>
      <Helmet>
        <title>Keyword Strategy v2 | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Keyword Strategy Dashboard v2</h1>
        <p className="text-gray-600 mb-8">
          40,000 organic keywords ({totalCount.toLocaleString()} loaded) + {PAID_KEYWORDS.length} paid
          keywords for Ad Grants + content-refresh gap finder.
        </p>

        <div className="flex gap-2 border-b mb-6">
          {(["organic", "gaps", "paid"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                tab === t ? "border-red-600 text-red-600" : "border-transparent text-gray-500"
              }`}
            >
              {t === "organic" ? "40K Organic Keywords" : t === "gaps" ? "Content Refresh Gaps" : "Paid Keywords (Ad Grants)"}
            </button>
          ))}
        </div>

        {tab === "organic" && (
          <section>
            {loading && <p>Loading 40K keyword dataset...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            {!loading && !error && (
              <>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search keywords..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c} {c !== "All" ? `(${byCategory[c]?.length ?? 0})` : `(${totalCount})`}
                      </option>
                    ))}
                  </select>
                  <Button onClick={exportOrganicCSV} className="bg-red-600 hover:bg-red-700">
                    <Download className="w-4 h-4 mr-2" /> Export all 40K CSV
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mb-2">Showing {filtered.length} of {totalCount.toLocaleString()} (search/filter to narrow)</p>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3">Keyword</th>
                        <th className="text-left p-3">Category</th>
                        <th className="text-left p-3">Target Page</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((k, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{k.keyword}</td>
                          <td className="p-3">
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{k.category}</span>
                          </td>
                          <td className="p-3 text-blue-600">{k.target_page ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        )}

        {tab === "gaps" && (
          <section>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> How to populate rank data
              </p>
              <p className="text-gray-700">
                This reads a file you export — there's no live Semrush/GSC connection wired here.
                From Semrush: Position Tracking → Export → CSV. From Google Search Console:
                Performance → Export → CSV. Columns needed: keyword, position, url (clicks/impressions optional).
              </p>
            </div>

            <input
              type="file"
              accept=".json,.csv"
              onChange={handleRankFileUpload}
              className="mb-4 text-sm"
            />
            {rankFileError && <p className="text-red-600 text-sm mb-4">{rankFileError}</p>}

            {rankData.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="flex items-center gap-2 font-semibold">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    {gapCandidates.length} refresh candidates (ranking position 5–20)
                  </p>
                  <Button onClick={exportGapsCSV} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" /> Export candidates
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3">Keyword</th>
                        <th className="text-left p-3">Position</th>
                        <th className="text-left p-3">Page</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gapCandidates.slice(0, 200).map((r, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{r.keyword}</td>
                          <td className="p-3">
                            <span className={`font-semibold ${r.position <= 10 ? "text-amber-600" : "text-gray-500"}`}>
                              #{r.position}
                            </span>
                          </td>
                          <td className="p-3 text-blue-600 truncate max-w-xs">{r.url}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        )}

        {tab === "paid" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                {PAID_KEYWORDS.length} keywords mapped for Google Ad Grants ($10K/month free for
                registered charities). Export and upload directly to a Google Ads campaign.
              </p>
              <Button onClick={exportPaidCSV} className="bg-red-600 hover:bg-red-700">
                <Download className="w-4 h-4 mr-2" /> Export Ad Grants CSV
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Keyword</th>
                    <th className="text-left p-3">Target Page</th>
                    <th className="text-left p-3">Match Type</th>
                  </tr>
                </thead>
                <tbody>
                  {PAID_KEYWORDS.map((k, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{k.keyword}</td>
                      <td className="p-3 text-blue-600">{k.target_page}</td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{k.suggested_match_type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Note: Google Ad Grants requires an active application and approval — this dataset
              prepares your campaign structure but doesn't submit anything automatically.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
