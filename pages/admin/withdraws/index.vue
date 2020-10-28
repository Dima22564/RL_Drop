<template>
  <div>
    <b-card-group columns>
      <b-card
        v-for="item in getWithdraws"
        :key="item.id"
        :header="'Withdraw #' + item.id"
        :footer="item.status"
        :footer-bg-variant="detectStatus(item.status).type"
        :header-bg-variant="detectStatus(item.status).type"
        :header-border-variant="detectStatus(item.status).type"
        :footer-border-variant="detectStatus(item.status).type"
        header-tag="header"
        footer-tag="footer"
        title="Title"
        class="admin__card"
      >
        <b-card-text>
          <div>
            <strong>Withdraw id: </strong>
            <span>{{ item.id }}</span>
          </div>
          <div>
            <strong>User email: </strong>
            <span>{{ item.user.email }}</span>
          </div>
          <div>
            <strong>Platform: </strong>
            <span>{{ item.platform }}</span>
          </div>
          <div>
            <strong>Item name: </strong>
            <span>{{ item.item_name }}</span>
          </div>
          <div>
            <strong>Messenger email: </strong>
            <span>{{ item.messenger_email }}</span>
          </div>
        </b-card-text>
        <div class="mt-3">
          <b-button
            v-if="detectStatus(item.status).status === pending.status && getUser.email === item.messenger_email"
            @click.prevent="withdraw({ userId: item.user.id, withdrawId: item.id })"
            class="mt-3"
            href="#"
            variant="success"
          >
            Withdraw
          </b-button>
          <b-button
            v-if="detectStatus(item.status).status === pending.status && !item.messenger_email"
            @click.prevent="take({ userId: item.user.id, withdrawId: item.id })"
            class="mt-3"
            href="#"
            variant="primary"
          >
            Take
          </b-button>
          <b-button
            v-if="detectStatus(item.status).status === pending.status && getUser.email === item.messenger_email"
            @click.prevent="denyWithdraw({ userId: item.user.id, withdrawId: item.id })"
            class="mt-3"
            href="#"
            variant="danger"
          >
            Deny
          </b-button>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import showNotification from '@/mixins/showNotification'
export default {
  layout: 'admin',
  name: 'AdminWithdraws',
  mixins: [showNotification],
  data () {
    return {
      pending: {
        status: 'pending',
        type: 'warning'
      },
      deny: {
        status: 'forbidden',
        type: 'danger'
      },
      success: {
        status: 'success',
        type: 'success'
      }
    }
  },
  async created () {
    await this.$store.dispatch('admin/withdraws/getWithdraws')
  },
  methods: {
    detectStatus (status) {
      if (status === this.pending.status) {
        return this.pending
      } else if (status === this.success.status) {
        return this.success
      } else if (status === this.deny.status) {
        return this.deny
      }
    },
    async withdraw (payload) {
      try {
        await this.$store.dispatch('admin/withdraws/withdraw', payload)
      } catch (e) {
        this.showNotification('Something went wrong!', 'danger')
      }
    },
    async take (payload) {
      try {
        await this.$store.dispatch('admin/withdraws/take', payload)
      } catch (e) {
        this.showNotification('Something went wrong!', 'danger')
      }
    },
    async denyWithdraw (payload) {
      try {
        await this.$store.dispatch('admin/withdraws/deny', payload)
      } catch (e) {
        this.showNotification('Something went wrong!', 'danger')
      }
    }
  },
  computed: {
    ...mapGetters({
      getWithdraws: 'admin/withdraws/getWithdraws',
      getUser: 'user/getUser'
    })
  }
}
</script>

<style lang="sass">
.admin
  &__card
</style>
