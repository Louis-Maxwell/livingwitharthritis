import { useEffect, useState } from 'react';
import { backendHeaders, backendUrl } from '@/lib/donateClickTracker';

interface Row { label: string; clicks: number }
interface Stats {
  total: number; today: number; last7: number; last30: number;
  byButton: Row[]; byPage: Row[]; byDay: { day: string; clicks: number }[];
}

const DonateClickStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'Donate button clicks | Living With Arthritis';
    fetch(`${backendUrl}/rest/v1/rpc/get_donate_click_stats`, {
      method: 'POST', headers: backendHeaders, body: '{}',
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setStats)
      .catch(() => setHasError(true));
    return () => { meta.remove(); };
  }, []);

  const cards = stats ? [
    ['Today', stats.today], ['Last 7 days', stats.last7],
    ['Last 30 days', stats.last30], ['All time', stats.total],
  ] as const : [];

  const table = (title: string, rows: Row[]) => (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-2 text-muted-foreground">No clicks yet.</p>
      ) : (
        <table className="mt-3 w-full text-left">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border">
                <td className="py-2 pr-4 text-foreground break-all">{r.label}</td>
                <td className="py-2 text-right font-bold text-foreground">{r.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );

  return (
    <main className="container mx-auto max-w-4xl px-5 py-16">
      <h1 className="text-3xl font-bold text-foreground">Donate button clicks</h1>
      <p className="mt-2 text-muted-foreground">
        How many times visitors have clicked a Donate button anywhere on the site.
      </p>
      {hasError && <p className="mt-6 text-foreground">Couldn&apos;t load the numbers. Please refresh.</p>}
      {!stats && !hasError && <p className="mt-6 text-muted-foreground">Loading…</p>}
      {stats && (
        <>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-muted p-5">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
              </div>
            ))}
          </div>
          {table('Clicks by button', stats.byButton)}
          {table('Clicks by page', stats.byPage)}
          {table('Clicks per day (last 30 days)',
            stats.byDay.map((d) => ({ label: d.day, clicks: d.clicks })))}
        </>
      )}
    </main>
  );
};

export default DonateClickStats;
