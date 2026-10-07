export interface SitemapEntry { path: string; lastmod?: string }
export function asIsoDate(value: unknown, today?: string): string | undefined;
export function escapeXml(value: unknown): string;
export function uniqueEntries(entries: SitemapEntry[]): SitemapEntry[];
export function buildUrlset(entries: SitemapEntry[], base: string): string;
export function sitemapSection(path: string): "articles" | "conditions" | "resources" | "core";
export function buildSitemapIndex(sectionNames: string[], base: string): string;
