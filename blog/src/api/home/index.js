import request from '@/utils/interceptor'

export const getArticleList = (pageNumber) => {
  return request.get(`/articleList?page=${pageNumber}`)
}
