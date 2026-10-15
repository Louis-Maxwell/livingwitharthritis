import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  closeOverlay,
  getActiveOverlay,
  openOverlay,
  subscribeOverlay,
} from "@/lib/overlayCoordinator";

/**
 * Registers a popup with the overlay coordinator. While `open` is true this
 * layer is the active one; when another layer opens, `onClose` is called so
 * two popups are never shown together.
 */
export function useExclusiveOverlay(id: string, open: boolean, onClose: () => void): void {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    openOverlay(id);
    const unsubscribe = subscribeOverlay((active) => {
      if (active !== null && active !== id) onCloseRef.current();
    });
    return () => {
      unsubscribe();
      closeOverlay(id);
    };
  }, [id, open]);
}

/** Closes a non-modal panel on Escape and returns focus to its trigger. */
export function useEscapeToClose(
  open: boolean,
  onClose: () => void,
  returnFocusTo?: React.RefObject<HTMLElement | null>,
): void {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      // A Radix dialog opened from inside the panel handles its own Escape first.
      if (document.querySelector('[role="dialog"][data-state="open"], [role="alertdialog"][data-state="open"]')) return;
      onCloseRef.current();
      returnFocusTo?.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, returnFocusTo]);
}

/** True while any registered popup is open. */
export function useAnyOverlayOpen(): boolean {
  return useSyncExternalStore(
    subscribeOverlay,
    () => getActiveOverlay() !== null,
    () => false,
  );
}
