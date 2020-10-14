<template>
  <div>
    <b-form @submit.prevent="createItem">
      <b-form-group
        label="Item name"
        label-for="name"
        description="Item Name"
      >
        <b-form-input
          id="name"
          v-model.trim="form.name"
          type="text"
          placeholder="Enter Name"
        />
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
              v-model.trim="form.xboxPrice"
              placeholder="Xbox"
            />
          </b-form-group>

          <b-form-group
            description="PS4 price"
            class="admin__group"
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

      <b-form-group>
        <div class="admin__prices admin__colorsBlock">
          <b-form-group
            id="input-group-color"
            label="Item Color"
            label-for="input-3"
            description="Select item color"
            class="admin__colorItem"
          >
            <b-form-select
              id="input-3"
              :options="getColors"
              v-model.trim="form.itemColor"
              value-field="color"
              text-field="name"
            />
          </b-form-group>
          <div :style="{ background: form.itemColor }" class="admin__color" />
        </div>
      </b-form-group>

      <b-form-group
        description="Enter text"
        label="Text"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.text"
          placeholder="Enter text"
          rows="3"
          max-rows="6"
        />
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Item Type"
        label-for="input-3"
        description="Select item type"
      >
        <b-form-select
          id="input-3"
          :options="getAllTypes"
          v-model.trim="form.itemType"
          value-field="id"
          text-field="type"
        />
      </b-form-group>

      <b-form-group id="input-group-4">
        <client-only>
          <vue-dropzone id="dropzone" ref="myVueDropzone" :options="dropzoneOptions" />
        </client-only>
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-form-checkbox v-model="form.appearInChest" :value="true">
          Do this item appear in chest?
        </b-form-checkbox>
        <b-form-checkbox v-model="form.appearInCraft" :value="true">
          Do this item appear in craft?
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">
        Submit
      </b-button>
      <b-button @click.prevent="reset" type="reset" variant="danger">
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
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
        itemColor: '',
        text: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getAllTypes: 'admin/colors/getAllTypes',
      getColors: 'admin/colors/getColors'
    })
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
      this.form.itemColor = ''
      this.form.text = ''
      this.$refs.myVueDropzone.removeAllFiles()
      this.$nextTick()
    },
    async createItem () {
      const data = new FormData()
      data.append('name', this.form.name)
      data.append('appear_in_chest', this.form.appearInChest ? 1 : 0)
      data.append('appear_in_craft', this.form.appearInCraft ? 1 : 0)
      data.append('type', this.form.itemType)
      data.append('color', this.form.itemColor)
      data.append('text', this.form.text)
      data.append('xbox_price', this.form.xboxPrice)
      data.append('pc_price', this.form.pcPrice)
      data.append('ps4_price', this.form.ps4Price)
      data.append('image', this.$refs.myVueDropzone.getAcceptedFiles()[0])

      try {
        const result = await this.$store.dispatch('admin/item/createItem', data)
        if (result.success) {
          this.$bvToast.toast('Item created', {
            title: `Notification`,
            variant: 'success',
            solid: true
          })
          this.reset()
        }
      } catch (e) {
        this.$bvToast.toast('Something went wrong(', {
          title: `Notification`,
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>

<style lang="sass">
.admin
  legend
    color: white !important
  label
    color: white !important
    margin-bottom: 10px
  &__prices
    display: flex
    justify-content: space-between
  &__group
    width: 30%
  &__color
    width: 80px
    height: 80px
  &__colorItem
    width: 50%
    margin-right: 24px
  &__colorsBlock
    justify-content: flex-start !important
    align-items: center
</style>
