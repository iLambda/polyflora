const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    env: { browser: true, es2021: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { 
        ecmaVersion: 'latest', 
        ecmaFeatures: {
            jsx: true
        },
        project: ['./tsconfig.json', './tsconfig.node.json'],
        sourceType: 'module'
    },
    ignorePatterns: ['.eslintrc.cjs', 'dist/**'],
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'react', 
        'react-hooks',
        'unused-imports'
    ],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-exports': ['error'],
        '@typescript-eslint/no-namespace': ['off'],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                'allowSingleExtends': true
            }
        ],
        'comma-dangle': 'off',
        'no-extra-semi': 'error',
        'linebreak-style': ['error', 'unix'],
        'react/button-has-type': 'error',
        'react/display-name': 'off',
        'react/no-unknown-property': 'off',
        'react/hook-use-state': ['error', { 'allowDestructuredState': true }],
        'react/jsx-uses-react': 'off',
        'react/jsx-equals-spacing': 'error',
        'react/prefer-stateless-function': 'error',
        'react/react-in-jsx-scope': 'off',
        'quotes': [
            'error', 'single', {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        'semi': ['warn', 'always'],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn', { 
                'vars': 'all', 
                'varsIgnorePattern': '^_', 
                'args': 'after-used', 
                'argsIgnorePattern': '(^_)|(^props$)' 
            }
        ],
        '@typescript-eslint/comma-dangle': ['warn', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'never',
            'exports': 'never',
            'functions': 'always-multiline',
            'enums': 'always-multiline',
            'generics': 'never',
            'tuples': 'always-multiline'
        }]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
});