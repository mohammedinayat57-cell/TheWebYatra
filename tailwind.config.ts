import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      colors: {
        cream: {
          50:  "#FDFAF6",
          100: "#F8F5F0",
          200: "#F0EBE3",
          300: "#EDE5D8",
          400: "#E2D9CE",
          500: "#D4C4B0",
        },
        warm: {
          400: "#C4966A",
          500: "#B8845A",
          600: "#8B5E3C",
          700: "#7C5C3E",
          800: "#5C4030",
          900: "#3D2B1F",
        },
        dark: {
          50:  "#2A2018",
          100: "#241E18",
          200: "#1A1612",
          300: "#141210",
          400: "#0F0D0A",
          500: "#0A0806",
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        float:   "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
