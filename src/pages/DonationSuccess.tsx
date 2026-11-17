import { useEffect } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { XCircle, Heart, ArrowLeft, Home } from "lucide-react";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const status = searchParams.get("donation");
  // /donation-result/success is the canonical success path (query strings are
  // stripped before analytics ever sees them, so a goal can't be tracked
  // reliably off ?donation=success alone — see create-donation-checkout).
  // The query param is still checked for any in-flight Stripe sessions
  // created before this path existed.
  const isSuccess = status === "success" || location.pathname === "/donation-result/success";
  // A return URL is not proof of payment. Only a provider-verified completion
  // may record donation revenue or confirm that money was received.
  useEffect(() => {
    document.title = "Donation Status | Living With Arthritis";
  }, []);

  return (
    <>
      <SeoHead
        title="Donation Status"
        description="Check your payment provider receipt for confirmation of your donation to Living With Arthritis. This return page cannot verify a payment or charge."
        path="/donation-result"
        noindex
      />
      <Header />
      <main id="main-content" className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          {isSuccess ? (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center animate-scale-in">
                <Heart className="w-10 h-10 text-primary" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Thank you for your support</h1>
                <p className="text-lg text-muted-foreground">
                  This page cannot confirm whether your donation was completed. Please check your payment provider receipt or account for the final payment status.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-5 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <p className="font-semibold text-foreground">Your impact matters</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  If your payment was completed, thank you. Your support helps keep our arthritis guides and resources free. If you are unsure, check with your payment provider before trying again to avoid a duplicate donation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center pt-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild className="rounded-full btn-primary-cta">
                  <Link to="/blog">Explore Our Resources</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center animate-scale-in">
                <XCircle className="w-10 h-10 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Check your donation status</h1>
                <p className="text-lg text-muted-foreground">
                  We cannot verify a payment or cancellation from this page. Check your payment provider receipt or account before trying again.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center pt-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild className="rounded-full btn-primary-cta">
                  <a href="https://www.gofundme.com/f/help-fund-critical-arthritis-research" target="_blank" rel="noopener noreferrer">Other ways to support<span className="sr-only"> (opens in a new tab)</span></a>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DonationSuccess;
