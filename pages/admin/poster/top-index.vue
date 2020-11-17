<template>
  <b-container>
    <TopIndexBanner
      :title="form.title"
      :image="form.image"
      :mobileImage="form.mobileImage"
      :starttime="fullStartDate"
      :endtime="fullEndDate"
      :caseCategory="form.caseCategory"
    />
    <b-form @submit.prevent="saveBanner">
      <b-form-group
        description="Title"
        class="mt-4"
      >
        <b-form-input
          id="title"
          v-model="form.title"
          required
          placeholder="Title"
        />
      </b-form-group>
      <b-form-group
        description="Case category"
        class="mt-3"
      >
        <b-form-input
          id="title"
          v-model="form.caseCategory"
          required
          placeholder="Title"
        />
      </b-form-group>
      <div class="d-flex justify-content-between">
        <client-only>
          <vue-dropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            @vdropzone-success="bannerImg"
            :useCustomSlot="true"
            class="w-50 mr-3"
          >
            <div class="dropzone-custom-content">
              <h3 class="dropzone-custom-title">
                Desktop image
              </h3>
            </div>
          </vue-dropzone>
        </client-only>
        <client-only>
          <vue-dropzone
            id="mobileImage"
            ref="mobileImage"
            :options="mobileDropzoneOptions"
            @vdropzone-success="bannerMobileImg"
            :useCustomSlot="true"
            class="w-50"
            dict-default-message="Mobile image"
          >
            <div class="dropzone-custom-content">
              <h3 class="dropzone-custom-title">
                Mobile image
              </h3>
            </div>
          </vue-dropzone>
        </client-only>
      </div>

      <div class="d-flex justify-content-between mt-3">
        <div class="w-50 mr-3">
          <label for="eventStartDate">Event Start date</label>
          <b-form-datepicker
            id="eventStartDate"
            v-model="startDate"
            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
            locale="en"
          />
        </div>
        <div class="w-50 mr-3">
          <label for="eventEndDate">Event End date</label>
          <b-form-datepicker
            id="eventEndDate"
            v-model="endDate"
            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
            locale="en"
          />
        </div>
      </div>

      <div class="d-flex justify-content-between mt-3">
        <div class="w-50 mr-3">
          <label>Choose start time</label>
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input"
              v-model="startTime"
              type="text"
              placeholder="HH:mm:ss"
            />
            <b-input-group-append>
              <b-form-timepicker
                v-model="startTime"
                button-only
                right
                show-seconds
                locale="en"
                aria-controls="example-input"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="w-50 mr-3">
          <label>Choose end time</label>
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input-2"
              v-model="endTime"
              type="text"
              placeholder="HH:mm:ss"
            />
            <b-input-group-append>
              <b-form-timepicker
                v-model="endTime"
                button-only
                right
                show-seconds
                locale="en"
                aria-controls="example-input-2"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <b-button type="submit" variant="primary">
        Save
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import TopIndexBanner from '@/components/TopBanner'
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
export default {
  layout: 'admin',
  middleware: 'admin',
  components: {
    TopIndexBanner
  },
  mixins: [showNotification],
  data () {
    return {
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 200,
        maxFiles: 1
      },
      mobileDropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 200,
        maxFiles: 1
      },
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      form: {
        title: '',
        mobileImage: null,
        caseCategory: ''
      }
    }
  },
  async mounted () {
    try {
      const result = await this.$axios.$get(this.$axios.defaults.baseURL + '/admin/index-top-banner')
      this.form.title = result.data.banner.title
      this.form.image = result.data.banner.image
      this.form.mobileImage = result.data.banner.mobile_image
      this.form.caseCategory = result.data.banner.case_category
      const endTime = result.data.banner.end_date.split(' ')
      const startTime = result.data.banner.start_date.split(' ')
      this.startTime = startTime[1]
      this.endTime = endTime[1]
      this.startDate = startTime[0]
      this.endDate = endTime[0]
    } catch (e) {
      this.showNotification('Something went wrong!(', 'danger')
    }
  },
  methods: {
    bannerImg (file) {
      this.form.image = file.dataURL
    },
    bannerMobileImg (file) {
      this.form.mobileImage = file.dataURL
    },
    async saveBanner () {
      const formData = new FormData()
      formData.append('image', this.$refs.myVueDropzone.getAcceptedFiles()[0])
      formData.append('mobileImage', this.$refs.mobileImage.getAcceptedFiles()[0])
      formData.append('title', this.form.title)
      formData.append('startDate', this.fullStartDate)
      formData.append('endDate', this.fullEndDate)
      formData.append('caseCategory', this.form.caseCategory)
      try {
        const result = await this.$axios.$post(this.$axios.defaults.baseURL + '/admin/index-top-banner', formData)
        if (result.success) {
          this.showNotification('Banner saved!', 'success')
        }
      } catch (e) {
        this.showNotification('Something went wrong!(', 'danger')
      }
    }
  },
  computed: {
    ...mapGetters({
      getWindowSize: 'common/getWindowSize'
    }),
    fullStartDate () {
      return this.startDate + ' ' + this.endTime
    },
    fullEndDate () {
      return this.endDate + ' ' + this.startTime
    }
  }
}
</script>
