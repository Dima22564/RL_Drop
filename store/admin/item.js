export const state = () => ({
  items: []
})

export const actions = {
  async createItem ({ commit, rootGetters }, data) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/create-item`, data)
      return result
    } catch (e) {
      throw e.response.data
    }
  },
  async loadChestsItems ({ commit, rootGetters }) {
    this.$axios.setToken(rootGetters.getToken, 'Bearer')
    const items = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/items-for-chests`)
    commit('setItems', items.data)
  },
  async loadAllItems ({ commit, rootGetters }) {
    this.$axios.setToken(rootGetters.getToken, 'Bearer')
    const items = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/items-all`)
    commit('setItems', items.data)
  },
  async deleteItem ({ commit, rootGetters }, id) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$delete(`${this.$axios.defaults.baseURL}/admin/delete-item/${id}`)
      if (result.success) {
        commit('deleteItemById', id)
      }
      return result
    } catch (e) {
      throw e.response
    }
  },
  async loadItem ({ rootGetters }, id) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      return await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/item/${id}`)
    } catch (e) {

    }
  },
  async update ({ rootGetters }, data) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      return await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/item/update/${data.get('id')}`, data)
    } catch (e) {

    }
  }
}

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  deleteItemById (state, id) {
    state.items = state.items.filter((item) => {
      return item.id !== id
    })
  }
}

export const getters = {
  getAllItems: state => state.items
}
