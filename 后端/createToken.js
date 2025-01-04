// const crypto = require('crypto')
import crypto from 'crypto'
const creatToken = (username) => {
  // 获取当前时间戳
  const timestamp = Date.now().toString()

  // 创建一个唯一的字符串，结合用户名和时间戳
  const uniqueString = `${username}-${timestamp}`

  // 使用SHA256算法生成哈希值
  const hash = crypto.createHash('sha256').update(uniqueString).digest('hex')

  return hash
}
export default creatToken
