import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import FloatingAddButton from "./FloatingAddButton";
import MainBooksContainer from "./MainBooksContainer";
import { UserContext } from "../contexts/UserContext";
import { BookAddContext } from "../contexts/BookAddContext";
import functions from "../axiosRequests";
import { Book } from "../types";

const WishListScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(UserContext);
  const { addBook } = useContext(BookAddContext);

  useEffect(() => {
    setIsLoaded(false);
    functions
      .getWishlist(user.username)
      .then((response) => {
        setBooks(response.data);
        setError(null);
        setIsLoaded(true);
      })
      .catch(() => {
        setError("Failed to load your wish list. Please check your connection and try again.");
        setIsLoaded(true);
      });
  }, [user, addBook]);

  return (
    <>
      {error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      <MainBooksContainer page={"wishlist"} books={books} isLoaded={isLoaded} />
      <FloatingAddButton />
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
});

export default WishListScreen;
