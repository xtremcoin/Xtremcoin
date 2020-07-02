var CryptoJS = require("crypto-js");

var Cipher = {};
Cipher.CREATE_WALLET_SECRET = '#wallet create after #kyc is verified!';

Cipher.encrypt = function (plainText, secret){
   var b64 = CryptoJS.AES.encrypt(plainText, secret).toString();
   var e64 = CryptoJS.enc.Base64.parse(b64);
   var eHex = e64.toString(CryptoJS.enc.Hex);
   return eHex;
}

Cipher.decrypt = function (cipherText, secret){
   var reb64 = CryptoJS.enc.Hex.parse(cipherText);
   var bytes = reb64.toString(CryptoJS.enc.Base64);
   var decrypt = CryptoJS.AES.decrypt(bytes, secret);
   var plain = decrypt.toString(CryptoJS.enc.Utf8);
   return plain;
}
module.exports = Cipher;