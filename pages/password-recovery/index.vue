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
          <form action="" class="regForm">
            <div class="input regForm__input">
              <label for="username" class="input__label">Email</label>
              <input id="number" type="text" name="number" class="input__input" placeholder="Email">
            </div>

            <div class="regForm__bottom">
              <p class="regForm__text">
                Not a member? <nuxt-link to="/sign-up" class="regForm__emp" tag="span">
                  Sign Up Now
                </nuxt-link>
              </p>
              <button class="btn btn_primary">
                Send Instructions
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

</style>
