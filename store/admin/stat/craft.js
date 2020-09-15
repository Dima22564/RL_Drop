
export const state = () => ({
})

export const mutations = {
}

export const actions = {
  async loadCraftStats ({ rootGetters }, craft) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/stats/craft/${craft}`)
      return result.data
    } catch (e) {
      throw e.response
    }
  }
}

export const getters = {
}
