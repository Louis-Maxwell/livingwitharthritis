import { FileText, ShoppingCart, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateArthritisFactSheet, generateShoppingListPdf, generateSelfAssessmentPdf } from "@/lib/generatePdf";

const resources = [
  {
    icon: FileText,
    title: "UK Arthritis Fact Sheet",
    desc: "Key statistics, prevalence data and economic impact of arthritis in the UK. Perfect for articles, presentations and resource pages.",
    action: generateArthritisFactSheet,
  },
  {
    icon: ShoppingCart,
    title: "Anti-Inflammatory Shopping List",
    desc: "Printable grocery checklist organised by food group — oily fish, berries, leafy greens, spices and more.",
    action: generateShoppingListPdf,
  },
  {
    icon: ClipboardCheck,
    title: "Joint Pain Self-Assessment",
    desc: "A simple printable tracker to rate pain, stiffness and mobility across all major joints — great for GP appointments.",
    action: generateSelfAssessmentPdf,
  },
];

export default function DownloadableResources() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((r) => (
        <Card key={r.title} className="border-none shadow-md bg-card hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 flex flex-col h-full">
            <r.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{r.desc}</p>
            <Button variant="outline" size="sm" onClick={r.action} className="gap-2 w-fit">
              <FileText className="w-4 h-4" /> Download PDF
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
