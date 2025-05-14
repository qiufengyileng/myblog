import express from 'express'
import { handleDataFromDB2 } from '../../connectMsql.js'
import multer from 'multer'
import {UserDto} from '../../class/User.js'
import {creatToken } from '../../utils/JwtUtils.js'
import userInterceptor from './userInterceptor.js'

const upload = multer({ storage: multer.memoryStorage() })


const router = express.Router()

// 中间件：用户身份验证
router.use(userInterceptor)
//游客模式

// POST /user/login - 用户身份验证
router.post('/login', (req, res) => {
  const { username, password } = req.body
  const value1=[username,password]
  const sql1 = `SELECT user_id FROM login_user WHERE user_name = ? AND password = ?`
  handleDataFromDB2(sql1, 'select',value1).then(data => {
    //查到了数据
    if (JSON.parse(data)[0]&&JSON.parse(data)[0].user_id) {
      // 生成token
      const userDto = new UserDto(username,JSON.parse(data)[0].user_id)
      const token=creatToken(userDto)
      console.log('token生成' + token)
      res.send({ mes: 'success', username, indentity: true, token: token })
  }
  //没查到数据 
  else {
    res.send({ mes: '用户名或密码错误', indentity: false })
  }
})
//数据库错误
.catch(() => { res.send({ mes: '服务器内部故障', indentity: false }) })
})
// GET /user/personal - 获取个人中心数据
router.get('/personal',(req, res) => {
 //获取userId
  const userId=req.tokenData.userId
  console.log('userId', userId)
  const values=[userId]
  const sql = `select * from user_personal_center where user_id=?`
  handleDataFromDB2(sql, 'select',values).then((data) => {
    console.log('个人中心请求成功')
    console.log('personalCenter', data)
    res.send(data)
  }).catch((error) => {
    console.log(error)
    res.send({ mes: '服务器内部故障' })
  })
})

// POST /user/personal - 修改个人资料
router.post('/personal', (req, res) => {
  //游客
  if(req.tokenData.username==='游客账号'){
    return res.status(666).send({ mes: '游客模式下,个人资料修改成功,但是并不会被保存' })
  }
  const userId=req.tokenData.userId
  const { introduction, email, public_email: publicEmail, public_tel: publicTel, userName } = req.body
  const values=[introduction, email, publicEmail, publicTel, userName, userId]
  const sql = `update user_personal_center set introduction=?,email=?,public_email=?,public_tel=?,userName=? where user_id=?`
  handleDataFromDB2(sql, 'update',values).then(() => {
    console.log('changePersonData', 'success')
    res.send({ mes: 'success' })
  }).catch((error) => {
    console.log('changePersonData', error)
    res.send({ mes: 'error' })
  })
})

// POST /user/upload - 上传头像
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
  //游客
  if(req.tokenData.username==='游客账号'){
    return res.status(666).send({ mes: '游客模式下,个人资料修改成功,但是并不会被保存' })
  }

  if (!req.file) {
    return res.status(400).send({
      success: false,
      message: '没有收到文件'
    })
  }
  const userId=req.tokenData.userId
  // 将文件转换为 Base64 字符串
  const fileData = req.file.buffer.toString('base64')
  const avatarBase64 = `data:${req.file.mimetype};base64,${fileData}`
  console.log('avatarBase64', avatarBase64)
  const values=[avatarBase64, userId]
  const sql = `update user_personal_center set avatar =? where user_id=?`
  handleDataFromDB2(sql, 'update',values).then(() => {
    console.log('uploadImg', 'success')
    res.send({
      success: true,
      avatarUrl: avatarBase64
    })
  }).catch((error) => {
    console.log('uploadImg', error)
    res.send({ message: 'error' })
  })
})

// POST /user/updataPassword - 修改密码
router.post('/updataPassword',(req, res) => {
  //游客
  if(req.tokenData.username==='游客账号'){
    return res.status(666).send({ mes: '游客模式下,个人资料修改成功,但是并不会被保存' })
  }
  const userId=req.tokenData.userId
  const { oldPassword, newPassword } = req.body
  console.log(oldPassword,newPassword)
  const value1=[userId]
  const sql1 = `select password from login_user where user_id=?`
  handleDataFromDB2(sql1, 'select',value1).then((data) => {
    if (JSON.parse(data)[0].password === oldPassword) {
      const value2=[newPassword, userId]
      const sql2 = `update login_user set password=? where user_id=?`
      handleDataFromDB2(sql2, 'update',value2).then(() => {
        console.log('updataPassword', 'success')
        res.send({ message: 'success' })
      }).catch((error) => {
        console.log('updataPassword', error)
        res.send({ message: 'error' })
      })
    } else {
      console.log('updataPassword', '旧密码错误')
      res.send({ message: '旧密码错误' })
    }
  }).catch((error) => {
    console.log('updataPassword', error)
    res.send({ message: '服务器内部故障' })
  })
})
export default router 