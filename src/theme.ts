export type ThemeType = typeof myTheme;
// my-theme.ts
const lightColors = {
  primary: "#31B26E",
  main: "#5BB174",
  second: "#4F8493",
  text: "#FBFCFE",
  background: "#2D2E30",
  // secondary: "#82559D",
  secondary: "#3D6874",
  cashgreen: "#85FFA7",
  cashgreendark: "#31B36E",
  cashgreensuperdark: "#008A48",
  cashgreenlight: "#9DFFCAB3",
  mehredsuperdark: "#7B0000",
  mehreddark: "#B81E27",
  mehred: "#FF645C",
  mehredlight: "#FFABAB",
  boldsanddark: "#A9680C",
  boldsand: "#E19740",
  megapurple: "#F8A4FF",
  mint: "#A6E3AF",
  pink: "#E3A6A6",
  vanilla: "#161616",
  softblue: "#64BEB3",
  hogwartsblack: "#FAFAE2",
  lightgray: "#494a46",
  gray: "#74747480",
  mediumgray: "#A7A790",
  darkgray: "#DFDEC6",
};

export const myTheme = {
  borderRadius: "5px",

  sizes: {
    banner: "3rem",
    large: "2rem",
    paragraph: "1rem",
  },
  colors: lightColors,
};
