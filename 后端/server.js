import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import articleRouter from './routes/article/index.js'
import userRouter from './routes/user/index.js'
import  writeRouter from './routes/write/index.js'
import searchRouter from './routes/search/index.js'
import interceptor from './gobal/interceptor.js'
const app = express()
// 拦截器
app.use(interceptor)


// 中间件
app.use(bodyParser.json({limit: '100000mb'}))
app.use(cors())

// 路由
app.use('/article', articleRouter)
app.use('/user', userRouter)
app.use('/write', writeRouter)
app.use('/search', searchRouter)
//错误处理中间件
app.use((err, req, res, next) => {
  console.log('err=>',err); // 打印错误堆栈
  if(err.message==='Token过期'){
  res.status(401).send({message:'登录过期，请重新登录'})
  }
else if(err.message==='无效的Token'){
  res.status(401).send({message:'登录失败，请重新登录'})
  }
else{
  res.status(500).send({message:'服务器故障'})
  }
})
app.listen(3000, () => {
  console.log('My_Blog server is runing on=>', 'http://127.0.0.1:3000')
})
