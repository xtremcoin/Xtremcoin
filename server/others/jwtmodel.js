var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var userModel = {}
userModel.setPassword= function(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    return{
        salt : salt,
        password : crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    }
}
userModel.validPassword= function(password,userObj) {
    var hash = crypto.pbkdf2Sync(password, userObj.salt, 1000, 64, 'sha512').toString('hex');
    return userObj.password === hash;
}
userModel.generateJwt= function (keyobj, valobj) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    //expiry.setMinutes(expiry.getMinutes()+5);
    return jwt.sign({
        _id: keyobj.generated_keys[0],
        email: valobj.email,
        name: valobj.name,
        userid: valobj.userid,
        twofa : valobj.twofa,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}

var ctrl = module.exports = userModel;
