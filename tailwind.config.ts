import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        primary: "#01244C",
      },
    },
  },
};

export default config;


