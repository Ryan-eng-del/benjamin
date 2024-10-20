import sharedConfig from "@benjamin/tailwind-config";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
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
