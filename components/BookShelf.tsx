import React from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import BookCard from "./BookCard";
import { Book, PageContext } from "../types";

type BookShelfProps = {
  books: Book[];
  page: PageContext;
};

const BookShelf = ({ books, page }: BookShelfProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {books.length === 0 ? (
          <Text style={styles.placeholder}>
            {page === "borrowing"
              ? "You're not currently borrowing any books."
              : "You're not currently lending any books."}
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {books.map((book) => (
              <View style={styles.bookContainer} key={book.bookId}>
                <BookCard isLoaded={true} book={book} page={page} />
                {page === "request" ? (
                  <Text style={styles.comment}>
                    {Object.keys(book.requests ?? {}).join(" & ")} wants to borrow
                    this!
                  </Text>
                ) : null}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  scrollContainer: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  bookContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  comment: {
    marginVertical: 5,
    fontSize: 12,
    color: "grey",
    textAlign: "center",
    maxWidth: width / 3 - 10,
  },
  placeholder: {
    marginVertical: 5,
    fontSize: 12,
    color: "grey",
    textAlign: "center",
  },
});

export default BookShelf;
