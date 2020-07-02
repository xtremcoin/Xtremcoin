'use strict';

const crypto = require('crypto');

const ENCRYPTION_KEY = '!nX99^8#5L$a!g^k$%m*1^1*9*A"&9&!';
var Cypt = {}
Cypt.encrypt = function (text) {
    var cipherBase = crypto.createCipher("aes-256-ctr", ENCRYPTION_KEY);
    var cryptedBase = cipherBase.update(text, 'utf8', 'base64');
    cryptedBase += cipherBase.final('base64');
    return cryptedBase;
}
Cypt.decrypt = function (text) {
    var decipherBase = crypto.createDecipher('aes-256-ctr', ENCRYPTION_KEY);
    var dcryptedBase = decipherBase.update(text, 'base64', 'utf8')
    dcryptedBase += decipherBase.final('utf8');
    return dcryptedBase;
}

module.exports = Cypt;