import React, { useState } from "react";
import { View } from "react-native";
import FriendSearchBar from "./FriendSearchBar";
import FriendRequests from "./FriendRequests";
import FriendList from "./FriendList";

const FriendListScreen = () => {
  const [updated, setUpdated] = useState<number>(0);
  return (
    <View>
      <FriendSearchBar />
      <View>
        <FriendRequests updated={updated} setUpdated={setUpdated} />
        <FriendList updated={updated} setUpdated={setUpdated} />
      </View>
    </View>
  );
};

export default FriendListScreen;
