const Type = require('../model/Types')
const { changeArr } = require('../util/index')

module.exports = {
  async addType(name) {
    const result = await Type.create({ name });
    if (result instanceof Type) {
      return true
    }
    return false
  },
  async deleteType(id) {
    const result = await Type.destroy({
      where: {
        id
      }
    })
    if (result) {
      return true
    }
    return false
  },
  async updataType(condition, content) {
    const result = await Type.update({
      name: content
    }, {
      where: {
        id: condition
      }
    })
    if (typeof result == "object" && result[0]) {
      return true
    }
    return false
  },
  async allType({ page, limit } = {}, { attributes } = {}) {
    const options = {}
    if (page) {
      page = page <= 0 ? 1 : parseInt(page)
      options.offset = (page - 1) * limit
    }
    if (limit) {
      options.limit = parseInt(limit)
    }
    if (attributes) {
      options.attributes = attributes
    }
    const result = await Type.findAndCountAll(options)
    const data = changeArr(result)
    return {
      count: data.count,
      data: data.rows
    }
  }
}