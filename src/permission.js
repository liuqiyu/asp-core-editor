/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:43:12
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-28 16:45:53
 */
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
// import {
//   getSession
// } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'

// router.beforeEach((to, from, next) => {
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // if (getSession()) {
//   //   next()
//   // } else {
//   //   if (to.path === '/login') {
//   //     next()
//   //   } else {
//   //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//   //   }
//   // }
// })

router.afterEach(() => {
  // ...
  NProgress.done()
})
