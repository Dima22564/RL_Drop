export const actions = {
  async sendEmailForPasswordReset ({ rootGetters, commit }, data) {
    try {
      const result = await this.$axios.post(`${this.$axios.defaults.baseURL}/reset-password`, data)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }
}
