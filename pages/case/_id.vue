<template>
  <div>
    <!-- Advanced adapted = true -->
    <section class="advanced">
      <b-container>
        <b-row>
          <b-col xl="12" lg="12" md="12" sm="12" class="m-auto">
            <div class="open" >
              <transition name="fade" mode="out-in">
                <img src="/images/bg-3.png" alt="" class="open__bg" key="image">
              </transition>
              <h2 class="open__title" v-if="getCurrentChest" v-show="getCurrentChest && !isSliderActive">
                {{ getCurrentChest.chest.name }}
              </h2>
              <img v-if="getCurrentChest" v-show="getCurrentChest && !getWinItem" :src="getCurrentChest.chest.image" alt="" class="open__chestImage">
              <div class="open__slider" ref="openSlider" v-show="getWinItem && !isShowWinItem" v-if="getCurrentChest">
                <Swiper
                  :options="options"
                  ref="mySwiper"
                >
                  <swiper-slide
                    :key="item.id"
                    v-for="item in getCurrentChest.items"
                    :index="item.id"
                  >
                    <Weapon
                      class="open__sliderItem"
                      :color="item.type.color"
                      :img-url="item.image"
                      :name="item.name"
                      :desc="item.text"
                      :item-color="item.color"
                      :virtual-index="item.id"
                    />
                  </swiper-slide>
                </Swiper>
              </div>
              <WinItem
                v-if="getWinItem && isShowWinItem"
                :item-color="getWinItem.color"
                :color="getWinItem.type.color"
                :desc="getWinItem.text"
                :img-url="getWinItem.image"
                :name="getWinItem.name"
                :key="getWinItem.name"
              />
              <div class="open__btns" v-if="getCurrentChest && !isSliderActive">
                <button
                  v-if="getCurrentChest && !getWinItem"
                  @click.prevent="openChest(getCurrentChest.chest.id)"
                  class="btn btn_primary"
                  :disabled="checkBalance"
                  :class="checkBalance ? 'btn_primary_disabled' : ''"
                >
                  {{ $t('openChest') }} ${{ getCurrentChest.chest[`${getPlatform}Price`] }}
                </button>
                <nuxt-link tag="button" to="/dashboard" v-if="getWinItem && animated" class="btn btn_secondary btn-arrow">
                  <span>{{ $t('continue') }}</span><ArrowRightIcon class="btn__icon" />
                </nuxt-link>
                <button
                  v-if="getWinItem && animated"
                  @click.prevent="sellItem(getWinItem.id)"
                  class="btn btn_primary"
                  :class="!getToken ? 'btn_primary_disabled' : ''"
                  :disabled="!getToken"
                >
                  {{ $t('sell') }} ${{ getWinItem[`${getPlatform}Price`] }}
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
            :img-url="item.image"
            :name="item.name"
            :desc="item.text"
            :item-color="item.color"
            class="items__drop"
          />
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
import Weapon from '@/components/Weapon'
import { eventBus } from '@/plugins/event-bus'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import WinItem from '@/components/WinItem'
export default {
  layout: 'default',
  mixins: [showNotification],
  components: {
    Weapon,
    ArrowRightIcon,
    Swiper,
    SwiperSlide,
    WinItem
  },
  data () {
    return {
      disabled: true,
      animated: false,
      isSliderActive: false,
      isShowWinItem: false,
      options: {
        slidesPerView: 5,
        spaceBetween: 12,
        loop: false,
        freeMode: true,
        virtual: true,
        allowTouchMove: false,
        centeredSlides: true,
        slideActiveClass: 'open__activeItem',
        breakpoints: {
          // when window width is >= 320px
          1200: {
            slidesPerView: 5
          },
          767: {
            slidesPerView: 3
          },
          200: {
            slidesPerView: 2
          }
        }
      }
    }
  },
  async created () {
    this.$store.commit('chest/setWinItem', null)
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
      getToken: 'getToken',
      getUser: 'user/getUser'
    }),
    checkBalance () {
      return !this.getToken || (this.getUser.balance < this.getCurrentChest.chest[`${this.getPlatform}Price`])
    },
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    eventBus.$emit('closeMenu')
  },
  methods: {
    async openChest (id) {
      try {
        const data = new FormData()
        data.append('platform', this.getPlatform)
        data.append('id', id)
        const result = await this.$store.dispatch('chest/openChest', data)
        if (result.success) {
          this.isSliderActive = true
          this.showNotification('Chest opened!', 'success')
          setTimeout(() => {
            this.animateSlider()
          }, 1000)
        }
      } catch (e) {
        this.showNotification(e.data.message, 'danger')
      }
    },
    async sellItem (id) {
      try {
        const data = new FormData()
        data.append('platform', this.getPlatform)
        data.append('id', id)
        await this.$store.dispatch('item/sell', data)
        this.isShowWinItem = false
      } catch (e) {
        this.showNotification(this.$t('smtWrong'), 'danger')
      }
    },
    animateSlider () {
      const foundItem = this.getCurrentChest.items.find(curVal => curVal.id === this.getWinItem.id)
      const index = this.getCurrentChest.items.indexOf(foundItem)
      this.swiper.update()

      const i = this.getCurrentChest.items.length
      let time = 0
      const interval = setInterval(() => {
        if (time === 3000) {
          clearInterval(interval)
          this.swiper.slideTo(index, 100, false)
          setTimeout(() => {
            this.animated = true
            this.isSliderActive = false
            this.isShowWinItem = true
            time = 0
          }, 1000)
        } else {
          const j = Math.floor(Math.random() * (i + 1))
          this.swiper.slideTo(j, 100, false)
        }
        time += 100
      }, 100)
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
  &__drop
    .drop
      margin-bottom: 32px
.open
  display: flex
  align-items: flex-start
  justify-content: space-between
  flex-wrap: wrap
  padding: 40px
  position: relative
  border-radius: 12px
  box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  background-color: #27273e
  min-height: 200px
  +lg
    flex-direction: column
    background: url('/images/chest-bg.png')
    background-repeat: no-repeat
    background-size: cover
    background-position: center top
  .drop
    margin-bottom: 0
  &__activeItem
    .drop
      box-shadow: 0 8px 8px -4px rgba(0, 187, 255, 0.06), 0 16px 24px 0 rgba(0, 187, 255, 0.12), 0 2px 4px -1px rgba(27, 10, 82, 0.06), 0 0 1px 0 rgba(0, 187, 255, 0.12), inset 0 2px 6px 0 rgba(0, 187, 255, 0.4) !important
  &__slider
    width: 100%
    display: block
  &__sliderItem
    width: 190px
    max-width: 190px
  &__title
    position: relative
    z-index: 5
    +lg
      margin-bottom: 20px
  &__chestImage
    max-width: 350px
    width: 100%
    z-index: 9
    height: 261px
    margin-top: -82px
    margin-bottom: -59px
    +lg
      width: 100%
      height: 204px
      margin-top: 0
      margin-bottom: 65px
      max-width: 100%
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
