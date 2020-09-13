export const state = () => ({
  user: null,
  inventory: []
})

// noinspection SpellCheckingInspection
export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  changeUser (state, data) {
    state.user.email = data.email
    state.user.name = data.name
    state.user.phoneNumber = data.phoneNumber
  },
  deleteUser (state) {
    state.user = null
  },
  changeUserBalance (state, balance) {
    state.user.balance += balance
  },
  beautifyBalance (state, id) {
    state.user.balance = Number(state.user.balance.toFixed(2))
  },
  setInventory (state, inventory) {
    state.inventory = inventory
  }
}

export const actions = {
  async getUser ({ commit, dispatch, getters }, token) {
    try {
      this.$axios.setToken(token, 'Bearer')
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/user`, { token })
      commit('setUser', result.data.user)
      console.log(result)
      // commit('2fa/set2faSecret', getters.getUser.passwordSecurity
      //   .google2fa_secret, { root: true })
      // dispatch('2fa/generateOneTimePassword', getters['2fa/get2faSecret'], { root: true })
      if (result.success) {
        commit('setUser', result.data.user)
        if (result.data.user.passwordSecurity.google2fa_enable) {
          commit('2fa/toggle2fa', result.data.user.passwordSecurity.google2fa_enable)
          commit('2fa/set2faImg', result.data.google2fa_url)
        }
      }
    } catch (e) {
      console.log(e.response.data)
      //  TODO remove console statement
    }
  },
  async loadInventory ({ commit, rootGetters }) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/inventory`)
      commit('setInventory', result.data.inventory)
      return result
    } catch (e) {
      console.log(e.response)
      throw e.response
      //  TODO remove console statement
    }
  }
}

export const getters = {
  getUser: state => state.user,
  getInventory: state => state.inventory
}
