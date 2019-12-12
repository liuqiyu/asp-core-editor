/*
 * @Description: 
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:43:12
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-12 10:19:27
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "new-cap": ["error", {
      "newIsCap": false,
      "capIsNew": false
    }],
    'no-inner-declarations': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
