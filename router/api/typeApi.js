const express = require('express')
const { addType, deleteType, updataType, allType } = require('../../services/TypeServices')
const typeRouter = express.Router()

typeRouter.get('/add', async (req, res) => {
  const query = req.query
  const result = await addType(query.name)
  return res.send({
    code: 200,
    data: result
  })
})

typeRouter.get('/delete', async (req, res) => {
  const query = req.query
  const result = await deleteType(query.id)
  return res.send({
    code: 200,
    data: result
  })
})

typeRouter.get('/update', async (req, res) => {
  const query = req.query
  const result = await updataType(query.id, query.name)
  return res.send({
    code: 200,
    data: result
  })
})

typeRouter.get('/all', async (req, res) => {
  const query = req.query
  console.log(query)
  const result = await allType(query)
  return res.send({
    code: 200,
    data: result
  })
})

module.exports = typeRouter