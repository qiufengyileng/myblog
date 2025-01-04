import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import setting from './setting'
import article from './article'
import guiDang from './guiDang'
import search from './search'
import home from './home'
import login from './login'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    user,
    setting,
    article,
    guiDang,
    search,
    login
  }
})
