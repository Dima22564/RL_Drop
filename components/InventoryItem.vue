<template>
  <b-col xl="2" lg="2" md="3" sm="4" cols="6">
    <div class="inventoryItem">
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
export default {
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
      type: Number,
      required: true
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
  &::after
    content: ''
    background: #00bbff
    height: 4px
    width: 100%
    position: absolute
    bottom: 0
    left: 0
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
  &__desc
    color: rgba(224, 224, 255, 0.6)
    font-weight: 500
  &__price
    margin-top: 16px
    align-self: flex-end
    padding: 4px 8px
    color: rgba(20, 16, 41, 0.8)
    background: #00ffaa
    border-radius: 12px 3px 12px 3px
    font-weight: bold
</style>
