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
          <form action="" class="regForm">
            <div class="input regForm__input">
              <label for="username" class="input__label">Username</label>
              <input id="number" type="text" name="number" class="input__input" placeholder="Username">
            </div>
            <div class="input regForm__input">
              <label for="username" class="input__label">Email</label>
              <input id="number" type="text" name="number" class="input__input" placeholder="Email">
            </div>
            <div class="input regForm__input">
              <label for="username" class="input__label">Password</label>
              <input id="number" type="text" name="number" class="input__input" placeholder="Password">
            </div>
            <div class="input regForm__input">
              <label for="username" class="input__label">Confirm password</label>
              <input id="number" type="text" name="number" class="input__input" placeholder="Confirm_password">
            </div>

            <div class="checkbox regForm__checkbox">
              <input id="privacy" type="checkbox" name="privacy" class="checkbox__input">
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
              <button class="btn btn_primary">
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
  layout: 'register'
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
