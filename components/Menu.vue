<template>
  <div>
    <div v-if="getWindowSize > 991" class="menu">
      <b-container class="menu__container">
        <div class="menu__content menu__content-1">
          <nuxt-link to="/" class="menu__link">
            <img src="/images/logo.svg" alt="">
          </nuxt-link>
          <nuxt-link to="/craft" class="menu__link">
            Craft
          </nuxt-link>
          <nuxt-link to="/faq" class="menu__link">
            FAQ
          </nuxt-link>
        </div>
        <div class="menu__content menu__content-2">
          <div class="menu__icon">
            <span class="menu__volume">
              <VolumeIcon />
            </span>
          </div>
          <div class="menu__icon">
            <span @click="showNotifications" class="menu__volume">
              <BellIcon />
              <div class="notifications__count">9+</div>
            </span>
            <div v-if="isNotificationShow" @mouseleave="isNotificationShow = false" class="notifications">
              <p class="notifications__title">
                notifications
              </p>
              <Notification notification-type="success">
                <p><span class="blue">jelena </span>sent you <span class="white"> request</span></p>
              </Notification>
              <Notification notification-type="message">
                <p><span class="blue">jelena </span>sent you <span class="white"> request</span></p>
              </Notification>
              <Notification notification-type="financial">
                <p><span class="blue">jelena </span>sent you <span class="white"> request</span></p>
              </Notification>
              <Notification notification-type="warning">
                <p><span class="blue">jelena </span>sent you <span class="white"> request</span></p>
              </Notification>
            </div>
          </div>
          <div class="menu__langs">
            <div @click="showLangs" class="menu__langs-link">
              <img src="/images/china.svg" alt="" class="menu__langs-img">
              <span class="munu__langs-lang">CH</span>
            </div>
            <div v-if="isLangsShow" @mouseleave="isLangsShow = false" @mouseover="isLangsShow = true" class="menu__langs-drop">
              <nuxt-link to="/" tag="div" class="menu__langs-dropLink">
                <img src="/images/china.svg" alt="" class="menu__langs-img">
                <span class="menu__langs-dropLang">English</span>
                <CheckIcon class="icon" />
              </nuxt-link>
              <nuxt-link to="/" tag="div" class="menu__langs-dropLink">
                <img src="/images/china.svg" alt="" class="menu__langs-img">
                <span class="menu__langs-dropLang">English</span>
                <CheckIcon class="icon" />
              </nuxt-link>
              <nuxt-link to="/" tag="div" class="menu__langs-dropLink">
                <img src="/images/china.svg" alt="" class="menu__langs-img">
                <span class="menu__langs-dropLang">English</span>
                <CheckIcon class="icon" />
              </nuxt-link>
            </div>
          </div>

          <div class="menu__langs">
            <div @click="showFinancial" class="menu__langs-link">
              <CardIcon class="menu__langs-icon" />
              <span class="munu__langs-lang">$58,960</span>
            </div>
            <div v-if="isFinancialShow" @mouseleave="isFinancialShow = false" class="financial">
              <div class="financial__top">
                <span class="financial__title">balance</span>
                <span class="financial__number">844.65 <span>USD</span></span>
              </div>
              <div class="financial__btn">
                <button class="btn btn_gray">
                  Deposit
                </button>
              </div>
            </div>
          </div>

          <div class="account">
            <div @click="showAccount" class="account__icon">
              <img src="/images/avatar.jpg" alt="" class="account__img">
              <ArrowDownIcon :class="isAccountShow ? 'account__arrow_rotate' : ''" class="account__arrow" />
            </div>
            <div v-if="isAccountShow" @mouseleave="isAccountShow = false" class="account__drop">
              <p class="account__name">
                vino_costa
              </p>
              <nuxt-link class="account__link" to="/dashboard" tag="div">
                <Dashboard class="icon" />
                <span>Dashboard</span>
              </nuxt-link>
              <nuxt-link class="account__link" to="/settings/personal" tag="div">
                <SettingsIcon class="icon" />
                <span>Settings</span>
              </nuxt-link>
              <nuxt-link class="account__link account__link_logout" to="/signout" tag="div">
                <LogoutIcon class="icon" />
                <span>Sign Out</span>
              </nuxt-link>
            </div>
          </div>
          <button class="menu__btn btn btn_primary">
            Get Started
          </button>
        </div>
      </b-container>
    </div>

    <div v-if="getWindowSize <= 991">
      <!-- Mobile main menu -->
      <div v-if="isMobileMainMenuShow">
        <div class="mobileMenu">
          <div class="mobileMenu__visible">
            <div @click="showDropMenu = true" v-if="!showDropMenu" class="mobileMenu__item">
              <MenuIcon class="mobileMenu__icon" />
            </div>
            <div v-if="showDropMenu" @click="showDropMenu = false" class="mobileMenu__item">
              <CloseIcon class="mobileMenu__icon" />
            </div>
            <div class="mobileMenu__item mobileMenu__item_center">
              <nuxt-link to="/">
                <img src="/images/logo-sm.svg" alt="">
              </nuxt-link>
            </div>
            <div class="mobileMenu__item mobileMenu__item_right">
              <span class="mobileMenu__btn">Get Started</span>
            </div>
          </div>

          <div v-if="showDropMenu" class="mobileMenu__invisible">
            <nuxt-link to="/" tag="div" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_pl72">
              Home
            </nuxt-link>
            <nuxt-link to="/craft" tag="div" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_pl72">
              Craft
            </nuxt-link>
            <div @click="showLangs" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
              <img src="/images/russia.svg" alt="" class="mobileMenu__icon mobileMenu__img">
              <span>Language</span>
              <div class="mobileMenu__go">
                <span>English</span>
                <ArrowRIcon class="arrow" />
              </div>
            </div>
            <div @click="showFinancial" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
              <CardIcon class="mobileMenu__icon mobileMenu__icon_dark" />
              <span>Balance</span>
              <div class="mobileMenu__go">
                <span>55555</span>
                <ArrowRIcon class="arrow" />
              </div>
            </div>
            <div class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
              <BellIcon class="mobileMenu__icon mobileMenu__icon_dark" />
              <span>Notifications</span>
              <div class="mobileMenu__go">
                <span class="notificationsMobile">23</span>
                <ArrowRIcon class="arrow" />
              </div>
            </div>
            <div @click="setSound" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
              <VolumeIcon class="mobileMenu__icon mobileMenu__icon_dark" />
              <span>Sound</span>
              <div class="mobileMenu__go">
                <div :class="sound ? 'toggler_active' : ''" @click="setSound" class="toggler">
                  <label for="sound" class="toggler__label">
                    <div class="toggler__circle" />
                    <div class="toggler__way" />
                  </label>
                  <input id="sound" type="checkbox" name="sound" class="toggler__input">
                </div>
              </div>
            </div>
            <div @click="showAccount" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
              <img src="/images/avatar.jpg" alt="" class="mobileMenu__icon mobileMenu__img">
              <span>Account</span>
              <div class="mobileMenu__go">
                <span>name</span>
                <ArrowRIcon class="arrow" />
              </div>
            </div>
            <button class="btn btn_primary mobileMenu__start">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div v-if="isFinancialShow" class="mobileMenu__wrapper">
        <div class="mobileMenu__top">
          <div @click="goBack" class="mobileMenu__subItem mobileMenu__subItem_blue">
            <ArrowLIcon class="icon" />
            <span>Back</span>
          </div>
          <div class="mobileMenu__subItem mobileMenu__subItem_center">
            Balance
          </div>
        </div>
        <button class="btn btn_gray mobileMenu__deposit">
          Deposit / Withdraw
        </button>
      </div>

      <div v-if="isAccountShow" class="mobileMenu__wrapper">
        <div class="mobileMenu__top">
          <div @click="goBack" class="mobileMenu__subItem mobileMenu__subItem_blue">
            <ArrowLIcon class="icon" />
            <span>Back</span>
          </div>
          <div class="mobileMenu__subItem mobileMenu__subItem_center">
            Account
          </div>
        </div>
        <nuxt-link tag="div" to="/Dashboard" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
          <Dashboard class="mobileMenu__icon mobileMenu__icon_dark" />
          <span>Dashboard</span>
        </nuxt-link>
        <nuxt-link tag="div" to="/settings" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
          <SettingsIcon class="mobileMenu__icon mobileMenu__icon_dark" />
          <span>Settings</span>
        </nuxt-link>
        <nuxt-link tag="div" to="/Dashboard" class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon mobileMenu__link_logOut">
          <LogoutIcon class="mobileMenu__icon mobileMenu__icon_dark" />
          <span>Sign Out</span>
        </nuxt-link>
      </div>

      <div v-if="isLangsShow" class="mobileMenu__wrapper">
        <div class="mobileMenu__top">
          <div @click="goBack" class="mobileMenu__subItem mobileMenu__subItem_blue">
            <ArrowLIcon class="icon" />
            <span>Back</span>
          </div>
          <div class="mobileMenu__subItem mobileMenu__subItem_center">
            Language
          </div>
          <div @click="goBack" class="mobileMenu__subItem mobileMenu__subItem_blue mobileMenu__subItem_right">
            <span>Done</span>
          </div>
        </div>
        <div class="mobileMenu__link mobileMenu__link_pt12 mobileMenu__link_withIcon">
          <img src="/images/russia.svg" alt="" class="mobileMenu__icon mobileMenu__img">
          <span>Language</span>
          <div class="mobileMenu__go">
            <CheckIcon class="arrow arrow_blue" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="getWindowSize <= 991" class="mobileMenu mobileMenu_empty">
      <div class="mobileMenu__visible">
        <div class="mobileMenu__item">
          <MenuIcon class="mobileMenu__icon" />
        </div>
        <div class="mobileMenu__item">
          <CloseIcon class="mobileMenu__icon" />
        </div>
        <div class="mobileMenu__item mobileMenu__item_center">
          <nuxt-link to="/">
            <img src="/images/logo-sm.svg" alt="">
          </nuxt-link>
        </div>
        <div class="mobileMenu__item mobileMenu__item_right">
          <span class="mobileMenu__btn">Get Started</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/theme/_mix.sass'
