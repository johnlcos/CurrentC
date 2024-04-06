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
        "text-white": "#E6E6E6",
        "box-hover-color": "#2F3335",
        "subtext-color": "#A0A0A0",
        background: "#17191A",
        surface: "#252526",
        primary: {
          50: "#EAF5EC",
          100: "#D5ECD9",
          200: "#ABD9B2",
          300: "#80C68C",
          400: "#56B366",
          500: "#408E4D",
          600: "#33713D",
          700: "#26542E",
          800: "#19381E",
          900: "#0D1C0F",
          950: "#060E08",
        },
      },
    },
  },
  plugins: [],
};
export default config;
