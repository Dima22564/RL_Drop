<template>
  <div>
    <!-- Statistics  adapted = true -->
    <section class="accounntDash">
      <b-container>
        <div class="accounntDash__top">
          <h2>Account</h2>
          <div class="dashLinks">
            <nuxt-link to="/dashboard" active-class="dashLinks__link_active" tag="div" class="dashLinks__link">
              <DashboardIcon />
              <span class="text">Dashboard</span>
            </nuxt-link>
            <nuxt-link active-class="dashLinks__link_active" to="/settings" class="dashLinks__link">
              <SettingsIcon />
              <span class="text">Settings</span>
            </nuxt-link>
          </div>
        </div>

        <b-row>
          <b-col xl="3" lg="3" md="4">
            <div v-if="isShowMain" class="settings__links">
              <div @click="showPersonal" :class="isShowPersonal ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_blue">
                  <UserIcon class="icon" />
                </div>
                <div class="setting__text">
                  <p class="setting__name">
                    Personal
                  </p>
                  <p class="setting__desc">
                    Game accounts
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
              <div @click="showSecurity" :class="isShowSecurity ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_violet">
                  <LayerIcon class="icon" />
                </div>
                <div class="setting__text">
                  <p class="setting__name">
                    Security
                  </p>
                  <p class="setting__desc">
                    Game accounts
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
              <div @click="showVerification" :class="isShowVerification ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_d-blue">
                  <SecurityIcon class="icon" />
                </div>
                <div class="setting__text">
                  <p class="setting__name">
                    Verification
                  </p>
                  <p class="setting__desc">
                    Game accounts
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
              <div @click="showLinks" :class="isShowLinks ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_dd-blue">
                  <WifiIcon class="icon" />
                </div>
                <div class="setting__text">
                  <p class="setting__name">
                    Links
                  </p>
                  <p class="setting__desc">
                    Game accounts
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
            </div>
          </b-col>

          <b-col xl="9" lg="9" md="8">
            <form v-if="isShowPersonal" method="POST" class="form">
              <div class="form__top">
                <div @click="back" class="form__back" tag="div">
                  <ArrowL class="icon" />
                  <span>Back</span>
                </div>
                <h4>Personal</h4>
                <button class="btn form__btn" type="submit">
                  Done
                </button>
              </div>
              <div class="form__inputs">
                <div class="input form__input input_error">
                  <label for="username" class="input__label">Username</label>
                  <input id="username" type="text" name="username" class="input__input">
                  <span class="input__error">Error message</span>
                </div>
                <div class="input form__input">
                  <label for="username" class="input__label">Phone number</label>
                  <input id="number" type="text" name="number" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input input__input_withIcon">
                  <SteamIcon class="input__icon" />
                </div>
              </div>
            </form>
            <form v-if="isShowSecurity" method="POST" class="form">
              <div class="form__top">
                <div @click="back" class="form__back" tag="div">
                  <ArrowL class="icon" />
                  <span>Back</span>
                </div>
                <h4>Security</h4>
                <button class="btn form__btn" type="submit">
                  Done
                </button>
              </div>
              <div class="form__inputs">
                <div class="input form__input input_error">
                  <label for="username" class="input__label">Username</label>
                  <input id="username" type="text" name="username" class="input__input">
                  <span class="input__error">Error message</span>
                </div>
                <div class="input form__input">
                  <label for="username" class="input__label">Phone number</label>
                  <input id="number" type="text" name="number" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input input__input_withIcon">
                  <SteamIcon class="input__icon" />
                </div>
              </div>
            </form>
            <form v-if="isShowVerification" method="POST" class="form">
              <div class="form__top">
                <div @click="back" class="form__back" tag="div">
                  <ArrowL class="icon" />
                  <span>Back</span>
                </div>
                <h4>Verification</h4>
                <button class="btn form__btn" type="submit">
                  Done
                </button>
              </div>
              <div class="form__inputs">
                <div class="input form__input input_error">
                  <label for="username" class="input__label">Username</label>
                  <input id="username" type="text" name="username" class="input__input">
                  <span class="input__error">Error message</span>
                </div>
                <div class="input form__input">
                  <label for="username" class="input__label">Phone number</label>
                  <input id="number" type="text" name="number" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input input__input_withIcon">
                  <SteamIcon class="input__icon" />
                </div>
              </div>
            </form>
            <form v-if="isShowLinks" method="POST" class="form">
              <div class="form__top">
                <div @click="back" class="form__back" tag="div">
                  <ArrowL class="icon" />
                  <span>Back</span>
                </div>
                <h4>Links</h4>
                <button class="btn form__btn" type="submit">
                  Done
                </button>
              </div>
              <div class="form__inputs">
                <div class="input form__input input_error">
                  <label for="username" class="input__label">Username</label>
                  <input id="username" type="text" name="username" class="input__input">
                  <span class="input__error">Error message</span>
                </div>
                <div class="input form__input">
                  <label for="username" class="input__label">Phone number</label>
                  <input id="number" type="text" name="number" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input">
                </div>
                <div class="input form__input input_w100">
                  <label for="username" class="input__label">Email</label>
                  <input id="email" type="text" name="email" class="input__input input__input_withIcon">
                  <SteamIcon class="input__icon" />
                </div>
              </div>
            </form>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Inventory  adapted = true -->
    <section class="inventory">
      <b-container>
        <div class="inventory__top">
          <h3>Inventory</h3>
          <div class="inventory__filter">
            <div class="inventory__filterItem inventory__filterItem_active">
              <span>PC</span>
              <span class="quantity">320+</span>
            </div>
            <div class="inventory__filterItem">
              <span>PC</span>
              <span class="quantity">320+</span>
            </div>
            <div class="inventory__filterItem">
              <span>PC</span>
              <span class="quantity">320+</span>
            </div>
          </div>
        </div>

        <b-row class="inventoryItem__row">
          <InventoryItem img="/images/weapon.png" name="P90" price="15" desc="fdgfd" class="inventoryItem__col" />
          <InventoryItem img="/images/weapon.png" name="P90" price="15" desc="fdgfd" class="inventoryItem__col" />
          <InventoryItem img="/images/weapon.png" name="P90" price="15" desc="fdgfd" class="inventoryItem__col" />
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import DashboardIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'
import SettingsIcon from 'vue-material-design-icons/CogOutline.vue'
import UserIcon from 'vue-material-design-icons/Account.vue'
import LayerIcon from 'vue-material-design-icons/Layers.vue'
import SecurityIcon from 'vue-material-design-icons/Security.vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import ArrowL from 'vue-material-design-icons/ChevronLeft.vue'
import SteamIcon from 'vue-material-design-icons/Steam.vue'
import ArrowR from 'vue-material-design-icons/ChevronRight.vue'
import { mapGetters } from 'vuex'
// import PersonalSettings from '../../components/PersonalSettings'

