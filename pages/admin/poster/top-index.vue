<template>
  <b-container>
    <TopIndexBanner
      :title="form.title"
    />
    <div>
      <b-form-group
        description="Title"
        class="mt-5"
      >
        <b-form-input
          id="title"
          v-model="form.title"
          required
          placeholder="Title"
        />
      </b-form-group>
    </div>
  </b-container>
</template>

<script>
import TopIndexBanner from '@/components/TopBanner'
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'admin',
  components: {
    TopIndexBanner
  },
  data () {
    return {
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        maxFiles: 1
      },
      form: {
        title: 'Ice melting effect',
        xboxPrice: null,
        ps4Price: null,
        items: [],
        itemsWeights: [],
        isChestVisible: true,
        name: null,
        oldPrice: null,
        category: null
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
