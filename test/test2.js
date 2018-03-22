
// echo server
var net = require('net');
net.createServer(function (socket) {
  socket.on('data', function (data) {
    socket.write(data.toString());
  });
}).listen(12345);

// W2T
var express = require('express');
var http = require('http');
var W2T = require('../index.js');
var app = express();
app.use(function (req, res) {
  res.send({ msg: 'hello' });
});
var server = http.createServer(app);
var w2t = new W2T();
w2t.start({ server: server });
server.listen(8000, function listening() {
  console.log('Listening on %d', server.address().port);
});

// ws client
var count = 0;
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8000');
ws.on('open', function open() {
  // 首条消息，打通tcp链路。
  ws.send('{"tip":"localhost", "tport":12345}');
  ws.send(String(random()));
});
ws.on('message', function incoming(data) {
  console.log('recv data:', String(data));

  if (count < 10000) {
    count++;
    var v = String(random());
    console.log(count, ' send data:', v);
    ws.send(v);
  }
});

// random
var seed = 1;
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
