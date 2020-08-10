<template>
  <div class="registerPage">
    <img src="/images/sign-up-bg.png" alt="" class="registerPage__bg">
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
            Sign Up
          </h1>
          <form @submit.prevent="register" action="" class="regForm">
            <MyInput
              v-model="userName"
              :rightIcon="false"
              :leftIcon="false"
              name="Name"
              label="User name"
              type="text"
              class="regForm__input"
            />
            <MyInput
              v-model="email"
              :rightIcon="false"
              :leftIcon="false"
              name="email"
              label="Email"
              type="text"
              class="regForm__input"
            />
            <MyInput
              v-model="password"
              :rightIcon="false"
              :leftIcon="false"
              name="password"
              label="Password"
              type="text"
              class="regForm__input"
            />
            <MyInput
              v-model="confirmPassword"
              :rightIcon="false"
              :leftIcon="false"
              name="confirmPassword"
              label="Confirm password"
              type="text"
              class="regForm__input"
            />

            <div class="checkbox regForm__checkbox">
              <input id="privacy" v-model="acceptPolicy" type="checkbox" name="privacy" class="checkbox__input">
              <label for="privacy" class="checkbox__label">
                <span>
                  By checking this checkbox I confirm that I agree to the <nuxt-link to="/privacy" tag="span" class="emp">Terms of Service, Privacy Policy </nuxt-link> and <nuxt-link to="/privacy" tag="span" class="emp">Legal</nuxt-link>.
                </span>
              </label>
            </div>

            <div class="regForm__bottom">
              <p class="regForm__text">
                Already a member? <nuxt-link to="/sign-in" class="regForm__emp" tag="span">
                  Sign In
                </nuxt-link>
              </p>
              <button type="submit" class="btn btn_primary" :class="disabled ? 'btn_primary_disabled' : ''" :disabled="disabled">
                Sign Up
              </button>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'register',
  data () {
    return {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptPolicy: false,
      disabled: false
    }
  },
  methods: {
    async register () {
      try {
        this.disabled = true
        const data = new FormData()
        data.append('name', this.userName)
        data.append('email', this.email)
        data.append('password', this.password)
        data.append('confirm_password', this.confirmPassword)
        data.append('accept_policy', this.acceptPolicy)
        const result = await this.$store.dispatch('register', data)
        if (result.success) {
          this.userName = ''
          this.email = ''
          this.password = ''
          this.confirmPassword = ''
          this.acceptPolicy = false
          await this.$router.push('/sign-in')
        }
      } catch (e) {
        console.log(e.data)
      } finally {
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.registerPage
  min-height: 100vh
  position: relative
  display: flex
  align-items: center
  padding: 124px 0
  +md
    padding: 48px 0
    align-items: flex-start
  &__bg
    position: absolute
    left: 0
    top: 0
    height: 100%
    +md
      display: none
  &__title
    margin-bottom: 32px
.regForm
  &__input
    &:not(:last-child)
      margin-bottom: 30px
  &__checkbox
    margin-top: 30px
  &__bottom
    display: flex
    align-items: center
    justify-content: space-between
    margin-top: 24px
  &__emp
    color: #00bbff
    cursor: pointer
  &__text
    font-size: 14px
    color: rgba(224, 224, 255, 0.6)
    font-weight: 500
    &_big
      font-size: 16px
      line-height: 28px
      margin-bottom: 16px
  .btn
    flex-shrink: 0
    +md
      margin-left: 40px
.checkbox
  font-weight: 500
  font-size: 14px
  color: rgba(224, 224, 255, 0.6)
  .emp
    color: #00bbff
    cursor: pointer
  &__input
    display: none
    &:checked
      & + .checkbox__label::before
        background-color: #00bbff
        background-image: url('/images/check.svg')
        background-repeat: no-repeat
        background-position: center center
  &__label
    display: flex
    align-items: flex-start
    cursor: pointer
    user-select: none
    margin: 0
    &:hover
      &::before
        background: rgba(224, 224, 255, 0.12)
    &::before
      width: 24px
      height: 24px
      flex-shrink: 0
      content: ''
      margin-right: 16px
      display: block
      background: rgba(224, 224, 255, 0.04)
      border-radius: 4px
</style>
