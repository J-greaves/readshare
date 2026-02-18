import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import MainBooksContainer from "./MainBooksContainer";
import FloatingAddButton from "./FloatingAddButton";
import { UserContext } from "../contexts/UserContext";
import { BookAddContext } from "../contexts/BookAddContext";
import { useFetchLibrary } from "../hooks/useFetchLibrary";

const LibraryScreen = () => {
  const { user } = useContext(UserContext);
  const { addBook } = useContext(BookAddContext);
  const { books, isLoaded, error } = useFetchLibrary(user.username, addBook);

  return (
    <>
      {error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      <MainBooksContainer page={"library"} books={books} isLoaded={isLoaded} />
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

export default LibraryScreen;
