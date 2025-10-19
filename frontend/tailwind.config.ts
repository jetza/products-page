import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--color-black)",
        white: "var(--color-white)",
        gray: {
          20: "var(--color-gray-20)",
          30: "var(--color-gray-30)",
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
        },
        yellow: "var(--color-yellow)",
        error: {
          DEFAULT: "var(--color-error)",
          900: "var(--color-error-900)",
        },
        product: {
          "light-gray": "var(--color-product-light-gray)",
          "dark-gray": "var(--color-product-dark-gray)",
          black: "var(--color-product-black)",
        },
        button: {
          primary: {
            bg: "var(--button-primary-bg)",
            text: "var(--button-primary-text)",
            hover: "var(--button-primary-hover-bg)",
          },
          secondary: {
            bg: "var(--button-secondary-bg)",
            border: "var(--button-secondary-border)",
            text: "var(--button-secondary-text)",
            hover: "var(--button-secondary-hover-bg)",
          },
          disabled: {
            bg: "var(--button-disabled-bg)",
            text: "var(--button-disabled-text)",
            border: "var(--button-disabled-border)",
          },
        },
      },
      spacing: {
        "0": "var(--spacing-0)",
        "1": "var(--spacing-1)",
        "2": "var(--spacing-2)",
        "3": "var(--spacing-3)",
        "4": "var(--spacing-4)",
        "5": "var(--spacing-5)",
        "6": "var(--spacing-6)",
        "8": "var(--spacing-8)",
        "10": "var(--spacing-10)",
        "12": "var(--spacing-12)",
        "16": "var(--spacing-16)",
        "20": "var(--spacing-20)",
        "24": "var(--spacing-24)",
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        body: "var(--font-size-body)",
        "button-big": "var(--font-size-button-big)",
        big: "var(--font-size-big)",
        h4: "var(--font-size-h4)",
        h3: "var(--font-size-h3)",
        h2: "var(--font-size-h2)",
        h1: "var(--font-size-h1)",
      },
      lineHeight: {
        none: "var(--line-height-none)",
        tight: "var(--line-height-tight)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
      },
      fontWeight: {
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      borderRadius: {
        DEFAULT: "var(--button-radius)",
      },
      transitionProperty: {
        button: "var(--button-transition)",
      },
    },
  },
  plugins: [],
};

export default config;
