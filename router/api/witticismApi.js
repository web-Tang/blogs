const express = require('express')
const { addSentence, allSentence, oneSentence } = require('../../services/WitticismServices')
const WitticismRouter = express.Router()
const asyncHandler = require('../sendResult')

WitticismRouter.post('/add', asyncHandler(async (req, res) => {
  const json = req.body
  return await addSentence(json)
}))

WitticismRouter.get('/one', asyncHandler(async (req, res) => {
  return await oneSentence()
}))

WitticismRouter.get('/all', asyncHandler(async (req, res) => {
  const query = req.query
  return await allSentence(query)
}))

module.exports = WitticismRouter