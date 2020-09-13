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
                    {{ getUser.name }}
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
              <div @click="showSecurity" :class="isShowSecurity ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_violet">
                  <SecurityIcon class="icon" />
                </div>
                <div class="setting__text">
                  <p class="setting__name">
                    Security
                  </p>
                  <p class="setting__desc">
                    Change password
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
              <div @click="showVerification" :class="isShowVerification ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_d-blue">
                  <WifiIcon class="icon" />
                </div>
                <div class="setting__text">
                  <p class="setting__name">
                    Verification
                  </p>
                  <p class="setting__desc">
                    Google 2FA
                  </p>
                </div>
                <ArrowR class="setting__next" />
              </div>
              <div @click="showLinks" :class="isShowLinks ? 'setting_active' : ''" class="setting">
                <div class="setting__icon setting__icon_dd-blue">
                  <LayerIcon class="icon" />
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
            <keep-alive>
              <form @submit.prevent="update" v-show="isShowPersonal" name="form1" method="POST" class="form">
                <div class="form__top">
                  <div @click="back" class="form__back" tag="div">
                    <ArrowL class="icon" />
                    <span>Back</span>
                  </div>
                  <h4>Personal</h4>
                  <button :disabled="getButtonState" class="btn form__btn" type="submit">
                    Done
                  </button>
                </div>
                <Personal />
              </form>
            </keep-alive>

            <keep-alive>
              <form @submit.prevent="changePassword" v-show="isShowSecurity" name="form2" method="POST" class="form">
                <div class="form__top">
                  <div @click="back" class="form__back" tag="div">
                    <ArrowL class="icon" />
                    <span>Back</span>
                  </div>
                  <h4>Security</h4>
                  <button :disabled="getButtonState" class="btn form__btn" type="submit">
                    Done
                  </button>
                </div>
                <Security />
              </form>
            </keep-alive>

            <keep-alive>
              <form v-show="isShowVerification" name="form3" method="POST" class="form">
                <div class="form__top">
                  <div @click="back" class="form__back" tag="div">
                    <ArrowL class="icon" />
                    <span>Activate</span>
                  </div>
                  <h4>Verification</h4>
                  <button @click.prevent="enable2fa" v-if="!get2fa" class="btn form__btn" type="submit">
                    Activate
                  </button>
                  <button v-else class="btn form__btn" type="button" @click.prevent="disable2fa">
                    Deactivate
                  </button>
                </div>
                <Verification :twoFaSecret="get2faSecret" :verification-img="get2faImg" :twoFaCode="get2faCode" />
              </form>
            </keep-alive>

            <keep-alive>
              <form v-show="isShowLinks" name="form4" method="POST" class="form">
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
                <Links />
              </form>
            </keep-alive>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Inventory  adapted = true -->
    <Inventory />
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
import ArrowR from 'vue-material-design-icons/ChevronRight.vue'
import { mapGetters } from 'vuex'
import Inventory from '@/components/Inventory'
import Links from '../../components/Settings/Links'
import Verification from '../../components/Settings/Verification'
import Security from '../../components/Settings/Security'
import Personal from '../../components/Settings/Personal'
import { eventBus } from '../../plugins/event-bus'
export default {
  layout: 'default',
  middleware: 'authenticated',
  components: {
    DashboardIcon,
    SettingsIcon,
    UserIcon,
    LayerIcon,
    SecurityIcon,
    WifiIcon,
    ArrowL,
    ArrowR,
    Links,
    Verification,
    Security,
    Personal,
    Inventory
  },
  data () {
    return {
      isShowPersonal: true,
      isShowSecurity: false,
      isShowVerification: false,
      isShowLinks: false,
      isShowMain: true,
      disabled: false
    }
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize',
      getButtonState: 'settings/getButtonState',
      get2fa: '2fa/get2fa',
      get2faImg: '2fa/get2faImg',
      get2faSecret: '2fa/get2faSecret',
      get2faCode: '2fa/get2faCode',
      getUser: 'user/getUser'
    })
  },
  mounted () {
    this.checkMain()
    window.addEventListener('resize', this.checkMain)
  },
  methods: {
    update () {
      eventBus.$emit('sendPersonalSettings')
    },
    changePassword () {
      eventBus.$emit('changePassword')
    },
    async disable2fa () {
      try {
        const result = await this.$store.dispatch('2fa/disable2fa')
        if (result.success) {
          this.$bvToast.toast('2fa deactivated successfully!', {
            title: `Notification`,
            variant: 'primary',
            solid: true
          })
        } else {
          this.$bvToast.toast('Sorry, something went wrong!(', {
            title: `Notification`,
            variant: 'danger',
            solid: true
          })
        }
      } catch (e) {
        console.log(e)
        // TODO remove console statement
      }
    },
    async enable2fa () {
      try {
        const result = await this.$store.dispatch('2fa/generateSecret2fa')
        if (result.success) {
          this.$bvToast.toast('2fa activated successfully!', {
            title: `Notification`,
            variant: 'primary',
            solid: true
          })
        } else {
          this.$bvToast.toast('Sorry, something went wrong!(', {
            title: `Notification`,
            variant: 'danger',
            solid: true
          })
        }
      } catch (e) {
        // TODO remove console statement
        console.log(e)
      }
    },
    checkMain () {
      if (screen.width > 768) {
        this.isShowMain = true
        if ((this.isShowPersonal && this.isShowSecurity && this.isShowVerification && this.isShowLinks) === false) {
          this.isShowPersonal = true
        }
      } else {
        this.isShowMain = false
      }
    },
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
    &_w100
      width: 100%
</style>
