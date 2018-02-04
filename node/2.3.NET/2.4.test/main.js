

var counter1 = require('./counter');
var    counter2 = require('./counter');
var    buf = require('../BufferToHexStr');
const buf4 = Buffer.from([0x68, 0x01, 0x01, 0x01, 0x01, 0x01]);


console.log(buf.BufferToHexStr(buf4));

console.log( counter1.i );
console.log(counter2.count());
console.log(counter2.count());