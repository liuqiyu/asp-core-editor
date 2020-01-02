/*
 * @Description: 入口
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:48:23
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 15:04:46
 */
import CoreEditor from './core-editor'

const components = [CoreEditor]

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
