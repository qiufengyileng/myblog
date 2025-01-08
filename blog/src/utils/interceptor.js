import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const instance = axios.create({
  // baseURL: 'http://124.220.12.190:3000/',
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 5000
})
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  console.log('interceptor=>', token)
  config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)
})
export default instance
