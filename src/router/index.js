/*
 * @Description: router
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 14:46:01
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/editor')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import(/* webpackChunkName: "preview" */ '@/views/preview')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
