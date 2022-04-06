module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
    'max-len': ['error', {'code': 130, 'ignoreComments': true} ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'properties': 0,
    'ignoreDestructuring': 0,
    'ignoreImports': false
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
