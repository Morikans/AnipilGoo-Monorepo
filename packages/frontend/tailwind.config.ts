import type { Config } from "tailwindcss";

// TODO tailwind v4以降ではこれでは拡張できない

export default {
  content: ["./**/*.{html,js,jsx,ts,tsx}", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FFF8EA",
        secondary: "#481C00",
      },
    },
  },
} satisfies Config;
