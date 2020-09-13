<template>
  <div>
    <!-- Inventory  adapted = true -->
    <section class="inventory">
      <b-container>
        <div class="inventory__top">
          <h3>Inventory</h3>
          <div v-if="getWindowSize >= 991" class="inventory__filter">
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
            :img="item.image"
            :name="item.name"
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
import InventoryItem from './InventoryItem'
export default {
  data () {
    return {
      filterItems: {},
      options: []
    }
  },
  components: {
    InventoryItem
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize',
      getInventory: 'user/getInventory'
    })
  },
  async mounted () {
    try {
      const result = await this.$store.dispatch('user/loadInventory')
      this.options = result.data.count
      this.filterItems = this.options[0]
      console.log(result.data.count)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="sass"></style>
