import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasInstallPrompt, isAppInstalled, showInstallPrompt } from '@/lib/installPrompt';
import { removeOfflineBlankRecords, saveBlankRecordsOffline } from '@/lib/offlinePrintables';

/** In normal page flow, never a floating overlay. No install prompt without a click. */
export default function InstallBanner({ immediate = false }: { immediate?: boolean }) {
  const { pathname } = useLocation();
  const eligible = pathname === '/exercises' || pathname.startsWith('/exercises/') || pathname === '/resources/symptom-flare-tracker';
  const [ready, setReady] = useState(immediate);
  const [dismissed, setDismissed] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  useEffect(() => {
    setReady(immediate);setStatus('');
    if (!eligible || immediate) return;
    const timer = window.setTimeout(() => setReady(true), 60000);
    return () => window.clearTimeout(timer);
  }, [pathname, eligible, immediate]);
  useEffect(() => {
    const update = () => setInstallable(hasInstallPrompt() && !isAppInstalled());
    update();window.addEventListener('lwa-install-available', update);
    return () => window.removeEventListener('lwa-install-available', update);
  }, []);
  if (!eligible || !ready || dismissed) return null;
  return <section aria-label="Save for another day" className="container mx-auto my-8 max-w-3xl rounded-xl border border-primary/25 bg-background p-5 text-foreground">
    <div className="flex items-start justify-between gap-4"><h2 className="font-display text-xl font-bold">Keep useful blank records handy</h2><button type="button" onClick={() => setDismissed(true)} className="min-h-11 min-w-11 rounded border border-border px-2 text-sm">Dismiss</button></div>
    <p className="my-3 text-sm leading-relaxed">Save the blank GP appointment tracker and flare log on this device. No completed notes are collected. Clinical guides still need an internet connection; the new sheets are awaiting separate clinical review.</p>
    <div className="flex flex-wrap gap-3"><button type="button" disabled={saving} className="min-h-11 rounded-full bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60" onClick={async () => {
      setSaving(true);setStatus('Saving blank sheets on this device...');
      try { await saveBlankRecordsOffline();setStatus('Both blank sheets are saved on this device. Reconnect and reopen the toolkit to refresh them. Your browser can remove offline storage.'); }
      catch(error) { setStatus(error instanceof Error ? error.message : 'Offline saving failed. Download the PDFs instead.'); }
      finally { setSaving(false); }
    }}>{saving ? 'Saving...' : 'Save blank sheets offline'}</button>
    {installable && <button type="button" className="min-h-11 rounded-full border border-primary px-5 font-semibold" onClick={() => { void showInstallPrompt().catch(() => setStatus('Use your browser menu to add this site to your home screen.')); }}>Add to home screen</button>}</div>
    <p className="mt-3"><button type="button" disabled={saving} className="min-h-11 text-sm text-primary underline" onClick={() => { void removeOfflineBlankRecords().then(() => setStatus('Offline copies removed. Close this tab to finish turning off its offline fallback.')).catch(() => setStatus('Could not remove offline copies. Use your browser site-storage settings.')); }}>Remove saved offline copies</button></p>
    <p role="status" aria-live="polite" className="mt-3 text-sm">{status}</p>
    <p className="mt-3 text-sm">To save a shortcut, use Add to Home Screen or Install in your browser menu where available. Installation options vary by browser. <a href="/resources/symptom-flare-tracker" className="text-primary underline">Open the printable toolkit</a>.</p>
  </section>;
}
