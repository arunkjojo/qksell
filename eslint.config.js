import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  { ignores: ["dist"] },

  // Base configurations to extend
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Custom configuration for your project
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // Add other globals here if needed
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // You can start with recommended rules from plugins
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Then, add your custom rules or overrides
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": "off", // Turning off base rule to use the TS version
      "@typescript-eslint/no-unused-vars": "warn", // Recommended to keep this on 'warn' or 'error'
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off", // Not needed with the new JSX transform
      "react/react-in-jsx-scope": "off", // Not needed with the new JSX transform
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "no-undef": "off",
      "react/no-children-prop": "off"
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  }
);
