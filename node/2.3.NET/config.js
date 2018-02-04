var encode = "UTF8"




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