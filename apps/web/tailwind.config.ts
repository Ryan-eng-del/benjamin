import sharedConfig from "@benjamin/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        waveHand: "wavingHand ease-in-out 1.5s 100",
        waveHandAgain: "wavingHand ease-in-out 1.5s infinite",
      },
      colors: {
        gbg: "#f6f7f8",
      },
      width: {
        content: "680px",
        page: "720px",
        toc: "200px",
      },
      keyframes: {
        wavingHand: {
          "0%": {
            transform: "none",
            transformOrigin: "70% 70%",
          },
          "25%": {
            transform: "rotate3d(1, 1, 1, -15deg)",
            transformOrigin: "70% 70%",
          },
          "50%": {
            transform: "rotate3d(1, 1, 1, 15deg)",
            transformOrigin: "70% 70%",
          },
          "75%": {
            transform: "rotate3d(1, 1, 1, -15deg)",
            transformOrigin: "70% 70%",
          },
          "100%": {
            transform: "none",
            transformOrigin: "70% 70%",
          },
        },
      },
    },
  },
  plugins: [],
  presets: [sharedConfig],
} satisfies Config;
