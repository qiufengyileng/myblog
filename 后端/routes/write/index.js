import express from 'express';
import { handleDataFromDB } from '../../connectMsql.js'
const router = express.Router()
const timeLimit = 60*60*24// 一天的秒数
let maxArticleNums = 1000

setInterval(() => {
maxArticleNums = 1000  
}, timeLimit * 1000)

// POST /write/add - 添加文章
router.post('/saveArticle', async (req, res) => {
  //不允许超过三篇文章
  if (maxArticleNums <= 0) {
    return res.send({ message: '超过最大文章数，添加文章失败' })
  }
  maxArticleNums--
  const { title, content, publishedDate, tags, author,paragraphs } = req.body
   console.log(req.body)
  let id = NaN

  try {
    // 1. 获取 id
    const sql = 'SELECT id FROM articlelist ORDER BY id DESC LIMIT 1'
    const data = await handleDataFromDB(sql, 'select')
    id = JSON.parse(data)[0]?.id + 1 || 1

    if (!id || isNaN(id)) {
      return res.send({ message: 'id查找失败，添加文章失败' })
    }

    // 2. 添加文章列表信息
    const sql2 = `INSERT INTO articleList(id,title,author,publishedDate,content,tags) 
                  VALUES(${id},'${title}','${author}','${publishedDate}','${content}','${tags}')`
    await handleDataFromDB(sql2, 'insert')

    // 3. 添加文章内容
    const sql3 = `INSERT INTO article(article_id,title,paragraphs) 
                  VALUES(${id},'${title}','${paragraphs}')`
    await handleDataFromDB(sql3, 'insert')

    res.send({ message: 'ok' })

  } catch (error) {
    console.error('保存文章失败:', error)
    res.status(500).send({ message: '服务器故障，添加文章失败' })
  }
})
export default router