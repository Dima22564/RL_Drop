<template>
  <div>
    <!-- Timer  adapted = true  -->
    <section class="meeting">
      <b-container>
        <div class="ice">
          <img v-if="getWindowSize > 576" src="/images/bg-1.png" alt="" class="ice__bg">
          <img v-else src="/images/bg-1-mobile.png" alt="" class="ice__bg">
          <div class="ice__text">
            <h2 class="ice__title">
              Ice Melting Event
            </h2>
            <Timer
              starttime="May 12, 2020 15:37:25"
              endtime="Jun 13, 2020 16:37:25"
              trans='{
                "day":"Day",
                "hours":"Hrs",
                "minutes":"Min",
                "seconds":"Sec",
                "expired":"Event has been expired.",
                "running":"Till the end of event.",
                "upcoming":"Till start of event.",
                "status": {
                   "expired":"Expired",
                   "running":"Running",
                   "upcoming":"Future"
                  }}'
            />
          </div>
          <div class="ice__btn">
            <button class="btn btn_primary btn-arrow">
              <span>Play</span>
              <ArrowRightIcon class="btn__icon" />
            </button>
          </div>
        </div>
      </b-container>
    </section>

    <!-- Chests adapted = true -->
    <section class="chests">
      <b-container>
          <transition-group class="row" name="fade" tag="div" mode="out-in">
            <b-col
              xl="3"
              lg="4"
              md="6"
              sm="6"
              cols="6"
              v-for="chest in getAllChests"
              :key="chest.id"
              v-show="chest[`${getPlatform}Price`]"
            >
<!--              <transition name="fade">-->
                <nuxt-link :to="`/case/${chest.id}`" class="chest" tag="div">
                  <img :src="chest.image" alt="" class="chest__img">
                  <div class="chest__text">
                    <span class="name">{{ chest.name }}</span>
                    <div class="chest__discount">
                      <span class="discount">${{ chest[`${getPlatform}Price`] }}</span>
                      <span v-show="chest.oldPrice" class="discount-old">${{ chest.oldPrice }}</span>
                    </div>
                  </div>
                </nuxt-link>
<!--              </transition>-->
            </b-col>
          </transition-group>
      </b-container>
    </section>

    <!-- Try  adapted = true -->
    <section class="try">
      <b-container>
        <div class="chance">
          <b-row>
            <img v-if="getWindowSize > 992" src="/images/bg-2.png" alt="" class="chance__bg">
            <img v-else src="/images/bg-2-mobile.png" alt="" class="chance__bg">
            <b-col xl="5" lg="5" md="8">
              <h2 class="chance__title">
                Get Your Chance to Win Items
              </h2>
              <p class="chance__text">
                Exclusive opportunity to win very best items! Save event tokens, use them on the wheel and get your prize!
              </p>
              <button class="btn btn_primary btn-arrow chance__btn">
                <span>Try It Now</span>
                <ArrowRightIcon class="btn__icon" />
              </button>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
import { mapGetters } from 'vuex'
import Timer from '../components/Timer'
export default {
  layout: 'default',
  components: {
    ArrowRightIcon,
    Timer
  },
  async created () {
    try {
      await this.$store.dispatch('chest/loadAllIndexPage')
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize',
      getAllChests: 'chest/getAllChests',
      getPlatform: 'common/getPlatform'
    })
  }
}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.meeting
  padding: 0 0 32px
  +lg
    padding: 0 0 16px
.ice
  border-radius: 12px
  box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  background-color: #27273e
  padding: 40px
  display: flex
  align-items: flex-start
  justify-content: space-between
  position: relative
  min-height: 228px
  +md
    flex-direction: column
  &__title
    margin-bottom: 40px
  &__bg
    position: absolute
    right: -30px
    bottom: -30px
    user-select: none
    +lg
      width: 100%
      bottom: -22px
    +md
      bottom: -17px
      right: 0
      border-radius: 0 0 12px 12px
  &__btn
    position: relative
    z-index: 5
    +md
      width: 100%
      margin-top: 66px
      .btn
        width: 100%
        justify-content: center
  &__text
    position: relative
    z-index: 5
    +md
      width: 100%
  &__timer
    display: flex
    align-items: flex-start
    user-select: none
    +md
      justify-content: center
      width: 100%
    &-item
      display: flex
      flex-direction: column
      align-items: center
      &:not(:last-child)
        margin-right: 8px
      .num
        width: 48px
        height: 48px
        letter-spacing: -1px
        margin-bottom: 8px
        display: flex
        align-items: center
        justify-content: center
        font-size: 24px
        font-weight: bold
        color: white
        border-radius: 4px
        text-transform: uppercase
        background-color: rgba(224, 224, 255, 0.02)
      .day
        text-align: center
        font-size: 13px
        line-height: 16px
        text-transform: uppercase
        color: rgba(224, 224, 255, 0.6)
        letter-spacing: 1px
        font-weight: 600
      .expired
        font-size: 24px
        text-transform: uppercase
        font-weight: 600
        color: rgba(224, 224, 255, 0.6)
.chests
  padding-bottom: 16px
  +lg
    padding: 16px 0 0
.chest
  display: flex
  flex-direction: column
  margin-bottom: 32px
  cursor: pointer7
  +lg
    margin-bottom: 16px
  &__img
    width: 100%
    position: relative
    z-index: 5
    height: 216px
  &__discount
    position: relative
    z-index: 10
    +sm
      display: flex
      flex-direction: row-reverse
      align-items: center
      justify-content: space-between
      width: 100%
  &__text
    position: relative
    margin-top: -27px
    padding: 26px 24px
    border-radius: 12px
    box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
    background-color: #27273e
    display: flex
    align-items: center
    justify-content: space-between
    +sm
      padding: 16px
      flex-direction: column
      align-items: flex-start
      margin-top: -18px
    .name
      color: white
      font-size: 20px
      font-weight: 600
      +sm
        margin-bottom: 8px
    .discount
      color: rgba(20, 16, 41, 0.8)
      font-size: 18px
      font-weight: bold
      padding: 6px 16px
      background: #00ffaa
      border-radius: 12px 3px 12px 3px
      +sm
        padding: 4px 8px
        font-size: 13px
        line-height: 16px
      &-old
        color: white
        font-size: 13px
        line-height: 16px
        padding: 4px 8px
        background: #00bbff
        border-radius: 12px 3px 12px 3px
        position: absolute
        right: 0
        top: 0
        transform: translateY(calc(-100% - 12px))
        z-index: 5
        text-decoration: line-through
        +sm
          position: initial
          transform: translateY(0)
          background: none

.try
  padding-bottom: 48px
.chance
  border-radius: 12px
  box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.24), 0 2px 4px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4)
  background-color: #27273e
  padding: 40px
  position: relative
  &__bg
    position: absolute
    right: 0
    bottom: 0
    border-radius: 12px
    width: 100%
    height: 100%
    +lg
      width: initial
  &__title
    margin-bottom: 32px
  &__text
    color: rgba(224, 224, 255, 0.6)
    font-size: 18px
    font-weight: 500
    margin-bottom: 24px
  &__btn
    +sm
      width: 100%
      justify-content: center
</style>
