import React, { useState } from "react";
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
import { colors } from "../theme/colors";

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
  autoComplete?:
    | "off"
    | "email"
    | "password"
    | "username"
    | "name"
    | "tel"
    | "street-address"
    | "postal-code"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year";
  autoCorrect?: boolean;
  editable?: boolean;
  maxLength?: number;
  returnKeyType?:
    | "done"
    | "go"
    | "next"
    | "search"
    | "send"
    | "none"
    | "previous"
    | "default"
    | "emergency-call"
    | "google"
    | "join"
    | "route"
    | "yahoo";
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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        <TextInput
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor={colors.text.tertiary}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
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
    color: colors.text.secondary,
    marginBottom: 8,
  },
  labelFocused: {
    color: colors.primary,
  },
  inputContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainerFocused: {
    backgroundColor: colors.alerts.info,
    borderColor: colors.primary,
    borderLeftColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainerError: {
    borderColor: colors.danger,
    borderLeftColor: colors.danger,
    backgroundColor: colors.alerts.error,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 0,
  },
  inputError: {
    color: colors.danger,
  },
  error: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
    fontWeight: "500",
  },
});
