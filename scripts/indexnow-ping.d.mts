export const KEY: string;
export const HOST: string;
export const ORIGIN: string;
export function sitemapUrls(xml: string, since?: string): string[];
export function submitUrls(urls: string[], request?: typeof fetch): Promise<number[]>;

export function sitemapPageUrls(xml: string): string[];
