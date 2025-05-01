import { getSearchResult } from '@/api/search'
export default {
  namespaced: true,
  state: {
    articleList: [],
    next: true,
    change: false,
    Ycoordinate: 0 // 用于记录滚动条的Y坐标
  },
  mutations: {
    setArticleList (state, articleList) {
      // 这个是因为我们搜索词如果变了，因该要把整个改变，而不是在后面加
      if (state.change) {
        state.articleList = JSON.parse(articleList)
        state.change = false
        return
      }
      // 搜索词不变，我们认为还是同一类型的文章，将文章列表添加到state中，但这个不是一定的
      state.articleList.push(...JSON.parse(articleList))
    },
    setNext (state, next) {
      state.next = next
    },
    setChange (state) {
      state.change = true
    },
    setYcoordinate (state, Ycoordinate) {
      state.Ycoordinate = Ycoordinate
    }
  },
  actions: {
    async fetchArticleList ({ commit, state }, keyword) {
      try {
        // console.log('fetchArticleList', keyword)
        const reslut = await getSearchResult(keyword)
        const { data: articleList, next } = reslut
        // console.log('fetchArticleList', articleList, next)
        commit('setArticleList', articleList)
        // 如果next为0，则停止加载,更新数据
        if (!next) {
          // console.log('停止加载', next)
          commit('setNext', false)
        }
        // 如果next为1，则继续加载,更新数据
        if (!state.next && next) {
          commit('setNext', true)
        }
      } catch (error) {
        // console.log(error)
        throw new Error('获取搜索结果失败')
      }
    }
  },
  getters: {
    getArticleList: (state) => state.articleList
  }
}
