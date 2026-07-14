import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Buddy = () => {
  return (
    <>
      <SeoHead
        title="Buddy Matching"
        description="Get paired with someone who's been there. Free arthritis buddy mentoring — share experiences, get support, build community."
        path="/buddy"
      />
      <Header />
      <main id="main-content">
        <PageHero
          badge="Buddy"
          title="Find your arthritis buddy"
          subtitle="Get paired with someone who lives with the same condition — share what works, lift each other up."
        />
        <section className="container mx-auto px-4 py-16 max-w-2xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="space-y-3">
                  <h2 className="text-xl font-serif font-semibold">Buddy matching is temporarily unavailable</h2>
                  <p className="text-muted-foreground">
                    We're upgrading our peer-mentoring programme. In the meantime, our{" "}
                    <Link to="/helpline" className="text-primary underline-offset-4 hover:underline">helpline</Link>{" "}
                    and{" "}
                    <Link to="/community/connect-groups" className="text-primary underline-offset-4 hover:underline">Connect Groups</Link>{" "}
                    are open and free. Thank you for your patience.
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

export default Buddy;
