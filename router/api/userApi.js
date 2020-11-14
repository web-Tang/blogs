const express = require('express')
const { userVerify, updateUser, userObj } = require('../../services/UserServices')
const userRouter = express.Router()
const { publish } = require('../../util/jwt')

userRouter.post('/', async (req, res) => {
  const options = req.body
  const { id, state } = await userVerify(options.loginId, options.loginPwd)
  if (state) {
    // 设置cookie
    publish(res, { UserId: id })
  }
  
  res.send({
    code: 200,
    msg: '',
    data: state
  })
})

userRouter.put('/update', async (req, res) => {
  const options = req.body
  const result = await updateUser(options.id, options.obj)
  res.send({
    code: 200,
    msg: '',
    data: result
  })
})

userRouter.get('/', async (req, res) => {
  const UserId = req.tokenObj.UserId
  const result = await userObj(UserId)
  res.send({
    code: 200,
    msg: '',
    data: result
  })
})

module.exports = userRouter
