const express = require('express')
const { addType, deleteType, updataType, allType } = require('../../services/TypeServices')
const typeRouter = express.Router()
const asyncHandler = require('../sendResult')

typeRouter.get('/add',asyncHandler( async (req, res) => {
  const query = req.query
  const result = await addType(query.name)
  return res.send({
    code: 200,
    data: result
  })
}))

typeRouter.get('/delete',asyncHandler( async (req, res) => {
  const query = req.query
  const result = await deleteType(query.id)
  return res.send({
    code: 200,
    data: result
  })
}))

typeRouter.get('/update',asyncHandler( async (req, res) => {
  const query = req.query
  const result = await updataType(query.id, query.name)
  return res.send({
    code: 200,
    data: result
  })
}))

typeRouter.get('/all',asyncHandler( async (req, res) => {
  const query = req.query
  const result = await allType(query)
  return res.send({
    code: 200,
    data: result
  })
}))

module.exports = typeRouter