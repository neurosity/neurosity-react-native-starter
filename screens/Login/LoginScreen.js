import React, { useState, useCallback, useRef } from "react";
import { View } from "react-native";

import { Button } from "../../atoms/Button";
import { Container } from "../../atoms/Container";
import { Heading } from "../../atoms/Heading";
import { TextInput } from "../../atoms/TextInput";

import { notion } from "../../services/notion";

import colors from "../../constants/Colors";
import { margins } from "../../common/primitives/spaces";

const defaultEmail = "";
const defaultPassword = "";

export function LoginScreen() {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const passwordRef = useRef();

  const login = useCallback(() => {
    if (!email || !password) {
      setError("Please fill the form");
      return;
    }

    setError("");
    setIsLoggingIn(true);

    notion.login({ email: email.trim(), password }).catch((error) => {
      setError(error.message);
      setIsLoggingIn(false);
    });
  }, [email, password, setError, setIsLoggingIn]);

  return (
    <Container padded justifyContent="space-around">
      <View>
        <Heading
          variant="primary"
          color={colors.defaultText}
          textAlign="center"
          marginBottom={margins.lg}
        >
          Sign In
        </Heading>
        <TextInput
          disabled={isLoggingIn}
          textContentType="username"
          returnKeyType="next"
          placeholder="Email"
          autoCapitalize="none"
          blurOnSubmit={false}
          clearButtonMode="always"
          autoCorrect={false}
          value={email}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <TextInput
          disabled={isLoggingIn}
          ref={passwordRef}
          returnKeyType="done"
          placeholder="Password"
          autoCapitalize="none"
          blurOnSubmit={true}
          clearButtonMode="always"
          clearTextOnFocus={true}
          autoCorrect={false}
          password={true}
          secureTextEntry={true}
          value={password}
          textContentType="password"
          onChangeText={(password) => {
            setPassword(password);
          }}
        />

        <Heading
          marginTop={margins.xxl}
          textAlign="center"
          color={colors.errorText}
        >
          {error}
        </Heading>
      </View>
      <View>
        <Button
          secondary
          onPress={() => login()}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Signing in..." : "Sign in"}
        </Button>
      </View>
    </Container>
  );
}
