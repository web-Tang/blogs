const Articles = require('../model/Articles')
const Users = require('../model/Users')
const Reverts = require('../model/Reverts')
const { allType } = require('./TypeServices')
const { readNum, addRecord } = require('./HistorysServices')
const { $sort, changeDate, changeArr } = require('../util/index')
const { artReverts } = require('./RevertsServices')
const { Op } = require('sequelize')

/* 添加文章 */
async function artAdd({ id, title, html, coverUrl, md, form, articleState, UserId, tags } = {}) {
  tags = tags.map(item => item.id).join('&')
  const options = {
    title,
    html,
    md,
    coverUrl,
    articleState,
    form,
    tags
  }
  // 判断id是否存在，存在修改，不存在则添加
  if (id) {
    options.id = id
    return artUpdate(options)
  } else {
    options.UserId = UserId
    const result = await Articles.create(options)
    if (result instanceof Articles) {
      // 返回实例对象
      return result.toJSON()
    }
    return false
  }
}

/* 更新文章 */
async function artUpdate({ id, title, tags, html, coverUrl, md, form, articleState } = {}) {
  tags = tags.map(item => item.id).join('&')
  const prams = {
    md,
    tags,
    title,
    html,
    form,
    coverUrl,
    articleState,
  }
  const result = await Articles.update(prams, {
    where: {
      id
    }
  })
  if (typeof result == "object" && result[0]) {
    return true
  }
  return false
}

/* 查询所有文章 */
async function artAll({ page = 1, limit = 10, title = '' } = {}) {
  const selectProp = {
    attributes: ['id', 'title', 'html', 'form', 'coverUrl', 'articleState', 'createdAt', 'updatedAt', 'UserId', 'tags'],
    offset: (page - 1) * 10,
    limit
  }
  if (title) {
    selectProp.where = {
      title: {
        [Op.like]: `%${title}%`
      }
    }
  }

  let result = await Articles.findAndCountAll(selectProp)
  if (result.length != 0) {
    result = changeArr(result)

    // 获取文章分类
    await getAllType(result.rows)

    const artIdArr = result.rows.map(item => {
      return { ArticleId: item.id }
    })
    // 获取文章浏览量
    const artReadCountArr = await readNum(artIdArr)
    result.rows.forEach(value => {
      // 获取浏览量
      const num = artReadCountArr.find((item) => item.ArticleId == value.id)
      value.readNum = num ? num.Count : 0
    })
  }
  return {
    count: title == '' ? result.count : result.rows.length,
    data: result.rows
  }
}

/* 删除文章 */
async function artDelete({ id }) {
  if (!id) {
    return false
  }
  const result = await Articles.destroy({
    where: {
      id
    }
  })
  if (result) {
    return true
  }
  return false
}

/*
  文章列表
  以发布时间为条件，倒叙获取前10条文章
*/
async function artList(page = 1) {
  Users.hasMany(Articles);
  Articles.belongsTo(Users)
  const limit = 10;
  const result = await Users.findAll({
    include: [{
      model: Articles,
      required: true,
      where: {
        articleState: 'publish',
        form: 1
      }
    }],
    subQuery: false,
    attributes: ['name', 'pictureUrl'],
    order: [[Articles, 'updatedAt', 'DESC']],
    offset: (page - 1) * 10,
    limit
  });

  let data = changeArr(result)
  if (data.length != 0) {
    const artIdArr = []
    data.forEach(item => {
      item.Articles.forEach(value => {
        artIdArr.push({ ArticleId: value.id })
      })
    })

    // 文章浏览总数
    const artReadCountArr = await readNum(artIdArr)

    const reg = /<[^>]+>/g
    const artArr = []
    data.forEach(items => {
      const articlesList = items.Articles
      const newArts = articlesList.map(value => {
        // 获取浏览量
        const num = artReadCountArr.find((item) => item.ArticleId == value.id)
        value.readNum = num ? num.Count : 0
        // 去除文本html标签
        const str = value.html.replace(reg, "")
        // 截取前300字符串返回页面
        value.html = str.slice(0, 300) + '...';
        value.updatedAt = changeDate(value.updatedAt);
        value.username = items.name;
        value.pictureUrl = items.pictureUrl
        return value
      })
      artArr.push(...newArts)
    })
    data = $sort(artArr)
  }
  return data
}

// 获取指定文章
async function showArt({ ArticleId }) {
  // 添加浏览记录
  let result = await addRecord(ArticleId)

  if (result) {
    // 查询文章
    result = await Articles.findOne({
      where: {
        id: ArticleId,
        articleState: 'publish',
        form: 1
      }
    })

    if (result.length != 0) {
      result = changeArr(result)

      await getAllType([result])

      result.updatedAt = changeDate(result.updatedAt);
    }
  }
  return result
}

/* 得到文章评论 */
async function getArtComment({ ArticleId, page = 1 } = {}) {
  const limit = 5
  let options = {
    attributes: ['visitorsName', 'content', 'updatedAt'],
    where: {
      ArticleId,
    },
    order: [['updatedAt', 'DESC']],
    offset: (page - 1) * limit,
    limit
  }

  const result = await artReverts(options)
  if (result.count != 0) {
    const artComment = changeArr(result.rows)
    result.rows = artComment.map(items => {
      items.updatedAt = changeDate(items.updatedAt);
      return items
    })
  }
  return result
}

/* 得到用户评论 */
async function getUserComment(ArticleId, useridList, page = 1) {
  Reverts.belongsTo(Users, { foreignKey: 'commentId', targetKey: 'id' })

  options = {
    include: [{
      model: Users,
      required: true,
      attributes: ['name', 'pictureUrl']
    }],
    subQuery: false,
    where: {
      [Op.and]: [{
        ArticleId
      }, {
        [Op.or]: useridList
      }]
    },
    offset: (page - 1) * 10,
    limit: page * 5,
  }

  const result = await artReverts(options)
  if (result.count != 0) {
    // 获取用户评论，用户名称，用户头像
    result.rows = changeArr(result.rows).map(items => {
      items.username = items.User.name
      items.pictureUrl = items.User.pictureUrl
      items.updatedAt = changeDate(items.updatedAt);
      delete items.User
      return items
    })
  }
  return result
}

// 获得全部类型
async function getAllType(result) {
  const types = await allType({}, { attributes: ['id', 'name'] })
  const typeArr = changeArr(types).data

  result.forEach(item => {
    if (item.tags) {
      item.tags = typeArr.filter(value => item.tags.split('&').find(key => key == value.id))
    } else {
      item.tags = []
    }
  })
}

module.exports = {
  artAdd,
  artUpdate,
  artAll,
  artDelete,
  artList,
  readNum,
  showArt,
  getArtComment
}