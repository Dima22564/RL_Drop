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
            <div class="input regForm__input">
              <label for="username" class="input__label">Username</label>
              <input
                id="number"
                v-model="userName"
                type="text"
                name="userName"
                class="input__input"
                placeholder="Username"
              >
            </div>
            <div class="input regForm__input">
              <label for="username" class="input__label">Password</label>
              <input id="number" :type="showPasswod ? 'text' : 'password'" name="number" class="input__input input__input_withIconR" placeholder="Password">
              <EyeIcon v-if="!showPasswod" @click="showPasswod = true" class="input__icon_r input__icon" />
              <EyeOffIcon v-if="showPasswod" @click="showPasswod = false" class="input__icon_r input__icon" />
            </div>
            <div class="input regForm__input">
              <label for="username" class="input__label">2FA Code</label>
              <input id="number" type="text" name="number" class="input__input" placeholder="2FA">
            </div>

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
      userName: ''
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
</style>
