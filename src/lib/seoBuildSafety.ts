export function assertSafeBlogInventory(
  previousCount: number,
  nextCount: number,
  allowLoss = false,
): void {
  if (allowLoss || previousCount < 20) return;
  const minimum = Math.ceil(previousCount * 0.95);
  if (nextCount < minimum) {
    throw new Error(
      `[sitemap] refusing to reduce canonical blog inventory from ${previousCount} to ${nextCount} ` +
        `(minimum ${minimum}). Investigate the data source or set ALLOW_SITEMAP_URL_LOSS=1 after manual review.`,
    );
  }
}

export function isValidCitySupportRoute(
  path: string,
  validCities: ReadonlySet<string>,
  validConditions: ReadonlySet<string>,
): boolean {
  const match = path.match(
    /^\/arthritis-support\/([^/]+)(?:\/([^/]+))?$/,
  );
  if (!match || !validCities.has(match[1])) return false;
  return !match[2] || validConditions.has(match[2]);
}
