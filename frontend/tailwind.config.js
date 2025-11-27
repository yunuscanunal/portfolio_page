/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <--- BU SATIRI EKLE (Karanlık mod kontrolü bizde)
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#050505",
          dark: "#0a0a0a",
          gray: "#1a1a1d",
          primary: "#00f3ff", // Neon Cyan
          secondary: "#ff00ff", // Neon Pink
          accent: "#7000ff", // Electric Purple
          // Light Mode renkleri için eklemeler
          light: "#f0f0f0",
          white: "#ffffff",
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', "monospace"],
        sans: ['"Orbitron"', "sans-serif"],
      },
      boxShadow: {
        "neon-blue":
          "0 0 10px rgba(0, 243, 255, 0.7), 0 0 20px rgba(0, 243, 255, 0.5)",
        "neon-pink":
          "0 0 10px rgba(255, 0, 255, 0.7), 0 0 20px rgba(255, 0, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
