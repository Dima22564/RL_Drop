<template>
  <div>
    <b-table
      head-variant="dark"
      striped
      hover
      small
      :fields="fields"
      :items="getAllItems"
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

      <template v-slot:cell(type)="data">
        <span class="text-light">{{ data.value.type }}</span>
      </template>

      <template v-slot:cell(image)="data">
        <img class="admin__image" :src="data.value" alt="">
      </template>

      <!-- A virtual composite column -->
      <template v-slot:cell(xboxPrice)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template v-slot:cell(pcPrice)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(ps4Price)="data">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(appearInChest)="data">
        <b-form-checkbox disabled v-model="data.value === 1 ? true : false"></b-form-checkbox>
      </template>

      <template v-slot:cell(appearInCraft)="data">
        <b-form-checkbox disabled v-model="data.value === 1 ? true : false"></b-form-checkbox>
      </template>

      <template v-slot:cell()="data">
        <b-button pill variant="success" :to="`/admin/items/${data.item.id}`">Change</b-button>
        <b-button @click.prevent="deleteItem(data.item.id)" pill variant="danger">Delete</b-button>
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
        { key: 'name', label: 'Name' },
        { key: 'xboxPrice', label: 'Xbox Price' },
        { key: 'pcPrice', label: 'Pc price' },
        { key: 'ps4Price', label: 'PS4 Price' },
        { key: 'type', label: 'Type' },
        { key: 'appearInChest', label: 'In chest' },
        { key: 'appearInCraft', label: 'In craft' },
        'image',
        'actions'
      ],
      currentPage: 1,
      perPage: 10
    }
  },
  async created () {
    await this.$store.dispatch('admin/item/loadAllItems')
  },
  methods: {
    async deleteItem (id) {
      try {
        const result = await this.$store.dispatch('admin/item/deleteItem', id)
        if (result.success) {
          this.$bvToast.toast('Item deleted!', {
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
      getAllItems: 'admin/item/getAllItems'
    }),
    rows () {
      if (this.getAllItems) {
        return this.getAllItems.length
      }
      return 0
    }
  }
}
</script>
