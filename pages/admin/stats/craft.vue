<template>
  <div>
    <div class="d-flex">
      <div class="w-50">
        <client-only>
          <v-chart
            :autoresize="true"
            ref="craftedItemsGroupedByPlatformsPie"
            :manual-update="true"
            :options="craftedItemsGroupedByPlatformsPie"
          />
        </client-only>
      </div>
      <div class="w-50">
        <client-only>
          <v-chart
            :autoresize="true"
            ref="craftedItemsCostGroupedByPlatformsPie"
            :manual-update="true"
            :options="craftedItemsCostGroupedByPlatformsPie"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import showNotification from '@/mixins/showNotification'
import updateChart from '@/mixins/updateChart'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataset'
export default {
  layout: 'admin',
  components: {
    'v-chart': ECharts
  },
  mixins: [showNotification, updateChart],
  data () {
    return {
      craftedItemsGroupedByPlatformsPie: {
        title: {
          text: 'Crafted items',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 24
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          textStyle: {
            fontSize: 16
          }
        },
        label: {
          fontSize: 16
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['dfgh', 'dfg', 'dff', 'ddf', 'dddv'],
          textStyle: {
            color: '#ffffff',
            fontSize: 16
          }
        },
        series: [
          {
            name: 'Items',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'dfgh' },
              { value: 310, name: 'dfg' },
              { value: 234, name: 'dff' },
              { value: 135, name: 'ddf' },
              { value: 1548, name: 'dddv' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      craftedItemsCostGroupedByPlatformsPie: {
        title: {
          text: 'Total craft spends',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 24
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          textStyle: {
            fontSize: 16
          }
        },
        label: {
          fontSize: 16
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['dfgh', 'dfg', 'dff', 'ddf', 'dddv'],
          textStyle: {
            color: '#ffffff',
            fontSize: 16
          }
        },
        series: [
          {
            name: 'Total spend',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'dfgh' },
              { value: 310, name: 'dfg' },
              { value: 234, name: 'dff' },
              { value: 135, name: 'ddf' },
              { value: 1548, name: 'dddv' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  async mounted () {
    try {
      const result = await this.$store.dispatch('admin/stat/craft/loadCraftStats', 1)
      this.mergeChartOptions(result.keys, result.craftedItemsByPlatforms, this.$refs.craftedItemsGroupedByPlatformsPie)
      this.mergeChartOptions(result.keys, result.craftedItemsCost, this.$refs.craftedItemsCostGroupedByPlatformsPie)
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  }
}
</script>
