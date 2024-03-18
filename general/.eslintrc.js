module.exports = {
  extends: ['@nuxt', 'plugin:prettier/recommended', 'prettier'],
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['dist/', 'node_modules/', '.nuxt/', '.output/', 'public/'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-v-for-key': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off'
  }
};
