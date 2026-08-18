/* eslint-disable react/display-name */
import { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<TextInput, Props>(
  ({ label, error, style, ...rest }, ref) => (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={ref}
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#999"
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  ),
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: { borderColor: "red" },
  error: { color: "red", marginTop: 4, fontSize: 12 },
});
