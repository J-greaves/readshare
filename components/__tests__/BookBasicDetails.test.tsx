import React from "react";
import { render, screen } from "@testing-library/react-native";
import BookBasicDetails from "../BookBasicDetails";
import { Book } from "../../types";

const mockBook: Book = {
  bookId: "9780747532743",
  title: "Harry Potter and the Philosopher's Stone",
  authors: ["J.K. Rowling"],
  description: "A book about a young wizard.",
  publisher: "Bloomsbury",
  publishedDate: "1997",
  language: "en",
  pageCount: 223,
  categories: ["Fiction"],
  thumbnail: "https://example.com/cover.jpg",
};

describe("BookBasicDetails", () => {
  it("renders the book title", () => {
    render(<BookBasicDetails book={mockBook} />);
    expect(
      screen.getByText("Harry Potter and the Philosopher's Stone")
    ).toBeTruthy();
  });

  it("renders a single author", () => {
    render(<BookBasicDetails book={mockBook} />);
    expect(screen.getByText("J.K. Rowling")).toBeTruthy();
  });

  it("renders multiple authors joined by a comma", () => {
    const multiAuthorBook: Book = {
      ...mockBook,
      authors: ["Terry Pratchett", "Neil Gaiman"],
    };
    render(<BookBasicDetails book={multiAuthorBook} />);
    expect(screen.getByText("Terry Pratchett, Neil Gaiman")).toBeTruthy();
  });

  it("renders a book with a null thumbnail without crashing", () => {
    const bookWithoutThumbnail: Book = { ...mockBook, thumbnail: null };
    expect(() =>
      render(<BookBasicDetails book={bookWithoutThumbnail} />)
    ).not.toThrow();
  });
});
