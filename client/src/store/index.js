import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    userdata: null,
    loginLoding: false
  },
  mutations: {
    setData(state, payload) {
      // 写入用户数据
      state.userdata = {
        ...state.userdata,
        ...payload
      }
    },
    chengeLoding({ loginLoding }, status) {
      loginLoding = status
    },
    changePortraitUrl({ userdata }, newUrl) {
      // 改变头像路径
      Vue.set(userdata, 'pictureUrl', newUrl)
    }
  },
  actions: {
    // 用户登录
    async login({ commit }, login) {
      commit('chengeLoding', true)

      const resp = await api.login(login);
      commit('setData', resp.data)

      commit('chengeLoding', false)
      return resp.data;
    },
    // 获取用户身份信息
    async userObj({ commit }) {
      try {
        const resp = await api.userObj()
        commit('setData', resp.data)
      } catch {
        commit('setData', null)
      }
    },
    // 用户更新
    async userUpdate({ commit }, updateObj) {
      const resp = await api.userUpdate(updateObj)
      if (resp) {
        commit('setData', updateObj.obj)
      }
      return resp.data
    },
    // 用户退出
    loginOut({ commit }) {
      commit('setData', null)
      api.loginOut()
    }
  },
})
