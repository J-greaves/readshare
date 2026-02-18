import { useState, useEffect } from "react";
import { Book } from "../types";
import functions from "../axiosRequests";

interface HomeData {
  booksBorrowing: Book[];
  booksLending: Book[];
  lendingRequests: Book[];
  error: string | null;
  isLoading: boolean;
}

export const useFetchHomeData = (
  username: string,
  trigger: Date | undefined
): HomeData => {
  const [booksBorrowing, setBooksBorrowing] = useState<Book[]>([]);
  const [booksLending, setBooksLending] = useState<Book[]>([]);
  const [lendingRequests, setLendingRequests] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    Promise.all([
      functions.getBorrowingList(username),
      functions.getLendingList(username),
      functions.getAllBorrowRequests(username),
    ])
      .then(([borrowing, lending, requests]) => {
        setBooksBorrowing(borrowing);
        setBooksLending(lending);
        setLendingRequests(requests);
      })
      .catch(() => {
        setError(
          "Unable to load your home screen data. Please check your connection."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username, trigger]);

  return { booksBorrowing, booksLending, lendingRequests, error, isLoading };
};
