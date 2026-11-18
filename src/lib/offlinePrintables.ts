export const OFFLINE_WORKER = '/sw.js?feature=blank-records-v1';
export async function saveBlankRecordsOffline(): Promise<void> {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) throw new Error('Offline saving is not supported in this browser. Download the PDFs instead.');
  const registration = await navigator.serviceWorker.register(OFFLINE_WORKER, { scope: '/', updateViaCache: 'none' });
  const worker = registration.installing || registration.waiting || registration.active;
  if (!worker) throw new Error('Offline saving did not start. Download the PDFs instead.');
  if (worker.state !== 'activated') await new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => { worker.removeEventListener('statechange', changed);reject(new Error('Offline saving is taking longer than expected. Reconnect and try again.')); }, 30000);
    function changed() {
      if (worker!.state === 'activated') { window.clearTimeout(timer);worker!.removeEventListener('statechange', changed);resolve(); }
      else if (worker!.state === 'redundant') { window.clearTimeout(timer);worker!.removeEventListener('statechange', changed);reject(new Error('Offline saving failed. Download the PDFs instead.')); }
    }
    worker.addEventListener('statechange', changed);changed();
  });
  // The browser may evict caches while retaining the registration. Refresh the
  // fixed file set on every explicit save, and confirm only after it completes.
  await new Promise<void>((resolve, reject) => {
    const channel = new MessageChannel();
    const timer = window.setTimeout(() => { channel.port1.close();reject(new Error('Could not confirm offline saving. Reconnect and try again.')); }, 30000);
    channel.port1.onmessage = event => {
      window.clearTimeout(timer);channel.port1.close();
      if (event.data?.saved === true) resolve();
      else reject(new Error('Offline saving failed. Download the PDFs instead.'));
    };
    worker.postMessage({ type: 'SAVE_BLANK_RECORDS' }, [channel.port2]);
  });
}

export async function removeOfflineBlankRecords(): Promise<void> {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.filter(registration => {
      const worker = registration.active || registration.waiting || registration.installing;
      return worker && new URL(worker.scriptURL).origin === window.location.origin && new URL(worker.scriptURL).pathname + new URL(worker.scriptURL).search === OFFLINE_WORKER;
    }).map(registration => registration.unregister()));
  }
  if ('caches' in window) await Promise.all((await caches.keys()).filter(key => key.startsWith('lwa-blank-records-')).map(key => caches.delete(key)));
}
