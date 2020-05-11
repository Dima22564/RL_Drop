<template>
  <section class="faq">
    <b-container>
      <div class="faq__title">
        <h2>FAQ</h2>
        <div v-if="getWindowSize > 991" class="faq__filter">
          <span>General Questions</span>
          <span>Balance Withdrawal</span>
          <span>Premium</span>
          <span>Case Battle</span>
        </div>
        <multiselect
          v-model="value"
          v-else
          :options="options"
          :searchable="false"
          :allowEmpty="false"
          :showLabels="false"
          :hideSelected="true"
          class="faq__select"
        />
      </div>
      <b-row>
        <Faq
          title="Can I use Steam wallet funds to open cases on this site?"
          text="Your payment might be delayed for 5-10 minutes. If money didn`t get transferred within an hour, please contact the support, write details of payment to RLDrop Support"
        />
        <Faq
          title="Can I use Steam wallet funds to open cases on this site?"
          text="Your payment might be delayed for 5-10 minutes. If money didn`t get transferred within an hour, please contact the support, write details of payment to RLDrop Support"
        />
        <Faq
          title="Can I use Steam wallet funds to open cases on this site?"
          text="Your payment might be delayed for 5-10 minutes. If money didn`t get transferred within an hour, please contact the support, write details of payment to RLDrop Support"
        />
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Faq from '../components/Faq'
export default {
  layout: 'default',
  components: {
    Faq
  },
  data () {
    return {
      value: 'General Questions',
      options: ['General Questions', 'Balance Withdrawal', 'Premium', 'Case Battle']
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
.faq
  padding: 16px 0 32px
  &__title
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 32px
  &__filter
    font-size: 14px
    color: rgba(224, 224, 255, 0.6)
    font-weight: 500
    display: flex
    align-items: center
    span
      padding: 6px 16px
      border-radius: 18px
      cursor: pointer
      transition: all 0.1s
      &:hover
        color: white
      &:not(:last-child)
        margin-right: 16px
  &__select
    width: initial
    min-width: 200px
  .multiselect
    &__tags
      min-height: initial
      padding: 6px 42px 6px 12px
      border-radius: 18px
      box-shadow: 0 8px 8px -4px rgba(0, 187, 255, 0.12), 0 16px 24px 0 rgba(0, 187, 255, 0.24), 0 2px 4px -1px rgba(10, 70, 82, 0.12), 0 0 1px 0 rgba(0, 187, 255, 0.24)
      background-image: linear-gradient(101deg, #00ffaa, #00bbff 53%, #4579f5)
      border: none
      cursor: pointer
    &__element
      font-size: 14px
      line-height: 18px
    &__single
      margin-bottom: 0
      padding: 0
      background: transparent
      color: white
      font-size: 14px
      font-weight: 500
      line-height: 24px
    &__placeholder
      margin-bottom: 0
      padding: 0
      background: transparent
      color: white
      font-size: 14px
      font-weight: 500
      line-height: 24px
    &__select
      height: 32px
      &::before
        border-color: white transparent transparent
</style>
