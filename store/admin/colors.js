export const state = () => ({
  types: null,
  itemColors: []
})

export const mutations = {
  setTypes (state, types) {
    state.types = types
  },
  addType (state, type) {
    state.types.push(type)
  },
  setColors (state, colors) {
    state.itemColors = colors
  }
}

export const actions = {
  async loadTypes ({ commit, rootGetters }) {
    this.$axios.setToken(rootGetters.getToken, 'Bearer')
    const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/item-types`)
    commit('setTypes', result.data.itemTypes)
    commit('setColors', result.data.itemColors)
  },
  async createType ({ commit, rootGetters }, data) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const type = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/create-item-type`, data)
      commit('addType', type.data)
      return type
    } catch (e) {
      throw e.response.data
    }
  }
}

export const getters = {
  getAllTypes: state => state.types,
  getColors: state => state.itemColors
}
