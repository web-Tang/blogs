import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5008";

const a_key = 'token'
axios.interceptors.request.use(rep => {
  const token = localStorage.getItem(a_key)
  if (token) {
    rep.headers.authorization = "bearer " + token
  }
  return rep
})

axios.interceptors.response.use(resp => {
  let authorization;
  if (resp.headers) {
    authorization = resp.headers.authorization;
  }
  if (authorization) {
    localStorage.setItem(a_key, authorization)
  }
  return resp.data
})
export default axios
