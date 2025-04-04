import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'gray'
      }
    },
  },
  fonts: {},
  fontSizes: {
    xxs: "10px",
    xs: "11px",
    sm: "12px",
    md: "14px",
    lg: "18px",
    xl: "20px",
    "2xl": "22px",
    "3xl": "24px",
    "4xl": "30px",
    "5xl": "36px",
    "6xl": "48px",
  },
});
