/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#121212",
        card: "#181818",
        artistColor: "#b3b3b3",
        cardHover: "#282828",
        primaryGreen: "#1DB954",
      },
    },
  },
  plugins: [],
};
