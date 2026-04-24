import { FileText, ShoppingCart, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const resources = [
  {
    icon: FileText,
    title: "UK Arthritis Fact Sheet",
    desc: "Key statistics, prevalence data and economic impact of arthritis in the UK. Perfect for articles, presentations and resource pages.",
    fn: "generateArthritisFactSheet" as const,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
  },
  {
    icon: ShoppingCart,
    title: "Anti-Inflammatory Shopping List",
    desc: "Printable grocery checklist organised by food group — oily fish, berries, leafy greens, spices and more.",
    fn: "generateShoppingListPdf" as const,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
  },
  {
    icon: ClipboardCheck,
    title: "Joint Pain Self-Assessment",
    desc: "A simple printable tracker to rate pain, stiffness and mobility across all major joints — great for GP appointments.",
    fn: "generateSelfAssessmentPdf" as const,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop",
  },
];

export default function DownloadableResources() {
  const handleDownload = async (fnName: string, title: string) => {
    trackEvent("guide_download_click", { resource: fnName, title, location: "downloadable_resources" });
    try {
      const mod = await import("@/lib/generatePdf");
      (mod as Record<string, () => void>)[fnName]();
      trackEvent("guide_download_success", { resource: fnName, title });
    } catch (err) {
      trackEvent("guide_download_failure", {
        resource: fnName,
        message: err instanceof Error ? err.message : "unknown",
      });
    }
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((r) => (
        <Card key={r.title} className="border-none shadow-md bg-card hover:shadow-lg transition-shadow overflow-hidden group">
          <div className="relative h-40 overflow-hidden">
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <div className="w-9 h-9 rounded-lg bg-primary/90 flex items-center justify-center">
                <r.icon className="w-4.5 h-4.5 text-white" />
              </div>
            </div>
          </div>
          <CardContent className="pt-4 pb-5 flex flex-col">
            <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{r.desc}</p>
            <Button variant="outline" size="sm" onClick={() => handleDownload(r.fn)} className="gap-2 w-fit">
              <FileText className="w-4 h-4" /> Download PDF
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
