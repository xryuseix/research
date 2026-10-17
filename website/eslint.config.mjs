import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      next.configs["core-web-vitals"],
      reactHooks.configs.flat.recommended,
    ],
  },
  { rules: { "@next/next/no-img-element": "off" } },
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
]);
