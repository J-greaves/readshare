import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { ThemedButton } from "react-native-really-awesome-button";

import functions from "../axiosRequests";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { HomeUpdateContext } from "../contexts/HomeUpdateContext";
import { Book } from "../types";

interface LendingBoxProps {
  book: Book;
  borrower: string;
  lent: boolean;
}

const LendingBox = ({ book, borrower, lent }: LendingBoxProps) => {
  const { user } = useContext(UserContext);
  const { setHomeUpdate } = useContext(HomeUpdateContext);
  const [currentlyBorrowing, setCurrentlyBorrowing] = useState(lent);
  const [error, setError] = useState<string | null>(null);
  const date = "3 months";
  const navigation = useNavigation();

  const handleConfirmBorrowRequest = () => {
    functions
      .acceptBookBorrowRequest(user.username, book.bookId, borrower)
      .then(() => {
        setCurrentlyBorrowing(true);
        setHomeUpdate(new Date());
        navigation.navigate("Home");
      })
      .catch(() => {
        setError("Failed to confirm request. Please try again.");
      });
  };

  const handleRejectBorrowRequest = () => {
    functions
      .deleteBookBorrowRequest(user.username, book.bookId)
      .then(() => {
        setHomeUpdate(new Date());
        navigation.navigate("Home");
      })
      .catch(() => {
        setError("Failed to delete request. Please try again.");
      });
  };

  const handleReturnBookAfterBorrow = () => {
    functions
      .returnBookAfterBorrow(borrower, user.username, book.bookId)
      .then(() => {
        setHomeUpdate(new Date());
        navigation.navigate("Home");
      })
      .catch(() => {
        setError("Failed to mark book as returned. Please try again.");
      });
  };

  return (
    <View style={styles.requestToLendContainer}>
      {error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      <Text>
        {borrower} {currentlyBorrowing ? "is borrowing" : "wants to borrow"}{" "}
        this book!
      </Text>
      <View style={styles.dateContainer}>
        <Text>
          {currentlyBorrowing ? "Due back in" : "Lend for"} {date}
        </Text>
      </View>
      {currentlyBorrowing ? (
        <View style={styles.returnContainer}>
          <ThemedButton
            style={styles.actionButton}
            raiseLevel={1}
            name="bruce"
            type="secondary"
            textColor="green"
            borderColor="green"
            onPress={handleReturnBookAfterBorrow}
          >
            I've got this book back
          </ThemedButton>
        </View>
      ) : (
        <View style={styles.container}>
          <ThemedButton
            raiseLevel={1}
            width={130}
            name="bruce"
            type="secondary"
            textColor="red"
            borderColor="red"
            onPress={handleRejectBorrowRequest}
          >
            Delete request
          </ThemedButton>
          <ThemedButton
            raiseLevel={1}
            width={130}
            name="bruce"
            type="secondary"
            textColor="green"
            borderColor="green"
            onPress={handleConfirmBorrowRequest}
          >
            Confirm
          </ThemedButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  returnContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "lightgrey",
    width: "100%",
    borderRadius: 10,
  },

  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
  },

  requestToLendContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 12,
    borderRadius: 5,
    backgroundColor: "white",
    gap: 10,
  },

  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});

export default LendingBox;
