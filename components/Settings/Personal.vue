<template>
  <div class="form__inputs">
    <MyInput
      v-model="userName"
      :rightIcon="false"
      :leftIcon="false"
      name="userName"
      label="User Name"
      type="text"
      class="form__input"
    />
    <MyInput
      v-model="email"
      :rightIcon="false"
      :leftIcon="false"
      name="email"
      label="Email"
      type="text"
      class="form__input"
    />
  </div>
</template>

<script>
import { eventBus } from '../../plugins/event-bus'
export default {
  data () {
    return {
      userName: '',
      phoneNumber: '',
      email: ''
    }
  },
  mounted () {
    eventBus.$on('sendPersonalSettings', () => {
      this.$store.dispatch('personal/actionEmail', this.email)
    })
  }
}
</script>
