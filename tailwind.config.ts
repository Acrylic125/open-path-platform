import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {} as Record<"sm" | "md" | "lg", string>,
  },
  plugins: [],
} satisfies Config;
