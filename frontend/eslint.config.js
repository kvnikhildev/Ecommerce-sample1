// eslint.config.js
import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["*.js", "*.jsx"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly"
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    plugins: {
      react: reactPlugin
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2]
    },

    settings: {
      react: { version: "detect" }
    }
  }
];
