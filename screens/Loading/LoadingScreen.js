import React from "react";

import { Container } from "../../atoms/Container";
import { Loading } from "../../atoms/Loading";

export function LoadingScreen() {
  return (
    <Container padded>
      <Loading />
    </Container>
  );
}
