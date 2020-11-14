const Witticism = require('../model/Witticisms')
const { random, changeArr } = require('../util/index')

// 获取每日格言
module.exports = {
  async addSentence({ sentence = '', author = '' }) {
    const result = await Witticism.create({ sentence, author })
    if (result instanceof Witticism) {
      return true
    }
    return false
  },
  async allSentence({ page = 1, limit = 10 }) {
    const result = await Type.findAndCountAll({
      offset: (page - 1) * 10,
      limit
    })
    const data = changeArr(result)
    return {
      count: data.count,
      data: data.rows
    }
  },
  async oneSentence() {
    const result = await Witticism.findAll({
      attributes: ['id', 'sentence', 'author']
    })
    const newResult = changeArr(result)
    const index = random(newResult.length - 1, newResult[0].id)
    const sentence = newResult.find((item) => {
      return item.id == index
    })
    return sentence
  }
}
