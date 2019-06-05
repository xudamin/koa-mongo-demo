import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  token: window.sessionStorage.getItem('token'),
  username: ''
}

const mutations = {
  LOGIN: (state, data) => {
    state.token = data
    window.sessionStorage.setItem('token')
  },
  LOGOUT: (state) => {
    state.token = null
    window.sessionStorage.removeItem('token')
  },
  USERNAME: (state, data) => {
    state.username = data
    window.sessionStorage.setItem('username')
  }
}

const actions = {
  UserLogin({
    commit
  }, data) {
    commit('LOGIN', data)
  },
  UserLogout({
    commit
  }) {
    commit('LOGOUT')
  },
  UserName({
    commit
  }, data) {
    commit('USERNAME', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
