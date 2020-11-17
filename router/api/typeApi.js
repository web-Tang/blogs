const express = require('express')
const { addType, deleteType, updataType, allType } = require('../../services/TypeServices')
const typeRouter = express.Router()
const asyncHandler = require('../sendResult')

typeRouter.get('/add',asyncHandler( async (req, res) => {
  const query = req.query
  return await addType(query.name)
}))

typeRouter.get('/delete',asyncHandler( async (req, res) => {
  const query = req.query
  return await deleteType(query.id)
}))

typeRouter.get('/update',asyncHandler( async (req, res) => {
  const query = req.query
  return await updataType(query.id, query.name)
}))

typeRouter.get('/all',asyncHandler( async (req, res) => {
  const query = req.query
  return await allType(query)
}))

module.exports = typeRouter