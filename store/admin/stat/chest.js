
export const state = () => ({
})

export const mutations = {
}

export const actions = {
  async loadChestStats () {
    try {
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/stats/chest`)
      return result.data
    } catch (e) {
      throw e.response
    }
  },
  async loadOpenedChestsBetweenTime (ctx, data) {
    try {
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/stats/chest-stats-between-time`, data)
      return result
    } catch (e) {
      throw e.response
    }
  }
}

export const getters = {
}
