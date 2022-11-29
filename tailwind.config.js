/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-red": "#D62617", // Colors/Light/Red
        "light-shade-500": "#FFFFFF", // Colors/Light/Shade 05
        "light-shade-400": "#EEEEEE", // Colors/Light/Shade 04
        "light-shade-300": "#D1D1D1", // Colors/Light/Shade 03
        "light-shade-200": "#515151", // Colors/Light/Shade 02
        "light-shade-100": "#151515", // Colors/Light/Shade 01

        "dark-red": "#E75B4F", // Colors/Dark/Red
        "dark-shade-500": "#151515", // Colors/Dark/Shade 05
        "dark-shade-400": "#222222", // Colors/Dark/Shade 04
        "dark-shade-300": "#383838", // Colors/Dark/Shade 03
        "dark-shade-200": "#B0B0B0", // Colors/Dark/Shade 02
        "dark-shade-100": "#F2F2F2", // Colors/Dark/Shade 01
      },
    },
  },
  plugins: [],
};
