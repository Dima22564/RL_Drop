<template>
  <div>
    <b-form @submit.prevent="submit">
      <b-form-group
        label="Prices"
        label-for="Prices "
      >
        <div class="admin__prices">
          <b-form-group
            description="Old price"
            class="admin__group mr-3"
          >
            <b-form-input
              id="input-3"
              v-model.trim="form.oldPrice"
              required
              placeholder="Old price"
            />
          </b-form-group>

          <b-form-group
            description="Xbox price"
            class="admin__group mr-3"
          >
            <b-form-input
              id="input-2"
              v-model.trim="form.xboxPrice"
              placeholder="Xbox"
            />
          </b-form-group>

          <b-form-group
            description="PS4 price"
            class="admin__group mr-3"
          >
            <b-form-input
              id="input-3"
              v-model.trim="form.ps4Price"
              placeholder="PS4"
            />
          </b-form-group>

          <b-form-group
            description="PC price"
            class="admin__group"
          >
            <b-form-input
              id="input-3"
              v-model.trim="form.pcPrice"
              placeholder="PC"
            />
          </b-form-group>
        </div>
      </b-form-group>

      <b-form-group
        label="Name"
        label-for="name "
        description="Enter case name"
      >
        <b-form-input
          id="name"
          v-model.trim="form.name"
          required
          placeholder="Name"
        />
      </b-form-group>

      <b-form-group
        label="Category"
        label-for="category "
        description="Enter case Category"
      >
        <b-form-input
          id="category"
          v-model.trim="form.category"
          required
          placeholder="Category"
        />
      </b-form-group>

      <b-form-group id="input-group-4">
        <client-only>
          <vue-dropzone id="dropzone" ref="myVueDropzone" :options="dropzoneOptions" />
        </client-only>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="Select Items"
        label-for="input-3"
        description="Select items"
      >
        <multiselect
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          v-model.trim="form.items"
          :options="getAllItems"
          :option-height="104"
          :show-labels="false"
          @remove="removeItem"
          placeholder="Select items"
          label="name"
          track-by="name"
        >
          <template
            slot="singleLabel"
            slot-scope="props"
          >
            <img
              :src="props.option.image"
              class="option__image"
              alt="No Man’s Sky"
            >
            <span class="option__desc">
              <span class="option__title">{{ props.option.name }}</span>
            </span>
          </template>
          <template slot="option" slot-scope="props">
            <div class="option">
              <img
                :src="props.option.image"
                class="option__image"
                alt="No Man’s Sky"
              >
              <div class="option__desc">
                <span class="option__title">{{ props.option.name }}</span>
              </div>
            </div>
          </template>
        </multiselect>
      </b-form-group>

      <b-list-group v-if="form.name" class="mt-3 mb-3">
        <b-list-group-item
          v-for="(item, index) in form.items"
          :key="index"
          class="d-flex flex-row"
        >
          <div class="d-flex align-items-center">
            <div>
              <h5 class="mb-1">
                {{ item.name }}
              </h5>
              <img :src="item.image" class="option__image" alt="">
            </div>
            <p class="ml-3 mr-3">
              Weight {{ item.weight }}
            </p>
            <b-form-input
              id="input-7"
              v-model.trim.number="item.weight"
              :value="item.weight"
              required
              placeholder="Weight"
            />
          </div>
        </b-list-group-item>
      </b-list-group>

      <b-form-group
        label="Visibility"
        label-for="visibility"
        description="Case visibility"
        class="mt-3 mb-3"
      >
        <b-form-checkbox v-model="form.isChestVisible" :value="true">
          Is this case visible for user
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">
        Update
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
export default {
  layout: 'admin',
  mixins: [showNotification],
  data () {
    return {
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        maxFiles: 1
      },
      form: {
        pcPrice: null,
        xboxPrice: null,
        ps4Price: null,
        items: [],
        itemsWeights: [],
        isChestVisible: true,
        name: null,
        oldPrice: null
      },
      removedItem: null
    }
  },
  computed: {
    ...mapGetters({
      getAllItems: 'admin/item/getAllItems'
    })
  },
  async created () {
    try {
      const result = await this.$store.dispatch('admin/chest/loadChest', this.$route.params.id)
      this.form.items = result.data.items
      // result.data.items.forEach(function (item, i, arr) {
      // })
      this.form.name = result.data.name
      this.form.pcPrice = result.data.pcPrice
      this.form.xboxPrice = result.data.xboxPrice
      this.form.ps4Price = result.data.ps4Price
      this.form.isChestVisible = !!result.data.visibility
      this.form.oldPrice = result.data.oldPrice
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  },
  methods: {
    removeItem (removedOption) {
      this.removedItem = removedOption
    },
    async submit () {
      const data = new FormData()
      const visibility = this.form.isChestVisible ? 1 : 0
      data.append('id', this.$route.params.id)
      data.append('name', this.form.name)
      data.append('price', this.form.price)
      data.append('xbox_price', this.form.xboxPrice)
      data.append('pc_price', this.form.pcPrice)
      data.append('ps4_price', this.form.ps4Price)
      data.append('items', JSON.stringify(this.form.items))
      data.append('image', this.$refs.myVueDropzone.getAcceptedFiles()[0])
      data.append('is_case_visible_for_user', visibility)
      try {
        const result = await this.$store.dispatch('admin/chest/update', data)
        if (result.success) {
          this.showNotification('Case updated!', 'success')
        }
      } catch (e) {
        this.showNotification('Something went wrong(', 'danger')
      }
    }
  }
}
</script>

<style lang="sass">
.admin
  label
    color: white
    margin-bottom: 10px
  &__prices
    display: flex
    input
      &:not(:last-child)
        margin-right: 20px
.option
  display: flex
  &__image
    width: 150px
    height: 150px
    border-radius: 5px
  &__desc
    padding: 10px 15px
</style>
