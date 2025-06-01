/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary blue (iOS blue)
        blue: {
          50: "#EBF5FF",
          100: "#E1F0FF",
          200: "#C3E0FF",
          300: "#A4D1FF",
          400: "#62B0FF",
          500: "#0A84FF", // Primary blue
          600: "#007AFF",
          700: "#005FD3",
          800: "#0040A0",
          900: "#003580",
        },
        // Secondary teal
        teal: {
          50: "#EFFCFD",
          100: "#DEF9FB",
          200: "#BCF2F8",
          300: "#96EBF3",
          400: "#64D2FF", // Secondary teal
          500: "#56CCF2",
          600: "#32B4DE",
          700: "#2792BE",
          800: "#1D6F9E",
          900: "#14547E",
        },
        // Accent pink
        pink: {
          50: "#FFF0F6",
          100: "#FFE5EF",
          200: "#FFC6DF",
          300: "#FFA3CF",
          400: "#FF75AF",
          500: "#FF375F", // Accent pink
          600: "#FF2D54",
          700: "#E21F45",
          800: "#B91638",
          900: "#910F2D",
        },
        // Success green
        green: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#30D158", // Success green
          600: "#25A244",
          700: "#1B873E",
          800: "#166534",
          900: "#14532D",
        },
        // Warning orange
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#FF9F0A", // Warning orange
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        // Error red
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#FF453A", // Error red
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
