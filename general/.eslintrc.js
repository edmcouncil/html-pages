module.exports = {
  extends: ['@nuxt', 'plugin:prettier/recommended', 'prettier'],
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['dist/', 'node_modules/', '.nuxt/', '.output/', 'public/']
};
