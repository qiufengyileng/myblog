import { getGuiDangData } from '@/api/getGuiDangData'
export default {
  namespaced: true,
  state: {
    dataList: null
  },
  mutations: {
    setDataList (state, dataList) {
      state.dataList = dataList
    }
  },
  actions: {
    async fetchGuiDangData ({ commit }) {
      const dataList = await getGuiDangData()
      console.log('fetchGuiDangData', dataList)
      commit('setDataList', dataList)
    }
  },
  getters: {
    guidangData (state) {
      return state.dataList
    }
  }
}
