/**
 * Formats a raw search query string for use in the Google Books API.
 * Trims whitespace, replaces spaces with '+', and lowercases the result.
 */
export const formatSearchQuery = (query: string): string =>
  query.trim().replaceAll(" ", "+").toLowerCase();
