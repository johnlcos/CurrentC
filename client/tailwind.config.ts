import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-white': '#E4E6EB',
        'box-hover-color': '#2F3335',
        'subtext-color': '#71767A',
      },
    },
  },
  plugins: [],
};
export default config;
