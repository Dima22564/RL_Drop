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

      <b-list-group v-if="form.items.length > 0" class="mt-3 mb-3">
        <b-list-group-item
          v-for="(item, index) in form.items"
          :key="index"
          class="d-flex flex-row"
        >
          <div>
            <h5 class="mb-1">
              {{ item.name }}
            </h5>
            <img :src="item.image" class="option__image" alt="">
          </div>

          <b-form-group
            label="Weight"
            label-for="Weight "
            description="Enter Weight"
            class="ml-3"
          >
            <div class="admin__prices">
              <b-form-input
                id="input-7"
                v-model.trim.number="form.itemsWeights[index].weight"
                required
                placeholder="Weight"
              />
            </div>
          </b-form-group>
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
        Create
      </b-button>
      <b-button type="reset" variant="danger">
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'admin',
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
        oldPrice: null,
        category: null
      },
      removedItem: null
    }
  },
  watch: {
    'form.items' (val, oldVal) {
      if (val.length > oldVal.length) {
        this.form.itemsWeights.push({
          id: val[val.length - 1].id,
          weight: null
        })
      } else {
        this.form.itemsWeights = this.form.itemsWeights.filter((item) => {
          return item.id !== this.removedItem.id
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      getAllItems: 'admin/item/getAllItems'
    })
  },
  async created () {
    await this.$store.dispatch('admin/item/loadChestsItems')
  },
  methods: {
    removeItem (removedOption) {
      this.removedItem = removedOption
    },
    async submit () {
      const data = new FormData()
      const visibility = this.form.isChestVisible ? 1 : 0
      data.append('name', this.form.name)
      data.append('old_price', this.form.oldPrice)
      data.append('xbox_price', this.form.xboxPrice)
      data.append('pc_price', this.form.pcPrice)
      data.append('ps4_price', this.form.ps4Price)
      data.append('category', this.form.category)
      data.append('items', JSON.stringify(this.form.itemsWeights))
      data.append('image', this.$refs.myVueDropzone.getAcceptedFiles()[0])
      data.append('is_case_visible_for_user', visibility)
      try {
        const result = await this.$store.dispatch('admin/chest/creteChest', data)
        if (result.success) {
          this.$bvToast.toast('Case created', {
            title: `Notification`,
            variant: 'success',
            solid: true
          })
          this.reset()
        }
      } catch (e) {
        // if (typeof e.error.messages.type !== 'undefined') {
        //   this.$bvToast.toast(e.error.messages.type[0], {
        //     title: `Notification`,
        //     variant: 'danger',
        //     solid: true
        //   })
        //   return 0
        // }
        this.$bvToast.toast('Something went wrong(', {
          title: `Notification`,
          variant: 'danger',
          solid: true
        })
      }
    },
    reset () {
      this.form.oldPrice = null
      this.form.items = []
      this.form.itemsWeights = []
      this.removedItem = null
      this.form.name = null
      this.form.xboxPrice = null
      this.form.pcPrice = null
      this.form.ps4Price = null
      this.form.category = null
      this.$refs.myVueDropzone.removeAllFiles()
      this.$nextTick()
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
