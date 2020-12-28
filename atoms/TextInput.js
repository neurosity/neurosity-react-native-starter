import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import { margins, paddings, spaces } from "../common/primitives/spaces";
import { sizes } from "../common/primitives/typography";

export const TextInput = forwardRef((props, ref) => {
  const containerRef = useRef();

  function focus() {
    containerRef.current.focus();
  }

  useImperativeHandle(ref, () => ({
    focus
  }));

  return (
    <RNTextInput
      placeholderTextColor={colors.placeholderText}
      style={styles.input}
      ref={containerRef}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    paddingLeft: paddings.lg,
    paddingRight: paddings.lg,
    paddingTop: spaces.x3,
    paddingBottom: spaces.x3,
    backgroundColor: colors.light,
    fontSize: sizes.md,
    marginTop: margins.sm,
    marginBottom: margins.sm
  }
});
