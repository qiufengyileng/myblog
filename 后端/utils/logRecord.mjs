import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 查找项目根目录（通过查找 package.json）
function findRootDir(currentDir) {
  try {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir
    }

    const parentDir = path.dirname(currentDir)
    if (parentDir === currentDir) {
      return currentDir
    }

    return findRootDir(parentDir)
  } catch (error) {
    console.error('查找根目录失败:', error)
    return __dirname
  }
}

const rootDir = findRootDir(__dirname)
const logDir = path.join(rootDir, 'log')
const logFilePath = path.join(logDir, 'loglog.txt')

// 检查并创建日志目录
try {
  // 检查目录是否存在
  fs.accessSync(logDir, fs.constants.F_OK)
} catch (error) {
  // 如果目录不存在（抛出错误），则创建它
  try {
    fs.mkdirSync(logDir, { recursive: true })
    console.log('日志目录已创建')
  } catch (createError) {
    console.error('创建日志目录失败:', createError)
  }
}

// 日志记录
function logRecord(message) {
  try {
    const timeTemp = new Date().toLocaleString()
    console.log(`${timeTemp} ${message}`)
    fs.appendFileSync(logFilePath, `${timeTemp} ${message}\n`, { encoding: 'utf8' })
  } catch (error) {
    console.error('写入日志失败:', error)
  }
}

export default logRecord 