import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            prettier, // ✅ add THIS at the END
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            prettier: prettierPlugin, // ✅ add plugin
        },
        rules: {
            'no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^[A-Z_]',
                    argsIgnorePattern: '^[A-Z_]', // ✅ FIX HERE
                },
            ],
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['src/components/ui/**/*.{js,jsx}'],
        rules: {
            'react-refresh/only-export-components': 'off',
        },
    },
]);
