import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import functions from "../axiosRequests";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Friend } from "../types";

interface FriendCardProps {
  friend: Friend;
  page: "friend" | "friendRequest" | "searchBar";
  updated?: number;
  setUpdated?: React.Dispatch<React.SetStateAction<number>>;
}

const FriendCard = ({ friend, page, updated, setUpdated }: FriendCardProps) => {
  const { user } = useContext(UserContext);
  const [isFriend, setIsFriend] = useState(false);
  const [isOutgoingFriendRequest, setIsOutgoingFriendRequest] = useState(false);
  const [isIncomingFriendRequest, setIsIncomingFriendRequest] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removedFromList, setRemovedFromList] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (page === "friend") {
      setIsFriend(true);
      setIsOutgoingFriendRequest(false);
      setIsIncomingFriendRequest(false);
    } else if (page === "friendRequest") {
      setIsFriend(false);
      setIsOutgoingFriendRequest(false);
      setIsIncomingFriendRequest(true);
    }
  }, [page]);

  const handleSendFriendRequest = () => {
    functions
      .postFriendRequest(friend.username, user)
      .then(() => {
        setIsOutgoingFriendRequest(true);
      })
      .catch(() => {
        setError("Failed to send friend request. Please try again.");
      });
  };

  const handleRevokeFriendRequest = () => {
    functions
      .deleteFriendRequest(friend.username, user.username)
      .then(() => {
        setIsOutgoingFriendRequest(false);
      })
      .catch(() => {
        setError("Failed to revoke friend request. Please try again.");
      });
  };

  const handleAcceptFriendRequest = () => {
    setRemovedFromList(true);
    functions
      .acceptFriendRequest(user.username, friend)
      .then(() => {
        setIsFriend(true);
        setIsIncomingFriendRequest(false);
        setUpdated?.(2);
      })
      .catch(() => {
        setError("Failed to accept friend request. Please try again.");
        setRemovedFromList(false);
      });
  };

  const handleDeclineFriendRequest = () => {
    setRemovedFromList(true);
    functions
      .deleteFriendRequest(user.username, friend.username)
      .then(() => {
        setIsIncomingFriendRequest(false);
      })
      .catch(() => {
        setError("Failed to decline friend request. Please try again.");
        setRemovedFromList(false);
      });
  };

  const handleDeleteFriend = () => {
    setRemovedFromList(true);
    functions
      .deleteFriend(user.username, friend.username)
      .then(() => {
        setIsFriend(false);
        setRemovedFromList(true);
      })
      .catch(() => {
        setError("Failed to remove friend. Please try again.");
        setRemovedFromList(false);
      });
  };

  if (removedFromList) {
    return <></>;
  }

  return (
    <Pressable
      onPress={
        isFriend ? () => navigation.navigate("Friend page", { friend }) : null
      }
    >
      <View style={styles.card}>
        {error && (
          <Text accessibilityRole="alert" style={styles.text}>
            {error}
          </Text>
        )}
        <View>
          <Text style={styles.name}>{friend.username}</Text>
          <Text> {friend.name} </Text>
        </View>
        {isFriend ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleDeleteFriend}
            >
              <Image
                source={require("../assets/person-remove.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        {!isFriend && !isOutgoingFriendRequest && !isIncomingFriendRequest ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSendFriendRequest}
            >
              <Image
                source={require("../assets/person-add.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        {!isFriend && isOutgoingFriendRequest ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRevokeFriendRequest}
            >
              <Image
                source={require("../assets/person-remove.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/person-add.png")}
                style={[styles.icon, { opacity: 0.5 }]}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        {!isFriend && isIncomingFriendRequest ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleDeclineFriendRequest}
            >
              <Image
                source={require("../assets/person-remove.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAcceptFriendRequest}
            >
              <Image
                source={require("../assets/person-add.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 12,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 9,
  },

  button: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
  },

  icon: {
    width: 24,
    height: 24,
  },

  buttonContainer: {
    flexDirection: "row",
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    color: "red",
  },
});

export default FriendCard;
