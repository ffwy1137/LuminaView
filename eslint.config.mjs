const vue = (await import('eslint-plugin-vue')).default
const ts = (await import('@typescript-eslint/eslint-plugin')).default
const prettier = (await import('eslint-plugin-prettier')).default
const vueParser = (await import('vue-eslint-parser'))
const tsParser = (await import('@typescript-eslint/parser'))

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue', 'tests/**/*.ts'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error',
    },
  },
]
