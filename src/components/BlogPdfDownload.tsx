import { useState } from "react";

export default function BlogPdfDownload({ title, html, slug }: { title: string; html: string; slug: string }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function download() {
    setBusy(true);
    setStatus("Preparing article PDF…");
    try {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      parsed.querySelectorAll("script, style, iframe").forEach((node) => node.remove());
      parsed.querySelectorAll("p,h1,h2,h3,h4,li,tr,figcaption").forEach((node) => node.append("\n"));
      const citations = Array.from(parsed.querySelectorAll("a[href]"))
        .map((anchor) => {
          const href = anchor.getAttribute("href") ?? "";
          return `${anchor.textContent?.trim() || "Source"}: ${new URL(href, window.location.origin).href}`;
        })
        .join("\n");
      const { saveTextPdf } = await import("@/lib/pagePdf");
      const body = (parsed.body.textContent ?? "").trim();
      await saveTextPdf(title, `${body}\n\nLinks and sources\n${citations}`, `${slug}.pdf`);
      setStatus("Article PDF downloaded.");
    } catch {
      setStatus("PDF download failed. Please use Print / save PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={busy}
        aria-busy={busy}
        aria-describedby={`pdf-status-${slug}`}
        onClick={download}
        className="min-h-11 rounded-md border px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
      >
        {busy ? "Preparing PDF…" : "Download article PDF (text)"}
      </button>
      <span id={`pdf-status-${slug}`} role="status" aria-live="polite" className="block text-xs text-muted-foreground mt-1">
        {status}
      </span>
    </div>
  );
}
