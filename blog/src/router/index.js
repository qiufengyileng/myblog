import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import store from '@/store'
// 引入进度条

import Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 只能在组件中使用

// 隐藏小圆圈加载效果
Nprogress.configure({ showSpinner: false })
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const blog = () => import('@/views/blog/index.vue')
const articlePage = () => import('@/views/blog/articlePage.vue')
const writeArticle = () => import('@/views/write/writeArticle.vue')
const notFoundPage = () => import('@/views/notFound/index.vue')

const showPerson = () => import('@/views/personal/ToShowPerson.vue')
const guiDang = () => import('@/views/blog/guiDang.vue')
const person = () => import('@/views/personal/person.vue')
const searchPage = () => import('@/views/search/searchPage.vue')
Vue.use(VueRouter)
let messageHandle = null
const routes = [
  { path: '/', redirect: '/blog' },
  { path: '/blog', component: blog },
  { path: '/article', component: articlePage },
  { path: '/writeArticle', component: writeArticle },
  { path: '/more', component: searchPage },
  { path: '/showPerson', component: showPerson },
  {
    path: '/guidang', component: guiDang
  },
  { path: '/PersonalCenter', component: person },
  { path: '/*', component: notFoundPage },
  { path: '/404', component: notFoundPage }

]

const router = new VueRouter({
  // mode: 'history',
  // 开了后端要改东西
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }

})
const pathList = ['/personalCenter', '/writeArticle']
router.beforeEach((to, from, next) => {
  // console.log('跳转', to.path)
  // 进度条开始
  Nprogress.start()
  // 关闭之前的错误消息
  if (messageHandle) {
    messageHandle.close()
  }
  // 判断是否需要登录，如果需要登录则跳转到登录界面
  // 有没有token，不判断是否过期，在拦截器里面有判断是否过期
  // 如果过期，会将token置空，然后跳转到登录界面，所以这里不需要判断是否过期
  
  if (pathList.includes(to.path) && (!store.state.user.token || store.state.user.token === '')) {
    next(from.path + '?redirect=' + to.path)
    store.commit('login/setVisible', true)
    messageHandle = Message({
      message: '请先登录',
      type: 'error',
      duration: 1000
    })
    Nprogress.done()
    return
  }// 判断是否已经登录，没有登录则跳转到登录界面
  // console.log('跳转', to.path, '成功')
  next()

})

router.afterEach((to, from) => {
  // 进度条结束
  Nprogress.done()
})

export default router
