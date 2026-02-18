import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface AppHeaderProps {
  returnTo?: string;
}

const AppHeader = ({ returnTo }: AppHeaderProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  const isProfilePage = route.name === "Profile";
  const profileIcon = isProfilePage
    ? require("../assets/Account-header-selected.png")
    : require("../assets/Account-header.png");

  const viewSize = 35;

  const iconStyles = {
    width: viewSize,
    height: viewSize,
    backgroundColor: isProfilePage ? "#fff" : "transparent",
    borderRadius: viewSize / 2,
    shadowColor: isProfilePage ? "#2854C5" : "transparent",
    shadowRadius: isProfilePage ? 10 : 0,
    elevation: isProfilePage ? 10 : 0,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/Readshare-logo.png")}
            style={styles.logoImage}
          />
        </Pressable>
        <Pressable
          style={[styles.profilePressable, { opacity: returnTo ? 1 : 0 }]}
          pointerEvents={returnTo ? "auto" : "none"}
          onPress={() => navigation.navigate(returnTo)}
        >
          <View style={iconStyles}>
            <Image
              source={require("../assets/back.png")}
              style={styles.iconImage}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <View style={iconStyles}>
            <Image source={profileIcon} style={styles.iconImage} />
          </View>
        </Pressable>
      </View>
      <View style={styles.shadowContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: "transparent",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "transparent",
    marginTop: 35,
    marginLeft: 0,
  },
  shadowContainer: {
    height: 4,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePressable: {
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 5,
  },
  pressText: {
    color: "white",
    fontWeight: "bold",
  },
  iconImage: {
    width: 46,
    height: 46,
    resizeMode: "contain",
  },
  logoImage: {
    width: 150,
    maxWidth: 250,
    height: "auto",
    aspectRatio: 200 / 75,
    resizeMode: "contain",
    marginLeft: 8,
  },
});

export default AppHeader;
