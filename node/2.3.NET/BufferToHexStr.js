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
