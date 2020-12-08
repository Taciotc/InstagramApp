import React from "react";
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

import logo from "./../../../assets/what.png";

export const Login = () => {
  const navigation = useNavigation();
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

            <Title>Faça seu logon</Title>

            <TextInput
              label="Usuário"
              style={{ width: "100%" }}
              onChangeText={(text) => console.log(text)}
            />
            <TextInput
              label="Senha"
              style={{ width: "100%" }}
              onChangeText={(text) => console.log(text)}
            />

            <Button onPress={() => navigation.navigate("Feed do Instagram")} color="#fff">Entrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};
