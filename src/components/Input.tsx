import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  KeyboardTypeOptions,
} from "react-native";

interface InputProps {
  label?: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: "off" | "email" | "password" | "username" | "name" | "tel" | "street-address" | "postal-code" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year";
  autoCorrect?: boolean;
  editable?: boolean;
  maxLength?: number;
  returnKeyType?: "done" | "go" | "next" | "search" | "send" | "none" | "previous" | "default" | "emergency-call" | "google" | "join" | "route" | "yahoo";
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoFocus = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoComplete = "off",
  autoCorrect = true,
  editable = true,
  maxLength,
  returnKeyType = "default",
  onSubmitEditing,
  onFocus,
  onBlur,
  style,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        editable={editable}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  error: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
});