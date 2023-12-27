module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error'],
    'space-infix-ops': ['error'],
    'comma-spacing': ['error'],
    'no-console': ['error', { allow: ['warn'] }],
  },
};
