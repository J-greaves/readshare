import React, { useContext, useEffect, useState } from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Button } from "react-native-elements";
import functions from "../axiosRequests";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const RegisterNewUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [inputName, setInputName] = useState("");
  const [inputSurname, setInputSurname] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [isEmptyField, setIsEmptyField] = useState(false);
  const [error, setError] = useState(null);
  const [isValidForm, setIsValidForm] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigation = useNavigation();

  const validateUserData = (): boolean => {
    setIsValidForm(true);
    setIsRegistered(false);
    if (!inputName) {
      setIsEmptyField(true);
      setIsValidForm(false);
    } else if (!/^[A-Za-z\s]+$/g.test(inputName)) {
      setIsValidForm(false);
      setInputName("");
    }
    if (!inputSurname) {
      setIsEmptyField(true);
      setIsValidForm(false);
    } else if (!/^[A-Za-z\s]+$/g.test(inputSurname)) {
      setIsValidForm(false);
      setInputSurname("");
    }
    if (!inputUsername) {
      setIsEmptyField(true);
      setIsValidForm(false);
    } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(inputUsername)) {
      setIsValidForm(false);
      setInputUsername("");
    }
    console.log(isValidForm, "<----is valid?");
    return isValidForm;
  };

  const handlePressRegistration = () => {
    if (validateUserData()) {
      const newUser: { [key: string]: string } = {
        name: inputName + " " + inputSurname,
        username: inputUsername,
      };
      console.log(newUser);
      return functions
        .postNewUser(newUser)
        .then(() => {
          setUser(newUser);
          setInputName("");
          setInputSurname("");
          setInputUsername("");
          setIsRegistered(true);
        })
        .catch(() => {
          setIsRegistered(false);
        });
    }
  };

  const handleBackRegistration = () => {
    setIsRegistered(false);
    navigation.navigate("Library");
  };
  return (
    <SafeAreaView style={styles.section}>
      <Text style={styles.title}>New User Registration</Text>
      {!isRegistered && (
        <View>
          {isEmptyField && (
            <Text style={styles.textError}>
              All fields are required. No empty inputs please
            </Text>
          )}
          {!isValidForm && (
            <Text style={styles.textError}>The input is invalid</Text>
          )}
          <View>
            <Text style={styles.text}> Enter First Name:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="here..."
              value={inputName}
              onChangeText={(newName) => setInputName(newName)}
            />
            <Text style={styles.text}> Enter Surname:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="here.."
              value={inputSurname}
              onChangeText={(newSurname) => setInputSurname(newSurname)}
            />
            <Text style={styles.text}> Enter Username:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="email-> example@library.com"
              value={inputUsername}
              onChangeText={(newUsername) => setInputUsername(newUsername)}
            />

            <Button
              style={styles.button}
              title="Register"
              onPress={handlePressRegistration}
            />
          </View>
        </View>
      )}
      {isRegistered && (
        <View style={styles.section}>
          <Text> </Text>
          <Button
            style={styles.button}
            title="Registration complete"
            onPress={handleBackRegistration}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "black",
    margin: 5,
  },
  button: {
    width: 200,
    height: 90,
    margin: 10,
    textAlign: "center",
    padding : 5,
  },
  title: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    color : "gray",
    padding: 20,
    fontFamily: "Georgia",
    fontStyle: "italic",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "Georgia",
    fontStyle: "italic",
    margin: 5,
    textAlign: "center",
    alignItems: "center",
  },
  textError: {
    fontSize: 16,
    margin: 5,
    color: "red",
  },
  inputText: {
    margin: 5,
    width: 300,
    height: 45,
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default RegisterNewUser;
