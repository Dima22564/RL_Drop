<template>
  <b-col xl="2" lg="2" md="3" sm="4" cols="6">
    <input :value="itemId" type="hidden" name="">
    <div @click="check" :class="checked ? 'inventoryItem_checked' : ''" class="inventoryItem">
      <div v-if="checked" class="inventoryItem__check">
        <CheckIcon class="icon" />
      </div>

      <img :src="img" alt="" class="inventoryItem__img">
      <div class="inventoryItem__text">
        <p class="inventoryItem__name">
          {{ name }}
        </p>
        <p class="inventoryItem__desc">
          {{ desc }}
        </p>
        <p class="inventoryItem__price">
          ${{ price }}
        </p>
      </div>
    </div>
  </b-col>
</template>

<script>
import CheckIcon from 'vue-material-design-icons/Check.vue'
export default {
  components: {
    CheckIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    check () {
      this.checked ? this.checked = false : this.checked = true
    }
  }

}
</script>

<style lang="sass">
@import '@/theme/_mix.sass'
.inventoryItem
  +item_dark
  padding: 16px
  position: relative
  overflow: hidden
  display: flex
  flex-direction: column
  align-items: center
  border-radius: 12px
  max-height: 180px
  cursor: pointer
  &_checked
    background: rgba(0, 187, 255, 0.03)
  &::after
    content: ''
    background: #00bbff
    height: 4px
    width: 100%
    position: absolute
    bottom: 0
    left: 0
  &__click
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: calc(100% - 4px)
    border-radius: 12px 12px 0 0
    background-color: #323249
    z-index: 10
    padding: 16px
  &__btn
    width: 100%
    padding: 10px
    margin: 16px 0 16px
    font-size: 13px
    line-height: 16px
  &__col
    margin-bottom: 32px
    +lg
      margin-bottom: 16px
      padding: 0 7px
  &__row
    +lg
      margin: 0 -7px
  &__img
    margin-bottom: 16px
  &__text
    display: flex
    flex-direction: column
    align-items: flex-start
    font-size: 13px
    line-height: 16px
    width: 100%
    color: white
  &__name
    color: white
    letter-spacing: 1px
    font-weight: 600
    margin-bottom: 4px
    font-size: 13px
    line-height: 16px
  &__desc
    color: rgba(224, 224, 255, 0.6)
    font-weight: 500
    font-size: 13px
    line-height: 16px
    &_emp
      color: white
      font-weight: 600
  &__acc
    color: #00bbff
    font-size: 13px
    line-height: 16px
    width: 100%
    background: rgba(0, 187, 255, 0.03)
    border-radius: 18px
    padding: 10px
    &:hover
      color: rgba(0, 187, 255, 0.6)
  &__price
    margin-top: 16px
    align-self: flex-end
    padding: 4px 8px
    color: rgba(20, 16, 41, 0.8)
    background: #00ffaa
    border-radius: 12px 3px 12px 3px
    font-weight: bold
  &__check
    position: absolute
    top: 16px
    left: 16px
    display: flex
    align-items: center
    justify-content: center
    width: 24px
    height: 24px
    border-radius: 50%
    background: #00bbff
    color: white
    font-size: 20px
  .icon
    height: 15px
</style>
