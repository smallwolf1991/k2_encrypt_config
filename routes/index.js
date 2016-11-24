var express = require('express');
var router = express.Router();
const crc = require('../proxy/genTarzip.js');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PHICOMMK2 开启SSH登录配置文件生成' });
});
/* GET home page. */
router.post('/', /*multipart({uploadDir:"F:\\tempfile\\"}),*/ function(req, res, next) {
  let mac = req.body.mac;
  if(!mac){
    throw new Error("mac address must be a string!");
  }
  mac = mac.toUpperCase();
  let resultFilePath = addHeader(mac);
  let encodeStr = crc.encrypt(resultFilePath, mac);
  res.set('Content-Disposition','attachment; filename=phicommk2.dat');
  res.set("Content-Length", encodeStr.length);
  res.set("Content-Type", 'application/octet-stream');
  res.send(encodeStr);
  req.resultFilePath = resultFilePath;
  next()
},function (req,res,next){
  fs.unlinkSync(req.resultFilePath);
});

function addHeader(mac){
  let headerBytes = [
    0x70, 0x72, 0x6F, 0x64, 0x75, 0x63, 0x74, 0x3D, 0x4B, 0x32, 0x0A, 0x68, 0x77, 0x5F, 0x76, 0x65,
    0x72, 0x3D, 0x41, 0x32, 0x0A, 0x66, 0x77, 0x5F, 0x76, 0x65, 0x72, 0x3D, 0x32, 0x32, 0x2E, 0x34,
    0x2E, 0x35, 0x2E, 0x33, 0x39, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A
  ];
  let headerBuff = Buffer.from(headerBytes);
  let totalLength = headerBuff.length + exmapleFileBuffer.length;
  let result = Buffer.concat([headerBuff, exmapleFileBuffer], totalLength);
  const newTempPath = path.join(__dirname, '/../public/', mac.replace(/[:-]/g, '')  + '-' + new Date().getTime().toString());
  fs.writeFileSync(newTempPath, result);
  return newTempPath;
}
module.exports = router;
