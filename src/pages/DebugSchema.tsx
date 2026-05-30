import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, RefreshCw, AlertCircle, Download } from "lucide-react";

interface SchemaBlock {
  index: number;
  raw: string;
  data: any;
  parseError?: string;
}

const PRESETS = [
  "/",
  "/blog",
  "/faq",
  "/about",
  "/diet/mediterranean-diet-for-arthritis",
  "/exercises/tai-chi-for-arthritis",
  "/conditions/osteoarthritis",
];

function getTypeLabel(data: any): string {
  if (!data) return "Unknown";
  const t = data["@type"];
  if (Array.isArray(t)) return t.join(" + ");
  return t || "(no @type)";
}

function getNameField(data: any): string | null {
  if (!data) return null;
  return data.name || data.headline || data.url || null;
}

export default function DebugSchema() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPath = searchParams.get("page") || "/";
  const [pagePath, setPagePath] = useState(initialPath);
  const [inputValue, setInputValue] = useState(initialPath);
  const [blocks, setBlocks] = useState<SchemaBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeSrc = `${pagePath}${pagePath.includes("?") ? "&" : "?"}__debug_schema=1`;

  const scanIframe = () => {
    setError(null);
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      setError("Iframe not ready.");
      return;
    }
    try {
      const doc = iframe.contentWindow.document;
      // Wait a tick to allow useEffect-injected scripts to land
      setTimeout(() => {
        try {
          const scripts = doc.head.querySelectorAll<HTMLScriptElement>(
            'script[type="application/ld+json"]',
          );
          const found: SchemaBlock[] = [];
          scripts.forEach((s, i) => {
            const raw = s.textContent || "";
            try {
              const data = JSON.parse(raw);
              found.push({ index: i, raw, data });
            } catch (e: any) {
              found.push({ index: i, raw, data: null, parseError: e.message });
            }
          });
          setBlocks(found);
          setLoading(false);
        } catch (e: any) {
          setError(`Could not read iframe head: ${e.message}`);
          setLoading(false);
        }
      }, 800);
    } catch (e: any) {
      setError(`Cross-origin error: ${e.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setBlocks([]);
  }, [pagePath]);

  const handleLoad = (path: string) => {
    setPagePath(path);
    setInputValue(path);
    setSearchParams({ page: path });
    setExpanded({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Schema Debug Inspector</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/debug/schema" />
      </Helmet>
      <Header />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-[1200px]">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-3">Internal tool</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            JSON-LD Schema Inspector
          </h1>
          <p className="text-muted-foreground">
            Renders any route in an iframe and lists every{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
              application/ld+json
            </code>{" "}
            block found in its <code className="text-xs bg-muted px-1.5 py-0.5 rounded">&lt;head&gt;</code>.
          </p>
        </div>

        {/* Route selector */}
        <Card className="p-5 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESETS.map((p) => (
              <Button
                key={p}
                size="sm"
                variant={p === pagePath ? "default" : "outline"}
                onClick={() => handleLoad(p)}
              >
                {p}
              </Button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleLoad(inputValue.startsWith("/") ? inputValue : `/${inputValue}`);
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="/some/route"
              className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-sm"
            />
            <Button type="submit">Load</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setLoading(true);
                iframeRef.current?.contentWindow?.location.reload();
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </form>
        </Card>

        {/* Iframe preview */}
        <Card className="mb-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-border bg-muted/40 text-xs text-muted-foreground flex items-center justify-between">
            <span>Preview: <code>{pagePath}</code></span>
            {loading && <span>Loading…</span>}
          </div>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title="Route preview"
            className="w-full h-[400px] bg-background"
            onLoad={scanIframe}
          />
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
          <h2 className="font-display text-xl font-semibold">
            Detected blocks ({blocks.length})
          </h2>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={blocks.length === 0}
              onClick={() => {
                const payload = {
                  route: pagePath,
                  scannedAt: new Date().toISOString(),
                  count: blocks.length,
                  blocks: blocks.map((b) => ({
                    index: b.index,
                    type: getTypeLabel(b.data),
                    name: getNameField(b.data),
                    parseError: b.parseError ?? null,
                    data: b.parseError ? null : b.data,
                    raw: b.parseError ? b.raw : undefined,
                  })),
                };
                const json = JSON.stringify(payload, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const slug =
                  pagePath === "/"
                    ? "home"
                    : pagePath.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-");
                const stamp = new Date().toISOString().replace(/[:.]/g, "-");
                const a = document.createElement("a");
                a.href = url;
                a.download = `jsonld-${slug}-${stamp}.json`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="h-4 w-4 mr-1.5" />
              Export JSON
            </Button>
            <Button size="sm" variant="outline" onClick={scanIframe}>
              Re-scan
            </Button>
          </div>
        </div>

        {error && (
          <Card className="p-4 mb-4 border-destructive/50 bg-destructive/5 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        {!loading && !error && blocks.length === 0 && (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No JSON-LD blocks found on this route.
          </Card>
        )}

        <div className="space-y-3">
          {blocks.map((block) => {
            const isOpen = expanded[block.index] ?? false;
            const typeLabel = getTypeLabel(block.data);
            const nameLabel = getNameField(block.data);
            return (
              <Card key={block.index} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((e) => ({ ...e, [block.index]: !isOpen }))
                  }
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
                >
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <Badge className="shrink-0">{typeLabel}</Badge>
                  {nameLabel && (
                    <span className="text-sm text-muted-foreground truncate">
                      {nameLabel}
                    </span>
                  )}
                  {block.parseError && (
                    <Badge variant="destructive" className="ml-auto">
                      Parse error
                    </Badge>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">
                    #{block.index + 1}
                  </span>
                </button>
                {isOpen && (
                  <pre className="text-xs p-4 bg-muted/40 border-t border-border overflow-x-auto max-h-[400px]">
                    {block.parseError
                      ? `Parse error: ${block.parseError}\n\nRaw:\n${block.raw}`
                      : JSON.stringify(block.data, null, 2)}
                  </pre>
                )}
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
