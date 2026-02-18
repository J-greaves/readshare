import React, { createContext, useState } from "react";
import { Book } from "../types";

interface BookAddContextValue {
  addBook: Book | null;
  setAddBook: (book: Book | null) => void;
}

const defaultContext: BookAddContextValue = {
  addBook: null,
  setAddBook: () => {},
};

export const BookAddContext = createContext<BookAddContextValue>(defaultContext);

export const BookAddProvider = ({ children }: { children: React.ReactNode }) => {
  const [addBook, setAddBook] = useState<Book | null>(null);

  return (
    <BookAddContext.Provider value={{ addBook, setAddBook }}>
      {children}
    </BookAddContext.Provider>
  );
};
