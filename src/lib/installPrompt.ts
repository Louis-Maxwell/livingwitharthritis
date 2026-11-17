export interface InstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>;
  userChoice?: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
let pending: InstallPromptEvent | null = null;
export function isAppInstalled(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}
export function captureInstallPrompt(): void {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();pending = event as InstallPromptEvent;
    window.dispatchEvent(new Event('lwa-install-available'));
  });
  window.addEventListener('appinstalled', () => { pending = null;window.dispatchEvent(new Event('lwa-install-available')); });
}
export function hasInstallPrompt(): boolean { return pending !== null; }
export async function showInstallPrompt(): Promise<void> {
  const prompt = pending;pending = null;
  window.dispatchEvent(new Event('lwa-install-available'));
  if (prompt) await prompt.prompt();
}
