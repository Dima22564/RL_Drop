<template>
  <div>
    <form @submit.prevent="createFaq">
      <b-form-group
        label="Faq"
        label-for="Faq "
      >
        <div class="admin__prices">
          <b-form-group
            description="Title RU"
            class="admin__group w-50 mr-3"
          >
            <b-form-input
              id="input-3"
              required
              placeholder="Title RU"
              v-model="titleRu"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            description="Title EN"
            class="admin__group w-50 mr-3"
          >
            <b-form-input
              id="input-2"
              placeholder="Title EN"
              v-model="titleEn"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="admin__prices">
          <b-form-group
            description="Category RU"
            class="admin__group w-50 mr-3"
          >
            <b-form-input
              id="input-3"
              required
              placeholder="Category RU"
              v-model="categoryRu"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            description="Category EN"
            class="admin__group w-50 mr-3"
          >
            <b-form-input
              id="input-2"
              placeholder="Category EN"
              v-model="categoryEn"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="admin__prices">
          <b-form-textarea
            id="textarea-rows"
            placeholder="Text RU"
            v-model="textRu"
            rows="8"
            class="mr-3"
          ></b-form-textarea>

          <b-form-textarea
            id="textarea-rows"
            placeholder="Text EN"
            v-model="textEn"
            rows="8"
            class="mr-3"
          ></b-form-textarea>
        </div>

        <b-button type="submit" class="mt-3" variant="primary">Create</b-button>
      </b-form-group>
    </form>
    <div v-if="getFaqs.length > 0" class="mt-5 d-flex flex-wrap">
      <div class="mt-2 w-50 pr-3" v-for="faq in getFaqs" :key="faq.id">
        <b-button class="w-100" v-b-toggle="`collapse-${faq.id}`" variant="primary">{{ faq.title_ru }} ({{ faq.category_ru }})</b-button>
        <b-collapse :id="`collapse-${faq.id}`" class="mt-2">
          <b-card>
            <p class="card-text">{{ faq.title_ru }} ({{ faq.category_ru }})</p>
            <p class="card-text">{{ faq.title_en }} ({{ faq.category_en }})</p>
            <b-card class="mt-3">{{ faq.text_ru }}</b-card>
            <b-card>{{ faq.text_en }}</b-card>
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
      titleRu: '',
      titleEn: '',
      textRu: '',
      textEn: '',
      categoryRu: '',
      categoryEn: ''
    }
  },
  async mounted () {
    try {
      await this.$store.dispatch('faq/loadFaqs')
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
      data.append('text_ru', this.titleRu)
      data.append('text_en', this.textEn)
      data.append('title_ru', this.titleRu)
      data.append('title_en', this.titleEn)
      data.append('category_ru', this.categoryRu)
      data.append('category_en', this.categoryEn)
      try {
        const result = await this.$store.dispatch('faq/createFaq', data)
        if (result.success) {
          this.textEn = ''
          this.textRu = ''
          this.titleRu = ''
          this.titleEn = ''
          this.categoryEn = ''
          this.categoryRu = ''
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
