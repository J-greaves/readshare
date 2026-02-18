import React, { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { User } from "../types";

interface StatBlockProps {
  friend: User;
}

const StatBlock = ({ friend }: StatBlockProps) => {
  const stats = useMemo(() => {
    const booksRead = Math.floor(Math.random() * 150);
    return {
      booksOwned: Math.floor(Math.random() * 150),
      booksWished: Math.floor(Math.random() * 50),
      booksRead,
      pagesRead: booksRead * 297,
      booksLent: Math.floor(Math.random() * 20),
      booksBorrowed: Math.floor(Math.random() * 10),
    };
  }, [friend.username]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Stats</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.title}>{stats.booksOwned}</Text>
          <Text style={styles.caption}>books owned</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.title}>{stats.booksWished}</Text>
          <Text style={styles.caption}>books wished for</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.title}>{stats.booksRead}</Text>
          <Text style={styles.caption}>books read</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.title}>{stats.pagesRead}</Text>
          <Text style={styles.caption}>pages read</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.title}>{stats.booksLent}</Text>
          <Text style={styles.caption}>books lent to others</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.title}>{stats.booksBorrowed}</Text>
          <Text style={styles.caption}>books borrowed from others</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statsBox: {
    width: "50%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default StatBlock;
