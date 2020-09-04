<template>
  <div>
    <b-form>
      <b-form-group
        label="Prices"
        label-for="Prices "
        description="Enter prices for all platforms"
      >
        <div class="admin__prices">
          <b-form-input
            id="input-2"
            required
            placeholder="Actual price"
          ></b-form-input>

          <b-form-input
            id="input-3"
            required
            placeholder="Old price"
          ></b-form-input>
        </div>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Item Type"
        label-for="input-3"
        description="Enter item type">
        <b-form-select
          id="input-3"
          :options="types"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <client-only>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </client-only>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="Select Items"
        label-for="input-3"
        description="Select items">
        <multiselect
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          v-model="form.items"
          placeholder="Select items"
          label="title"
          track-by="title"
          :options="options"
          :option-height="104"
          :show-labels="false">

          <template
            slot="singleLabel"
            slot-scope="props">
            <img
              class="option__image"
              :src="props.option.img"
              alt="No Man’s Sky"
            >
            <span class="option__desc">
              <span class="option__title">{{ props.option.title }}</span>
            </span>
          </template>
          <template slot="option" slot-scope="props">
            <div class="option">
              <img
                class="option__image"
                :src="props.option.img"
                alt="No Man’s Sky"
              >
              <div class="option__desc">
                <span class="option__title">{{ props.option.title }}</span>
                <span class="option__small">{{ props.option.desc }}</span>
              </div>
            </div>
          </template>
        </multiselect>
      </b-form-group>

      <b-list-group v-if="form.items.length > 0" class="mt-3 mb-3">
        <b-list-group-item
          v-for="item in form.items"
          :key="item.title"
          class="d-flex flex-row"
        >
          <div>
            <h5 class="mb-1">{{ item.title }}</h5>
            <img class="option__image" :src="item.img" alt="">
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
                required
                placeholder="Weight"
              ></b-form-input>
            </div>
          </b-form-group>
        </b-list-group-item>
      </b-list-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  layout: 'admin',
  data () {
    return {
      selected: null,
      types: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      options: [
        { title: 'Space Pirate', desc: 'More space battles!', img: 'https://schastievkadre.ru/wp-content/uploads/2018/11/blog-1-2000x1125.jpg' },
        { title: 'Merchant', desc: 'PROFIT!', img: 'https://schastievkadre.ru/wp-content/uploads/2018/11/blog-1-2000x1125.jpg' },
        { title: 'Explorer', desc: 'Discovering new species!', img: 'https://schastievkadre.ru/wp-content/uploads/2018/11/blog-1-2000x1125.jpg' }
      ],
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        maxFiles: 1
      },
      form: {
        checked: false,
        items: []
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
