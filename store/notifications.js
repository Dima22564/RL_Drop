export const state = () => ({
  notifications: []
})

export const mutations = {
  deleteNotification (state, id) {
    state.notifications = state.notifications.filter(item => item.id !== id)
  },
  addNotification (state, notification) {
    state.notifications.unshift(notification)
  },
  setNotifications (state, notifications) {
    state.notifications = notifications
  }
}

export const actions = {
  async readNotification ({ rootGetters }, id) {
    try {
      this.$axios.setToken(rootGetters.getToken, 'Bearer')
      await this.$axios.$get(`${this.$axios.defaults.baseURL}/read-notification/${id}`)
    } catch (e) {
    }
  }
}

export const getters = {
  getNotifications (state) {
    return state.notifications
  }
}
