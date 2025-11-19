import { TextStyle } from "react-native";

export const typography = {
  fontWeight: {
    regular: "400" as TextStyle["fontWeight"],
    medium: "500" as TextStyle["fontWeight"],
    semibold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
  },

  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 28,
    xxxl: 32,
    huge: 48,
    massive: 64,
  },

  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
  },
};
