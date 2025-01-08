import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import articleRouter from './routes/article/index.js'
import userRouter from './routes/user/index.js'
import  writeRouter from './routes/write/index.js'
import { handleDataFromDB } from './connectMsql.js'


const app = express()

// 中间件
app.use(bodyParser.json({limit: '100000mb'}))
app.use(cors())

// 路由
app.use('/article', articleRouter)
app.use('/user', userRouter)
app.use('/write', writeRouter)

// 搜索接口
app.get('/search', (req, res) => {
  const {page,tag} = req.query
  let sql
  if (tag === 'random') {
    sql = `select * from (select * from articlelist order by rand()) As subArray limit 6 OFFSET ${6*(page-1)}`
  } else {
    sql = `SELECT * 
FROM (
    SELECT * 
    FROM articlelist 
    WHERE tags LIKE '%${tag}%' OR title LIKE '%${tag}%'
) AS subquery
LIMIT 6 OFFSET ${6*(page-1)}`
  }
  handleDataFromDB(sql, 'select').then((data) => {
    console.log('搜索请求成功')
    console.log('search', data)
    if(data.length === 0||data.length<6){
      res.send({next:0,data})
      return
    }
    res.send({ next: 1, data })
  }).catch((error) => {
    console.log(error)
    res.send({ mes: '服务器内部故障' })
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000', 'http://127.0.0.1:3000')
})
