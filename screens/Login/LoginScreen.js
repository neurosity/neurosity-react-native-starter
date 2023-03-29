import React, {useState, useCallback, useEffect} from "react";
import {Linking, View} from "react-native";

import { Button } from "../../atoms/Button";
import { Container } from "../../atoms/Container";
import { Heading } from "../../atoms/Heading";

import { notion } from "../../services/notion";

import colors from "../../constants/Colors";
import { margins } from "../../common/primitives/spaces";
import {
    NEUROSITY_OAUTH_CLIENT_ID,
    NEUROSITY_OAUTH_CLIENT_REDIRECT_URI,
    NEUROSITY_OAUTH_CLIENT_SECRET
} from "../../constants/Env";

import { getState, getScopes } from "./modal"
import { useRoute } from "@react-navigation/native";


export function LoginScreen() {
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

    const route = useRoute();
    const params = route.params;

  const login = useCallback(async () => {
    setError("");
    setIsLoggingIn(true);
    try {
        const data = await notion
            .createOAuthURL({
                clientId: NEUROSITY_OAUTH_CLIENT_ID,
                clientSecret: NEUROSITY_OAUTH_CLIENT_SECRET,
                redirectUri: NEUROSITY_OAUTH_CLIENT_REDIRECT_URI,
                responseType: "token",
                state: getState(),
                scope: getScopes()
            })
        const auth_token = data.split("auth_token=")[1]
        const link = `neurosity://consent/${auth_token}`
        const canOpen = await Linking.canOpenURL(link)
        if (canOpen) {
            await Linking.openURL(link);
        }
    } catch (e) {
        setError(e.message);
    }
      setIsLoggingIn(false)
  }, []);

    useEffect(() => {
        if (params?.status) {
            console.log('status:', params.status)
        }
    }, [params])

  return (
    <Container padded justifyContent="space-around">
      <Heading
        marginTop={margins.xxl}
        textAlign="center"
        color={colors.errorText}
      >
        {error}
      </Heading>
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
