<template>
  <div>
    <div>
      <client-only>
        <v-chart :autoresize="true" ref="pie" :manual-update="true" :options="pie" />
      </client-only>
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
  middleware: 'admin',
  mixins: [showNotification, updateChart],
  data () {
    return {
      pie: {
        title: {
          text: 'Items grouped by types',
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
            name: 'Item grouped by types',
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
  async created () {
    try {
      const result = await this.$store.dispatch('admin/stat/itemTypes/itemTypes')
      console.log()
      this.$refs.pie.resize({
        width: 700,
        height: 700
      })
      this.$refs.pie.mergeOptions({
        legend: {
          data: result.data.types
        },
        series: {
          data: result.data.graph
        },
        color: result.data.colors
      })
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  }
}
</script>
