import js from '@eslint/js';
import { readFileSync } from 'fs';
import path from 'path';

import pluginJson from 'eslint-plugin-json';
import pluginXwalk from 'eslint-plugin-xwalk';
import parser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        allowImportExportEverywhere: true,
        requireConfigFile: false,
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    settings: {},
    plugins: {
      json: pluginJson,
      xwalk: pluginXwalk,
    },
    rules: {
      'import/extensions': ['error', { js: 'always' }],
      'linebreak-style': ['error', 'unix'],
      'no-param-reassign': [2, { props: false }],
    },
  },
];