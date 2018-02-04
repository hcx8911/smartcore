/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-26
 * Time: 下午3:44
 * To change this template use File | Settings | File Templates.
 */
var net = require('net');

var buf_socket = Buffer.alloc(256);

const buf104_start      = Buffer.from([0x68,0x04,0x07,0x00, 0x00, 0x00]);
const buf104_start_res  = Buffer.from([0x68,0x04,0x0B,0x00, 0x00, 0x00]);
const buf104_conect     = Buffer.from([0x68,0x04,0x43,0x00, 0x00, 0x00]);
const buf104_conect_res = Buffer.from([0x68,0x04,0x83,0x00, 0x00, 0x00]);

var data_sendnum =0;
var data_recenum =0;
var i_flag = false;

var buf104_data = Buffer.from([0x68,0x04,0x83,0x00, 0x00, 0x00,
  0x09,0x01,0x01, 0x00, 0x01,0x00,0x01,0x40,0x00, 0x00, 0x01,0x00]);

var date = new Date();
var timeout = 20000;//超时
var listenPort = 8080;//监听端口
var server = net.createServer(function(socket){
   data_sendnum =0;
   data_recenum =0;
  // 我们获得一个连接 - 该连接自动关联一个socket对象
  console.log('connect: ' +    socket.remoteAddress + ':' + socket.remotePort);
  socket.setEncoding('utf8');
  //超时事件
//  socket.setTimeout(timeout,function(){
//    console.log('连接超时');
//    socket.end();
//  });
setInterval( function(){
  if(i_flag){
      socket_send_i(buf104_data);
  }
} , 1000);

 
//发送 I格式 数据
function socket_send_i(buf104){
  buf104[2] = data_sendnum <<1;
  buf104[4] = data_recenum <<1;
  socket.write(buf104);
  data_sendnum++;
  console.log('send data:'+ date.toLocaleString( ));
  console.log( buf104);
}
 //发送 s格式 数据
 function socket_send_s(buf104){
  buf104[4] = data_recenum << 1;
  socket.write(buf104);
  console.log('send data:'+ date.toLocaleString( ));
  console.log( buf104);
}

 //发送 U格式 数据
function socket_send_u(buf104){
  socket.write(buf104);
  console.log('send data:'+ date.toLocaleString( ));
  console.log( buf104);
}


  //接收到数据
  socket.on('data',function(data){
    
    data_recenum ++;
    buf_socket = Buffer.from(data,'utf8');
    console.log('recv data:' + date.toLocaleString( ));
    console.log(buf_socket);
  
    if ((buf_socket[2]&&0x03) == 3) {
     i_flag = true;
      if(buf_socket[2] == 0x07){
        socket_send_u(buf104_start_res);
      }
      else if(buf_socket[2] == 0x0B){
        socket_send_u(buf104_conect);
      }
      else  if(buf_socket[2] == 0x43){
        socket_send_u(buf104_conect_res);
      }
      // else  if(buf_socket[2] == 0x33){
      //   socket_send(buf104_start);
      // }
      // setTimeout(function() {
      //   console.log("等待超时……");
      // }, 1000);
  
    }
    else if ((buf_socket[2]&&0x03) == 1) {
      i_flag = true;
    }
    else  {

  
    }

  });
  //数据错误事件
  socket.on('error',function(exception){
    i_flag = false;
    console.log('socket error:' + exception);
    socket.end();

  });
  //客户端关闭事件
  socket.on('close',function(data){
    i_flag = false;
    console.log('close: ' +
      socket.remoteAddress + ' ' + socket.remotePort);
  });
}).listen(listenPort);
//服务器监听事件
server.on('listening',function(){
  console.log("server listening:" + server.address().port);
});
//服务器错误事件
server.on('error',function(exception){
  i_flag = false;
  console.log("server error:" + exception);
});



// setInterval(client_start, 2000);
//  setTimeout( socket_send_i(buf104_data), 1000);



