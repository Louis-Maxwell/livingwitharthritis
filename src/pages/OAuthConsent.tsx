import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

// Supabase auth removed - restore for OAuth functionality
const supabase = { auth: { getSession: async () => ({ data: { session: null } }), oauth: {} } };

// Beta typed wrapper for supabase.auth.oauth — TypeScript may not see it yet.
type OAuthClient = { name?: string; client_name?: string; redirect_uri?: string; redirect_uris?: string[] };
type OAuthDetails = {
  client?: OAuthClient;
  scopes?: string[];
  requested_scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};

function oauthClient(): OAuthApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase.auth as any).oauth as OAuthApi;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id in URL.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user.email ?? null);
      const { data, error } = await oauthClient().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const res = approve
      ? await oauthClient().approveAuthorization(authorizationId)
      : await oauthClient().denyAuthorization(authorizationId);
    if (res.error) {
      setBusy(false);
      setError(res.error.message);
      return;
    }
    const target = res.data?.redirect_url ?? res.data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const shellClass =
    "min-h-screen flex items-center justify-center bg-background p-6";
  const cardClass =
    "w-full max-w-lg bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6";

  if (error) {
    return (
      <main id="main-content" className={shellClass}>
        <SeoHead title="Authorize App" description="OAuth authorization request." path="/.lovable/oauth/consent" noindex />
        <div className={cardClass}>
          <h1 className="text-2xl font-semibold text-foreground">Could not load this authorization request</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
          <a href="/" className="inline-block text-sm text-primary underline">Back to home</a>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main id="main-content" className={shellClass}>
        <SeoHead title="Authorize App" description="OAuth authorization request." path="/.lovable/oauth/consent" noindex />
        <div className={cardClass}>
          <div className="animate-pulse text-sm text-muted-foreground">Loading authorization request…</div>
        </div>
      </main>
    );
  }

  const clientName = details.client?.client_name ?? details.client?.name ?? "an external app";
  const redirectUri =
    details.client?.redirect_uri ?? details.client?.redirect_uris?.[0] ?? null;
  const scopes = details.scopes ?? details.requested_scopes ?? [];

  return (
    <main id="main-content" className={shellClass}>
      <SeoHead
        title={`Connect ${clientName}`}
        description={`Authorize ${clientName} to connect to Living With Arthritis UK.`}
        path="/.lovable/oauth/consent"
        noindex
      />
      <div className={cardClass}>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
            Connect an app
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Connect {clientName} to Living With Arthritis UK
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {clientName} will be able to call this app's enabled tools while you are signed in.
          </p>
        </div>

        {userEmail && (
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{userEmail}</span>
          </div>
        )}

        {redirectUri && (
          <div className="text-xs text-muted-foreground break-all">
            Will return to: <span className="font-mono">{redirectUri}</span>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">This will allow {clientName} to:</p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Search and read published Living With Arthritis UK articles as you</li>
            <li>View your own appointments and pain journal entries</li>
            <li>Add new pain journal entries on your behalf</li>
          </ul>
          {scopes.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Requested scopes: {scopes.join(", ")}
            </p>
          )}
          <p className="text-xs text-muted-foreground pt-2">
            This does not bypass this app's permissions or backend policies. Your data stays scoped to your account.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-lg bg-primary text-primary-foreground font-medium py-3 hover:opacity-90 transition disabled:opacity-50"
          >
            {busy ? "Working…" : "Approve"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-lg border border-border text-foreground font-medium py-3 hover:bg-muted transition disabled:opacity-50"
          >
            Cancel connection
          </button>
        </div>
      </div>
    </main>
  );
}
