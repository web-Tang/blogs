const express = require('express')
const { artAdd, artAll, artDelete, artUpdate, artList, showArt, getArtComment } = require('../../services/ArticlesServices')
const { addComment } = require('../../services/RevertsServices')
const articlesRouter = express.Router()
const asyncHandler = require('../sendResult')

articlesRouter.post('/all',asyncHandler( async (req, res) => {
  const json = req.body
  const result = await artAll(json)
  return res.send({
    code: 200,
    data: result
  })
}))

articlesRouter.post('/create',asyncHandler( async (req, res) => {
  const json = req.body;
  const result = await artAdd(json)
  return res.send({
    code: 200,
    data: result
  })
}))

articlesRouter.get('/delete',asyncHandler( async (req, res) => {
  const query = req.query
  const result = await artDelete(query)
  return res.send({
    code: 200,
    data: result
  })
}))

articlesRouter.put('/update',asyncHandler( async (req, res) => {
  const json = req.body
  const result = await artUpdate(json)
  return res.send({
    code: 200,
    data: result
  })
}))

/* 以下为前台文章处理接口 */

// 获取文章列表
articlesRouter.get('/list',asyncHandler( async (req, res) => {
  const page = req.query.page;
  const result = await artList(page)
  return res.send({
    code: 200,
    data: result
  })
}))

// 获取指定文章信息
articlesRouter.get('/content',asyncHandler( async (req, res) => {
  const query = req.query;
  const result = await showArt(query)
  return res.send({
    code: 200,
    data: result
  })
}))

// 获得文章评论
articlesRouter.post('/comment',asyncHandler( async (req, res) => {
  const query = req.body;
  const result = await getArtComment(query)
  return res.send({
    code: 200,
    data: result
  })
}))

// 添加评论
articlesRouter.post('/addcomment',asyncHandler( async (req, res) => {
  const json = req.body;
  const result = await addComment(json)
  return res.send({
    code: 200,
    data: result
  })
}))

module.exports = articlesRouter