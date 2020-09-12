<template>
  <div>
    <b-form @submit.prevent="createItemType" class="d-flex align-items-center">
      <b-form-group
        label="Item type"
        label-for="name"
        description="Item Type"
        class="w-50"
      >
        <b-form-input
          id="name"
          type="text"
          required
          placeholder="Enter Item Type"
          v-model.trim="type"
          class="w-100"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="ml-3 mb-2" variant="success">Create</b-button>
    </b-form>

    <h5 class="admin__title">Types</h5>
    <b-list-group>
      <b-list-group-item v-for="type in getAllTypes" :key="type.type">{{ type.type }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  data () {
    return {
      type: ''
    }
  },
  computed: {
    ...mapGetters({
      getAllTypes: 'admin/itemTypes/getAllTypes'
    })
  },
  methods: {
    async createItemType () {
      const data = new FormData()
      data.append('type', this.type)

      try {
        const result = await this.$store.dispatch('admin/itemTypes/createType', data)
        if (result.success) {
          this.type = ''
          this.$bvToast.toast('Type created', {
            title: `Notification`,
            variant: 'success',
            solid: true
          })
        }
      } catch (e) {
        if (typeof e.error.messages.type !== 'undefined') {
          this.$bvToast.toast(e.error.messages.type[0], {
            title: `Notification`,
            variant: 'danger',
            solid: true
          })
          return 0
        }
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
  &__title
    color: white
    margin-bottom: 10px
</style>
