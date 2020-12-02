import React from "react";
import * as Facebook from "expo-facebook";
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { TextInput, Button, Card } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styled";

import logo from "./../../../assets/instagram.png";

export const CreateAcounnt = () => {
  const navigation = useNavigation();

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: `762356667825457`,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);


      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error =>: ${message}`);
    }
  }

  async function getUserAsync() {
    const { name } = await requestAsync("me");
    console.log(`Hello ${name} 👋`);
  }

  // Request data from the Facebook Graph API.
  // Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
  async function requestAsync(path, token) {
    let resolvedToken = token;
    if (!token) {
      const auth = await Facebook.getAuthenticationCredentialAsync();
      if (!auth) {
        throw new Error(
          "User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API."
        );
      }
      resolvedToken = auth.token;
    }
    const response = await fetch(
      `https://graph.facebook.com/${path}?fields=birthday,email,address,name&access_token=${encodeURIComponent(
        resolvedToken
      )}`
    );
    const body = await response.json();
    console.log(body);
    return body;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image style={{ width: 200, height: 58 }} source={logo} />

            <Title>Crie sua Conta</Title>

            <TextInput
              label="Nome"
              style={{ width: "100%" }}
              onChangeText={(text) => console.log(text)}
            />
            <TextInput
              label="Email"
              style={{ width: "100%" }}
              onChangeText={(text) => console.log(text)}
            />
            <TextInput
              label="Senha"
              style={{ width: "100%" }}
              onChangeText={(text) => console.log(text)}
            />

            <Button colo="#fff">Cadastrar</Button>
            <Button colo="#fff" onPress={() => logIn()}>
              Facebook
            </Button>
            <Button colo="#fff" onPress={() => getUserAsync()}>
              Facebook User
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate("SignIn")}>
        <CreateAccountButtonText>Já tenho uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};
