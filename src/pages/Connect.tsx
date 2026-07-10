import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { injectJsonLd, buildBreadcrumb } from "@/lib/jsonLd";
import { Copy, Check, Bot } from "lucide-react";

const PATH = "/connect";

const Connect = () => {
  const [copied, setCopied] = useState(false);

  const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "";
  const mcpUrl = projectRef
    ? `https://${projectRef}.supabase.co/functions/v1/mcp`
    : "";

  useEffect(() => {
    const c1 = injectJsonLd(
      "connect-breadcrumb",
      buildBreadcrumb([
        { name: "Home", path: "/" },
        { name: "Connect an AI assistant", path: PATH },
      ])
    );
    return () => {
      c1();
    };
  }, []);

  const handleCopy = async () => {
    if (!mcpUrl) return;
    try {
      await navigator.clipboard.writeText(mcpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Connect an AI Assistant"
        description="Connect ChatGPT, Claude or another AI assistant to Living With Arthritis UK so it can read our evidence-based guides and, when you sign in, help with your own appointments and pain journal."
        path={PATH}
      />
      <Header />
      <main className="container mx-auto px-6 md:px-12 py-16 lg:py-24 max-w-3xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Agent Integrations
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Connect an AI assistant
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            Link ChatGPT, Claude or another MCP-compatible assistant to Living
            With Arthritis UK. The assistant can read our evidence-based guides
            and, after you sign in, help you review your own appointments and
            pain journal.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Your MCP server URL
          </h2>
          <p className="text-foreground/85 mb-4">
            Copy this address and paste it into your AI assistant when it asks
            for an MCP server URL.
          </p>

          {mcpUrl ? (
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center p-4 border border-border/30 bg-muted/20">
              <code className="flex-1 text-sm font-mono break-all text-foreground/90">
                {mcpUrl}
              </code>
              <Button
                onClick={handleCopy}
                variant="default"
                size="sm"
                className="shrink-0"
                aria-label={copied ? "Copied" : "Copy MCP URL"}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy URL
                  </>
                )}
              </Button>
            </div>
          ) : (
            <p className="text-foreground/70">
              MCP server URL is not configured for this environment.
            </p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Bot className="w-6 h-6" aria-hidden="true" />
            ChatGPT
          </h2>
          <ol className="space-y-3 text-foreground/85 list-decimal list-inside">
            <li>
              Open{" "}
              <a
                href="https://chatgpt.com/#settings/Connectors/Advanced"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                ChatGPT Connectors settings
              </a>{" "}
              and enable Developer mode if prompted.
            </li>
            <li>In the chat composer, open the "+" menu and turn on Connectors.</li>
            <li>Choose "Add sources", then "Connect more".</li>
            <li>Name the connector (for example, "Living With Arthritis UK").</li>
            <li>Paste the MCP server URL above and save.</li>
            <li>Ask ChatGPT a question about arthritis, diet or exercise.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Bot className="w-6 h-6" aria-hidden="true" />
            Claude
          </h2>
          <ol className="space-y-3 text-foreground/85 list-decimal list-inside">
            <li>
              Open{" "}
              <a
                href="https://claude.ai/customize/connectors?modal=add-custom-connector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                Claude custom connectors
              </a>{" "}
              and sign in if needed.
            </li>
            <li>Click "Add custom connector".</li>
            <li>Name the connector (for example, "Living With Arthritis UK").</li>
            <li>Paste the MCP server URL above.</li>
            <li>Enable the connector from the chat composer, then ask Claude about your arthritis questions.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            What you can ask
          </h2>
          <p className="text-foreground/85 mb-4">
            Once connected, the assistant can use our published guides to answer
            questions such as:
          </p>
          <ul className="space-y-2 text-foreground/85 list-disc list-inside">
            <li>What exercises help knee osteoarthritis?</li>
            <li>What foods should I avoid with arthritis?</li>
            <li>What is the evidence for turmeric supplements?</li>
          </ul>
          <p className="text-foreground/85 mt-4">
            If you sign in, it can also help you review your appointments and
            pain journal entries — but only the data you have already recorded on
            this site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Privacy & security
          </h2>
          <ul className="space-y-3 text-foreground/85 list-disc list-inside">
            <li>The assistant only accesses your personal data after you sign in and approve the connection.</li>
            <li>You can deny the connection at any time from the consent screen.</li>
            <li>Read more in our{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-2 hover:opacity-80">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/about/ai-transparency" className="text-primary underline underline-offset-2 hover:opacity-80">
                AI Transparency
              </Link>{" "}
              pages.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