.menu
  box-shadow: 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  padding: 12px 0
  background: #27273e
  &__content
    display: flex
    align-items: center
  &__container
    display: flex
    align-items: center
    justify-content: space-between
  &__link
    color: white
    font-weight: 500
    &:hover
      color: rgba(224, 224, 255, 0.6)
    &:not(:last-child)
      margin-right: 48px
  &__volume
    color: rgba(224, 224, 255, 0.6)
    cursor: pointer
  &__icon
    display: flex
    width: 48px
    height: 48px
    justify-content: center
    align-items: center
    margin-right: 12px
    position: relative
    font-size: 25px
  &__langs
    margin-right: 12px
    position: relative
    &-icon
      margin-right: 12px
      font-size: 20px
      line-height: 20px
      height: 14px
    &-img
      margin-right: 12px
    &-lang
      text-transform: uppercase
      color: white
    &-link
      color: white
      font-weight: 600
      display: flex
      align-items: center
      background: rgba(224, 224, 255, 0.02)
      border-radius: 24px
      padding: 12px
      cursor: pointer
      &:hover
        color: rgba(224, 224, 255, 0.6)
    &-drop
      border-radius: 12px
      box-shadow: 0 16px 16px -4px rgba(20, 16, 41, 0.24), 0 4px 8px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
      background-color: #27273e
      position: absolute
      bottom: 0
      right: 0
      min-width: 255px
      padding: 16px 0
      transform: translateY(calc(100% + 8px))
      z-index: 55
    &-dropLink
      padding: 10px 20px
      color: white
      cursor: pointer
      display: flex
      align-items: center
      justify-content: space-between
      font-size: 14px
      font-weight: 500
      &:hover
        background: rgba(224, 224, 255, 0.02)
      .icon
        color: #00bbff
    &-dropLang
      margin-right: auto
