// 防止异常
module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send({
        code: 200,
        msg: "",
        data: result,
      });
    } catch (error) {
      next(error)
    }
  }
}