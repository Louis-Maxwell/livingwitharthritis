import type { Plugin } from 'vite';
import type { LaunchOptions } from 'puppeteer';

export default function prerender(options: {
  routes: string[];
  rendererOptions?: {
    renderAfterDocumentEvent?: string;
    maxConcurrentRoutes?: number;
    timeout?: number;
    launchOptions?: LaunchOptions;
  };
}): Plugin;
