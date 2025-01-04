import mysql from 'mysql'
/* ------------------------------------------------------------------------- */
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: '3306',
//   user: 'root',
//   password: '111111',
//   database: 'my_web'
// })
// connection.connect((err) => {
//   if (err) {
//     console.error('数据库连接失败：' + err.stack)
//     return
//   }
//   console.log('已连接到数据库，线程ID：' + connection.threadId)
// })
// function handleDataFromDB (sql, type) {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, (err, result) => {
//       if (err) {
//         console.error(`${type}操作失败`)
//         reject(err)
//       } else {
//         console.log(`${type}操作成功`)
//         resolve(JSON.stringify(result))
//       }
//     })
//   })
// }
// export default handleDataFromDB


/* ------------------------------------------------------------------------- */

/* 
数据库连接池示意图：
[应用程序] ←→ [连接池] ←→ [数据库]     │
   [空闲连接1] [使用中2] [空闲连接3]
   [使用中4]  [空闲连接5] [使用中6]
*/

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '111111',
  database: 'my_web',
  connectionLimit: 15,    
  queueLimit: 0,        
  waitForConnections: true 
})

// 监听连接池事件，错误处理
pool.on('connection', (connection) => {
  console.log('新连接已创建，线程ID：' + connection.threadId)
})
pool.on('error', (err) => {
  console.error('连接池错误：', err)
})

function handleDataFromDB(sql, type) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('获取连接失败：', err)
        reject(err)
        return
      }

      connection.query(sql, (error, result) => {
        // 查询完成后释放连接回连接池
        connection.release()
        
        if (error) {
          console.error(`${type}操作失败：`, error)
          reject(error)
        } else {
          console.log(`${type}操作成功`)
          resolve(JSON.stringify(result))
        }
      })
    })
  })
}
function closePool() {
  return new Promise((resolve, reject) => {
    pool.end(err => {
      if (err) {
        console.error('关闭连接池时发生错误：', err)
        reject(err)
      } else {
        console.log('连接池已关闭')
        resolve()
      }
    })
  })
}

export  { handleDataFromDB, closePool }
