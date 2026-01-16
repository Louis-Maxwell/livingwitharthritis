import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ZohoInvoiceSection = () => {
  const zohoInvoiceUrl = "https://www.zoho.com/invoice/free-invoice-generator.html";

  const handleOpenInNewTab = () => {
    window.open(zohoInvoiceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="invoice-generator" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Free Invoice Generator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Create Professional Invoices
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate and download professional invoices instantly using Zoho's free invoice generator. 
            No sign-up required.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Zoho Invoice Generator
                </CardTitle>
                <CardDescription className="mt-1">
                  Create, customize, and download invoices for free
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleOpenInNewTab}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ height: "700px" }}>
              <iframe
                src={zohoInvoiceUrl}
                title="Zoho Free Invoice Generator"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a 
              href="https://www.zoho.com/invoice/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Zoho Invoice
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ZohoInvoiceSection;
