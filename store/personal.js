export const state = () => ({
  email: ''
})

export const mutations = {
  changeEmail (state, email) {
    state.email = email
  }
}

export const actions = {
  actionEmail ({ commit }, email) {
    commit('changeEmail', email)
  }
}

export const getters = {
}
