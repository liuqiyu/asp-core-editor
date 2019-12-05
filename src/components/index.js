/*
 * @Description: components
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:43:12
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-05 11:37:31
 */
import Vue from 'vue'
import {
  version
} from 'element-ui'
import countTo from 'vue-count-to'
import directives from '../directives'
// import http from './../utils/http'
// 全局组件
import YusDialog from './yus-dialog'
import YusContentPage from './yus-content-page'
import YusGrapheditor from './yus-grapheditor'
import YusGrapheditor1 from './yus-grapheditor1'
import YusThemePicker from './yus-theme-picker'

const components = [YusDialog, YusContentPage, YusGrapheditor, YusGrapheditor1, YusThemePicker]

const setPrototype = () => {
  Vue.prototype.$bus = new Vue()
}

const setDirective = Vue => {
  Object.keys(directives).forEach(v => Vue.directive(v, directives[v]))
}

const install = (Vue) => {
  window.$version = {
    vue: Vue.version,
    ele: version
  }
  components.filter(v => typeof v !== 'function').forEach(v => Vue.component(v.name, v))
  Vue.component('countTo', countTo)
  setPrototype(Vue)
  setDirective(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
