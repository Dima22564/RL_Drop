<template>
  <b-container>
    <BottomIndexBanner
      :title="form.title"
      :image="form.image"
      :mobileImage="form.mobileImage"
      :text_en="form.textEn"
      :text_ru="form.textRu"
      :case-id="form.caseId"
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
        description="Case Id"
        class="mt-3"
      >
        <b-form-input
          id="title"
          v-model="form.caseId"
          required
          placeholder="Case id"
        />
      </b-form-group>
      <div class="mb-3 d-flex justify-content-between">
        <b-form-group
          description="Text Ru"
          class="mr-3 w-50"
        >
          <b-form-textarea
            id="textarea"
            v-model="form.textRu"
            placeholder="Text Ru"
            rows="3"
            max-rows="6"
          />
        </b-form-group>
        <b-form-group
          description="Text Ru"
          class="w-50"
        >
          <b-form-textarea
            id="textarea"
            v-model="form.textEn"
            placeholder="Text En"
            rows="3"
            max-rows="6"
          />
        </b-form-group>

      </div>
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
          >
            <div class="dropzone-custom-content">
              <h3 class="dropzone-custom-title">
                Mobile image
              </h3>
            </div>
          </vue-dropzone>
        </client-only>
      </div>

      <b-button class="mt-3" type="submit" variant="primary">
        Save
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import BottomIndexBanner from '@/components/BottomBanner'
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
export default {
  layout: 'admin',
  middleware: 'admin',
  components: {
    BottomIndexBanner
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
      form: {
        title: '',
        mobileImage: null,
        image: null,
        caseId: '',
        textRu: '',
        textEn: ''
      }
    }
  },
  async mounted () {
    try {
      const result = await this.$axios.$get(this.$axios.defaults.baseURL + '/admin/index-bottom-banner')
      this.form.title = result.data.banner.title
      this.form.image = result.data.banner.image
      this.form.mobileImage = result.data.banner.mobile_image
      this.form.caseId = result.data.banner.case_id
      this.form.textEn = result.data.banner.text_en
      this.form.textRu = result.data.banner.text_ru
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
      formData.append('textRu', this.form.textRu)
      formData.append('textEn', this.form.textEn)
      formData.append('caseId', this.form.caseId)
      try {
        const result = await this.$axios.$post(this.$axios.defaults.baseURL + '/admin/index-bottom-banner', formData)
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
    })
  }
}
</script>
