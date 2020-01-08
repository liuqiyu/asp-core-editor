/*
 * @Description: 入口
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:48:23
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-08 20:04:26
 */
import CoreEditor from './core-editor'
import CoreEditor1 from './core-editor1'

const components = [CoreEditor, CoreEditor1]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
