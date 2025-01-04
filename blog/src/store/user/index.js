import { getToken, getName, setUserData, getUserData, getHistory, setHistory, delHistory, delUserData, delToken } from '@/utils/storage'
import { checkIdentity, getPersonalCenterData, changePersonData } from '@/api/identity'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    username: getName() || null,
    token: getToken(),
    userData: getUserData() || null,
    history: getHistory() || [],
    message: null
  },
  mutations: {
    setIdentity (state, payload) {
      /* 因为mutations和actions不支持传递多个参数的，这里的参数又称“载荷”（Payload） */
      /* 在 mutations 中，setIdentity 方法的参数传递方式不正确。mutations
       方法应该接收一个对象作为第二个参数，而不是单独的 username 和 password。 */
      state.username = payload.username
      state.token = payload.token
    },
    setPersonalCenterData (state, paload) {
      console.log('setPersonalCenterData', paload)
      state.userData = paload
    },
    addHistory (state, history) {
      if (state.history.includes(history)) {
        console.log('重复添加')
        return
      }
      state.history.push(history)
      console.log('addHistory', state.history)
      setHistory(state.history)
    },
    setMessage (state, message) {
      state.message = message
    },
    delAllHistory (state) {
      state.history = []
      delHistory()
    },
    upateData (state, paload) {
      delUserData()
      console.log('upateData', paload)
      state.userData = paload
    },
    clearUserData (state) {
      // 把仓库里面的用户信息清除
      state.userData = null
      state.username = null
      state.token = null
      // 清除本地保存的用户信息
      delUserData()
      // 清除本地保存的token
      delToken()
      // 清除本地保存的history
      delHistory()
      console.log('clearUserData', '退出登录成功')
      // 消息
      Message.success('退出登录成功')
      // 刷新页面
      location.reload()
    }
  },
  actions: {
    async fetchCheckIdentity ({ commit }, payload) {
      // console.log('checkIdentity', payload)
      const indentity = await checkIdentity(payload.username, payload.password)
      // console.log('checkIdentity', indentity)
      commit('setIdentity', indentity)
    },
    // 获取用户个人信息
    async fetchPersonalCenterData ({ commit }) {
      const data = await getPersonalCenterData()
      if (data[0]) {
        console.log('data[0]', data[0], typeof data[0])
        setUserData(data[0])
      }
      commit('setPersonalCenterData', data[0])
    },
    async fetchSaveUserData ({ commit, state }, data) {
      // 关闭之前的message,如果有的话
      if (state.message) {
        state.message.close()
      }
      let message
      try {
        await changePersonData(data)
        commit('upateData', data)
        message = Message.success('修改成功')
      } catch (error) {
        message = Message.error('修改失败')
        console.error('fetchSaveUserData', error)
      } finally {
        commit('setMessage', message)
      }
    }
  },
  getters: {
    getIdentity: state => ({ username: state.username, token: state.token }),
    getUserPersonalData: state => state.userData
  }
}
