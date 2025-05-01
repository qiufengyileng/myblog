import request from '@/utils/interceptor'

export const fetchSaveArticle = (data) => {
  // console.log('fetchSaveArticle', data)
  return request.post('/write/saveArticle', data)
}

export const fetchSaveDraft = (data) => {
  return request.post('/write/saveDraft', data)
}
