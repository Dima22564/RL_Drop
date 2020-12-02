export const state = () => ({
  users: [],
  roles: ['admin', 'messenger']
})

export const actions = {
  async getUsers ({ commit, rootGetters }) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      const result = await this.$axios.$get(`${this.$axios.defaults.baseURL}/admin/users`)
      commit('setUsers', result.data.users)
      commit('setRoles', result.data.roles)
      return result
    } catch (e) {
      throw e.response.data
    }
  },
  async changeRole ({ commit, rootGetters }, payload) {
    this.$axios.setToken(rootGetters.getToken, 'Bearer')
    try {
      let result
      if (payload.type === 'remove') {
        result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/users/remove-role`, payload)
      } else if (payload.type === 'add') {
        result = await this.$axios.$post(`${this.$axios.defaults.baseURL}/admin/users/add-role`, payload)
      }
      commit('setUsers', result.data.users)
    } catch (e) {
      throw e.response
    }
  }
}

export const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  setRoles (state, roles) {
    state.roles = roles
  }
}

export const getters = {
  getUsers: state => state.users,
  getRoles: state => state.roles
}
