<template>
  <div>
    <div class="admin__dates mt-5 mb-3">
      <div class="mr-3 w-50">
        <label>Date from</label>
        <b-form-datepicker
          placeholder="Choose a date"
          v-model="form.dateFrom"
          class="mb-2"
          today-button
          reset-button
          close-button
          locale="en"
          :date-format-options="{ year: 'numeric', month: 'short' }"
        ></b-form-datepicker>
      </div>
      <div class="w-50">
        <label>Date To</label>
        <b-form-datepicker
          placeholder="Choose a date"
          v-model="form.dateTo"
          class="mb-2"
          today-button
          reset-button
          close-button
          locale="en"
          :date-format-options="{ year: 'numeric', month: 'short' }"
        ></b-form-datepicker>
      </div>
      <b-button
        @click.prevent="loadOpenedChestsBetweenTime"
        :disabled="btnDisabled"
        class="ml-3 mb-2"
        variant="success"
      >Show</b-button>
    </div>
    <div class="admin__chart mb-3">
      <apexchart
        ref="chart"
        :options="openedChestsBar.chartOptions"
        :series="openedChestsBar.series"
        type="bar"
        height="400"
        id="chart"
      />
    </div>
    <div class="d-flex">
      <div class="w-50">
        <client-only>
          <v-chart :autoresize="true" ref="chestsPlatformsPie" :manual-update="true" :options="chestsPlatformsPie" />
        </client-only>
      </div>
      <div class="w-50">
        <client-only>
          <v-chart :autoresize="true" ref="chestsSumPie" :manual-update="true" :options="chestsSumPie" />
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
      btnDisabled: false,
      form: {
        dateFrom: '',
        dateTo: ''
      },
      openedChestsBar: {
        series: [
          {
            name: 'Cases',
            data: []
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            id: 'chart',
            selection: {
              enabled: true
            },
            plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
                  position: 'top'
                }
              }
            },
            zoom: {
              enabled: false
            },
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: true,
              autoSelected: 'zoom'
            }
          },
          theme: {
            palette: 'palette1',
            mode: 'dark'
          },
          // colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
            position: 'middle',
            style: {
              fontSize: '25px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 'bold',
              colors: ['white']
            },
            offsetY: 30
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Opened Chests',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7'
            // row: {
            //   colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            //   opacity: 0.5
            // }
          },
          markers: {
            size: 1
          },
          xaxis: {
            type: 'categories',
            categories: [],
            title: {
              text: 'Date'
            }
          },
          yaxis: {
            floating: false,
            decimalsInFloat: 0,
            title: {
              text: 'Chests opened'
            },
            min: 1,
            labels: {
              formatter (val, index) {
                return val.toFixed(0)
              }
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -25,
            offsetX: -5
          }
        }
      },
      chestsPlatformsPie: {
        title: {
          text: 'Opened chests',
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
            name: 'Total opened',
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
  methods: {
    async updateChart (series, options, chart) {
      if (options.length > 0) {
        await chart.updateOptions({
          xaxis: {
            categories: options
          }
        })
      }
      if (series.length > 0) {
        chart.updateSeries([{
          data: series
        }])
      }
    },
    async loadOpenedChestsBetweenTime () {
      this.btnDisabled = true
      const data = new FormData()
      data.append('dateFrom', this.form.dateFrom)
      data.append('dateTo', this.form.dateTo)
      try {
        const result = await this.$store.dispatch('admin/stat/chest/loadOpenedChestsBetweenTime', data)
        await this.updateChart(result.data.quantity, result.data.dates, this.$refs.chart)
      } catch (e) {
        this.showNotification('Something went wrong(', 'danger')
      } finally {
        this.btnDisabled = false
      }
    }
  },
  async mounted () {
    try {
      const result = await this.$store.dispatch('admin/stat/chest/loadChestStats', 0)
      this.openedChestsBar.series[0].data = result.quantity
      this.openedChestsBar.chartOptions.xaxis.categories = result.dates
      await this.updateChart(result.quantity, result.dates, this.$refs.chart)
      this.mergeChartOptions(result.keys, result.chestByPlatforms, this.$refs.chestsPlatformsPie)
      this.mergeChartOptions(result.keys, result.chestsPrice, this.$refs.chestsSumPie)
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  }
}
</script>

<style lang="sass">
.apexcharts-svg
  background: transparent !important
.admin
  &__dates
    display: flex
    align-items: flex-end
.b-form-btn-label-control.form-control > label
  color: black !important
</style>
