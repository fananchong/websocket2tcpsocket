# websocket2tcpsocket

websocket 与 tcp socket的桥梁。方便js编程，可以直接与tcp服务器通信。

## 安装

```bash
npm install websocket2tcpsocket --save
```

## 使用方法1

指定 websocket 地址的方式：

```js
var W2T = require('../index.js')
var w2t = new W2T()
w2t.start({ host: 'localhost', port: 8000 })
```

详细可以参见 [test1](test/test1.js)

## 使用方法2

可以传入express服务器实例，来初始化websocket:

```js
const express = require('express')
const http = require('http')
const W2T = require('../index.js')
const app = express()
app.use(function (req, res) {
  res.send({ msg: 'hello' })
})
const server = http.createServer(app)
const w2t = new W2T()
w2t.start({server})
server.listen(8000, function listening () {
  console.log('Listening on %d', server.address().port)
})
```

详细可以参见 [test2](test/test2.js)

## websocket客户端说明

首条消息，需要告知W2T，打通哪个地址。

这样每个websocket都可以发往不同的tcp服务器。更加灵活。

例如：

```js
ws.on('open', function open() {
  // 首条消息，打通tcp链路。
  ws.send('{"tip":"localhost", "tport":12345}');
  ws.send(String(random()));
});
```


## 编写目的

github上有不少 websocket proxy。

但是都是以可执行方式提供。不方便内嵌整合进现有web服务中。

本库，目的有以下：

-   以库方式提供，方便直接内嵌入web service中。

-   达成网页可以直接通过它的web service，访问tcp服务器。

-   每个websocket连接可以自定义发往的TCP服务器。更加灵活。


## 参考项目

本项目参考了 <https://github.com/novnc/websockify>
