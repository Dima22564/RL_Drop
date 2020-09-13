
export const state = () => ({
})

export const mutations = {
}

export const actions = {
  async loadSalesStats (ctx) {
    try {
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/stats/sales/`)
      console.log(result)
      return result.data
    } catch (e) {
      throw e.response
    }
  }
}

export const getters = {
}
