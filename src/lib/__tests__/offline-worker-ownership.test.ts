import { afterEach, describe, expect, it, vi } from 'vitest';
import { removeStaleServiceWorkers } from '@/lib/chunkRecovery';
import { OFFLINE_WORKER, removeOfflineBlankRecords } from '@/lib/offlinePrintables';

function registration(path: string) {
  return { active: { scriptURL: new URL(path, window.location.origin).href }, unregister: vi.fn().mockResolvedValue(true) };
}
afterEach(() => vi.unstubAllGlobals());
describe('offline worker ownership', () => {
  it('preserves only the explicitly identified blank-record worker during stale-deploy cleanup', async () => {
    const own = registration(OFFLINE_WORKER);
    const legacy = registration('/sw.js');
    vi.stubGlobal('navigator', { serviceWorker: { getRegistrations: async () => [own, legacy] } });
    const remove = vi.fn().mockResolvedValue(true);
    vi.stubGlobal('caches', { keys: async () => ['legacy-page-cache', 'lwa-blank-records-v1'], delete: remove });
    removeStaleServiceWorkers();
    await vi.waitFor(() => expect(remove).toHaveBeenCalledWith('legacy-page-cache'));
    expect(own.unregister).not.toHaveBeenCalled();
    expect(legacy.unregister).toHaveBeenCalledOnce();
    expect(remove).not.toHaveBeenCalledWith('lwa-blank-records-v1');
  });
  it('removes only its own registration and stored files on request', async () => {
    const own = registration(OFFLINE_WORKER);
    const other = registration('/other-worker.js');
    vi.stubGlobal('navigator', { serviceWorker: { getRegistrations: async () => [own, other] } });
    const remove = vi.fn().mockResolvedValue(true);
    vi.stubGlobal('caches', { keys: async () => ['other-data', 'lwa-blank-records-v1'], delete: remove });
    await removeOfflineBlankRecords();
    expect(own.unregister).toHaveBeenCalledOnce();
    expect(other.unregister).not.toHaveBeenCalled();
    expect(remove).toHaveBeenCalledExactlyOnceWith('lwa-blank-records-v1');
  });
});
