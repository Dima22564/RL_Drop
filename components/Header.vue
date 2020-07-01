<template>
  <header class="header">
    <MyParallax />
    <div class="header__part-1">
      <b-container>
        <b-row>
          <b-col xl="4" lg="4">
            <div class="platform">
              <span
                :class="activeFilter === 1 ? 'platform__icon_active' : ''"
                @click="changeItems(1)"
                class="platform__icon"
              >
                <LaptopIcon />
              </span>
              <span
                :class="activeFilter === 2 ? 'platform__icon_active' : ''"
                @click="changeItems(2)"
                class="platform__icon"
              >
                <PlaystationIcon />
              </span>
              <span
                :class="activeFilter === 3 ? 'platform__icon_active' : ''"
                @click="changeItems(3)"
                class="platform__icon"
              >
                <XboxIcon />
              </span>
            </div>
          </b-col>

          <b-col xl="2" lg="2" md="6" class="d-sm-none d-md-block d-lg-block d-xl-block d-none">
            <div class="case case_green">
              <LayersIcon class="case__icon" />
              <div class="case__text">
                <span class="emp">4,102,715</span>
                <span class="name">cases</span>
              </div>
            </div>
          </b-col>
          <b-col xl="2" lg="2" md="6" class="d-sm-none d-md-block d-lg-block d-xl-block d-none">
            <div class="case case_blue">
              <EqualizerIcon class="case__icon" />
              <div class="case__text">
                <span class="emp">4,102,715</span>
                <span class="name">CRAFT</span>
              </div>
            </div>
          </b-col>
          <b-col xl="2" lg="2" md="6" class="d-sm-none d-md-block d-lg-block d-xl-block d-none">
            <div class="case case_d-blue">
              <UserIcon class="case__icon" />
              <div class="case__text">
                <span class="emp">4,102,715</span>
                <span class="name">users</span>
              </div>
            </div>
          </b-col>
          <b-col xl="2" lg="2" md="6" class="d-sm-none d-md-block d-lg-block d-xl-block d-none">
            <div class="case case_violet">
              <WifiIcon class="case__icon" />
              <div class="case__text">
                <span class="emp">4,102,715</span>
                <span class="name">online</span>
              </div>
            </div>
          </b-col>
        </b-row>

        <client-only>
          <slick
            :options="caseOptions"
            v-if="getWindowSize < 768"
          >
            <div class="case__wrapper">
              <div class="case case_green">
                <WifiIcon class="case__icon" />
                <div class="case__text">
                  <span class="emp">4,102,715</span>
                  <span class="name">cases</span>
                </div>
              </div>
            </div>
            <div class="case__wrapper">
              <div class="case case_blue">
                <WifiIcon class="case__icon" />
                <div class="case__text">
                  <span class="emp">4,102,715</span>
                  <span class="name">CRAFT</span>
                </div>
              </div>
            </div>
            <div class="case__wrapper">
              <div class="case case_d-blue">
                <WifiIcon class="case__icon" />
                <div class="case__text">
                  <span class="emp">4,102,715</span>
                  <span class="name">users</span>
                </div>
              </div>
            </div>
            <div class="case__wrapper">
              <div class="case case_violet">
                <WifiIcon class="case__icon" />
                <div class="case__text">
                  <span class="emp">4,102,715</span>
                  <span class="name">online</span>
                </div>
              </div>
            </div>
          </slick>
        </client-only>
      </b-container>
    </div>

    <div class="header__slider">
      <client-only>
        <slick
          ref="slick"
          :options="slickOptions"
          @reInit="reinitSlider"
        >
          <div v-show="activeFilter === 1" class="weapon__wrapper">
            <div class="weapon weapon_pink">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimato47r</span>
            </div>
          </div>
          <div v-show="activeFilter === 2" class="weapon__wrapper">
            <div class="weapon weapon_red">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator55</span>
            </div>
          </div>
          <div v-show="activeFilter === 3" class="weapon__wrapper">
            <div class="weapon weapon_violet">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator53</span>
            </div>
          </div>
          <div v-show="activeFilter === 1" class="weapon__wrapper">
            <div class="weapon weapon_blue">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator52</span>
            </div>
          </div>
          <div v-show="activeFilter === 2" class="weapon__wrapper">
            <div class="weapon weapon_orange">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator48</span>
            </div>
          </div>
          <div v-show="activeFilter === 3" class="weapon__wrapper">
            <div class="weapon weapon_d-blue">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator45</span>
            </div>
          </div>
          <div v-show="activeFilter === 1" class="weapon__wrapper">
            <div class="weapon">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator1</span>
            </div>
          </div>
          <div v-show="activeFilter === 2" class="weapon__wrapper">
            <div class="weapon">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimato4r</span>
            </div>
          </div>
          <div v-show="activeFilter === 3" class="weapon__wrapper">
            <div class="weapon">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimaadftor</span>
            </div>
          </div>
          <div v-show="activeFilter === 1" class="weapon__wrapper">
            <div class="weapon">
              <img src="/images/weapon.png" alt="" class="weapon__img">
              <span class="weapon__name">Decimator2</span>
            </div>
          </div>
        </slick>
      </client-only>
    </div>
  </header>
