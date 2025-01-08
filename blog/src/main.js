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
Vue.prototype.$message = Message

app.$mount('#app')
