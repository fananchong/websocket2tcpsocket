# websocket2tcpsocket
websocket 与 tcp socket的桥梁。方便js编程，可以直接与tcp服务器通信。

## 安装

```bash
npm install websocket2tcpsocket --save
```

## 使用

```js
var W2T = require('../index.js')
var w2t = new W2T()
w2t.start('localhost', 8000, 'localhost', 8888)
```

详细可以参见 [test](test/test.js)

## 编写目的

github上有不少 websocket proxy。

但是都是以可执行方式提供。不方便内嵌整合进现有web服务中。

本库，目的有2个：

  - 以库方式提供，方便直接内嵌入web service中。

  - 达成网页可以直接通过它的web service，访问tcp服务器。


## 参考项目

本项目参考了 https://github.com/novnc/websockify

正式生成环境易可直接使用websockify，部署服务之。
