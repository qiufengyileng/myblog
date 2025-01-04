import request from '@/utils/interceptor'
const getGuiDangData = () => {
  return request.get('/article/archive')
}
export { getGuiDangData }
