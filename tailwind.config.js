/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "#1e1e1e",
        subPanel: "#2b2b2b",
      },
    },
  },
  plugins: [],
};
