const express = require('express')
const { addSentence, allSentence, oneSentence } = require('../../services/WitticismServices')
const WitticismRouter = express.Router()

WitticismRouter.post('/add', async (req, res) => {
  const json = req.body
  const result = await addSentence(json)
  res.send({
    code: 200,
    data: result
  })
})

WitticismRouter.get('/one', async (req, res) => {
  const result = await oneSentence()
  return res.send({
    code: 200,
    data: result
  })
})

WitticismRouter.get('/all', async (req, res) => {
  const query = req.query
  const result = await allSentence(query)
  return res.send({
    code: 200,
    data: result
  })
})

module.exports = WitticismRouter