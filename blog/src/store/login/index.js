
export default {
  namespaced: true,

  state: {

    visible: false
  },
  mutations: {
    setVisible (state, visible) {
      state.visible = visible
    }
  },
  actions: {
    // 退出登录
    loginOut ({ commit }) {
      commit('user/clearUserData', null, { root: true })
    }
  },
  getters: {
  
  }
}
