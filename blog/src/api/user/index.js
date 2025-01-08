import request from '@/utils/interceptor'

export const uploadAvatar = (formData) => {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data' 
    },
    url: '/user/uploadAvatar',
    method: 'post',
    data: formData
  })
}
// 修改密码
export const changePassword = (oldPassword, newPassword) => {
  return request.post('/user/updataPassword', { oldPassword, newPassword })
}
