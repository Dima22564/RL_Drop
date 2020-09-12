<template>
  <div class="mt-3">
    <b-table
      head-variant="dark"
      striped
      hover
      small
      :fields="fields"
      :items="getAllChests"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="sm"
      id="chests"
    >
      <!-- A virtual column -->
      <template class="text-light" v-slot:cell(id)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(name)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(image)="data">
        <img class="admin__image" :src="data.value" alt="">
      </template>

      <!-- A virtual composite column -->
      <template v-slot:cell(price)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template v-slot:cell(oldPrice)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(visibility)="data">
        <b-form-checkbox disabled v-model="data.value ? true : false"></b-form-checkbox>
      </template>

      <template v-slot:cell()="data">
        <b-button pill variant="success">Change</b-button>
        <b-button @click.prevent="deleteChest(data.item.id)" pill variant="danger">Delete</b-button>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="chests"
      align="center"
      dark
    ></b-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  data () {
    return {
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'price', label: 'Price' },
        { key: 'oldPrice', label: 'Old price' },
        { key: 'visibility', label: 'Is case visible' },
        { key: 'name', label: 'Name' },
        'image',
        'actions'
      ],
      currentPage: 1,
      perPage: 10
    }
  },
  async created () {
    await this.$store.dispatch('admin/chest/loadAllChests')
  },
  methods: {
    async deleteChest (id) {
      try {
        const result = await this.$store.dispatch('admin/chest/deleteChest', id)
        if (result.success) {
          this.$bvToast.toast('Chest deleted!', {
            title: `Notification`,
            variant: 'success',
            solid: true
          })
        }
      } catch (e) {
        this.$bvToast.toast('Something went wrong(', {
          title: `Notification`,
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      getAllChests: 'admin/chest/getAllChests'
    }),
    rows () {
      if (this.getAllChests) {
        return this.getAllChests.length
      }
      return 0
    }
  }
}
</script>

<style lang="sass">
.admin
  &__image
    width: 205px
    height: 155px
  td
    vertical-align: middle
</style>
