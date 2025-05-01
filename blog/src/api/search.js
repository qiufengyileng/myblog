import request from '@/utils/interceptor'
const getSearchResult = (data) => {
  // console.log('getSearchResult', data)
  return request.get('/search', {
    params: {
      tag: data?.keyword || 'random',
      page: data?.page || 1
    }
  })
}
export { getSearchResult }
