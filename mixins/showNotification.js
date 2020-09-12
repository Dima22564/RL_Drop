export default {
  methods: {
    showNotification (text, type) {
      this.$bvToast.toast(text, {
        title: `Notification`,
        variant: type,
        solid: true
      })
    }
  }
}
