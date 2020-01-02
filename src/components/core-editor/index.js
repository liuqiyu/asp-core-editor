/*
 * @Description: core-editor
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:51:03
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 14:57:47
 */
import CoreEditor from './src'

/* istanbul ignore next */
CoreEditor.install = function (Vue) {
  Vue.component(CoreEditor.name, CoreEditor)
}

export default CoreEditor
