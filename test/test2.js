
// echo server
const net = require('net')
net.createServer(function (socket) {
  socket.on('data', function (data) {
    socket.write(data.toString())
  })
}).listen(12345)

// W2T
const express = require('express')
const http = require('http')
const W2T = require('../index.js')
const app = express()
app.use(function (req, res) {
  res.send({ msg: 'hello' })
})
const server = http.createServer(app)
const w2t = new W2T()
w2t.start({server}, 'localhost', 12345)
server.listen(8000, function listening () {
  console.log('Listening on %d', server.address().port)
})

// ws client
var count = 0
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:8000')
ws.on('open', function open () {
  ws.send(String(random()))
})
ws.on('message', function incoming (data) {
  console.log('recv data:', String(data))

  if (count < 10000) {
    count++
    var v = String(random())
    console.log(count, ' send data:', v)
    ws.send(v)
  }
})

// random
var seed = 1
function random () {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
