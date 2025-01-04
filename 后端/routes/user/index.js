import express from 'express'
import { handleDataFromDB } from '../../connectMsql.js'
import Token from '../../createToken.js'

const router = express.Router()
const defaultData = {}

// 中间件：验证token
function tokenIdentity(req, res, next) {
  console.log('tokenIdentity')
  const token = req.headers.authorization
  console.log('token=>', token)
  const sql = `select time_before from login_user where token='${token}'`
  handleDataFromDB(sql, 'select').then(data => {
    const timeBefore = JSON.parse(data)[0].time_before
    console.log(timeBefore)
    const currentTime = new Date().getTime()
    if (currentTime - timeBefore > 100000000 * 60 * 60 * 24 * 7) {
      console.log('token过期')
      next()
    } else {
      res.send({ mes: 'token验证成功', indentity: true })
    }
  }).catch(() => { console.log('token验证失败+null'); next() })
}

// 中间件：获取用户ID
function getUserId(req, res, next) {
  defaultData.userId = null
  const token = req.headers.authorization
  const sql = `select user_id from login_user where token='${token}'`
  handleDataFromDB(sql, 'select').then((data) => {
    console.log('getUserId', data)
    defaultData.userId = JSON.parse(data)[0].user_id
    next()
  }).catch(() => {
    res.send({ mes: '没有找到相应用户' })
  })
}

// POST /user/identity - 用户身份验证
router.post('/identity', tokenIdentity, (req, res) => {
  const { username, password } = req.body
  const sql = `SELECT COUNT(*) FROM login_user WHERE user_name = '${username}' AND password = '${password}'`
  handleDataFromDB(sql, 'select').then(data => {
    if (JSON.parse(data)[0]['COUNT(*)'] === 1) {
      const token = Token(username)
      console.log(username, password)
      console.log('token生成' + token)
      
      const sql = `UPDATE login_user 
        SET token='${token}', 
        time_before='${+new Date()}' 
        WHERE user_name='${username}' and password='${password}'`
      
      handleDataFromDB(sql, 'update')
        .then(() => {
          console.log('token更新成功' + token + '\\时间：' + '' + new Date())
          res.send({ mes: 'success', username, indentity: true, token: token })
        })
        .catch(() => {
          console.log('token更新失败' + token + '\\时间：' + '' + new Date())
          res.send({ mes: 'token更新失败', indentity: false })
        })
    } else {
      res.send({ mes: 'success', indentity: false })
    }
  }).catch(() => {
    res.send({ mes: '服务器内部故障', indentity: false })
  })
})

// GET /user/personal - 获取个人中心数据
router.get('/personal', getUserId, (req, res) => {
  const { userId } = defaultData
  console.log('userId', userId)
  const sql = `select * from user_personal_center where user_id='${userId}'`
  handleDataFromDB(sql, 'select').then((data) => {
    console.log('个人中心请求成功')
    console.log('personalCenter', data)
    res.send(data)
  }).catch((error) => {
    console.log(error)
    res.send({ mes: '服务器内部故障' })
  })
})

// POST /user/personal - 修改个人资料
router.post('/personal', getUserId, (req, res) => {
  const { userId } = defaultData
  const { introduction, email, public_email: publicEmail, public_tel: publicTel, userName } = req.body
  const sql = `update user_personal_center set introduction='${introduction}',email='${email}',public_email='${publicEmail}',public_tel='${publicTel}',userName='${userName}' where user_id='${userId}'`
  handleDataFromDB(sql, 'update').then(() => {
    console.log('changePersonData', 'success')
    res.send({ mes: 'success' })
  }).catch((error) => {
    console.log('changePersonData', error)
    res.send({ mes: 'error' })
  })
})

export default router 