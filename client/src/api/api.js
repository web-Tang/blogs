import axios from '../axios/request'

export default {
  // 用户登录
  login(params) {
    return axios.post('/user', params)
  },
  // 用户退出
  loginOut() {
    localStorage.removeItem("token");
  },
  // 获取用户信息
  async userObj() {
    return await axios.get('/user')
  },
  // 用户更新
  async userUpdate(params) {
    return await axios.put('/user/update', params)
  },
  // 文件上传
  async uploadTransfer(params) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    }
    return await axios.post('/upload/transfer', params, config)
  },
  // 文件删除
  async uploadDelete(params) {
    return await axios.post('/upload/delete', params)
  },
  // 文章更新
  async articlesUpdate(params) {
    return await axios.put("/articles/update", params)
  },
  // 文章创建
  async articlesCreate(params) {
    return await axios.post("/articles/create", params)
  },
  // 文章删除
  async articlesDelete({ id }) {
    return await axios.get(`/articles/delete?id=${id}`)
  },
  // 获取指定文章信息
  async articlesContent({ ArticleId }) {
    return await axios.get(`/articles/content?ArticleId=${ArticleId}`)
  },
  // 获取全部文章信息
  async articlesAll(params) {
    return await axios.post("/articles/all", params)
  },
  // 获取文章展示列表
  async articlesList(query) {
    let url = '/articles/list'
    if (query) {
      url += `?page=${query.page}`
    }
    return await axios.get(url)
  },
  // 获取文章评论
  async articlesComment(params) {
    return await axios.post(`/articles/comment`, params)
  },
  // 添加文章评论
  async articlesAddComment(params) {
    return await axios.post("/articles/addcomment", params)
  },
  // 获取全部类型/标签
  async typeAll(query) {
    let url = '/type/all'
    if (query) {
      url += `?page=${query.page}&limit=${query.limit}`
    }
    return await axios.get(url)
  },
  // 类型/标签删除
  async typeDelete({ id }) {
    return await axios.get(`/type/delete?id=${id}`)
  },
  // 添加类型
  async typeAdd({ name }) {
    return await axios.get(`/type/add?name=${name}`)
  },
  // 更新类型
  async typeUpdate({ id, name }) {
    return await axios.get(`/type/update?id=${id}&name=${name}`)
  },
  // 获取每日格言
  async witticismOne() {
    return await axios.get('/witticism/one')
  }
}