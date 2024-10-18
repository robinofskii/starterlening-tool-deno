import type { ParseOptions } from "@std/csv/parse";

export const DEFAULT_PARSE_OPTIONS: ParseOptions = {
    skipFirstRow: true,
    trimLeadingSpace: true,
    lazyQuotes: true,
};