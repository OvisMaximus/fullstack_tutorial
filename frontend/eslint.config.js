import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from 'eslint-plugin-vitest-globals'
import vitest from 'eslint-plugin-vitest'
import babelParser from '@babel/eslint-parser'

export default [
    js.configs.recommended,
    reactHooks.configs['recommended-latest'],
    {
        ignores: [
            'node_modules',
            'dist',
            '.eslintrc.cjs',
            'vite.config.js']
    },
    {
        languageOptions: {
            parser: babelParser,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,  // Add Jest globals
                vi: true,        // Add Vitest's vi global
                describe: true,  // Add test globals explicitly
                test: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
                beforeAll: true,
                afterAll: true,
                assert: true
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },
                babelOptions: {
                    presets: ['@babel/preset-react']
                }
            },
        },
        settings: { react: { version: '18.2' } },
        plugins: {
            'react-refresh': reactRefresh,
            'vitest-globals': vitestGlobals,
            'vitest': vitest
        },
        rules: {
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'eqeqeq': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { 'before': true, 'after': true }],
            'no-console': 0,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 0,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-unused-vars': 0
        },
    }
]