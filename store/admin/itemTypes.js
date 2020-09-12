export const state = () => ({
  types: null
})

export const mutations = {
  setTypes (state, types) {
    state.types = types
  },
  addType (state, type) {
    state.types.push(type)
  }
}

export const actions = {
  async loadTypes ({ commit }) {
    const types = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/item-types`)
    commit('setTypes', types.data)
  },
  async createType ({ commit }, data) {
    try {
      const type = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/create-item-type`, data)
      commit('addType', type.data)
      return type
    } catch (e) {
      throw e.response.data
    }
  }
}

export const getters = {
  getAllTypes: state => state.types
}
