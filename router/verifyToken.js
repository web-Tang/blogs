const { verify } = require('../util/jwt')
const visitRequest = require('./visitRequest')

// 进行token验证
module.exports = (req, res, next) => {
  const reg = /^\/upload\//
  if (req.path.match(reg)) {
    next()
    return
  }
  // 验证是否为不需要cookie的请求
  let result = visitRequest.filter(item => {
    return item.method == req.method && item.path == req.path
  })

  // 不需要验证
  if (result.length != 0) {
    next()
    return
  }

  // 需要验证
  result = verify(req)
  if (!result) {
    console.log('未获取到token')
    handleNonken(req, res)
    return
  }
  req.tokenObj = result
  next()
}

function handleNonken(req, res) {
  res.send({
    code: 200,
    msg: '未登录无法进行请求'
  })
}