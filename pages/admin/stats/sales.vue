<template>
  <div>
    <div class="d-flex">
      <div class="w-50">
        <client-only>
          <v-chart
            :autoresize="true"
            ref="soldItemsGroupedByPlatforms"
            :manual-update="true"
            :options="soldItemsGroupedByPlatforms"
          />
        </client-only>
      </div>
<!--      <div class="w-50">-->
<!--        <client-only>-->
<!--          <v-chart-->
<!--            :autoresize="true"-->
<!--            ref="soldItemsGroupedByPlatforms"-->
<!--            :manual-update="true"-->
<!--            :options="soldItemsGroupedByPlatforms"-->
<!--          />-->
<!--        </client-only>-->
<!--      </div>-->
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
  mixins: [showNotification, updateChart],
  components: {
    'v-chart': ECharts
  },
  middleware: 'admin',
  data () {
    return {
      soldItemsGroupedByPlatforms: {
        title: {
          text: 'Items sales',
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
            name: 'Total sold',
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
      chestsSumPie: {
        title: {
          text: 'Total money',
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
      const result = await this.$store.dispatch('admin/stat/sales/loadSalesStats')
      this.mergeChartOptions(result.keys, result.data, this.$refs.soldItemsGroupedByPlatforms)
      this.mergeChartOptions(result.keys, result.data, this.$refs.soldItemsGroupedByPlatforms)
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  }
}
</script>
