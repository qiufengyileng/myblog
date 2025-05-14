import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button, Switch, Icon, Menu, MenuItem, Submenu, Carousel, CarouselItem, Drawer,
  Card, Input, Form, FormItem, Tooltip, Pagination, Loading, Message, Dialog, Upload,
  Dropdown, DropdownMenu, DropdownItem, Tag, Row, Col
} from 'element-ui'
import { Boot } from '@wangeditor/editor'
import changImgeSizeConf from '@/customConfiguration/customImgeSize'
Boot.registerMenu(changImgeSizeConf)

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Switch)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Drawer)
Vue.use(Card)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

// Vue.prototype.$message = Message

// 单例消息
let _message 
{
  let messageInstance = null
  // 清除实例
  const clear = () => {
    if (messageInstance) {
      messageInstance.close()
    }
  }
  _message = (Vue.prototype.$message = function (options) {
    // 如果已经存在一个消息实例，则关闭它
    clear()
    // 创建新的消息实例并保存到变量中
    messageInstance = Message(options)
    return messageInstance
    
  })
  // error
  Vue.prototype.$message.error = (options) => {
    clear()
    messageInstance = Message.error(options)
    return messageInstance
  }
  // success
  Vue.prototype.$message.success = (options) => {
    clear()
    messageInstance = Message.success(options)
    return messageInstance
  }
  // warning
  Vue.prototype.$message.warning = (options) => {
    clear()
    messageInstance = Message.warning(options)
    return messageInstance
  }
}
// 只会触发一次的message
const onceMessage = {}
Vue.prototype.$onceMessage = (options, name) => {
  // 已经触发了,就不再触发
  if (onceMessage[name]) {
    return
  } else {
    onceMessage[name] = true
  }
  return _message(options)
}
// error
Vue.prototype.$onceMessage.error = (options, name) => {
  // 已经触发了,就不再触发
  if (onceMessage[name]) {
    return
  } else {
    onceMessage[name] = true
  }
  return _message.error(options)
}
// success
Vue.prototype.$onceMessage.success = (options, name) => {
  // 已经触发了,就不再触发
  if (onceMessage[name]) {
    return
  } else {
    onceMessage[name] = true
  }
  return _message.success(options)
}
// warning
Vue.prototype.$onceMessage.warning = (options, name) => {
  // 已经触发了,就不再触发
  if (onceMessage[name]) {
    return
  } else {
    onceMessage[name] = true
  }
  return _message.warning(options)
}

// 获取页面的宽度
const viewportWidth = window.innerWidth || document.documentElement.clientWidth
// 是否为移动端
if (viewportWidth < 768) {
  // 移动端
  // Vue.prototype.$isMobile = true
  // Vue.prototype.$MobileAtrrs = {
  //   width: viewportWidth + 'px'
  // }
  store.commit('setting/setMobile', true)
}
app.$mount('#app')
export default _message
