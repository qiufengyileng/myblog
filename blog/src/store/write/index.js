export default {
  namespaced: true,
  state: {
    save: false,
    articleData: {
      title: '',
      html: '',
      tags: []
    },
    saveArticleDisabled: false
  },
  mutations: {
    setArticleData (state, articleData) {
      // console.log('setArticleData', articleData)
      state.articleData = { ...articleData }
    },
    cleararticleData (state) {
      state.articleData = {
        title: '',
        html: '',
        tags: []
      }
    },
    setSaveArticleDisabled (state, saveArticleDisabled) {
      state.saveArticleDisabled = saveArticleDisabled
    }
  }
}
