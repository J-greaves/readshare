import { useState, useEffect, useCallback } from "react";
import { Book } from "../types";
import functions from "../axiosRequests";

interface LibraryData {
  books: Book[];
  isLoaded: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchLibrary = (
  username: string,
  dependency: unknown
): LibraryData => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(() => {
    setIsLoaded(false);
    functions
      .getLibrary(username)
      .then((response) => {
        setBooks(response.data);
        setError(null);
        setIsLoaded(true);
      })
      .catch(() => {
        setError(
          "Failed to load your library. Please check your connection and try again."
        );
        setIsLoaded(true);
      });
  }, [username]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, dependency]);

  return { books, isLoaded, error, refetch: fetchBooks };
};
