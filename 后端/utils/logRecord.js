import fs from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

// 获取文件的绝对路径
const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
// 获取文件目录的绝对路径
const __dirname = path.dirname(__filename)
// console.log(__dirname)
// 查找项目根目录（通过查找 package.json）
function findRootDir(currentDir) {
  try {
    // 检查当前目录是否存在 package.json
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir
    }

    // 获取父目录
    const parentDir = path.dirname(currentDir)
    
    // 如果已经到达根目录还没找到，则返回当前目录
    if (parentDir === currentDir) {
      return currentDir
    }

    // 递归查找父目录
    return findRootDir(parentDir)
  } catch (error) {
    console.error('查找根目录失败:', error)
    return __dirname // 失败时返回当前目录
  }
}

const rootDir = findRootDir(__dirname)
const __path=path.join(rootDir,'\log')
// 创建日志目录
  try{
    if(!fs.existsSync(__path)){
      fs.mkdirSync(__path)
    }
  }catch(error){
    console.error('创建日志目录失败:', error)
  }

const logFilePath=path.join(__path,'log.txt')
// 日志记录
function logRecord(message) {
  try {
    const timeTemp = new Date().toLocaleString()
    console.log(`${timeTemp} ${message}`)
    
    // 写入日志文件
    fs.appendFileSync(logFilePath, `${timeTemp} ${message}\n`, { encoding: 'utf8' })
  } catch (error) {
    console.error('写入日志失败:', error)
  }
}

export default logRecord


// logRecord('test')

