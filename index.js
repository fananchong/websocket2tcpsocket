'use strict'

var WebSocket = require('ws')
var net = require('net')

module.exports = W2T

function W2T () {}

var proto = W2T.prototype

proto.start = function (wip, wport, tip, tport) {
  var wss = new WebSocket.Server({
    host: wip,
    port: wport
  })

  wss.on('connection', function connection (ws) {
    var tc = net.connect({
      host: tip,
      port: tport
    }, function () {
      console.log('connected to tcp server. ip =', tip, 'port =', tport)
    })
    tc.on('data', function (data) {
      console.log('tcp socket received: %s', data)
      try {
        ws.send(data)
      } catch (e) {
        console.log('websocket client closed, cleaning up tcp socket.')
        tc.end()
      }
    })
    tc.on('end', function () {
      console.log('disconnected from tcp server.')
      ws.close()
    })
    tc.on('error', function () {
      console.log('tcp socket connection error')
      tc.end()
      ws.close()
    })

    ws.on('message', function (message) {
      console.log('websocket client received: %s', message)
      tc.write(message)
    })
    ws.on('close', function (code, reason) {
      console.log('websocket client disconnected: ' + code + ' [' + reason + ']')
      tc.end()
    })
    ws.on('error', function (a) {
      console.log('websocket client error: ' + a)
      tc.end()
    })
  })
}
