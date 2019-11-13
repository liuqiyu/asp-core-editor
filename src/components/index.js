/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-13 13:53:52
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-13 13:55:29
 */
import {
  version
} from 'element-ui'
// 全局组件

import YusDialog from './yus-dialog'

const components = [YusDialog]

const install = (Vue) => {
  window.$version = {
    vue: Vue.version,
    ele: version
  }
  components.filter(v => typeof v !== 'function').forEach(v => Vue.component(v.name, v))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
