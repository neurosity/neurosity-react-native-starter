import React from "react";
import { ActivityIndicator } from "react-native";
import { Heading } from "./Heading";
import { Container } from "./Container";
import colors from "../constants/Colors";

export function Loading({ children, ...props }) {
  return (
    <Container {...props} justifyContent="center">
      <ActivityIndicator size="large" color={colors.buttonText} />
      <Heading
        marginTop={20}
        marginBottom={20}
        textAlign="center"
        weight="light">
        {children}
      </Heading>
    </Container>
  );
}
