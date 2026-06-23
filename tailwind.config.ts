import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wc-green": "#1a6b3c",
        "wc-gold": "#c9a84c",
        "wc-dark": "#0d3d22",
        "wc-light": "#e8f5ed",
      },
    },
  },
  plugins: [],
};
export default config;
