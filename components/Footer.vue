<template>
  <!-- Footer  adapted = true -->
  <footer class="footer">
    <b-container>
      <div class="footer__part-1">
        <nuxt-link to="/" class="footer__link footer__logo">
          RLDROP
        </nuxt-link>
        <div class="footer__social">
          <a href="" class="footer__social-link">
            <VkIcon />
          </a>
          <a href="" class="footer__social-link">
            <TwitterIcon />
          </a>
        </div>
        <div class="footer__social-link">
          <img src="/images/china.svg" alt="">
        </div>
      </div>

      <div class="footer__part-2">
        <span class="footer__link-2">© RLDrop 2020, All rights reserved.</span>
        <nuxt-link to="" class="footer__link-2">Partnership</nuxt-link>
        <nuxt-link to="" class="footer__link-2">Terms & Conditions</nuxt-link>
        <nuxt-link to="" class="footer__link-2">Privacy Policy</nuxt-link>
        <span class="footer__link-2">made by <span class="made">roobinium</span></span>
      </div>
    </b-container>
  </footer>
</template>

<script>
import VkIcon from 'vue-material-design-icons/Vk.vue'
import TwitterIcon from 'vue-material-design-icons/Twitter.vue'
export default {
  components: {
    VkIcon,
    TwitterIcon
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.footer
  &__part
    &-1
      padding: 60px 0
      display: flex
      align-items: center
      justify-content: space-between
      +lg
        padding: 32px 0
    &-2
      display: flex
      align-items: center
      justify-content: space-between
      padding: 16px 0
      +lg
        flex-wrap: wrap
        justify-content: flex-start
  &__logo
    font-size: 24px
    font-weight: 600
    &:hover
      color: #e0e0ff
  &__link
    color: white
    letter-spacing: 4px
    font-weight: 600
    &-2
      font-size: 14px
      color: rgba(224, 224, 255, 0.6)
      font-weight: 500
      +lg
        &:not(:last-child)
          margin-right: 16px
      &:hover
        color: #e0e0ff
      .made
        color: white
  &__social
    display: flex
    align-items: center
    &-link
      width: 48px
      height: 48px
      background-color: rgba(224, 224, 255, 0.02)
      border-radius: 50%
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      color: #e0e0ff
      font-weight: 500
      &:not(:last-child)
        margin-right: 24px
      &:hover
        color: #e0e0ff
</style>
