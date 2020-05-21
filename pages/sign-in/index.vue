<template>
  <div class="registerPage registerPage_signIn">
    <img src="/images/sign-in-bg.png" alt="" class="registerPage__bg">
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
            Sign In
          </h1>
          <form class="regForm">
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
              v-model="password"
              :rightIcon="true"
              :leftIcon="false"
              :type="showPasswod ? 'text' : 'password'"
              name="password"
              label="Password"
              class="regForm__input"
            >
              <template slot="rightIcon">
                <EyeIcon v-if="!showPasswod" @click="showPasswod = true" />
                <EyeOffIcon v-if="showPasswod" @click="showPasswod = false" />
              </template>
              <template slot="label">
                <div class="input__label input__custom-label">
                  <label for="password">Password</label>
                  <nuxt-link tag="span" class="emp" to="/password-recovery">Forgot password?</nuxt-link>
                </div>
              </template>
            </MyInput>

            <MyInput
              v-model="TwoFA"
              :rightIcon="false"
              :leftIcon="false"
              name="TwoFA"
              label="2FA Code"
              type="text"
              class="regForm__input"
            />

            <div class="regForm__bottom">
              <p class="regForm__text">
                Not a member? <nuxt-link to="/sign-up" class="regForm__emp" tag="span">
                  Sign Up Now
                </nuxt-link>
              </p>
              <button class="btn btn_primary" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EyeIcon from 'vue-material-design-icons/EyeOutline.vue'
import EyeOffIcon from 'vue-material-design-icons/EyeOffOutline.vue'
export default {
  layout: 'register',
  components: {
    EyeIcon,
    EyeOffIcon
  },
  data () {
    return {
      showPasswod: false,
      userName: '',
      'TwoFA': '',
      password: ''
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
.input
  &__custom
    &-label
      display: flex
      align-items: center
      width: 100%
      justify-content: space-between
      .emp
        color: #00bbff
        cursor: pointer
</style>
