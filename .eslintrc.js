module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:json/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.json'],
  },
  rules: {
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/no-explicit-any': 0,
    'max-len': ['error', { code: 130 }],
  },
  ignorePatterns: ['node_modules', '**/lib/*', "**/*.js"],
};
