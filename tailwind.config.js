module.exports = {
  mode: "jit", // can be removed with tailwind 3
  purge: [
    "./public/**/*.html",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: "#000000",
      "gray-dark": "#505050",
      gray: "#A8A8A8",
      "gray-light": "#e8e8e8",
      "gray-light-light": "#f5f5f5",
      white: "#ffffff",
      "primary-dark-dark": "#1f7c4c",
      "primary-dark": "#2aa665",
      primary: "#35d07f",
      "primary-light": "#85e2b2",
      "primary-light-light": "#D6F5E5",
      "secondary-dark-dark": "#c8a349",
      "secondary-dark": "#e1b752",
      secondary: "#fbcc5c",
      "secondary-light": "#fcdb8c",
      "secondary-light-light": "#fdeabd",
      "accent-dark-dark": "#5b9db2",
      "accent-dark": "#75cae5",
      accent: "#82e1ff",
      "accent-light": "#a7eaff",
      "accent-light-light": "#cdf3ff",
      "alert-dark-dark": "#cc5d50",
      "alert-dark": "#e5695a",
      alert: "#ff7565",
      "alert-light": "#ff9e93",
      "alert-light-light": "#ffd5d0",
    },
    fontFamily: {
      sans: ["Jost", "ui-sans-serif", "system-ui"],
      serif: ["EB Garamond", "ui-serif", "Georgia"],
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["active"],
      textColor: ["active"],
      borderColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
