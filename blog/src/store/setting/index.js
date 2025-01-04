
export default {
  namespaced: true,
  state: {
    isNight: JSON.parse(localStorage.getItem('这总不能重名吧-isNight')) || false// 是否为夜间模式
  },
  mutations: {
    changeNight (state) {
      state.isNight = !state.isNight
      localStorage.setItem('这总不能重名吧-isNight', state.isNight)
    }// 改变主题颜色,夜间或白天
  }
}