.notifications
  position: absolute
  right: 0
  bottom: 0
  transform: translateY(calc(100% + 8px))
  min-width: 328px
  border-radius: 12px
  box-shadow: 0 16px 16px -4px rgba(20, 16, 41, 0.24), 0 4px 8px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  z-index: 55
  background-color: #27273e
  padding: 16px 0
  &__count
    font-size: 13px
    line-height: 16px
    color: white
    background: #00bbff
    position: absolute
    top: 0
    right: 0
    padding: 1px 4px
    border-radius: 12px
  &__title
    text-transform: uppercase
    margin-bottom: 24px
    font-size: 14px
    font-weight: 600
    color: rgba(224, 224, 255, 0.6)
    letter-spacing: 1px
    padding: 0 16px
.financial
  border-radius: 12px
  box-shadow: 0 16px 16px -4px rgba(20, 16, 41, 0.24), 0 4px 8px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  background-color: #27273e
  min-width: 255px
  padding: 16px
  z-index: 55
  position: absolute
  right: 0
  bottom: 0
  transform: translateY(calc(100% + 8px))
  &__title
    text-transform: uppercase
    font-size: 14px
    letter-spacing: 1px
    color: rgba(224, 224, 255, 0.6)
    font-weight: 600
  &__top
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 24px
  &__number
    color: white
    font-weight: bold
    font-size: 18px
    span
      text-transform: uppercase
      font-size: 12px
  &__btn
    width: 100%
    .btn
      width: 100%
