export interface Book {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  publisher: string;
  publishedDate: string;
  language: string;
  pageCount: number;
  categories: string[];
  thumbnail: string | null;
  // Fields present when a book is in a user's library
  isOwned?: boolean;
  isPhysical?: boolean;
  isLendable?: boolean;
  isRead?: boolean;
  privateNotes?: string;
  offAppBorrower?: string;
  review?: string;
  rating?: number;
  // Fields present on borrowing/lending responses
  borrower?: string;
  requests?: Record<string, unknown>;
}

export interface User {
  username: string;
  name: string;
}

export interface Friend {
  username: string;
  name: string;
}

export type PageContext =
  | "library"
  | "wishlist"
  | "explore"
  | "borrowing"
  | "lending"
  | "request";