</template>

<script>
import LaptopIcon from 'vue-material-design-icons/Laptop.vue'
import PlaystationIcon from 'vue-material-design-icons/SonyPlaystation.vue'
import XboxIcon from 'vue-material-design-icons/MicrosoftXbox.vue'
import LayersIcon from 'vue-material-design-icons/Layers.vue'
import UserIcon from 'vue-material-design-icons/Account.vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import EqualizerIcon from 'vue-material-design-icons/Equalizer.vue'
import { mapGetters, mapMutations } from 'vuex'
import MyParallax from '../components/Parallax'
export default {
  components: {
    LaptopIcon,
    PlaystationIcon,
    XboxIcon,
    LayersIcon,
    UserIcon,
    WifiIcon,
    EqualizerIcon,
    MyParallax
  },
  data () {
    return {
      activeFilter: 1,
      slickOptions: {
        slidesToShow: 6,
        centerMode: true,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        variableWidth: true,
        autoPlay: true
      },
      caseOptions: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        variableWidth: true,
        autoPlay: true,
        infinite: false
      }
    }
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize'
    })
  },
  mounted () {
    const that = this
    this.windowSize = window.innerWidth
    this.setWindowSize(window.innerWidth)
    window.addEventListener('resize', function () {
      const windowSize = window.innerWidth
      that.setWindowSize(windowSize)
    })
  },
  methods: {
    ...mapMutations({
      setWindowSize: 'common/setWindowSize'
    }),
    reinitSlider () {
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    },
    changeItems (filter) {
      this.activeFilter = filter
    }
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.header
  position: relative
  padding: 32px 0
  +lg
    padding: 16px 0
  &__part
    &-1
      margin-bottom: 32px
      +lg
        margin-bottom: 0
      +md
        margin-bottom: 16px
.weapon
  width: 160px
  border-radius: 12px
  background-color: #27273e
  display: flex
  flex-direction: column
  padding-top: 8px
  align-items: center
  justify-content: center
  position: relative
  overflow: hidden
  &::before
    content: ''
    height: 4px
    position: absolute
    bottom: 0
    left: 0
    width: 100%
  &_pink
    &::before
      background: #ff00aa
  &_red
    &::before
      background: #f54562
  &_violet
    &::before
      background: #9c42f5
  &_blue
    &::before
      background: #00bbff
  &_orange
    &::before
      background: #ff5e00
  &_d-blue
    &::before
      background: #4579f5
  &__wrapper
    max-width: 160px
    margin-right: 30px
    box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  &__name
    font-size: 13px
    line-height: 16px
    color: white
    margin-top: 8px
    margin-bottom: 16px
.platform
  display: flex
  align-items: center
  border-radius: 12px
  padding: 4px
  background-color: rgba(20, 16, 41, 0.24)
  +lg
    margin-bottom: 16px
  &__icon
    width: 33.3333%
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    padding: 12px 0
    font-size: 25px
    cursor: pointer
    color: rgba(224, 224, 255, 0.6)
    &_active
      box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4);
      background-color: #33334b
      color: white

.case
  padding: 8px 0
  display: flex
  align-items: center
  justify-content: center
  border-radius: 12px
  +lg
    margin-bottom: 16px
  +md
    margin-bottom: 0
  &_green
    background: rgba(0, 255, 170, 0.03)
    color: #00ffaa
  &_blue
    background: rgba(0, 187, 255, 0.03)
    color: #00bbff
  &_d-blue
    background: rgba(69, 121, 245, 0.03)
    color: #4579f5
  &_violet
    background: rgba(93, 45, 225, 0.03)
    color: #5d2de1
  &__text
    display: flex
    flex-direction: column
  &__icon
    margin-right: 16px
    color: inherit
    font-size: 25px
    +xl
      display: none
  &__wrapper
    width: 140px !important
    margin-right: 16px
  .emp
    font-size: 18px
    line-height: 24px
    font-weight: bold
    color: inherit
  .name
    font-size: 13px
    line-height: 16px
    text-transform: uppercase
    color: rgba(224, 224, 255, 0.6)
    letter-spacing: 1px
</style>
