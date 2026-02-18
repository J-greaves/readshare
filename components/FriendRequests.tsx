import React, { useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import FriendCard from "./FriendCard";
import { UserContext } from "../contexts/UserContext";
import { useFetchFriendRequests } from "../hooks/useFetchFriendRequests";

interface FriendRequestsProps {
  updated: number;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
}

const FriendRequests = ({ updated, setUpdated }: FriendRequestsProps) => {
  const { user } = useContext(UserContext);
  const { friendRequests, isLoading, error } = useFetchFriendRequests(
    user.username,
    updated
  );

  if (isLoading) {
    return (
      <View>
        <Text style={styles.loading}>Loading friend requests...</Text>
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
    <View>
      <View>
        <Text style={styles.title}>Friend Requests</Text>
      </View>
      {friendRequests.length === 0 && (
        <Text style={styles.text}>You have no new friend requests</Text>
      )}
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <FriendCard
            friend={item}
            page={"friendRequest"}
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
    textAlign: "left",
    color: "black",
    paddingTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  text: {
    fontSize: 15,
    color: "gray",
    textAlign: "left",
    margin: 9,
  },
  loading: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  error: {
    fontSize: 15,
    color: "red",
    textAlign: "center",
    margin: 9,
  },
});

export default FriendRequests;
