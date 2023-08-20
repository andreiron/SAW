/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: 
      [ 
        {
          night: {
          
            "primary": "#233CBC",
                     
            "secondary": "#130690",
                     
            "accent": "#7B8DF7",
                     
            "neutral": "#6C6C6C",
                     
            "base-100": "#0D0B07",
                     
            "info": "#9EC1F6",
                     
            "success": "#9EF6D4",
                     
            "warning": "#F6DE9E",
                     
            "error": "#F69E9E",
          },
      },
      {
        day: {
          
          "primary": "#A0AABA",
                   
          "secondary": "#D7D6E1",
                   
          "accent": "#6B687F",
                   
          "neutral": "#D2D2D2",
                   
          "base-100": "#F2F2F2",
                   
          "info": "#9EC1F6",
                   
          "success": "#9EF6D4",
                   
          "warning": "#F6DE9E",
                   
          "error": "#F69E9E",
                   },
      },

        "light",
        "dark",
        "cupcake",
        "forest",
        "aqua",
        "business",
        "coffee"]
  },
}