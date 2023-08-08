module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'vue/html-indent': ['error', 2],
    'max-len': ['error', { code: 130 }],
    indent: ['error', 2],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
  },
};
