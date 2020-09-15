
export const state = () => ({
})

export const mutations = {
}

export const actions = {
  async itemTypes ({ commit, rootGetters }) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/stats/item-types`)
      return result
    } catch (e) {
      throw e.response
    }
  }
}

export const getters = {
}
