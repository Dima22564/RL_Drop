<template>
  <div>
    <b-form>
      <b-form-group
        label="Item name"
        label-for="name"
        description="Item Name"
      >
        <b-form-input
          id="name"
          type="text"
          required
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Prices"
        label-for="Prices "
        description="Enter prices for all platforms"
      >
        <div class="admin__prices">
          <b-form-input
            id="input-2"
            required
            placeholder="Xbox"
          ></b-form-input>

          <b-form-input
            id="input-3"
            required
            placeholder="PS4"
          ></b-form-input>

          <b-form-input
            id="input-4"
            required
            placeholder="PC"
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

      <b-form-group id="input-group-5">
        <b-form-checkbox v-model="form.checked" :value="true">Do this item appear in craft?</b-form-checkbox>
      </b-form-group>

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
      dropzoneOptions: {
        url: '/',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        maxFiles: 1
      },
      form: {
        checked: false
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
</style>
