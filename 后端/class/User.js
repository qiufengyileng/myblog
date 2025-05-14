/**
 * @class UserDto
 * @description 用于传输的用户数据
 * @param {string} username 用户名
 * @param {string} userId 用户ID
 * @returns {User} 返回一个User对象
 */
export class UserDto {
  username
  userId
  constructor(username, userId) {
    this.username = username;
    this.userId = userId; 
  }
  toString() {
    return `username:${this.username},userId:${this.userId}`;
  }
}
/**
 * @class UserSelectDto
 * @description 用于创建用户查询对象
 * @param {string} username 用户名
 * @param {string} userPassword 用户密码
 * @returns {UserSelectDto} 返回一个UserSelectDto对象
 */
export class UserSelectDto{
  username
  userPassword
  constructor(username,userPassword){
    this.username=username;
    this.userPassword=userPassword;
  }
  setUsername(username){
    this.username=username;
  }
  setUserPassword(userPassword){
    this.userPassword=userPassword;
  }
  toString(){
    return `username:${this.username},userPassword:${this.userPassword}`;
  }
}