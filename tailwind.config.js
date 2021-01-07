module.exports = {
  purge: [],
  theme: {
    extend: {
      backgroundColor: {
        "black-t-30": "rgba(0,0,0,0.3)",
        dark: "#343653",
        light: "	#fcfdff",
        primary: "#f54c5e",
        secondary: "#f75a48",
      },
      textColor: {
        primary: "#f54c5e",
        secondary: "#f75a48",
      },
      colors: {
        myLightTheme: {
          pr: "#1B1A34", //primary accent -> darker accent to use on hover ?
          sec: "#7F6BFF", //secondary accent -> lighter accent to show buttons etc..
          tpr: "#1B1A34", //text primary
          tsec: "#67677D", //text secondary
          ttern: "#e8e8e8", //text tertiary
          bg: "#F7F8FC", //primary background
          cardbg: "#ffffff", //secondary background
          footerbg: "#1B1A34", //footer bg
        },
        myDarkTheme: {
          pr: "#d0d0d3", //primary
          sec: "#7F6BFF", //secondary
          tpr: "#e0e0e0", //text primary
          tsec: "#a2a4a6", //text secondary
          ttern: "#363738",
          bg: "#0c0c0d", //#17171a
          cardbg: "#131517",
          footerbg: "#131517",
        },
        magma: {
          1: "#F9F871",
          2: "#FFBD3A",
          3: "#FF7046",
          4: "#FF0077",
          5: "#EA00BA",
          6: "#7F6BFF",
          7: "#07051a",
        },
      },
      fontFamily: {
        mont: ["Montserrat"],
        robot: ["Roboto Condensed"],
      },
    },
  },
  variants: {},
  plugins: [],
};
