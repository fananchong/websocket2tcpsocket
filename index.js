var WebSocket = require('ws');
var net = require('net');

module.exports = W2T;

function W2T() { }

var proto = W2T.prototype;

proto.start = function (wsOptions) {
  var wss = new WebSocket.Server(wsOptions);
  wss.on('connection', function connection(ws) {
    var tc;
    ws.on('message', function (message) {
      // console.log('websocket client received: %s', message)
      if (tc != null) {
        try {
          tc.write(message);
        } catch (e) {
          console.log('tcp socket closed, cleaning up websocket.');
          ws.close();
        }
      } else {
        var addr = JSON.parse(message);
        if (addr.tip == null) {
          console.log("tip is null.");
          ws.close();
          return;
        }
        if (addr.tport == null) {
          console.log("tport is null.");
          ws.close();
          return;
        }
        tc = createTcpSocket(ws, addr.tip, addr.tport);
      }
    });
    ws.on('close', function (code, reason) {
      console.log('websocket client disconnected: ' + code + ' [' + reason + ']');
      if (tc != null) {
        try {
          tc.end();
        } catch (e) { }
      }
    });
    ws.on('error', function (a) {
      console.log('websocket client error: ' + a);
      if (tc != null) {
        try {
          tc.end();
        } catch (e) { }
      }
    });
  });
};

function createTcpSocket(ws, tip, tport) {
  var tc = net.connect({
    host: tip,
    port: tport
  }, function () {
    console.log('connected to tcp server. ip =', tip, 'port =', tport);
  });
  tc.on('data', function (data) {
    // console.log('tcp socket received: %s', data)
    try {
      ws.send(data);
    } catch (e) {
      console.log('websocket client closed, cleaning up tcp socket.');
      tc.end();
    }
  });
  tc.on('end', function () {
    console.log('disconnected from tcp server.');
    try {
      ws.close();
    } catch (e) { }
  });
  tc.on('error', function () {
    console.log('tcp socket connection error');
    tc.end();
    try {
      ws.close();
    } catch (e) { }
  });
  return tc;
}