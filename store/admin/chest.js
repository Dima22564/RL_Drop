export const state = () => ({
  chests: null
})

export const mutations = {
  setChests (state, chests) {
    state.chests = chests
  },
  deleteChestById (state, id) {
    state.chests = state.chests.filter((item) => {
      return item.id !== id
    })
  }
}

export const actions = {
  async creteChest ({ commit }, data) {
    try {
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/create-chest`, data)
      return result
    } catch (e) {
      throw e.response
    }
  },
  async loadAllChests ({ commit, rootGetters }) {
    this.$axios.setToken(rootGetters.getToken, 'Bearer')
    const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/chests-list`)
    commit('setChests', result.data)
  },
  async deleteChest ({ commit }, id) {
    try {
      const result = await this.$axios.$delete(`${this.$axios.defaults.baseURL}/admin/delete-chest/${id}`)
      if (result.success) {
        commit('deleteChestById', id)
      }
      return result
    } catch (e) {
      throw e.response
    }
  },
  async loadChest ({ rootGetters }, id) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      return await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/chest/${id}`)
    } catch (e) {

    }
  },
  async update ({ rootGetters }, data) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      return await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/chest/update/${data.get('id')}`, data)
    } catch (e) {

    }
  }
}

export const getters = {
  getAllChests: state => state.chests
}