import InventoryItem from '../../components/InventoryItem'
export default {
  layout: 'default',
  components: {
    DashboardIcon,
    SettingsIcon,
    InventoryItem,
    UserIcon,
    LayerIcon,
    SecurityIcon,
    WifiIcon,
    ArrowL,
    SteamIcon,
    ArrowR
    // PersonalSettings
  },
  data () {
    return {
      isShowPersonal: true,
      isShowSecurity: false,
      isShowVerification: false,
      isShowLinks: false,
      isShowMain: true
    }
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize'
    })
  },
  methods: {
    showPersonal () {
      this.isShowPersonal = true
      this.isShowSecurity = false
      this.isShowVerification = false
      this.isShowLinks = false
      if (this.getWindowSize < 768) {
        this.isShowMain = false
      }
    },
    showSecurity () {
      this.isShowPersonal = false
      this.isShowSecurity = true
      this.isShowVerification = false
      this.isShowLinks = false
      if (this.getWindowSize < 768) {
        this.isShowMain = false
      }
    },
    showVerification () {
      this.isShowPersonal = false
      this.isShowSecurity = false
      this.isShowVerification = true
      this.isShowLinks = false
      if (this.getWindowSize < 768) {
        this.isShowMain = false
      }
    },
    showLinks () {
      this.isShowPersonal = false
      this.isShowSecurity = false
      this.isShowVerification = false
      this.isShowLinks = true
      if (this.getWindowSize < 768) {
        this.isShowMain = false
      }
    },
    back () {
      this.isShowPersonal = false
      this.isShowSecurity = false
      this.isShowVerification = false
      this.isShowLinks = false
      if (this.getWindowSize < 768) {
        this.isShowMain = true
      }
    }
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.setting
  padding: 16px
  display: flex
  align-items: center
  border-radius: 48px 12px 12px 48px
  cursor: pointer
  user-select: none
  &:not(:last-child)
    margin-bottom: 8px
  &:hover
    background: rgba(224, 224, 255, 0.02)
  &_active
    background: rgba(224, 224, 255, 0.02)
  &__next
    display: none
    +md
      display: block
      color: rgba(224, 224, 255, 0.4)
      margin-left: auto
      font-size: 22px
  &__icon
    flex-shrink: 0
    width: 48px
    height: 48px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    margin-right: 16px
    color: white
    font-size: 25px
    .icon
      height: 20px
    &_blue
      background: #00bbff
    &_violet
      background: #9c42f5
    &_d-blue
      background: #4579f5
    &_dd-blue
      background: #5d2de1
  &__text
    color: white
    font-weight: 500
  &__name
    font-size: 16px
  &__desc
    font-size: 13px
    line-height: 16px
    color: rgba(224, 224, 255, 0.6)
.form
  +item_dark
  padding: 24px 24px 0 24px
  border-radius: 12px
  +md
    padding: 16px
  &__back
    display: none
    cursor: pointer
    +md
      display: flex
      align-items: center
      color: #00bbff
      font-size: 16px
      font-weight: 500
    .icon
      margin-right: 4px
      height: 12px
      font-size: 20px
  &__top
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 42px
    +lg
      margin-bottom: 16px
  &__btn
    font-weight: 600
    color: #00bbff
    padding: 0
    &:hover
      color: #00bbff
  &__inputs
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    +lg
      flex-direction: column
  &__input
    width: calc(50% - 12px)
    margin-bottom: 30px
    +lg
      width: 100%
</style>
