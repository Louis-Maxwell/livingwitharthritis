import type { Plugin } from 'vite';
export function buildRevision(read?: () => string): string | null;
export function publicationMarker(): Plugin;
