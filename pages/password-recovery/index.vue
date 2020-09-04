<template>
  <div class="registerPage registerPage_signIn">
    <img src="/images/password-bg.png" alt="" class="registerPage__bg">
    <b-container>
      <b-row>
        <b-col
          xl="6"
          offset-xl="6"
          lg="6"
          offset-lg="6"
          md="7"
          offset-md="5"
        >
          <h1 class="registerPage__title">
            Forgot Password?
          </h1>
          <p class="regForm__text regForm__text_big">
            Enter the email address you used and we’ll send you instructions to reset your password.
          </p>
          <form action="" class="regForm" @submit.prevent="onSubmit">
            <MyInput
              v-model="email"
              :rightIcon="false"
              :leftIcon="false"
              type="text"
              name="email"
              label="Email"
              class="regForm__input"
              :error="Boolean(errorMessage)"
            >
              <template slot="error">
                <span v-if="errorMessage">{{ errorMessage }}</span>
              </template>
            </MyInput>

            <div class="regForm__bottom">
              <p class="regForm__text">
                Not a member? <nuxt-link to="/sign-up" class="regForm__emp" tag="span">
                  Sign Up Now
                </nuxt-link>
              </p>
              <button type="submit" class="btn btn_primary">
                Send Instructions
              </button>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>/* eslint-disable */
  import { showModal } from '../../utils/_showModal'

export default {
  layout: 'register',
  data () {
    return {
      email: '',
      errorMessage: null
    }
  },
  methods: {
    async onSubmit () {
      try {
        const formData = new FormData()
        formData.append('email', this.email)
        const result = await this.$store.dispatch('password/sendEmailForPasswordReset', formData)
        if (result.success) {
          this.$bvToast.toast('Email sent!', {
            title: `Notification`,
            variant: 'primary',
            solid: true
          })
          this.errorMessage = null
        }
      } catch (e) {
        this.errorMessage = e.data.message || e.data.error.messages[0]
      }
    }
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'

</style>
