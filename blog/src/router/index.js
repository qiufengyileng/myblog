import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import store from '@/store'
// 引入进度条

import Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// import store from '@/store'
// import { mapGetters } from 'vuex'
// 只能在组件中使用
import { checkIdentity } from '@/api/identity.js'

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
const pass = async () => {
  const pass = await checkIdentity()
  console.log('pass', pass)
  // 直接token判断
  return pass
}// 判断是否已经通过
const pathList = ['/personalCenter', '/writeArticle']
router.beforeEach(async (to, from, next) => {
  console.log('跳转', to.path)
  // 进度条开始
  Nprogress.start()
  try {
    // 关闭之前的错误消息
    if (messageHandle) {
      messageHandle.close()
    }
    if (pathList.includes(to.path) && await pass() === false) {
      next(from.path)
      store.commit('login/setVisible', true)
      messageHandle = Message({
        message: '请先登录',
        type: 'error',
        duration: 1000
      })
      Nprogress.done()
      return
    }// 判断是否已经登录，没有登录则跳转到登录界面
    console.log('跳转', to.path, '成功')
    next()
  } catch (error) {
    console.log('跳转', to.path, '失败')
    next()
  }
})

router.afterEach(() => {
  // 进度条结束
  Nprogress.done()
})

export default router
