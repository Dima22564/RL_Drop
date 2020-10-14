const app = require('express')()
// eslint-disable-next-line import/order
const http = require('http').createServer(app)
const io = require('socket.io')(http)
// const redisAdapter = require('socket.io-redis')
// io.adapter(redisAdapter({ host: '127.0.0.1', port: 6379 }))
const Redis = require('redis')
const subscriber = Redis.createClient()
// const publisher = Redis.createClient()

subscriber.on('message', async (channel, message) => {
  await console.log("Subscriber received message in channel '" + channel + "': " + message)
})

subscriber.on('Custom', async (channel, message) => {
  await console.log("Subscriber received message in channel '" + channel + "': " + message)
})

subscriber.subscribe('fromNuxt')

io.on('connection', (socket) => {
  const updateOnline = () => {
    io.sockets.emit('online', Object.keys(io.sockets.adapter.rooms).length)
  }
  // publisher.publish('fromNuxt', 'hello laravel 3')

  updateOnline()

  socket.on('disconnect', () => {
    updateOnline()
  })

  socket.emit('newMessage', {
    text: 'sfdfedf'
  })
})



module.exports = {
  app,
  server: http
}
