const express = require('express')
const { userVerify, updateUser, userObj } = require('../../services/UserServices')
const userRouter = express.Router()
const { publish } = require('../../util/jwt')
const asyncHandler = require('../sendResult')

userRouter.post('/', asyncHandler(async (req, res) => {
  const options = req.body
  console.log(options)
  const { id, state } = await userVerify(options.loginId, options.loginPwd)
  if (state) {
    // 设置cookie
    publish(res, { UserId: id })
  }
  return state
}))

userRouter.put('/update', asyncHandler(async (req, res) => {
  const options = req.body
  return await updateUser(options.id, options.obj)
}))

userRouter.get('/', asyncHandler(async (req) => {
  const UserId = req.tokenObj.UserId;
  return await userObj(UserId)
}))

module.exports = userRouter