.account
  position: relative
  &__icon
    display: flex
    align-items: center
    color: rgba(224, 224, 255, 0.4)
    font-size: 21px
    cursor: pointer
  &__img
    width: 48px
    height: 48px
    border-radius: 50%
    flex-shrink: 0
    margin-right: 8px
  &__drop
    border-radius: 12px
    box-shadow: 0 16px 16px -4px rgba(20, 16, 41, 0.24), 0 4px 8px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
    background-color: #27273e
    z-index: 55
    position: absolute
    right: 0
    bottom: 0
    transform: translateY(calc(100% + 8px))
    min-width: 255px
    padding: 16px 0
  &__name
    padding: 0 16px
    text-transform: uppercase
    font-size: 14px
    color: rgba(224, 224, 255, 0.6)
    font-weight: 600
    margin-bottom: 24px
  &__arrow
    transition: all 0.2s
    &_rotate
      transform: rotate(180deg)
  &__link
    padding: 9px 20px
    color: white
    font-size: 14px
    font-weight: 500
    cursor: pointer
    user-select: none
    &_logout
      margin-top: 16px
    &:hover
      background: rgba(224, 224, 255, 0.02)
    .icon
      color: #e0e0ff
      opacity: 0.6
      margin-right: 5px
.mobileMenu
  padding: 6px 16px
  box-shadow: 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4);
  background-color: #27273e
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 555
  &_empty
    position: initial
    opacity: 0
  &__wrapper
    background-color: #27273e
    border-radius: 12px
    +item_dark
    padding: 0 16px 24px 16px
  &__invisible
    padding: 24px 0
  &__visible
    display: flex
    align-items: center
  &__item
    width: 33.333%
    display: flex
    &_center
      align-items: center
      justify-content: center
    &_right
      align-items: center
      justify-content: flex-end
  &__start
    margin-top: 24px
    width: 100%
    margin-left: auto
    margin-right: auto
    display: block
  &__btn
    color: white
    font-weight: 500
    font-size: 14px
    cursor: pointer
  &__icon
    color: white
    font-size: 25px
    cursor: pointer
    height: 20px
    margin-right: 16px
    &_dark
      color:  rgba(224, 224, 255, 0.4)
  &__link
    color: white
    cursor: pointer
    font-weight: 500
    font-size: 14px
    padding-right: 16px
    user-select: none
    &_pt12
      padding-top: 12px
      padding-bottom: 12px
    &_pl72
      padding-left: 56px
    &_withIcon
      display: flex
      align-items: center
      padding-left: 16px
    &_logOut
      margin-top: 16px
  &__go
    display: flex
    align-items: center
    margin-left: auto
    color: rgba(224, 224, 255, 0.6)
    .arrow
      font-size: 22px
      height: 18px
      width: 24px
      margin-left: 24px
      &_blue
        color: #00bbff
    .notificationsMobile
      font-size: 13px
      line-height: 16px
      color: white
      font-weight: 500
      padding: 4px
      border-radius: 64px
      background: #00bbff
  &__img
    width: 24px
    height: 24px
    border-radius: 50%
    flex-shrink: 0
  &__top
    display: flex
    align-items: center
    padding: 12px 0
    font-size: 16px
    font-weight: 500
    margin-bottom: 16px
  &__subItem
    width: 33.33333%
    display: flex
    align-items: center
    cursor: pointer
    color: white
    .icon
      font-size: 20px
      height: 15px
    &_blue
      color: #00bbff
    &_center
      justify-content: center
      font-weight: 600
    &_right
      justify-content: flex-end
  &__deposit
    margin: 8px 8px 0 8px
    width: calc(100% - 16px)
