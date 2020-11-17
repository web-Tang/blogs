// 处理错误中间件
module.exports = (err, req, res, next) => {
  if (err) {
    const errObj = err instanceof Error ? err.message : err;
    res.status(500).send({
      code: 500,
      msg: errObj
    });
  } else {
    next()
  }
}
