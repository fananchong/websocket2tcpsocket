
// echo server
const net = require('net')
net.createServer(function (socket) {
  socket.on('data', function (data) {
    socket.write(data.toString())
  })
}).listen(12345)

// W2T
const W2T = require('../index.js')
const w2t = new W2T()
w2t.start({host: 'localhost', port: 8000}, 'localhost', 12345)

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
