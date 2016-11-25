'use strict'
var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
const crc = require('../proxy/genTarzip.js');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'PHICOMMK2 开启SSH登录配置文件生成'});
});
/* GET home page. */
router.post('/', multipart({uploadDir: '../private_temp/'}), function (req, res, next) {
  let mac = req.body.mac;
  let file = req.files &&　req.files.file || {path: path.join(__dirname, '/../examples/example.tar.gz')};
  if (!mac) {
    throw new Error("mac address must be a string!");
  }
  mac = mac.toUpperCase();
  let resultFilePath = addHeader(mac, file.path);
  let encodeStr = crc.encrypt(resultFilePath, mac);
  res.set('Content-Disposition', 'attachment; filename=phicommk2.dat');
  res.set("Content-Length", encodeStr.length);
  res.set("Content-Type", 'application/octet-stream');
  res.send(encodeStr);
  req.resultFilePath = resultFilePath;
  next()
}, function (req, res, next) {
  fs.unlinkSync(req.resultFilePath);
});

function addHeader(mac, filePath) {
  let headerBytes = [
    0x70, 0x72, 0x6F, 0x64, 0x75, 0x63, 0x74, 0x3D, 0x4B, 0x32, 0x0A, 0x68, 0x77, 0x5F, 0x76, 0x65,
    0x72, 0x3D, 0x41, 0x32, 0x0A, 0x66, 0x77, 0x5F, 0x76, 0x65, 0x72, 0x3D, 0x32, 0x32, 0x2E, 0x34,
    0x2E, 0x35, 0x2E, 0x33, 0x39, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A
  ];
  let fileBuff = fs.readFileSync(filePath);
  let headerBuff = Buffer.from(headerBytes);
  let totalLength = headerBuff.length + fileBuff.length;
  let result = Buffer.concat([headerBuff, fileBuff], totalLength);
  const newTempPath = path.join(__dirname, '/../private_temp/', mac.replace(/[:-]/g, '') + '-' + new Date().getTime().toString());
  fs.writeFileSync(newTempPath, result);
  return newTempPath;
}
module.exports = router;
