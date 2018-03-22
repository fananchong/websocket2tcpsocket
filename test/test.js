
// echo server
var net = require('net')
net.createServer(function (socket) {
  socket.on('data', function (data) {
    socket.write(data.toString())
  })
}).listen(12345)

// W2T
var W2T = require('../index.js')
var w2t = new W2T()
w2t.start('localhost', 8000, 'localhost', 12345)

// ws client
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:8000')
ws.on('open', function open () {
  ws.send(String(random()))
})
ws.on('message', function incoming (data) {
  console.log('recv data:', String(data))

  var v = String(random())
  console.log('send data:', v)
  ws.send(v)
})

// random
var seed = 1
function random () {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
