/*
 * @Description: router
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-08 20:05:05
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
    path: '/editor1',
    name: 'editor1',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/editor1')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import(/* webpackChunkName: "preview" */ '@/views/preview')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
