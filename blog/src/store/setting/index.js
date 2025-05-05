
export default {
  namespaced: true,
  state: {
    isNight: JSON.parse(localStorage.getItem('这总不能重名吧-isNight')) || false, // 是否为夜间模式
    isMobile: false, // 是否为移动端
    MobileAtrrs: {
      
    }// 移动端属性
  },
  mutations: {
    // 改变主题颜色,夜间或白天
    changeNight (state) {
      state.isNight = !state.isNight
      localStorage.setItem('这总不能重名吧-isNight', state.isNight)
    }, 

    setMobile (state, isMobile) {
      // console.log('isMobile', isMobile)
      state.isMobile = isMobile
    }
  }
}
