export declare function rewriteHead(html: string, route: string, ...args: unknown[]): string;
export declare function collectRoutes(...args: unknown[]): string[];
export declare function mergeHeadLayers(
  ...layers: Array<Record<string, Record<string, unknown>> | null | undefined>
): Record<string, Record<string, unknown>>;
export declare function headDataFor(route: string, override?: unknown): Record<string, unknown>;
export declare const NOT_FOUND_HEAD: Record<string, unknown>;
