import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from 'eslint-plugin-vitest-globals'

export default [
    js.configs.recommended,
    {
        ignores: [
            'node_modules',
            'dist',
            '.eslintrc.cjs',
            'vite.config.js']
    },
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        settings: { react: { version: '18.2' } },
        plugins: {
            'react-refresh': reactRefresh,
            'react-hooks': reactHooks,
            'vitest-globals': vitestGlobals,
        },
        rules: {
            'indent': [
                'error',
                4
            ],
            'linebreak-style': [
                'error',
                'unix'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'never'
            ],
            'eqeqeq': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': [
                'error', 'always'
            ],
            'arrow-spacing': [
                'error', { 'before': true, 'after': true }
            ],
            'no-console': 0,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 0,
            'no-unused-vars': 0
        },
    }
]
