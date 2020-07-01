<template>
  <div>
    <!-- Craft items  adapted =  -->
    <section class="craftItems">
      <b-container>
        <b-row class="align-items-center justify-content-lg-center">
          <b-col
            class="craftProgress__col"
            xl="4"
            offset-xl="1"
            lg="5"
          >
            <div class="craftProgress">
              <div>
                <circleBar
                  :dash-spacing="0"
                  :stroke-width="2"
                  :active-width="4"
                  :active-count="progress * 0.799999"
                  size="10rem"
                  active-stroke="#00bbff"
                  stroke="transparent"
                  class="craft__progressLine"
                />
              </div>
              <div>
                <circleBar
                  :stroke-width="100"
                  :active-width="100"
                  :dash-spacing="0"
                  :active-count="progress * 0.79999"
                  size="10rem"
                  stroke="transparent"
                  class="craft__progressLine"
                  active-stroke="rgba(0, 187, 255, 0.08)"
                />
              </div>
              <div class="craftProgress__border">
                <span class="main" />
                <span class="center" />
              </div>
              <div class="craftProgress__progress">
                {{ progress }} <span> %</span>
              </div>
              <div class="craftProgress__circle">
                <img src="/images/craft.png" alt="" class="craftProgress__img">
              </div>
            </div>
          </b-col>
          <b-col xl="6" offset-xl="1" lg="7">
            <div class="craft">
              <h1 class="craft__title">
                Craft Your Items
              </h1>
              <div class="craft__slider">
                <div class="craft__top">
                  <span class="craft__desc">Probability of winning</span>
                  <span class="craft__progress"> {{ progress }} %</span>
                </div>
                <client-only>
                  <vue-slide-bar
                    :lineHeight="8"
                    v-model="progress"
                    :min="5"
                    :max="75"
                  />
                </client-only>
              </div>
              <div class="craft__bottom">
                <button class="btn btn_primary">
                  Play $13.62
                </button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Inventory  adapted = true -->
    <section class="inventory">
      <b-container>
        <div class="faq__title">
          <h2>Choose</h2>
          <div v-if="getWindowSize > 1200" class="faq__filter">
            <span
              v-for="(item) in options"
              :key="item"
              :class="filterItems === item ? 'faq__filter_active' : ''"
              @click="filterItems = item"
            >{{ item }}</span>
          </div>
          <multiselect
            v-model="filterItems"
            v-else
            :options="options"
            :searchable="false"
            :allowEmpty="false"
            :showLabels="false"
            :hideSelected="true"
            class="inventory__select"
          />
        </div>

        <b-row class="inventoryItem__row">
          <InventoryItemCheck
            v-for="(item) in inventoryItems"
            :key="item.id"
            v-model="craftItem"
            :img="item.img"
            :name="item.name"
            :price="item.price"
            :desc="item.desc"
            :item-id="item.id"
            :class="craftItem === item.id ? 'inventoryItem__col_checked' : ''"
            class="inventoryItem__col"
          />
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InventoryItemCheck from '../../components/InventoryItemCheck'
export default {
  layout: 'default',
  components: {
    InventoryItemCheck
  },
  data () {
    return {
      filterItems: 'Restless',
      options: ['Restless', 'Advanced', 'Splash', 'Patience', 'Wisdom', 'Prisma', 'Gloves'],
      progress: 5,
      craftItem: '',
      inventoryItems: [
        {
          img: '/images/weapon.png',
          name: 'P90',
          price: 15,
          desc: 'dscvsd',
          id: 'item1'
        },
        {
          img: '/images/weapon.png',
          name: 'P90',
          price: 15,
          desc: 'dscvsd',
          id: 'item2'
        }
      ]
    }
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
.craftItems
  padding: 40px 0 90px
.craft
  padding: 40px
  +item_dark
  border-radius: 12px
  +lg
    margin-top: 32px
  +md
    padding: 24px
  &__progressLine
    width: 100%
    position: absolute
    top: 0
    left: 0
    height: 100%
  &__title
    margin-bottom: 40px
  &__top
    display: flex
    align-items: center
    justify-content: space-between
    font-size: 14px
    font-weight: 500
    margin-bottom: 12px
  &__desc
    color: rgba(224, 224, 255, 0.6)
  &__progress
    color: white
  &__bottom
    margin-top: 48px
    display: flex
    justify-content: flex-end
  .vue-slide-bar-component
    padding-top: 0 !important
  .vue-slide-bar-process
    background: #00bbff !important
  .vue-slide-bar
    background: rgba(224, 224, 255, 0.06) !important
  .vue-slide-bar-tooltip
    font-size: 0 !important
    line-height: 0 !important
    width: 24px
    height: 24px
    box-shadow: 0 8px 8px -4px rgba(20, 16, 41, 0.06), 0 2px 4px -1px rgba(20, 16, 41, 0.06), 0 0 1px 0 rgba(20, 16, 41, 0.12) !important
    background: white !important
    display: block
    border: none !important
    border-radius: 50% !important
    &::before
      display: none !important
  .vue-slide-bar-tooltip-top
    top: 7px !important
.craftProgress
  width: 350px
  height: 350px
  border-radius: 50%
  box-shadow: 32px 32px 32px -4px rgba(20, 16, 41, 0.24), 64px 64px 96px 0 rgba(20, 16, 41, 0.4), 8px 8px 16px -1px rgba(20, 16, 41, 0.24), 0 0 1px 0 rgba(20, 16, 41, 0.4), -32px -32px 32px -4px rgba(224, 224, 255, 0.02), -64px -64px 96px 0 rgba(224, 224, 255, 0.04), -8px -8px 16px -1px rgba(224, 224, 255, 0.02), 0 0 1px 0 rgba(224, 224, 255, 0.04)
  background-image: linear-gradient(134deg, rgba(224, 224, 255, 0) 6%, rgba(224, 224, 255, 0.12) 173%), linear-gradient(to bottom, #202036, #202036)
  display: flex
  align-items: center
  justify-content: center
  position: relative
  +sm
    width: 276px
    height: 276px
  &__col
    +lg
      display: flex
      justify-content: center
  &__progress
    width: 72px
    height: 72px
    border-radius: 50%
    box-shadow: 0 8px 8px -4px rgba(0, 187, 255, 0.06), 0 16px 24px 0 rgba(0, 187, 255, 0.12), 0 2px 4px -1px rgba(27, 10, 82, 0.06), 0 0 1px 0 rgba(0, 187, 255, 0.12), inset 0 2px 6px 0 rgba(0, 187, 255, 0.4)
    background-image: linear-gradient(135deg, #33334b, #27273e 50%, #202036)
    color: white
    display: flex
    align-items: center
    justify-content: center
    letter-spacing: -1px
    font-size: 24px
    font-weight: bold
    position: absolute
    z-index: 3
    top: calc(50% - 36px)
    right: -30px
    span
      font-size: 14px
  &__circle
    width: 200px
    height: 200px
    border-radius: 50%
    background-image: linear-gradient(138deg, rgba(224, 224, 255, 0.12) 17%, rgba(224, 224, 255, 0) 70%)
    display: flex
    align-items: center
    justify-content: center
    +sm
      width: 169px
      height: 169px
  &__img
    width: 72%
  &__bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
  &__border
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    border-radius: 50%
    .main
      width: 100%
      height: 100%
      border-radius: 50%

.set-size
  font-size: 10em

.charts-container:after
  clear: both
  content: ""
  display: table

.pie-wrapper
  height: 100%
  width: 100%
  float: left
  position: relative

.pie-wrapper:nth-child(3n + 1)
  clear: both

.pie-wrapper .pie
  height: 100%
  width: 100%
  clip: rect(0, 100%, 100%, 50%)
  left: 0
  position: absolute
  top: 0

.pie-wrapper .pie .half-circle
  height: 100%
  width: 100%
  border: 0.1em solid #3498db
  border-radius: 50%
  clip: rect(0, 50%, 100%, 0)
  left: 0
  position: absolute
  top: 0

.pie-wrapper .shadow
  height: 100%
  width: 100%
  border: 0.1em solid #bdc3c7
  border-radius: 50%

.pie-wrapper.style-2 .label
  background: none
  color: #7f8c8d

.pie-wrapper.style-2 .label .smaller
  color: #bdc3c7

.pie-wrapper.progress-30 .pie .half-circle
  border-color: #3498db

.pie-wrapper.progress-30 .pie .left-side
  -webkit-transform: rotate(108deg)
          transform: rotate(108deg)

.pie-wrapper.progress-30 .pie .right-side
  display: none

.pie-wrapper.progress-60 .pie
  clip: rect(auto, auto, auto, auto)

.pie-wrapper.progress-60 .pie .half-circle
  border-color: #9b59b6

.pie-wrapper.progress-60 .pie .left-side
  -webkit-transform: rotate(216deg)
          transform: rotate(216deg)

.pie-wrapper.progress-60 .pie .right-side
  -webkit-transform: rotate(180deg)
          transform: rotate(180deg)

.pie-wrapper.progress-90 .pie
  clip: rect(auto, auto, auto, auto)

.pie-wrapper.progress-90 .pie .half-circle
  border-color: #e67e22

.pie-wrapper.progress-90 .pie .left-side
  -webkit-transform: rotate(324deg)
          transform: rotate(324deg)

.pie-wrapper.progress-90 .pie .right-side
  -webkit-transform: rotate(180deg)
          transform: rotate(180deg)

.pie-wrapper.progress-45 .pie .half-circle
  border-color: #1abc9c

.pie-wrapper.progress-45 .pie .left-side
  -webkit-transform: rotate(162deg)
          transform: rotate(162deg)

.pie-wrapper.progress-45 .pie .right-side
  display: none

.pie-wrapper.progress-75 .pie
  clip: rect(auto, auto, auto, auto)

.pie-wrapper.progress-75 .pie .half-circle
  border-color: #8e44ad

.pie-wrapper.progress-75 .pie .left-side
  -webkit-transform: rotate(270deg)
          transform: rotate(270deg)

.pie-wrapper.progress-75 .pie .right-side
  -webkit-transform: rotate(180deg)
          transform: rotate(180deg)

.pie-wrapper.progress-95 .pie
  clip: rect(auto, auto, auto, auto)

.pie-wrapper.progress-95 .pie .half-circle
  border-color: #e74c3c

.pie-wrapper.progress-95 .pie .left-side
  -webkit-transform: rotate(342deg)
          transform: rotate(342deg)

.pie-wrapper.progress-95 .pie .right-side
  -webkit-transform: rotate(180deg)
          transform: rotate(180deg)

.pie-wrapper--solid
  border-radius: 50%
  overflow: hidden

.pie-wrapper--solid:before
  border-radius: 0 100% 100% 0 / 50%
  content: ""
  display: block
  height: 100%
  margin-left: 50%
  -webkit-transform-origin: left
          transform-origin: left

.pie-wrapper--solid .label
  background: transparent

.pie-wrapper--solid.progress-65
  background: -webkit-gradient(linear, left top, right top, color-stop(50%, #e67e22), color-stop(50%, #34495e))
  background: linear-gradient(to right, #e67e22 50%, #34495e 50%)

.pie-wrapper--solid.progress-65:before
  background: #e67e22
  -webkit-transform: rotate(126deg)
          transform: rotate(126deg)

.pie-wrapper--solid.progress-25
  background: -webkit-gradient(linear, left top, right top, color-stop(50%, #9b59b6), color-stop(50%, #34495e))
  background: linear-gradient(to right, #9b59b6 50%, #34495e 50%)

.pie-wrapper--solid.progress-25:before
  background: #34495e
  -webkit-transform: rotate(-270deg)
          transform: rotate(-270deg)

.pie-wrapper--solid.progress-88
  background: -webkit-gradient(linear, left top, right top, color-stop(50%, #3498db), color-stop(50%, #34495e))
  background: linear-gradient(to right, #3498db 50%, #34495e 50%)

.pie-wrapper--solid.progress-88:before
  background: #3498db
  -webkit-transform: rotate(43.2deg)
          transform: rotate(43.2deg)

</style>
