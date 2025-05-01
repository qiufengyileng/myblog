import { fetchDataTotal } from '@/api/getArticle'
export default {
  namespaced: true,
  state: {
    currentPage: 1,
    dataTotal: 0
  },
  mutations: {
    setCurrentPage (state, page) {
      state.currentPage = page
    },
    setDataTotal (state, dataTotal) {
      state.dataTotal = dataTotal[0].total
      // console.log('setDataTotal', state.dataTotal)
    }
  },
  actions: {
    async getDataTotal ({ commit }) {
      const dataTotal = await fetchDataTotal()
      // console.log('getDataTotal', dataTotal)
      commit('setDataTotal', dataTotal)
    }
  }
}
