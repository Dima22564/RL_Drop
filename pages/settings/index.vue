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
          <b-col xl="3" lg="3" md="4">
            <div class="settings__links">
              <nuxt-link to="/settings/personal" tag="div" class="setting" active-class="setting_active">
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
              </nuxt-link>
              <nuxt-link to="/settings/links" tag="div" class="setting" active-class="setting_active">
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
              </nuxt-link>
              <nuxt-link to="/settings/links" tag="div" class="setting" active-class="setting_active">
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
              </nuxt-link>
              <nuxt-link to="/settings/links" tag="div" class="setting" active-class="setting_active">
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
              </nuxt-link>
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
import UserIcon from 'vue-material-design-icons/Account.vue'
import LayerIcon from 'vue-material-design-icons/Layers.vue'
import SecurityIcon from 'vue-material-design-icons/Security.vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import ArrowR from 'vue-material-design-icons/ChevronRight.vue'
import { mapGetters } from 'vuex'
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
    ArrowR
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
</style>
