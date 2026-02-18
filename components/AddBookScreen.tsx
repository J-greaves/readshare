import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import BookBasicDetails from "./BookBasicDetails";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { BookAddContext } from "../contexts/BookAddContext";
import functions from "../axiosRequests";
import { ThemedButton } from "react-native-really-awesome-button";

const AddBookScreen = ({ route }: { route: { params: { book: any; ownerUsername: string } } }) => {
  const { book, ownerUsername } = route.params;

  const { user } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    setIsRequested(false);
  }, [book]);

  const { setAddBook } = useContext(BookAddContext);

  const navigation = useNavigation();

  const handleAddToLibrary = () => {
    book.isOwned = true;
    book.isPhysical = true;
    book.isLendable = true;
    book.isRead = false;
    book.privateNotes = "";
    book.offAppBorrower = "";
    book.review = "";
    book.rating = 0;

    functions
      .postLibrary(user.username, book)
      .then(() => {
        navigation.navigate("My book details", { book });
      })
      .catch(() => {
        setError("Failed to add book to your library. Please try again.");
      });
  };

  const handleSendRequest = () => {
    functions
      .postBookBorrowRequest(user.username, book.bookId, ownerUsername)
      .then(() => {
        setIsRequested(true);
      })
      .catch(() => {
        setError("Failed to send borrow request. Please try again.");
      });
  };

  const handleAddToWishlist = () => {
    functions
      .postWishlist(user.username, book)
      .then(() => {
        setAddBook(book);
        navigation.navigate("Wish List");
      })
      .catch(() => {
        setError("Failed to add book to your wish list. Please try again.");
      });
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        {error && (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        )}
        <BookBasicDetails book={book} />
        <Text>{book.description}</Text>

        {book.isLendable ? (
          <>
            <View style={styles.requestToBorrowContainer}>
              <ThemedButton
                raiseLevel={1}
                name="bruce"
                type="secondary"
                textColor="#f17127"
                borderColor="#f17127"
                onPress={handleSendRequest}
              >
                {isRequested ? "Requested!" : "Request to borrow"}
              </ThemedButton>
            </View>
          </>
        ) : null}

        <View style={styles.container}>
          <ThemedButton
            width={150}
            raiseLevel={1}
            name="bruce"
            type="secondary"
            onPress={handleAddToWishlist}
          >
            Add To Wishlist
          </ThemedButton>
          <ThemedButton
            raiseLevel={1}
            width={150}
            type="secondary"
            name="bruce"
            onPress={handleAddToLibrary}
          >
            Add to Library
          </ThemedButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "100%",
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  actionButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },

  pressableText: {
    color: "white",
    fontWeight: "bold",
  },

  page: {
    flex: 1,
    padding: 20,
  },

  requestToBorrowContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 12,
    borderRadius: 5,
  },

  error: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
});

export default AddBookScreen;
