import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BuddyMatch = () => {
  return (
    <>
      <SeoHead
        title="Your Buddy Matches"
        description="View your pending and active arthritis buddy pairings — connect with mentors and mentees who share your condition."
        path="/buddy/match"
        noindex
      />
      <Header />
      <main id="main-content">
        <PageHero badge="Buddy" title="Your matches" subtitle="Pending and active buddy pairings." />
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="space-y-3">
                  <h2 className="text-xl font-serif font-semibold">Buddy matches are temporarily unavailable</h2>
                  <p className="text-muted-foreground">
                    The buddy programme is paused while we upgrade it. See our{" "}
                    <Link to="/community/connect-groups" className="text-primary underline-offset-4 hover:underline">Connect Groups</Link>{" "}
                    for peer support in the meantime.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default BuddyMatch;
