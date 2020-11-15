<template>
  <div class="mt-3">
    <b-form-group
      class="mb-3 w-100"
    >
      <b-input-group size="sm">
        <b-form-input
          id="filterInput"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        />
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter=''">
            Clear
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-table
      id="chests"
      :fields="fields"
      :items="getUsers"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      head-variant="dark"
      striped
      hover
      small
      responsive="sm"
    >
      <!-- A virtual column -->
      <template v-slot:cell(id)="data" class="text-light">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(name)="data" class="text-light">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(email)="data" class="text-light">
        <span class="text-light">{{ data.value }}</span>
      </template>

      <template v-slot:cell(roles)="data">
        <div>
          <b-button
            v-for="role in data.item.roles"
            v-if="role.role !== 'user' || role.role === 'admin'"
            @click="changeRole({userId: data.item.id, roleId: role.id, type: 'remove'})"
            class="mr-2"
            pill
            variant="danger"
          >
            Remove {{ role.role }}
          </b-button>
          <b-button
            v-for="r in getRoles"
            v-if="!(data.item.roles.find(t => t.role === r.role)) && r.role !== 'user'"
            @click.prevent="changeRole({userId: data.item.id, roleId: r.id, type: 'add'})"
            class="mr-2"
            pill
            variant="success"
          >
            Make {{ r.role }}
          </b-button>
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="chests"
      align="center"
      dark
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
export default {
  layout: 'admin',
  name: 'AdminUsers',
  mixins: [showNotification],
  middleware: 'admin',
  data () {
    return {
      filter: '',
      filterOn: [],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'roles', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10
    }
  },
  async created () {
    await this.$store.dispatch('admin/user/getUsers')
  },
  methods: {
    async changeRole (payload) {
      try {
        await this.$store.dispatch('admin/user/changeRole', payload)
      } catch (e) {
        this.showNotification('Something went wrong!', 'danger')
      }
    }
  },
  computed: {
    ...mapGetters({
      getUsers: 'admin/user/getUsers',
      getRoles: 'admin/user/getRoles'
    }),
    rows () {
      if (this.getUsers) {
        return this.getUsers.length
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
