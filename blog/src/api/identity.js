import request from '@/utils/interceptor'
import { setName, setToken } from '@/utils/storage'
import store from '@/store'
const checkIdentity = async (username, password) => {

  // console.log('验证身份接口被调用')
  const { indentity, token, mes } = await request.post('/user/identity', {
    username,
    password
  })
  if (indentity) {
    if (username) setName(username)
    if (token) setToken(token)
    
  }
  console.log(mes, indentity)
  return indentity
}// 验证身份的接口

const getPersonalCenterData = async () => {
  const personalData = await request.get('/user/personal')
  return personalData
}
const changePersonData = async (data) => {
  const result = await request.post('/user/personal', data)
  return result
}
// 登录接口
const loginIn = async (username, password) => {
  const { indentity, token, mes } = await request.post('/user/login', { username, password })
  // 验证成功后，将用户名和token存储到本地存储中，并且请求getPersonalCenterData
  // 把返回的数据放在store里面
  if (indentity) {
    if (username) {
      setName(username)
      store.commit('user/setUsername', username)
    }
    if (token) {
      setToken(token)
      store.commit('user/setToken', token)
    }
    // 调用getPersonalCenterData
    const personalData = await getPersonalCenterData()
    // 把返回的数据放在store里面
    store.commit('user/setPersonalCenterData', personalData[0])
  }
  console.log(mes, indentity)
  return indentity
}
export { checkIdentity, getPersonalCenterData, changePersonData, loginIn }
/*
export default：用于导出一个默认的、主要的函数或对象，导入时不需要使用大括号，可以使用任意名称。
export：用于导出多个命名的函数、变量或对象，导入时必须使用大括号，并且需要使用与导出时相同的名称。
*/
