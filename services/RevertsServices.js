const Reverts = require('../model/Reverts')

module.exports = {
  // 查询文章回复
  async artReverts(options) {
    const result = await Reverts.findAndCountAll(options)
    return result
  },
  // 添加文章评论
  async addComment({ ArticleId, content, visitorsName }) {
    const result = await Reverts.create({ ArticleId, content, visitorsName });
    if (result instanceof Reverts) {
      return true
    }
    return false
  }
}
