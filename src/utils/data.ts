/**
 * Normalizes a string by trimming whitespace and converting it to lowercase.
 *
 * @param name - The string to be normalized.
 * @returns The normalized string.
 */
export const normalizeString = (name: string): string => {
  return name.trim().toLowerCase();
};
