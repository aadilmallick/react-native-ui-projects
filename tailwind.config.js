/** @type {import('tailwindcss').Config} */
const { fontFamily: ff } = require("./theme");
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: ff,
    },
  },
  plugins: [],
};
