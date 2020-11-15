const app = require('express')()
// eslint-disable-next-line import/order
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const axios = require('axios')

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

let winItems = []
let key = winItems.length

const getWinItems = async () => {
  if (winItems.length === 0) {
    try {
      const result = await axios.get(`${axios.defaults.baseURL}/win-items`)
      winItems = result.data
    } catch (e) {
    }
  }
  key = winItems.length
  io.sockets.emit('setLiveItems', winItems)
}

io.on('connection', async (socket) => {
  const updateOnline = () => {
    io.sockets.emit('online', Object.keys(io.sockets.adapter.rooms).length)
  }
  updateOnline()

  socket.on('disconnect', () => {
    updateOnline()
  })

  await getWinItems()

  socket.on('openChest', (item) => {
    key += 1
    item.key = key
    if (winItems.length >= 40) {
      winItems.shift()
    }
    winItems.push(item)
    io.sockets.emit('updateLiveItems', item)
  })
})

module.exports = {
  app,
  server: http
}
