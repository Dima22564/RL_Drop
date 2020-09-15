<template>
  <div>
    <form @submit.prevent="createFaq">
      <b-form-group
        label="Faq"
        label-for="Faq "
      >
        <div class="admin__prices">
          <b-form-group
            description="Title"
            class="admin__group w-50 mr-3"
          >
            <b-form-input
              id="input-3"
              required
              placeholder="Title"
              v-model="title"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            description="Category"
            class="admin__group w-50 mr-3"
          >
            <b-form-input
              id="input-2"
              placeholder="Category"
              v-model.trim="category"
            ></b-form-input>
          </b-form-group>
        </div>

        <b-form-textarea
          id="textarea-rows"
          placeholder="Faq title"
          v-model="text"
          rows="8"
        ></b-form-textarea>

        <b-button type="submit" class="mt-3" variant="primary">Create</b-button>
      </b-form-group>
    </form>
    <div v-if="getFaqs.length > 0" class="mt-5 d-flex flex-wrap">
      <div class="mt-2 w-50 pr-3" v-for="faq in getFaqs" :key="faq.id">
        <b-button class="w-100" v-b-toggle="`collapse-${faq.id}`" variant="primary">{{ faq.title }} ({{ faq.category }})</b-button>
        <b-collapse :id="`collapse-${faq.id}`" class="mt-2">
          <b-card>
            <p class="card-text">{{ faq.title }} ({{ faq.category }})</p>
            <b-card>{{ faq.text }}</b-card>
          </b-card>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import showNotification from '@/mixins/showNotification'
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  mixins: [showNotification],
  data () {
    return {
      title: '',
      text: '',
      category: ''
    }
  },
  async mounted () {
    try {
      await this.$store.dispatch('faq/getFaqs')
    } catch (e) {
      this.showNotification('Unable to load faqs!', 'danger')
    }
  },
  computed: {
    ...mapGetters({
      getFaqs: 'faq/getFaqs'
    })
  },
  methods: {
    async createFaq () {
      const data = new FormData()
      data.append('title', this.title)
      data.append('text', this.text)
      data.append('category', this.category)

      try {
        await this.$store.dispatch('faq/createFaq', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
