import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'stylistic': stylistic,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': ['error'],
      '@typescript-eslint/no-namespace': ['off'],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      "@typescript-eslint/no-empty-object-type": [
        'error', 
        {
          allowInterfaces: 'with-single-extends',
          allowObjectTypes: 'always'
        }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'stylistic/comma-dangle': ['warn', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'never',
        'exports': 'never',
        'functions': 'always-multiline',
        'enums': 'always-multiline',
        'generics': 'never',
        'tuples': 'always-multiline'
      }],
      'stylistic/no-extra-semi': 'error',
      'stylistic/linebreak-style': ['error', 'unix'],
      'stylistic/quotes': [
            'error', 'single', {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
      'stylistic/semi': ['warn', 'always'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
          'warn', { 
              'vars': 'all', 
              'varsIgnorePattern': '^_', 
              'args': 'after-used', 
              'argsIgnorePattern': '(^_)|(^props$)' 
          }
      ],
    },
  },
)
