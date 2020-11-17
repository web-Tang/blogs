const express = require('express')
const { artAdd, artAll, artDelete, artUpdate, artList, showArt, getArtComment } = require('../../services/ArticlesServices')
const { addComment } = require('../../services/RevertsServices')
const articlesRouter = express.Router()
const asyncHandler = require('../sendResult')

articlesRouter.post('/all', asyncHandler(async (req) => {
  const json = req.body
  return await artAll(json)
}))

articlesRouter.post('/create', asyncHandler(async (req) => {
  const json = req.body;
  return await artAdd(json)
}))

articlesRouter.get('/delete', asyncHandler(async (req) => {
  const query = req.query
  return await artDelete(query)
}))

articlesRouter.put('/update', asyncHandler(async (req) => {
  const json = req.body
  return await artUpdate(json)
}))

/* 以下为前台文章处理接口 */

// 获取文章列表
articlesRouter.get('/list', asyncHandler(async (req) => {
  const page = req.query.page;
  return await artList(page)
}))

// 获取指定文章信息
articlesRouter.get('/content', asyncHandler(async (req) => {
  const query = req.query;
  return await showArt(query)
}))

// 获得文章评论
articlesRouter.post('/comment', asyncHandler(async (req) => {
  const query = req.body;
  return await getArtComment(query)
}))

// 添加评论
articlesRouter.post('/addcomment', asyncHandler(async (req) => {
  const json = req.body;
  return await addComment(json)
}))

module.exports = articlesRouter