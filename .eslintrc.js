/*
 * @Description: 
 * @Author: liuqiyu
 * @Date: 2019-10-21 16:21:03
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-11 16:16:42
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "new-cap": ["error", {
      "newIsCap": false,
      "capIsNew": false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
