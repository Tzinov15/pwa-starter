export type ThemeType = typeof light; // This is the type definition for my theme object.

export const light = {
  colors: {
    primary: "#B685FF",
    secondary: "#22C4F8",
    text: "#666A76",
    background: "#292C33",
  },
};

const theme = light; // set the light theme as the default.
export default theme;
