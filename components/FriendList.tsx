import React, { useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import FriendCard from "./FriendCard";
import { UserContext } from "../contexts/UserContext";
import { useFetchFriends } from "../hooks/useFetchFriends";

interface FriendListProps {
  updated: number;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
}

const FriendList = ({ updated, setUpdated }: FriendListProps) => {
  const { user } = useContext(UserContext);
  const { friends, isLoading, error } = useFetchFriends(user.username, updated);

  if (isLoading) {
    return (
      <View>
        <Text style={styles.loading}>Loading friends...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Text style={styles.title}>Your Friends</Text>
      {friends.length === 0 && <Text style={styles.text}>No friends yet</Text>}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <FriendCard
            friend={item}
            page={"friend"}
            updated={updated}
            setUpdated={setUpdated}
          />
        )}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "left",
    color: "black",
    marginTop: 35,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "grey",
  },
  loading: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
  },
  error: {
    fontSize: 15,
    color: "red",
    textAlign: "center",
    margin: 9,
  },
});

export default FriendList;
