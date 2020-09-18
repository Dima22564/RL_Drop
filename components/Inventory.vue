<template>
  <div>
    <!-- Inventory  adapted = true -->
    <section class="inventory">
      <b-container>
        <div class="inventory__top">
          <h3>{{ $t('inventory') }}</h3>
          <div v-if="getWindowSize >= 991 && options.length > 0" class="inventory__filter">
            <div
              v-for="opt in options"
              :key="opt.platform"
              @click="filterItems = opt"
              class="inventory__filterItem"
              :class="filterItems.platform === opt.platform ? 'inventory__filterItem_active' : ''"
            >
              <span>{{ opt.platform.toUpperCase() }}</span>
              <span class="quantity">{{ opt.count }}</span>
            </div>
          </div>
          <client-only v-else>
            <multiselect
              v-if="options.length > 0"
              v-model="filterItems"
              :options="options"
              :searchable="false"
              :allowEmpty="false"
              :showLabels="false"
              track-by="platform"
              :hideSelected="true"
              class="inventory__select"
            >
              <template slot="singleLabel" slot-scope="props">
                <div class="customLabel">
                  <span class="customLabel__name">{{ props.option.platform }}</span>
                  <span class="customLabel__num">{{ props.option.count }}</span>
                </div>
              </template>
              <template slot="option" slot-scope="props">
                <div class="customLabel">
                  <span class="customLabel__name">{{ props.option.platform }}</span>
                  <span class="customLabel__num">{{ props.option.count }}</span>
                </div>
              </template>
            </multiselect>
          </client-only>
        </div>

        <b-row class="inventoryItem__row" v-if="getInventory.length > 0">
          <InventoryItem
            v-for="item in getInventory"
            :key="item.pivot.id"
            :pivot-id="item.pivot.id"
            :id="item.id"
            :img="item.image"
            :name="item.name"
            :platform="item.platform"
            :price="Number(item[`${item.platform}Price`])"
            desc="fdgfd"
            class="inventoryItem__col"
            v-show="filterItems.platform === item.platform"
          />
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventBus } from '@/plugins/event-bus'
import showNotification from '@/mixins/showNotification'
import InventoryItem from './InventoryItem'
export default {
  data () {
    return {
      filterItems: {},
      options: []
    }
  },
  mixins: [showNotification],
  components: {
    InventoryItem
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize',
      getInventory: 'user/getInventory',
      getPlatform: 'common/getPlatform'
    })
  },
  async mounted () {
    try {
      const result = await this.$store.dispatch('user/loadInventory')
      if (!result.data) {
        this.options = []
      } else {
        this.options = result.data.count
        if (result.data.count.length > 0) {
          this.filterItems = result.data.count[0]
        }
      }
    } catch (e) {
      console.log(e)
    }
    eventBus.$off('sellItem')
    eventBus.$on('sellItem', async (data) => {
      try {
        const sellData = new FormData()
        sellData.append('platform', data.platform)
        sellData.append('id', data.id)
        console.log(data)
        const result = await this.$store.dispatch('item/sell', sellData)
        if (result.data) {
          this.$store.commit('user/deleteInventoryItemById', data.pivotId)
          this.$store.commit('user/changeUserBalance', data.price * 1)
        }
      } catch (e) {
        this.showNotification('Something went wrong(', 'danger')
      }
    })
  }
}
</script>

<style lang="sass"></style>
