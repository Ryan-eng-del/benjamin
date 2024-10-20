import sharedConfig from "@benjamin/shadcn-tailwind-config";
import type { Config } from "tailwindcss";
import tailwindcss_animate_plugin from "tailwindcss-animate";
export default {
  content: ["components/**/*.{js,tsx,ts,html}"],
  theme: {},
  plugins: [tailwindcss_animate_plugin],
  presets: [sharedConfig],
} satisfies Config;
