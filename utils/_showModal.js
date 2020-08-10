export const showModal = (message, variant) => {
  return this.$bvToast.toast(message, {
    title: `Notification`,
    variant,
    solid: true
  })
}
