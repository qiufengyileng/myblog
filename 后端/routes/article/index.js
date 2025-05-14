import express from 'express'
import { handleDataFromDB2 } from '../../connectMsql.js'

const router = express.Router()


//GET /article/total - 获取文章总数 1
router.get('/total', async (req, res) => {
  const sql = 'select count(*) as total from articlelist'
  const data = await handleDataFromDB2(sql, 'select')
  // console.log('total', JSON.parse(data)[0].total)
  res.send(data)
})
// GET /article/list - 获取文章列表
router.get('/list', async (req, res) => {
  const page = req.query.page || 1;
  console.log('in articleList', page);
  const offset = 6 * (page - 1);
  const sql = `SELECT * 
  FROM (
      SELECT * 
      FROM articlelist 
  ) AS subquery
  LIMIT 6 OFFSET ?`;
  const data = await handleDataFromDB2(sql, 'select', [offset]);
  res.send(data);
});

// GET /article/full - 获取完整文章
router.get('/full', async (req, res) => {
  const id = req.query.id;
  console.log('in fullArticle', id);
  const sql = `select * from article where article_id = ?`;
  const data = await handleDataFromDB2(sql, 'select', [id]);
  res.send(data);
});

// POST /article/add - 添加文章
router.post('/add', async (req, res) => {
  const { title, content, publishedDate, id, tags, author } = req.body;
  const sql = `insert into articleList(id,title,author,publishedDate,content,tags) values(?,?,?,?,?,?)`;
  const data = await handleDataFromDB2(sql, 'insert', [id, title, author, publishedDate, content, tags]);
  res.send(data);
});
// GET /article/archive - 获取归档数据
router.get('/archive', async (req, res) => {
  const sql = 'select * from guidangdata';
  const data = await handleDataFromDB2(sql, 'select');
  res.send(data);
});

export default router 