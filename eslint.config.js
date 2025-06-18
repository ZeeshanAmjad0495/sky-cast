import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    plugins: {
      js,
      unicorn,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
      "simple-import-sort": simpleImportSort,
    },

    ignores: [
      "dist",
      "node_modules",
      "commitlint.config.cjs",
      "package.json",
      "package-lock.json",
      "environment.d.ts",
      "eslint.config.js",
    ],
    rules: {
      ...js.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,
      ...eslintPluginImport.configs.recommended.rules,

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w"],
            ["^(@|~)/"],
            ["^\\."],
            ["\\.css$", "\\.scss$", "\\.sass$"],
            ["^type:\\s"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/order": "off",
      "import/no-unresolved": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/newline-after-import": ["error", { considerComments: true }],

      "sort-keys": ["error", "asc", { caseSensitive: true, natural: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "prettier/prettier": "error",

      eqeqeq: "error",
      "no-console": "error",

      "no-var": "error",
      "prefer-const": "error",
      "no-implicit-globals": "error",
      "no-shadow": "error",
      "no-empty-function": "error",
      "no-nested-ternary": "error",
      complexity: ["error", 10],
      "consistent-return": "error",
      "dot-notation": "error",

      "unicorn/expiring-todo-comments": "off",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      "unicorn/prefer-module": "off",
    },
  },
  prettierConfig,
]);
