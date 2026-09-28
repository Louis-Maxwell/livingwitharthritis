/**
 * One popup at a time.
 *
 * The site has several independent floating layers (donation dialog, help chat,
 * accessibility panel, mobile menu, resource drawer). Each kept its own `open`
 * state, so a visitor could end up with the chat panel, the accessibility panel
 * and a donation dialog stacked on top of each other, plus the cookie banner
 * floating above the dialog backdrop.
 *
 * Every layer registers here when it opens. Opening a layer asks the others to
 * close, and the cookie banner steps aside while a layer is open.
 */
type Listener = (activeId: string | null) => void;

let activeId: string | null = null;
const listeners = new Set<Listener>();

function notify() {
  for (const listener of [...listeners]) listener(activeId);
}

export function openOverlay(id: string): void {
  if (activeId === id) return;
  activeId = id;
  notify();
}

export function closeOverlay(id: string): void {
  if (activeId !== id) return;
  activeId = null;
  notify();
}

export function getActiveOverlay(): string | null {
  return activeId;
}

export function subscribeOverlay(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetOverlaysForTests(): void {
  activeId = null;
  listeners.clear();
}
