import request from '@/utils/interceptor'

const getArticleList = (page) => {
  // console.log('/article/list?page=', page)
  return request.get(`/article/list?page=${page}`)
}
const getFullArticleById = (id) => {
  return request.get(`/article/full?id=${id}`)
}

const fetchDataTotal = () => {
  return request.get('/article/total')
}

export {
  getArticleList,
  getFullArticleById,
  fetchDataTotal
}
