import { DarkTheme } from "@react-navigation/native";
import type { ThemeConfiguration } from "@/types/theme/config";

const colorsLight = {
  red500: "#F00",
  error: "#F2DEDB",
  errorText: "#cb8b8b",
  gray800: "#303030",
  gray500: "#7D8287",
  gray400: "#4D4D4D",
  gray300: "#B1B5B9",
  gray200: "#696E73",
  gray100: "#DFDFDF",
  gray50: "#EFEFEF",
  naturalGrey: "#FAFAFA",
  purple500: "#44427D",
  purple100: "#E1E1EF",
  purple50: "#1B1A23",
  transparent: "transparent",
  buttonGrey: "#5B5E61",
  buttonGreen: "#3bb3ad",
  resendTextColor: "#474A4D",
  disabled: "#CCCDCE",
  white: "#FFFFFF",
  black: "#000000",
  disabledBlue: "#D3F2FD",
  darkBlue: "#00286B",
  modalButtonBlue: "#1876D2",
  segmentBlue: "#0766B3",
  blue: "#0076D7",
  lightBlue: "#BBDEFB",
} as const;

const colorsDark = {
  red500: "#C13333",
  error: "#F2DEDB",
  errorText: "#cb8b8b",
  gray800: "#E0E0E0",
  gray400: "#969696",
  gray300: "#B1B5B9",
  gray200: "#696E73",
  gray100: "#000000",
  gray50: "#EFEFEF",
  purple500: "#A6A4F0",
  purple100: "#252732",
  purple50: "#1B1A23",
  transparent: "transparent",
  textDark: "#161616",
  white: "#FFFFFF",
  darkBlue: "#00286B",
  black: "#000000",
} as const;

const sizes = [
  0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 48, 50, 51, 52, 53,
  54, 55, 56, 57, 58, 59, 60, 80, 90, 100, 105, 110, 115, 120, 130, 140, 150,
  160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300,
] as const;

export const config = {
  colors: colorsLight,
  fonts: {
    sizes,
    colors: colorsLight,
  },
  gutters: sizes,
  backgrounds: colorsLight,
  borders: {
    widths: [1, 2],
    radius: [4, 16],
    colors: colorsLight,
  },
  navigationColors: {
    ...DarkTheme.colors,
    background: colorsLight.gray50,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      backgrounds: colorsDark,
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
