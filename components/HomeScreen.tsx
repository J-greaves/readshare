import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import StatBlock from "./StatBlock";
import { UserContext } from "../contexts/UserContext";
import BookShelf from "./BookShelf";
import { ScrollView } from "react-native";
import { HomeUpdateContext } from "../contexts/HomeUpdateContext";
import { useFetchHomeData } from "../hooks/useFetchHomeData";

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const { homeUpdate } = useContext(HomeUpdateContext);
  const { booksBorrowing, booksLending, lendingRequests, error } =
    useFetchHomeData(user.username, homeUpdate);

  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour < 12) {
    greeting = `Good morning, ${user.name}!`;
  } else if (currentHour < 18) {
    greeting = `Good afternoon, ${user.name}!`;
  } else {
    greeting = `Good evening, ${user.name}!`;
  }

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>
      {error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      <StatBlock friend={user} />
      {lendingRequests.length > 0 ? (
        <>
          <Text>Borrow requests:</Text>
          <BookShelf books={lendingRequests} page={"request"} />
        </>
      ) : null}
      <Text>Books you're borrowing:</Text>
      <BookShelf books={booksBorrowing} page={"borrowing"} />
      <Text>Books you're lending:</Text>
      <BookShelf books={booksLending} page={"lending"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkslategray",
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
});

export default HomeScreen;
