# websocket2tcpsocket
websocket 与 tcp socket的桥梁。方便js编程，可以直接与tcp服务器通信。



## 编写目的

github上有不少 websocket proxy。 

但是都是以可执行方式提供。且接口很乱。

本库，目的有2个：

  - 以库方式提供，方便直接内嵌入web service中。
  
  - 达成网页可以直接通过它的web service，访问tcp服务器。
  
