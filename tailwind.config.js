/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
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

        green2: "#80AD12",
        green3: "#527A00",
      },
      fontFamily: {
        Inter: ["Inter"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
