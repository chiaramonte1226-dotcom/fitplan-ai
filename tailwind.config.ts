import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111a23",
        navy: "#172432",
        mist: "#edf4f1",
        moss: "#356556",
        sage: "#91aa9f",
        blue: "#315f78",
        pearl: "#f6f3ec",
        linen: "#fffaf5",
        amber: "#c9874a",
        coral: "#c96f55"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 26, 35, 0.10)",
        lift: "0 10px 30px rgba(17, 26, 35, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
