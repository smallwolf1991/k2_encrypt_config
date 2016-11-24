/**
 * Created by SMALLWOLF on 2016/11/23.
 */
'use strict'

const execSync  = require('child_process').execSync;
const crc32 = require('./genTarzip.js');
function opensslEncrypt(key,gzFilePath) {
  let encodeStr = execSync(`openssl aes-128-cbc -k ${key} -base64 -in ${gzFilePath}`);
}
let genKey = require('./crc32.js').genKey;
let md5 = function (s) {
  return crypto.createHash('md5').update(s, 'utf8').digest('hex');
}
function encrypt(gzFilePath, mac, out_encoding) {
  let key = genKey(mac);
  console.log('key:', key, 'mac:', mac);
  let encodeStr = execSync(`openssl aes-128-cbc -k ${key} -base64 -in ${gzFilePath}`);
  return encodeStr;
}
function decrypt(encodeFilePath, mac) {
  let key = genKey(mac);
  let encodeStr = execSync(`openssl aes-128-cbc -d -k ${key} -base64 -in ${encodeFilePath}`);
  return encodeStr;
}
module.exports = {
  encrypt:encrypt,
  decrypt:decrypt
};
