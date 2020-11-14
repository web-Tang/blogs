// 不需要cookie的请求路径信息
module.exports = [
  {
    method: "POST",
    path: '/user',
  },
  {
    method: "POST",
    path: '/articles/comment',
  },
  {
    method: "POST",
    path: '/articles/addcomment',
  },
  {
    method: "GET",
    path: '/articles/content',
  },
  {
    method: "GET",
    path: '/articles/list',
  },
  {
    method: "GET",
    path: '/upload',
  }
]