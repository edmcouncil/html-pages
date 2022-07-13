module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'max-len': ['error', { code: 130, ignoreComments: true }],
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
