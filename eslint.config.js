import js from '@eslint/js';
import globals from 'globals';
import unicorn from 'eslint-plugin-unicorn';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      js,
      unicorn,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    ignores: ['dist', 'node_modules', 'eslint.config.js', 'commitlint.config.cjs'],
    rules: {
      ...js.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,
      ...eslintPluginImport.configs.errors.rules,
      ...eslintPluginImport.configs.warnings.rules,

      'prettier/prettier': 'error',

      eqeqeq: 'error',
      'no-console': 'error',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-implicit-globals': 'error',
      'no-shadow': 'error',
      'no-empty-function': 'error',
      'no-magic-numbers': ['error', { ignoreArrayIndexes: true, enforceConst: true }],
      'no-nested-ternary': 'error',
      complexity: ['error', 10],
      'max-lines-per-function': ['error', 30],
      'consistent-return': 'error',
      'dot-notation': 'error',
      'import/extensions': [
          'error',
          'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'unicorn/expiring-todo-comments': 'off',
    },
  },
  prettierConfig,
]);
