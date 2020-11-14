const jwt = require('jsonwebtoken')
const cookieKey = 'token'
// 密钥
const secrect = "q84o2y1m"

module.exports = {
  // 颁发jwt
  publish(res, info = {}, maxAge = 60 * 60 * 1000) {
    // 创建token
    const token = jwt.sign(info, secrect, {
      expiresIn: maxAge
    })
    res.header("authorization", token);
    // 添加到cookie
    res.cookie(cookieKey, token, {
      maxAge,
      domain: 'localhost',
      path: '/'
    })
  },
  // 解析jwt
  verify(req) {
    // 获取cookie
    let token = req.cookies.token;
    if (!token) {
      //没有token
      token = req.headers.authorization;
      if (!token) {
        return null;
      }
    }

    let msg;
    // 解析是否是authorization传递jwt
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];

    try {
      msg = jwt.verify(token, secrect)
    } catch {
      msg = null
    }
    return msg
  }
}