import { verifyToken } from "../utils/JwtUtils.js";
export default (req, res, next) => {
  // 在这里添加拦截器逻辑
  // 例如，检查请求头、验证用户身份等
  //token验证,把结果放在req.UserData中，方便后续使用
  const token = req.headers.authorization; // 获取请求头中的 Authorization 字段，即 token
  const decoded = verifyToken(token); // 验证 token
  if (decoded.error) {
    if (decoded.message === '无效的Token') {
      console.log('无效的Token');
      req.tokenData = { error: true, message: '无效的Token' }; // 验证失败返回 false
    } else if (decoded.message === 'Token过期') {
      console.log('Token过期');
      req.tokenData = { error: true, message: 'Token过期' }; // 验证失败返回 false}
  }
  } else {
    console.log('Token验证成功');
    req.tokenData = decoded; // 验证成功返回解码后的信息}
  }
  next();
}