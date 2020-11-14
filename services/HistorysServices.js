const Historys = require('../model/Historys')
const db = require('../model/DB')
const { Op } = require('sequelize')
const { changeArr } = require('../util/index')

module.exports = {
  // 添加一条浏览记录
  async addRecord(ArticleId) {
    const result = await Historys.create({ ArticleId })
    if (result instanceof Historys) {
      return result.toJSON()
    }
    return false
  },
  // 查询指定文章的浏览记录
  async allRecord(ArticleId) {
    const result = await Historys.count({
      where: {
        ArticleId
      }
    })
    if (typeof result == "number") {
      return result
    }
    return null
  },
  // 获取浏览记录
  async readNum(artIdArr) {
    const Num = await Historys.findAll({
      where: {
        [Op.or]: artIdArr
      },
      group: 'ArticleId',
      attributes: [
        'ArticleId',
        [db.fn('COUNT', db.col('ArticleId')), 'Count'],
      ]
    })
    return changeArr(Num)
  }
}