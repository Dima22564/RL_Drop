<template>
  <div class="form__inputs">
    <MyInput
      v-model="$v.userName.$model"
      :rightIcon="false"
      :leftIcon="false"
      name="userName"
      label="User Name"
      type="text"
      class="form__input"
      :error="Boolean(errorMessages.userName) || $v.userName.$error"
    >
      <template slot="error">
        <span v-if="errorMessages.userName">{{ errorMessages.userName }}</span>
        <span v-if="!$v.userName.required && $v.$error">Name required</span>
      </template>
    </MyInput>
    <MyInput
      v-model="$v.email.$model"
      :rightIcon="false"
      :leftIcon="false"
      name="email"
      label="Email"
      type="text"
      class="form__input"
      :error="Boolean(errorMessages.email) || $v.email.$error"
    >
      <template slot="error">
        <span v-if="errorMessages.email">{{ errorMessages.email }}</span>
        <span v-if="!$v.email.required && $v.email.$error">Password required</span>
        <span v-if="!$v.email.email && $v.email.$error">Field email should be a valid email</span>
      </template>
    </MyInput>
    <MyInput
      v-model="phoneNumber"
      :rightIcon="false"
      :leftIcon="false"
      name="phoneNumber"
      label="Phone Number"
      type="text"
      class="form__input"
    />
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import { eventBus } from '~/plugins/event-bus'

export default {
  data () {
    return {
      userName: '',
      phoneNumber: '',
      email: '',
      errorMessages: {
        userName: null,
        email: null
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    userName: {
      required
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  created () {
    eventBus.$on('sendPersonalSettings', async () => {
      this.$store.commit('settings/toggleButtonState', true)
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = new FormData()
        data.append('name', this.userName)
        data.append('email', this.email)
        data.append('phone_number', this.phoneNumber)
        try {
          const result = await this.$store.dispatch('settings/updateSettings', data)
          if (result.success) {
            this.$bvToast.toast(result.message, {
              title: `Notification`,
              variant: 'primary',
              solid: true
            })
          } else {
            this.$bvToast.toast('Something goes wrong!', {
              title: `Notification`,
              variant: 'danger',
              solid: true
            })
          }
        } catch (e) {
          if (e.data.error.messages.name) {
            this.errorMessages.userName = e.data.error.messages.name[0]
          }
          if (e.data.error.messages.email) {
            this.errorMessages.email = e.data.error.messages.email[0]
          }
        } finally {
          this.$store.commit('settings/toggleButtonState', false)
        }
      } else {
        this.$store.commit('settings/toggleButtonState', false)
      }
    })
    this.setUser()
  },
  methods: {
    setUser () {
      if (this.getUser) {
        this.email = this.getUser.email
        this.userName = this.getUser.name
        this.phoneNumber = this.getUser.phoneNumber || ''
      }
    }
  }
}
</script>
