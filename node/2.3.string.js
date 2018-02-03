// var fs = require("fs");
// var data = '';

// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');

// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');

// // 处理流事件 --> data, end, and error
// readerStream.on('data', function(chunk) {
//    data += chunk;
// });

// readerStream.on('end',function(){
//    console.log(data);
// });

// readerStream.on('error', function(err){
//    console.log(err.stack);
// });

// console.log("程序执行完毕");
// // 以上代码执行结果如下：
// // 程序执行完毕
// // 菜鸟教程官网地址：www.runoob.com
// // 写入流
// // 创建 main.js 文件, 代码如下：
// var fs = require("fs");
// var data = '菜鸟教程官网地址：www.runoob.com';

// // 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt');

// // 使用 utf8 编码写入数据
// writerStream.write(data,'UTF8');

// // 标记文件末尾
// writerStream.end();

// // 处理流事件 --> data, end, and error
// writerStream.on('finish', function() {
//     console.log("写入完成。");
// });

// writerStream.on('error', function(err){
//    console.log(err.stack);
// });

// console.log("程序执行完毕");


// var fs = require("fs");

// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt');

// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');

// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);

// console.log("程序执行完毕");

// 那我现在又这么一个需求，我想把input里面的内容写到outInput里面去，但是上面的方法都是把文档里面的内容重置了，我只想添加，而且保留原内容怎么办呢，可以在可读流创建完毕的回调函数里面进行操作，看代码：
let fs = require('fs');
let data = '';
let data2 = '你的小青蛙是真的可爱';
//1.读取流
//创建可读流
let readStream = fs.createReadStream("input.txt");
//设置utf-8编码
readStream.setEncoding('UTF8');
//处理流事件
readStream.on('data', chunk => data += chunk);
readStream.on('end', () => writeS(data));
readStream.on("error", err => console.log(err.strck));
console.log("程序1执行完毕");
//2.写入流
//创建可写流
let writeS = dataS =>{
    let writeStream = fs.createWriteStream("outInput.txt");
    //使用utf-8写入流    
    writeStream.write(data2+dataS, "UTF8");
    //标记文件末尾
    writeStream.end();
    //处理事件流    
    writeStream.on("finish", () => console.log("写入完成")); 
    writeStream.on("error", err => console.log(err.stack));   
    console.log("程序2执行完毕");
}
// 如此，便可以啦；
// 房明
//    房明
//   121***5022@qq.com
// 2周前 (01-22)
//    彤哥哥
//   lty***in@gmail.com
// 如楼上可能存在覆盖状态,可以设置写入流的追加参数来解决:
// var fs = require('fs');
// var read = fs.createReadStream('../data/input.txt');
// //设置第二个参数append
// var write = fs.createWriteStream('../data/out.txt', { 'flags': 'a' });
// //管道流读写操作
// read.pipe(write);
// console.log('执行完毕');











