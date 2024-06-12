import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pastelPurple: "#c5adc5",
        lightSteelBlue: "#b2b5e0",
        lightBlue: "#759BFA",
        sandy: "#Efecdf",
        vibrantRed: "#f85046",
        iceBlue: "#ecf9fc",
        bluePurple: "#4E47C6",
      },
    },
  },
  plugins: [],
};
export default config;
