/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-26
 * Time: 下午3:56
 * To change this template use File | Settings | File Templates.
 */
var net = require('net');
var config = require('./config.js');
var port = 8080;
var host = '127.0.0.1';
var client= new net.Socket();
var buf_socket = Buffer.alloc(256);
var date = new Date();
const buf104_start       = Buffer.from([0x68,0x04,0x07,0x00, 0x00, 0x00]);
const buf104_start_res   = Buffer.from([0x68,0x04,0x0B,0x00, 0x00, 0x00]);
const buf104_conect      = Buffer.from([0x68,0x04,0x43,0x00, 0x00, 0x00]);
const buf104_conect_res  = Buffer.from([0x68,0x04,0x83,0x00, 0x00, 0x00]);
const buf104_confirm     = Buffer.from([0x68,0x04,0x01,0x00, 0x00, 0x00]);
const buf104_confirm_res = Buffer.from([0x68,0x04,0x01,0x00, 0x00, 0x00]);
var data_num =0;
var data_sendnum =0; //
var data_recenum =0;
var i_flag = false;

var buf104_conect_data = Buffer.from([0x68,0x04,0x83,0x00, 0x00, 0x00,
  0x09,0x01,0x01, 0x00, 0x01,0x00,0x01,0x40,0x00, 0x00, 0x01,0x00]);
  var ByteToHexStr = module.exports.ByteToHexStr = function (byte) {
    if (byte < 0 || byte > 255) {
      return;
    }
    var hexstr = "";
    var temp = [];
    temp[0] = byte >> 4 & 0x0F;
    temp[1] = byte & 0x0F;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] >= 10) {
        hexstr += String.fromCharCode(temp[i] + 87);
      } else {
        hexstr += String.fromCharCode(temp[i] + 48);
      }
    }
    return hexstr;
  }
  
  var BufferToHexStr = module.exports.BufferToHexStr = function (buffer) {
    if (!Buffer.isBuffer(buffer)) {
      return;
    }
    var hexstr = "<Buffer";
    for (var i = 0; i < buffer.length; i++) {
      hexstr += " " + ByteToHexStr(buffer[i]);
    }
    return hexstr + ">";
  }
client.setEncoding('utf8');
//连接到服务端
function client_start(){
  if( client.connecting === false){
    client.connect(port,host,function(){       
        client_send_u(buf104_start);
      });
  };
}
function client_send_u(buf104){
  client.write(buf104);
  console.log('send data: U'+ new Date().toLocaleString( ));
  console.log( buf104);
}
function client_send_s(buf104){
  buf104[4] = data_recenum << 1;
  client.write(buf104);
  console.log('send data: S '+ new Date().toLocaleString( ));
  console.log( buf104);
}

client.on('data',function(data){
  console.log(data.length);console.log(data[1]);
  // console.log(data.isBuffer);console.log(BufferToHexStr(data));
  buf_socket = Buffer.from(data);
  console.log('recv data:' + new Date().toLocaleString( ));  
  console.log( buf_socket);
  // console.log( buf_socket[2]);
  // console.log( (buf_socket[2]&0x03));

  if ((buf_socket[2]&0x03) == 3) {
    console.log( 'U');
    if(buf_socket[2] == 0x07){
      client_send_u(buf104_start_res);
    }
    else if(buf_socket[2] == 0x0B){
      client_send_u(buf104_conect);
    }
    else  if(buf_socket[2] == 0x43){
      client_send_u(buf104_conect_res);
    }
    // else  if(buf_socket[2] == 0x33){
    //   client_send(buf104_conect);      
    // }    
    else {
      client_send_s(buf104_confirm);     
    }
    // setTimeout(function() {
    //   console.log("等待超时……");
    // }, 1000);

  }
  else if ((buf_socket[2]&0x03) == 1) {
    console.log( 'S');
  }
  else  if (((buf_socket[2]&0x03) == 0)|(buf_socket[2]&0x03) == 2) {
    console.log( 'I');
    data_recenum++;
     console.log (client.connecting);
    // if((data_recenum % 10) == 0){
      client_send_s(buf104_confirm);
    //   // console.log (data_recenum % 10);
    // }
  }
  else{
    client_send_u(buf104_conect_res);
  }



});
client.on('error',function(error){
  console.log('error:'+error);console.log (client.connecting);
  client.destory();
});
client.on('close',function(){
  console.log('Connection closed');console.log (client.connecting);
});

// setInterval(client_start, 2000);
setTimeout(client_start, 1000);
