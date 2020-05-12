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
            <nuxt-link :to="getWindowSize >= 768 ? '/settings/personal' : '/settings'" active-class="dashLinks__link_active" class="dashLinks__link">
              <SettingsIcon />
              <span class="text">Settings</span>
            </nuxt-link>
          </div>
        </div>

        <b-row>
          <b-col xl="4" lg="4" md="6" class="dash__col">
            <div class="dash__item">
              <img src="/images/avatar.jpg" alt="" class="dash__img">
              <div class="dash__text">
                <p class="dash__title">
                  vino_costa
                </p>
                <p class="dash__desc">
                  Change Photo
                </p>
              </div>
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="6" class="dash__col">
            <div class="dash__item dash__item_between">
              <div class="dash__text">
                <p class="dash__balance">
                  balance
                </p>
                <p class="dash__num">
                  <span>$ </span>220,000
                </p>
              </div>
              <button class="btn btn-arrow btn_primary">
                <PlusIcon class="btn__icon btn__icon_left" />
                <span>Refill</span>
              </button>
            </div>
          </b-col>
          <b-col xl="4" lg="4">
            <div class="dash__item">
              <img src="/images/avatar.jpg" alt="" class="dash__img">
              <div class="dash__text">
                <p class="dash__title">
                  Best Drop
                </p>
                <p class="dash__desc">
                  Gamma Doppler
                </p>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col xl="4" lg="4" md="6" sm="6" cols="6">
            <div class="dashInfo dashInfo_green">
              <p class="dashInfo__num">
                344,028
              </p>
              <p class="dashInfo__text">
                cases
              </p>
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="6" sm="6" cols="6">
            <div class="dashInfo dashInfo_blue">
              <p class="dashInfo__num">
                344,028
              </p>
              <p class="dashInfo__text">
                cases
              </p>
            </div>
          </b-col>
          <b-col xl="4" lg="4">
            <div class="dashInfo dashInfo_d-blue">
              <p class="dashInfo__num">
                344,028
              </p>
              <p class="dashInfo__text">
                cases
              </p>
            </div>
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
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { mapGetters } from 'vuex'
import InventoryItem from '../../components/InventoryItem'
export default {
  layout: 'default',
  components: {
    DashboardIcon,
    SettingsIcon,
    PlusIcon,
    InventoryItem
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize'
    })
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.accounntDash
  padding-top: 16px
  &__top
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 32px
    +sm
      flex-direction: column
      align-items: flex-start
      margin-bottom: 24px
.dashLinks
  color: rgba(224, 224, 255, 0.6)
  font-size: 14px
  display: flex
  align-items: center
  +sm
    margin-top: 32px
    width: 100%
  &__link
    padding: 6px 16px
    border-radius: 18px
    display: flex
    align-items: center
    cursor: pointer
    font-weight: 500
    user-select: none
    +sm
      width: 50%
      justify-content: center
    &:hover
      color: white
    &_active
      color: white
      +btn_primary
    .text
      margin-left: 10px
.dash
  &__col
    +lg
      margin-bottom: 16px
  &__item
    +item_dark
    padding: 32px
    display: flex
    align-items: center
    border-radius: 12px
    height: 100%
    +md
      padding: 20px
    &_between
      justify-content: space-between
  &__balance
    text-transform: uppercase
    font-weight: 600
    font-size: 13px
    line-height: 16px
    color: rgba(224, 224, 255, 0.6)
    letter-spacing: 1px
    margin-bottom: 8px
  &__num
    letter-spacing: -1px
    color: white
    font-size: 24px
    font-weight: bold
    span
      font-size: 13px
  &__img
    margin-right: 32px
    width: 64px
    height: 64px
    border-radius: 50%
    flex-shrink: 0
  &__title
    font-size: 20px
    line-height: 28px
    letter-spacing: -0.4px
    color: white
    font-weight: 600
    margin-bottom: 4px
  &__desc
    font-size: 13px
    line-height: 16px
    color: rgba(224, 224, 255, 0.6)
    font-weight: 500
.dashInfo
  padding: 16px
  color: white
  margin-top: 32px
  border-radius: 12px
  +lg
    margin-top: 16px
  &_green
    background: rgba(0, 255, 170, 0.03)
    .dashInfo__num
      color: #00ffaa
  &_blue
    background: rgba(0, 187, 255, 0.03)
    .dashInfo__num
      color: #00bbff
  &_d-blue
    background: rgba(69, 121, 245, 0.03)
    .dashInfo__num
      color: #4579f5
  &__num
    font-size: 48px
    line-height: 48px
    letter-spacing: -2px
    margin-bottom: 12px
    font-weight: bold
    +md
      font-size: 24px
      line-height: 24px
  &__text
    text-transform: uppercase
    letter-spacing: 1px
    font-size: 14px
    font-weight: 600
    color: rgba(224, 224, 255, 0.6)
.inventory
  padding-bottom: 16px
  +lg
    padding-bottom: 32px
  &__top
    padding: 50px 0 34px
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 32px
  &__filter
    display: flex
    align-items: center
  &__filterItem
    padding: 8px 16px
    color: rgba(224, 224, 255, 0.6)
    position: relative
    display: flex
    align-items: center
    font-size: 14px
    font-weight: 500
    cursor: pointer
    user-select: none
    border-radius: 24px
    &:not(:last-child)
      margin-right: 24px
    &_active
      +btn_primary
      color: white
      .quantity
        color: #00bbff
        background: white
    .quantity
      padding: 1px 4px
      background: #00bbff
      border-radius: 64px
      color: white
      margin-left: 9px
      font-size: 13px
      line-height: 16px
</style>
