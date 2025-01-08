const key = 'qiufenyileng_personal_blog'
export const getToken = () => {
  return localStorage.getItem(key + '_token')
}

export const setToken = (token) => {
  localStorage.setItem(key + '_token', token)
}
export const delToken = () => {
  return localStorage.removeItem(key + '_token')
}
export const getName = () => {
  return localStorage.getItem(key + '_name')
}
export const setName = (name) => {
  localStorage.setItem(key + '_name', name)
}

export const setUserData = (dataObject) => {
  return localStorage.setItem(key + '_userData', JSON.stringify(dataObject))
}
export const getUserData = () => {
  return JSON.parse(localStorage.getItem(key + '_userData'))
}
export const updateUserPassword = (password) => {
  const userData = getUserData()
  userData.password = password
  setUserData(userData)
}
export const delUserData = () => {
  return localStorage.removeItem(key + '_userData')
}
export const setHistory = (arr) => {
  return localStorage.setItem(key + '_history', JSON.stringify(arr))
}
export const getHistory = () => {
  return JSON.parse(localStorage.getItem(key + '_history'))
}

export const delHistory = () => {
  return localStorage.setItem(key + '_history', JSON.stringify([]))
}
