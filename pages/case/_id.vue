<template>
  <div>
    <!-- Advanced adapted = true -->
    <section class="advanced">
      <b-container>
        <b-row>
          <b-col xl="12" lg="12" md="8" sm="8" class="m-auto">
            <div class="open" >
              <img src="/images/bg-3.png" alt="" class="open__bg">
              <h2 class="open__title" v-if="getCurrentChest">
                {{ getCurrentChest.chest.name }}
              </h2>
              <img v-if="getCurrentChest && !getWinItem" :src="getCurrentChest.chest.image" alt="" class="open__chestImage">
              <div class="open__btns">
                <button
                  v-if="getCurrentChest && !getWinItem"
                  @click.prevent="openChest(getCurrentChest.chest.id)"
                  class="btn btn_primary"
                  :disabled="!getToken"
                  :class="getToken ? '' : 'btn_primary_disabled'"
                >
                  Open for ${{ getCurrentChest.chest[`${getPlatform}Price`] }}
                </button>
                <button v-if="getWinItem" class="btn btn_secondary btn-arrow">
                  <span>Continue</span><ArrowRightIcon class="btn__icon" />
                </button>
                <button
                  v-if="getWinItem"
                  @click.prevent="sellItem(getWinItem.id)"
                  class="btn btn_primary"
                >
                  Sell for ${{ getWinItem[`${getPlatform}Price`] }}
                </button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Items  adapted =  -->
    <section class="items">
      <b-container v-if="getCurrentChest">
        <b-row class="drop__row">
          <Weapon
            :key="item.id"
            v-for="item in getCurrentChest.items"
            :color="item.type.color"
            img-url="/images/weapon-s.png"
            :name="item.name"
            desc="Astral"
          />
<!--          <Weapon color="red" img-url="/images/weapon-s.png" name="P90" desc="Astral" />-->
<!--          <Weapon color="pink" img-url="/images/weapon-s.png" name="P90" desc="Astral" />-->
<!--          <Weapon color="orange" img-url="/images/weapon-s.png" name="P90" desc="Astral" />-->
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
import Weapon from '../../components/Weapon'

export default {
  layout: 'default',
  mixins: [showNotification],
  components: {
    Weapon,
    ArrowRightIcon
  },
  data () {
    return {
      disabled: true
    }
  },
  async created () {
    try {
      await this.$store.dispatch('chest/loadItemsForChest', this.$route.params.id)
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  },
  computed: {
    ...mapGetters({
      getCurrentChest: 'chest/getCurrentChest',
      getWinItem: 'chest/getWinItem',
      getPlatform: 'common/getPlatform',
      getToken: 'getToken'
    })
  },
  methods: {
    async openChest (id) {
      try {
        const data = new FormData()
        data.append('platform', this.getPlatform)
        data.append('id', id)
        const result = await this.$store.dispatch('chest/openChest', data)
        if (result.success) {
          this.showNotification('Chest opened!', 'success')
        }
      } catch (e) {
        this.showNotification('Something went wrong(', 'danger')
      }
    },
    async sellItem (id) {
      try {
        const data = new FormData()
        data.append('platform', this.getPlatform)
        data.append('id', id)
        await this.$store.dispatch('item/sell', data)
      } catch (e) {
        this.showNotification('Something went wrong(', 'danger')
      }
    }
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.advanced
  padding: 0 0 32px
  +lg
    padding: 0 0 16px
.items
  padding-bottom: 16px
  +lg
    padding-bottom: 32px
.open
  display: flex
  align-items: flex-start
  justify-content: space-between
  padding: 40px
  position: relative
  border-radius: 12px
  box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  background-color: #27273e
  min-height: 200px
  +lg
    flex-direction: column
    background: url('/images/bg-3-mobile.png')
    background-repeat: no-repeat
    background-size: cover
    background-position: center top
  &__title
    position: relative
    z-index: 5
    +lg
      margin-bottom: 208px
  &__chestImage
    max-width: 350px
    width: 100%
    z-index: 9
    height: 261px
    margin-top: -82px
    margin-bottom: -59px
  &__bg
    position: absolute
    top: 0
    left: 0
    border-radius: 12px
    width: 100%
    height: 100%
    +lg
      display: none
  &__btns
    position: relative
    z-index: 5
    display: flex
    flex-direction: column
    align-items: flex-end
    +lg
      width: 100%
    button
      +lg
        width: 100%
        justify-content: center
      &:not(:last-child)
        margin-bottom: 24px

</style>
