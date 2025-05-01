import { getArticleList, getFullArticleById } from '@/api/getArticle'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    fullArticle: null,
    articleList: [],
    errorStatus: false,
    choose: [null, null] // 选择的文章id和选择的内容
  },
  mutations: {
    setArticleList (state, articleList) {
      state.articleList = articleList
      // //console.log('mutations设置文章列表', articleList)
    },
    setFullArticle (state, article) {
      state.fullArticle = article
      // console.log('mutations设置全文文章', article)
    },
    setChoose (state, choose) {
      // console.log('mutations设置choose', state.fullArticle.article_id, choose)
      state.choose = choose
    }
  },
  actions: {
    async fetchArticleList ({ commit }, page) {
      const articleList = await getArticleList(page)
      commit('setArticleList', articleList)
    },
    async fetchArticleById ({ commit }, id) {
      // console.log('in fetchArticleById', 'actions获取文章', id)
      const [article] = await getFullArticleById(id)
      if (!article) {
        router.replace('/404')
        return
      }
      article.paragraphs.replace(/\\'/g, "'").replace(/\\"/g, '"')
      article.title.replace(/\\'/g, "'").replace(/\\"/g, '"')
      // console.log('actions获取文章')
      commit('setFullArticle', article)
    }
  },
  getters: {
    getArticleList: (state) => {
      return state.articleList
    },
    getFullArticle: (state) => {
      // console.log('getters获取文章', state.fullArticle)
      return state.fullArticle
    }
  }
}
