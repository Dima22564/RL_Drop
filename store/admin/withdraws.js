export const state = () => ({
  withdraws: []
})

export const actions = {
  async getWithdraws ({ commit, rootGetters }) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/withdraws`)
      commit('setWithdraws', result.data.withdraws)
      return result
    } catch (e) {
      throw e.response.data
    }
  },
  async take ({ commit, rootGetters }, payload) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const data = new FormData()
      data.append('withdrawId', payload.withdrawId)
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/withdraws/take`, data)
      commit('setWithdraws', result.data.withdraws)
    } catch (e) {
      throw e.response
    }
  },
  async deny ({ commit, rootGetters }, payload) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const data = new FormData()
      data.append('withdrawId', payload.withdrawId)
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/withdraws/deny`, data)
      commit('setWithdraws', result.data.withdraws)
    } catch (e) {
      throw e.response
    }
  },
  async withdraw ({ commit, rootGetters }, payload) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const data = new FormData()
      data.append('withdrawId', payload.withdrawId)
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/withdraws/withdraw`, data)
      commit('setWithdraws', result.data.withdraws)
    } catch (e) {
      throw e.response
    }
  }
}

export const mutations = {
  setWithdraws (state, withdraws) {
    state.withdraws = withdraws
  }
}

export const getters = {
  getWithdraws: state => state.withdraws
}
