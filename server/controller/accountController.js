var passport = require('passport');
//const UserCounter = require('../model/usercounter');
const Sendgrid = require('../others/sendgrid');
const jwtmodel = require('../others/jwtmodel');
const crypt = require('../others/cryptojs');
const jwt = require("jsonwebtoken");
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const countrylist = require('countries-list');
var uniqid = require('uniqid');
var geoip = require('geoip-lite');
var accountSid = 'ACa3322748cf229b53d1b1ab924e0ac802';
var authToken = '2889dfd7f67579462d8dd839ee48ec69';
var twilio = require('twilio');
var shell = require('shelljs');
var smsClient = new twilio(accountSid, authToken);
var rn = require('random-number');
var otp = rn.generator({
    min: 1000000,
    max: 10000000,
    integer: true
});
var CryptoJS = require("crypto-js");
var Profile = require('../model/profile');
const User = require('../model/user');
var Kycdoc = require('../model/kycdoc');
var Function = require('../model/function');
const Twofactor = require('../model/twofactor');
var Otpcode = require('../model/otpcode');
var Bank = require('../model/bank');

accountController = [];
accountController.getprofile = function (req, res, next) {
    try {
        var user_id = req.payload.user_id;
        var profileObj = {};
        if (user_id !== null && typeof user_id != 'undefined' && user_id) {
            profileObj.email = req.payload.email;
            Profile.findOne({ user_id: user_id }).exec(function (error, profile) {
                if (error) {
                    res.status(500).json({ status: 500, message: 'Something goes wrong, Please try again' });
                } else {
                    Bank.find({}, function (error, banks) {
                        var bankJson = {};
                        if (error || !banks) {
                            banks = null;
                        } else {
                            banks.forEach(function (bank) {
                                bankJson[bank.bankId] = bank;
                            });
                            profileObj.banks = banks;
                            profileObj.bankJson = bankJson;
                            profileObj.profile = profile;
                            res.status(200).json({ status: 200, Profile: profileObj, message: 'Profile.' });
                        }
                    })
                }
            })
        }
    } catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
accountController.getCountryList = function (req, res, next) {
    try {
        var countrycode = Object.keys(countrylist.countries);
        var countries = [];
        countrycode.forEach(function (item) {
            var countObj = countrylist.countries[item];
            countObj.code = item;
            countries.push(countObj)
        })
        res.status(200).json(countries)
    } catch (e) {
        res.status(500).json({ status: 500, message: e.message })
    }
}
accountController.profileUpdate = function (req, res, next) {
    try {
        var person_type = req.body.person_type;
        var user_id = req.payload.user_id;
        var email = req.payload.email;
        var name = req.body.name;
        var midname = req.body.midName;
        var surname = req.body.surName;
        var dateOfBirth = req.body.dob;
        var sex = req.body.sex;
        var postal = req.body.postal;
        var country = req.body.country;
        var phone = req.payload.phone;
        //var user2ndFactorAuthType = req.body.user2ndFactorAuthType;
        var user2ndFactorAuthType = 'sms';
        var acceptNews = req.body.acceptNews;
        if (acceptNews) {
            acceptNews = 1;
        } else {
            acceptNews = 0;
        }
        var address = req.body.address;
        var address1 = req.body.address1;
        var city = req.body.city;
        var state = req.body.state;
        var dobtest = /((19|2\d)\d\d)-((0?[1-9])|(1[0-2]))-((0?[1-9])|([12]\d)|(3[01]))/;
        const number = phoneUtil.parseAndKeepRawInput(phone);
        var createObj = {};
        var errorObj = {};
        if (typeof person_type !== 'undefined' && person_type && person_type !== '') {
            createObj.profileType = person_type;
        } else {
            errorObj.person_type = 'Profile Type is required or Invalid';
        }
        if (typeof name !== 'undefined' && name && name !== '') {
            createObj.name = name;
        } else {
            errorObj.name = 'Name is required or Invalid';
        }
        if (typeof surname !== 'undefined' && surname && surname !== '') {
            createObj.surName = surname;
        } else {
            errorObj.surname = 'Surname is required or Invalid';
        }
        if (typeof midname !== 'undefined' && midname && midname !== '') {
            createObj.midName = midname;
        }
        if (typeof sex !== 'undefined' && sex && sex !== '') {
            createObj.sex = sex;
        } else {
            errorObj.sex = 'Sex is required or Invalid';
        }
        if (typeof dateOfBirth !== 'undefined' && dateOfBirth && dateOfBirth !== '') {
            if (dobtest.test(dateOfBirth)) {
                createObj.dob = dateOfBirth;
            } else {
                errorObj.dob = 'Date of Birth is Invalid';
            }
        } else {
            errorObj.dob = 'Date of Birth is required or Invalid';
        }
        if (typeof phone !== 'undefined' && phone && phone !== '') {
            if (phoneUtil.isPossibleNumber(number) && phoneUtil.isValidNumber(number)) {
                var country = phoneUtil.getRegionCodeForNumber(number);
                if (typeof country !== 'undefined' && country && country !== '') {
                    createObj.country = country
                } else {
                    errorObj.country = 'Phone Invalid, should be with country code';
                }
            }
        }
        if (typeof address !== 'undefined' && address && address !== '') {
            createObj.address = address;
        } else {
            errorObj.address = 'Address is required or Invalid';
        }
        if (typeof postal !== 'undefined' && postal && postal !== '') {
            createObj.postal = postal;
        } else {
            errorObj.postal = 'Postal is required or Invalid';
        }
        if (typeof address1 !== 'undefined' && address1 && address1 !== '') {
            createObj.address1 = address1;
        } else {
            errorObj.address1 = 'Address1 is required or Invalid';
        }
        if (typeof city !== 'undefined' && city && city !== '') {
            createObj.city = city;
        } else {
            errorObj.city = 'City is required or Invalid';
        }
        if (typeof state !== 'undefined' && state && state !== '') {
            createObj.state = state;
        } else {
            errorObj.state = 'State is required or Invalid';
        }
        createObj.authType = user2ndFactorAuthType;
        createObj.acceptNews = acceptNews;
        if (Object.keys(errorObj).length === 0) {
            var objToStr = JSON.stringify(createObj);
            var cipherText = crypt.encrypt(objToStr);
            switch (user2ndFactorAuthType) {
                case "sms":
                    var key = otp();
                    smsClient.api.messages
                        .create({
                            body: 'Your XTRemCoin authentication key is: ' + key,
                            to: phone,
                            from: '+17752047475',
                        }).then(function (data) {
                            var otpcodeData = {
                                user_id: user_id,
                                code: key,
                                action: "updateprofilesmsauthkey",
                            }
                            Otpcode.update({ user_id: user_id, action: "updateprofilesmsauthkey" }, otpcodeData, {
                                upsert: true, setDefaultsOnInsert: true
                            },
                                function (err, updated) {
                                    if (err) {
                                        res.status(500).json({ status: 500, message: 'Something goes wrong, Please try again' });
                                    } else {
                                        res.status(200).json({ status: 200, secret: cipherText, message: 'OTP has been sent on you phone.' });
                                    }
                                }
                            );
                        }).catch(function (err) {
                            res.status(400).json({ status: 400, message: err.message });
                        });
                    break;
                case "email":
                    //send email
                    var code = uniqid();
                    var sendGrid = new Sendgrid();
                    var options = { email: email, code: code };
                    sendGrid.sendEmail(
                        email,
                        'Authentication Key at XTRemCoin',
                        "views/emailtemplate/emailauthenticationkey.ejs",
                        options
                    );
                    //End SendEmail
                    var otpcodeData = {
                        user_id: user_id,
                        code: code,
                        action: "updateprofileemailauthkey",
                    }
                    Otpcode.update({ user_id: user_id, action: "updateprofileemailauthkey" }, otpcodeData, {
                        upsert: true,
                        setDefaultsOnInsert: true
                    },
                        function (err) {
                            if (err) console.log(err.message);
                        }
                    );
                    res.status(200).json({ status: 200, secret: cipherText, message: "Confirmation is sent on your E-mail " });
                    break;
                default:
                    res.status(400).json({ status: 400, message: "Something is wrong, please try again." });
                    break;
            }
        }
        else {
            res.status(400).json({ status: 400, message: errorObj })
        }
    } catch (e) {
        res.status(500).json({ status: 500, message: e.message })
    }
}
accountController.updateConfirm = function (req, res, next) {
    try {
        var key = req.body.secondauthKey;
        var callbackData = req.body.callbackData;
        var user_id = req.payload.user_id;
        if (typeof key !== 'undefined' && key && key !== ''
            && typeof callbackData !== 'undefined' && callbackData && callbackData !== '') {
            var decipher = crypt.decrypt(callbackData);
            var strToObj = JSON.parse(decipher);
            var action = 'updateprofilesmsauthkey';
            Otpcode.findOne({
                user_id: user_id,
                code: key,
                action: action,
            }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                if (otperr) {
                    res.status(500).json({ status: 500, message: 'Something goes wrong, Please try again' });
                } else {
                    if (otpdoc === null) {
                        res.status(400).json({ status: 400, message: "Key doesn't match. Please try next." });
                    } else {
                        if (otpdoc.code == key) {
                            Profile.update({ user_id: user_id }, strToObj, {
                                upsert: true,
                                setDefaultsOnInsert: true
                            },
                                function (err) {
                                    if (err) console.log(err);
                                }
                            );
                            res.status(200).json({ status: 200, message: "Profile is saved." });
                        } else {
                            res.status(400).json({ status: 400, message: "Key doesn't match. Please try next." });
                        }
                    }
                }
            });
        } else {
            res.status(400).json({ status: 400, message: 'Sorry, Invalid Details' })
        }
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message })
    }
}
accountController.get2fa = function (req, res, next) {
    try {
        var user_id = req.payload.user_id;
        var email = req.payload.email;
        var method = new Function(req);
        method.googleAuthenticator(res, function (ga) {
            method.isGoogleAuthActive(user_id, function (isActive) {
                if (isActive) {
                    var returnJson = {
                        enabled: true
                    }
                    res.status(200).json({ status: 200, twofa: returnJson });
                } else {
                    var secret = ga.createSecret();
                    var qcode = ga.getQRCodeGoogleUrl("XTRemCoin(" + email + ")", secret);
                    var returnJson = {
                        secret: secret,
                        qcode: qcode,
                        enabled: false
                    }
                    res.status(200).json({ status: 200, twofa: returnJson });
                }
            });
        })
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
accountController.create2fa = function (req, res, next) {
    try {
        var user_id = req.payload.user_id;
        var code = req.body.code;
        var secret = req.body.secret;
        var method = new Function(req);
        method.googleAuthenticator(res, function (ga) {
            if (typeof code !== 'undefined' && code && code !== '' &&
                typeof secret !== 'undefined' && secret && secret !== '') {
                if (ga.verifyCode(secret, code)) {
                    Twofactor.update({ user_id: user_id }, { secret: secret }, {
                        upsert: true,
                        setDefaultsOnInsert: true
                    }, function (err) {
                        if (err) {
                            console.log(err.message);
                            res.status(500).json({ status: 500, message: err.message });
                        } else {
                            res.status(200).json({ status: 200, message: "Two-Factor setup successfully." });
                        }
                    });
                } else {
                    res.status(400).json({ status: 400, message: "Invalid Code." });
                }
            } else {
                res.status(400).json({ status: 400, message: "Code is required." });
            }
        });
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
accountController.disbale2fa = function (req, res, next) {
    try {
        var user_id = req.payload.user_id;
        var code = req.body.code;
        var method = new Function(req);
        method.googleAuthenticator(res, function (ga) {
            if (typeof code !== 'undefined' && code && code !== '') {
                Twofactor.findOne({ user_id: user_id }, function (error, result) {
                    if (error) {
                        res.status(500).json({ status: 500, message: 'Something goes wrong, Please try again' });
                    } else {
                        if (result !== null && typeof result != 'undefined' && result.secret) {
                            if (ga.verifyCode(result.secret, code)) {
                                result.remove();
                                var options = {
                                    maxAge: 24 * 60 * 60 * 1000, // would expire after 24 hours
                                }
                                res.cookie('tfastatus', 1, options);
                                res.status(200).json({ status: 200, message: "Two-Factor was removed." });
                            } else {
                                res.status(400).json({ status: 400, message: "Invalid Code." });
                            }
                        } else {
                            res.status(400).json({ status: 400, message: "Two-Factor is not enabled." });
                        }
                    }
                });
            } else {
                res.status(400).json({ status: 400, message: "Code is required." });
            }
        });
    } catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}

var ctrl = module.exports = accountController;