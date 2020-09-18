<template>
  <div>
    <b-form @submit.prevent="update">
      <b-form-group
        label="Item name"
        label-for="name"
        description="Item Name"
      >
        <b-form-input
          id="name"
          type="text"
          placeholder="Enter Name"
          v-model.trim="form.name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Prices"
        label-for="Prices "
      >
        <div class="admin__prices">
          <b-form-group
            description="Xbox price"
            class="admin__group"
          >
            <b-form-input
              id="input-2"
              placeholder="Xbox"
              v-model.trim="form.xboxPrice"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            description="PS4 price"
            class="admin__group"
          >
            <b-form-input
              id="input-3"
              placeholder="PS4"
              v-model.trim="form.ps4Price"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            description="PC price"
            class="admin__group"
          >
            <b-form-input
              id="input-3"
              placeholder="PC"
              v-model.trim="form.pcPrice"
            ></b-form-input>
          </b-form-group>

        </div>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Item Type"
        label-for="input-3"
        description="Select item type">
        <b-form-select
          id="input-3"
          value-field="id"
          text-field="type"
          :options="getAllTypes"
          v-model.trim="form.itemType"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <client-only>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </client-only>
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-form-checkbox v-model="form.appearInChest" :value="true">Do this item appear in chest?</b-form-checkbox>
        <b-form-checkbox v-model="form.appearInCraft" :value="true">Do this item appear in craft?
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">Update</b-button>
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
      selected: null,
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        maxFiles: 1
      },
      form: {
        appearInChest: true,
        appearInCraft: true,
        itemType: '',
        xboxPrice: null,
        ps4Price: null,
        pcPrice: null,
        name: '',
        image: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getAllTypes: 'admin/itemTypes/getAllTypes'
    })
  },
  async mounted () {
    try {
      const result = await this.$store.dispatch('admin/item/loadItem', this.$route.params.id)
      this.form.name = result.data.name
      this.form.appearInChest = !!result.data.appearInChest
      this.form.appearInCraft = !!result.data.appearInCraft
      this.form.itemType = result.data.type.id
      this.form.xboxPrice = result.data.xboxPrice
      this.form.pcPrice = result.data.pcPrice
      this.form.ps4Price = result.data.ps4Price
      this.form.image = result.data.image
    } catch (e) {
      this.showNotification('Something went wrong(', 'danger')
    }
  },
  methods: {
    reset () {
      this.form.name = ''
      this.form.appearInChest = true
      this.form.appearInCraft = true
      this.form.itemType = ''
      this.form.xboxPrice = null
      this.form.pcPrice = null
      this.form.ps4Price = null
      this.$refs.myVueDropzone.removeAllFiles()
      this.$nextTick()
    },
    async update () {
      const data = new FormData()
      data.append('id', this.$route.params.id)
      data.append('name', this.form.name)
      data.append('appear_in_chest', this.form.appearInChest ? 1 : 0)
      data.append('appear_in_craft', this.form.appearInCraft ? 1 : 0)
      data.append('type', this.form.itemType)
      data.append('xbox_price', this.form.xboxPrice)
      data.append('pc_price', this.form.pcPrice)
      data.append('ps4_price', this.form.ps4Price)
      data.append('image', this.$refs.myVueDropzone.getAcceptedFiles()[0])
      console.log(this.$refs.myVueDropzone.getAcceptedFiles()[0])

      try {
        const result = await this.$store.dispatch('admin/item/update', data)
        if (result.success) {
          this.showNotification('Item created!', 'success')
          this.reset()
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
    justify-content: space-between
  &__group
    width: 30%
</style>
