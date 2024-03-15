/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      sm: "641px",
      md: "769px",
      lg: "1025px",
      xl: "1224px",
      "2xl": "1464px",
    },
    colors: {
      primary: "#BD9542",
      "primary-hover": "#D6A94C",
      secondary: "#17171B",
      "secondary-hover": "#313137",
      white: "#FFFFFF",
      red: "#CB444A",
      pink: "#F8DDDD",
      current: "currentColor",
      transparent: "transparent",
      warning: "#F4EEE1",
      green: "#57B660",
      "gray-1": "#F0F0F0",
      "gray-2": "#C9C9C9",
      "gray-3": "#2A2A32",
      "gray-text": "#747476",
    },
    boxShadow: {
      expand: "0px 4px 32px -8px rgba(23, 23, 27, 0.08)",
      dark: "0px 0px 1px 2px #17171B",
    },
    extend: {
      fontFamily: {
        sans: ["Azo Sans", "sans-serif"],
        serif: ["Old Standard", "serif"],
        sf: ["SF Pro", "serif"],
      },
    },
  },
  plugins: [],
};
