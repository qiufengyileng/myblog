import { UserDto } from '../class/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '秋风易冷_jwt_secret_key'; // 替换为实际的密钥

const creatToken = (userData) => {
  if (!(userData instanceof UserDto)) {
    throw new Error('userData must be an instance of User');
  }

  // 生成 JWT 令牌
  const token = jwt.sign(
    { username: userData.username, userId: userData.userId }, // 载荷信息
    JWT_SECRET,//密钥
    { expiresIn: 60 * 60 * 24 * 7 } // 令牌有效期
  );
  return token;
};

// 验证 JWT 令牌
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // 验证令牌
    return decoded; // 返回解码后的信息
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: true, message: 'Token过期' };
    } else if (error.name === 'JsonWebTokenError') {
      return { error: true, message: '无效的Token' }; // 验证失败返回 false
    } else {
      return { error: true, message: '未知错误' }; // 其他错误返回 false
    }
  }
};

export { creatToken, verifyToken };

