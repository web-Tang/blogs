const fs = require('fs')
const path = require('path')

require('./router/init')

// 创建upload文件夹
const newPath = path.resolve(__dirname, 'upload')

if (!fs.existsSync(newPath)) {
  fs.mkdir(newPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  console.log('文件夹创建成功');
  return
}
