/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-10-21 16:21:03
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-13 13:55:11
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.scss'
import './style/main.scss'
import './style/common.css'
import './style/grapheditor.css'
import YusUI from './components'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'mini'
})
Vue.use(YusUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
