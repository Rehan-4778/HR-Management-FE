/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#599D15",
        secondary: "#03541C",
        tertiary: "#2E7918",
        quaternary: "#58524F",
        text: "#000000",
        background: "#FFFFFF",
        success: "bg-green-600",
        warning: "bg-yellow-500",
        danger: "#DC2626",
        green1: "#6A950A",
      },
      fontFamily: {
        Inter: ["Inter"],
      },
    },
  },
  plugins: [],
};
