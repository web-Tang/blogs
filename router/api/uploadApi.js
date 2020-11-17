const express = require('express')
const uploadRouter = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { updateUser } = require('../../services/UserServices')
const asyncHandler = require('../sendResult')

// 保存key值
let fieldname;

// 设置保存路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 判断用户上传文件
    fieldname = file.fieldname

    cb(null, path.resolve(__dirname, '../../upload'))
  },
  filename: function (req, file, cb) {
    const timeStamp = Date.now();
    const randomStr = Math.random().toString(36).slice(-6)
    // 得到后缀名
    const ext = path.extname(file.originalname)
    cb(null, timeStamp + '-' + randomStr + ext)
  }
})

const upload = multer({ storage: storage })

// 处理上传文件
uploadRouter.post('/transfer', asyncHandler(upload.fields([{ name: 'upload' }, { name: 'portrait' }]), async (req, res) => {
  const files = req.files[fieldname][0]
  const target = path.join('upload')

  const responseObj = {
    code: 200,
    msg: '上传成功',
  }

  const reg = /\\/g
  let filePath = path.join(target, files.filename)
  filePath = filePath.replace(reg, '/') // 将斜杠转换为反斜杠

  responseObj.data = filePath

  // 不同上传文件
  if (fieldname == 'portrait') {
    const body = JSON.parse(JSON.stringify(req.body))
    const result = await updateUser(body.fileId, filePath)
    if (!result) {
      responseObj.msg = '上传失败'
      responseObj.data = null
      // 数据库添加失败时删除本地文件
      deleteFile(filePath)
    }
  }
  res.send(responseObj)
}))

// 删除本地文件
uploadRouter.post('/delete', asyncHandler((req) => {
  const body = req.body
  deleteFile(body.urlname)
}))

// 获取图片
uploadRouter.get('/:url', asyncHandler((req, res, next) => {
  var options = {
    root: path.join(__dirname, '../../upload'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.url
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
}))

/* 删除指定路径文件 */
function deleteFile(fileName) {
  const basename = path.basename(fileName)
  const newFileUrl = path.resolve(__dirname, path.join('../../upload', basename))
  fs.unlink(newFileUrl, (err) => {
    if (err) throw err;
    console.log('文件已被删除');
  });
}

module.exports = uploadRouter