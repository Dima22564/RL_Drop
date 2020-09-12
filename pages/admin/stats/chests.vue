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
        @click.prevent="loadNewTime"
        :disabled="btnDisabled"
        class="ml-3 mb-2"
        variant="success"
      >Show</b-button>
    </div>
    <div class="admin__chart">
      <apexchart
        ref="chart"
        :options="chartOptions"
        :series="series"
        type="bar"
        height="400"
        id="chart"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      btnDisabled: false,
      form: {
        dateFrom: '',
        dateTo: ''
      },
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
    async loadNewTime () {
      this.btnDisabled = true
      const data = new FormData()
      data.append('dateFrom', this.form.dateFrom)
      data.append('dateTo', this.form.dateTo)
      try {
        const result = await this.$store.dispatch('admin/stat/loadNewStats', data)
        await this.updateChart(result.data.quantity, result.data.dates, this.$refs.chart)
      } catch (e) {
        this.$bvToast.toast('Something went wrong(', {
          title: `Notification`,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.btnDisabled = false
      }
    }
  },
  async created () {
    try {
      const result = await this.$store.dispatch('admin/stat/loadStats')
      this.series[0].data = result.quantity
      this.chartOptions.xaxis.categories = result.dates
      await this.updateChart(result.quantity, result.dates, this.$refs.chart)
      console.log(result)
    } catch (e) {
      console.log(e)
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
