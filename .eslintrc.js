module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  plugins: ["vue"],
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off',
    'no-sequences': 'off',
    'no-tabs': 'off',
    allowIndentationTabs: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
