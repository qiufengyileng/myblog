import express from 'express'
import { handleDataFromDB2 } from '../../connectMsql.js'

const router = express.Router()
// 文章搜索接口
router.get('/', (req, res) => {
  const {page, tag} = req.query;
  let sql;
  let values = [];
  const limit = 6;
  const offset = limit * ((page || 1) - 1);

  if (tag === 'random') {
    sql = `select * from (select * from articlelist order by rand()) As subArray limit ? OFFSET ?`;
    values = [limit, offset];
  } else {
    const searchTag = `%${tag}%`;
    sql = `SELECT * 
FROM (
    SELECT * 
    FROM articlelist 
    WHERE tags LIKE ? OR title LIKE ?
) AS subquery
LIMIT ? OFFSET ?`;
    values = [searchTag, searchTag, limit, offset];
  }

  handleDataFromDB2(sql, 'select', values).then((data) => {
    console.log('搜索请求成功');
    console.log('search', data);
    if(data.length === 0 || data.length < 6){
      res.send({next:0, data});
      return;
    }
    res.send({ next: 1, data });
  }).catch((error) => {
    console.log(error);
    res.send({ mes: '服务器内部故障' });
  });
});

export default router