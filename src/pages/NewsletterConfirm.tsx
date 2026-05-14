import { useEffect, useState } from "react";
import SeoHead from "@/components/SeoHead";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const NewsletterConfirm = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) { setStatus("error"); setMessage("Missing confirmation token."); return; }
    (async () => {
      const { data, error } = await supabase.functions.invoke("confirm-newsletter", { body: { action: "confirm", token } });
      if (error || !data?.ok) {
        setStatus("error");
        setMessage(data?.error?.message ?? "Could not confirm.");
      } else {
        setStatus("ok");
        setMessage(`Subscription confirmed for ${data.data.email}.`);
      }
    })();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Confirm Newsletter | Living With Arthritis UK</title>
        <link rel="canonical" href="https://livingwitharthritis.org.uk/newsletter/confirm" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      </Helmet>
      <Header />
      <main id="main-content">
        <PageHero badge="Newsletter" title="Confirm your subscription" subtitle="One quick step to start receiving updates." />
        <section className="container mx-auto px-4 py-16 max-w-md text-center">
          {status === "loading" && <Loader2 className="h-8 w-8 animate-spin mx-auto" />}
          {status === "ok" && (
            <div className="space-y-3"><CheckCircle2 className="h-12 w-12 text-primary mx-auto" /><p>{message}</p></div>
          )}
          {status === "error" && (
            <div className="space-y-3"><AlertCircle className="h-12 w-12 text-destructive mx-auto" /><p>{message}</p></div>
          )}
        </section>
      </main>
    </>
  );
};

export default NewsletterConfirm;
