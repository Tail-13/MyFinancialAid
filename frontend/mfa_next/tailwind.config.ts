import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        textPrimary: "#ffffff",
        secondary: "#40407a",
        accent: "#ff7979",

        darkPrimary: "#2c2c54",
        textDarkPrimary: "#ffffff",
        darkSecondary: "#40407a",
        darkAccent: "#ff5252",
      },
    },
  },
  plugins: [],
} satisfies Config;
