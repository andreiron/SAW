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
        {
          darkM: {

            'text': '#f6f3ee',
            'base-100': '#04001e',
            'primary': '#4730cd',
            'secondary': '#130061',
            'accent': '#8e7eeb',
            'neutral': '#04001e',

            "info": "#9EC1F6",

            "success": "#9EF6D4",

            "warning": "#F6DE9E",

            "error": "#F69E9E",
          }
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