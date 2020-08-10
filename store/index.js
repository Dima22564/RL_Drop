import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

export const state = () => ({
  user: null,
  token: null,
  tokenExpireDate: '',
  lang: 'en',
  errors: null,
  disabledBtn: false
})

export const mutations = {
  setToken (state, token) {
    state.token = token
    state.tokenExpireDate = jwt.decode(token).exp
  },
  deleteToken (state) {
    state.token = null
  },
  setUser (state, user) {
    state.user = user
  },
  deleteUser (state) {
    state.user = null
  },
  changeUser (state, data) {
    state.user.email = data.email
    state.user.name = data.name
    state.user.phoneNumber = data.phoneNumber
  },
  setErrors (state, errors) {
    state.errors = errors
  },
  deleteErrors (state, errors) {
    state.errors = null
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch, getters, commit }) {
    try {
      dispatch('autoLogin')
      if (getters.getToken) {
        await dispatch('getUser', getters.getToken)
        commit('2fa/set2faSecret', getters.getUser.passwordSecurity
          .google2fa_secret)
        dispatch('2fa/generateOneTimePassword', getters['2fa/get2faSecret'])
      }
    } catch (e) {
      console.log(e)
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('token', token)
  },
  async logOut ({ commit, getters }) {
    this.$axios.setToken(getters.getToken, 'Bearer')
    const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/logout`)
    commit('deleteToken')
    commit('2fa/delete2faImg')
    commit('deleteUser')
    commit('2fa/toggle2fa', null)
    commit('2fa/set2faCode', null)
    commit('2fa/set2faSecret', null)
    Cookies.remove('token')
    return result
  },
  async getUser ({ commit, dispatch }, token) {
    try {
      this.$axios.setToken(token, 'Bearer')
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/user`, { token })
      commit('setUser', result.data.user)
      if (result.success) {
        commit('setUser', result.data.user)
        if (result.data.user.passwordSecurity.google2fa_enable) {
          commit('2fa/toggle2fa', result.data.user.passwordSecurity.google2fa_enable)
          commit('2fa/set2faImg', result.data.google2fa_url)
        }
      }
    } catch (e) {
      console.log(e.response.data)
    }
  },
  autoLogin ({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies.token

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logOut')
    }
  },
  async register ({ dispatch }, data) {
    try {
      return await this.$axios.$post(`${this.$axios.defaults.baseURL}/register`, data)
    } catch (e) {
      throw e.response
    }
  },
  async preLogin ({ dispatch, commit }, formData) {
    try {
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/login`, formData)
      if (result.data.success && result.data.google2faEnable) {
        commit('2fa/toggle2fa', true)
      } else if (result.success && result.data.user.passwordSecurity.google2faEnable) {
        commit('2fa/toggle2fa', true)
      } else if (result.success && !result.data.user.passwordSecurity.google2faEnable) {
        dispatch('setToken', result.data.access_token)
        commit('setUser', result.data.user)
      }
      return result
    } catch (e) {
      throw e.response
    }
  },
  async loginWith2fa ({ dispatch, commit, getters }, formData) {
    const result = await dispatch('2fa/verify2fa', formData)
    if (result.success && result.data.loggedIn) {
      dispatch('setToken', result.data.access_token)
      commit('setUser', result.data.user)
      commit('2fa/set2faImg', result.data.twofaImg)
      commit('2fa/set2faSecret', result.data.user.passwordSecurity.google2fa_secret)
      dispatch('2fa/generateOneTimePassword', getters['2fa/get2faSecret'])
    }
    return result
  }
}

export const getters = {
  getToken: state => state.token,
  getExpireDate: state => state.tokenExpireDate,
  getUser: state => state.user,
  getErrors: state => state.errors,
  getBtnState: state => state.disabledBtn
}

function isJWTValid (token) {
  if (!token) {
    return false
  }

  const jwtData = jwt.decode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
