import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#050505",
        white: "#FDFDFD",
        gray: {
          50: "#F4F4F4",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#BBBBBB",
          400: "#A3A3A3",
          500: "#808080",
          600: "#545457",
          700: "#3A3A3B",
          800: "#1F1F20",
        },
        yellow: "#FFFBB7",
        error: "#DF4718",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "7": "28px",
        "8": "32px",
        "9": "36px",
        "10": "40px",
        "11": "44px",
        "12": "48px",
        "14": "56px",
        "16": "64px",
        "18": "72px",
        "20": "80px",
        "22": "88px",
        "24": "96px",
      },
      fontFamily: {
        sans: ["Mona Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