</style>

<script>
import VolumeIcon from 'vue-material-design-icons/VolumeHigh.vue'
import BellIcon from 'vue-material-design-icons/BellOutline.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CardIcon from 'vue-material-design-icons/CreditCardOutline.vue'
import ArrowDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import Dashboard from 'vue-material-design-icons/ViewDashboardOutline.vue'
import SettingsIcon from 'vue-material-design-icons/CogOutline.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import ArrowRIcon from 'vue-material-design-icons/ChevronRight.vue'
import ArrowLIcon from 'vue-material-design-icons/ChevronLeft.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { mapGetters } from 'vuex'
import Notification from '../components/Notification'
export default {
  components: {
    VolumeIcon,
    BellIcon,
    CheckIcon,
    Notification,
    CardIcon,
    ArrowDownIcon,
    Dashboard,
    SettingsIcon,
    LogoutIcon,
    MenuIcon,
    ArrowRIcon,
    CloseIcon,
    ArrowLIcon
  },
  data () {
    return {
      isLangsShow: false,
      isNotificationShow: false,
      isAccountShow: false,
      isFinancialShow: false,
      showDropMenu: false,
      isMobileMainMenuShow: true,
      sound: false
    }
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize'
    })
  },
  methods: {
    setSound () {
      if (this.sound === true) {
        this.sound = false
      } else {
        this.sound = true
      }
    },
    showLangs () {
      if (this.isLangsShow === true) {
        this.isLangsShow = false
      } else {
        this.isLangsShow = true
      }
      this.isNotificationShow = false
      this.isAccountShow = false
      this.isFinancialShow = false
      this.isMobileMainMenuShow = false
    },
    showNotifications () {
      this.isLangsShow = false
      if (this.isNotificationShow === true) {
        this.isNotificationShow = false
      } else {
        this.isNotificationShow = true
      }
      this.isAccountShow = false
      this.isFinancialShow = false
      this.isMobileMainMenuShow = false
    },
    showAccount () {
      this.isLangsShow = false
      this.isNotificationShow = false
      if (this.isAccountShow === true) {
        this.isAccountShow = false
      } else {
        this.isAccountShow = true
      }
      this.isFinancialShow = false
      this.isMobileMainMenuShow = false
    },
    showFinancial () {
      this.isLangsShow = false
      this.isNotificationShow = false
      this.isAccountShow = false
      this.isMobileMainMenuShow = false
      if (this.isFinancialShow === true) {
        this.isFinancialShow = false
      } else {
        this.isFinancialShow = true
      }
    },
    goBack () {
      this.isLangsShow = false
      this.isNotificationShow = false
      this.isAccountShow = false
      this.isMobileMainMenuShow = true
      this.isFinancialShow = false
    }
  }
}
</script>
