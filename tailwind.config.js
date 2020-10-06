module.exports = {
  purge: [],
  theme: {
    extend: {
      backgroundColor:{
        'black-t-30': 'rgba(0,0,0,0.3)',
        'dark': '#343653',
        'light': '	#fcfdff',
        'primary': '#f54c5e',
        'secondary': '#f75a48'
      },
      textColor: {
        'primary': '#f54c5e',
        'secondary': '#f75a48'
      },
      colors: {
        "myDarkTheme": {
          "pr": "#1B1A34", //primary
          "sec": "#FF5260", //secondary
          "tpr": "#1B1A34", //text primary
          "tsec": "#67677D", //text secondary
          "ttern": "#67677D",
          "bg": "#F7F8FC",
          "cardbg": "#ffffff",
          "footerbg": "#1B1A34"
        },
        "myLightTheme": {
          "pr": "#d0d0d3", //primary
          "sec": "#FF5260", //secondary
          "tpr": "#e0e0e0", //text primary
          "tsec": "#a2a4a6", //text secondary
          "ttern": "#363738",
          "bg": "#17171a",
          "cardbg": "#1a1c1f",
          "footerbg": "#1a1c1f"
        },
        "magma": {
          "1": "#fece90",
          "2": "#f76b5c",
          "3": "#d3446d",
          "4": "#992c7f",
          "5": "#58157e",
          "6": "#1B1A34",
          "7": "#07051a",
        }
    },
    fontFamily: {
      mont: ['Montserrat'],
      robot: ['Roboto Condensed']
    }
    }
  },
  variants: {},
  plugins: [],
}
