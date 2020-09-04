/* eslint-disable */
import VueEcho from 'vue-echo'
import Pusher from 'pusher-js'
import Vue from 'vue'

Vue.use(VueEcho, {
  broadcaster: 'pusher',
  key: '72b133983efa1c7a03e1',
  cluster: 'eu',
  secret: '8d6ba2b4791a63d18515'
})
