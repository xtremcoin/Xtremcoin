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
var smsClient = new twilio(accountSid, authToken);
var rn = require('random-number');
var otp = rn.generator({
    min: 1000000
    , max: 10000000
    , integer: true
});
var Profile = require('../model/profile');
const User = require('../model/user');
var Kycdoc = require('../model/kycdoc');
var Function = require('../model/function');
const Twofactor = require('../model/twofactor');
var Otpcode = require('../model/otpcode');
var UserIdCounter = require("../model/counteruserid");

var userController = [];
userController.showlogin = function (req, res, next) {
    res.render('index', {
        title: 'Xtremcoin',
        _csrf: req.csrfToken()
    })
}
userController.getUsers = function (req, res, next) {
    Users.find().exec(function (response) {
        res.json(response);
    })
}

//common functions
userController.getCSRF = function (req, res, next) {
    var csrf = req.csrfToken();
    res.status(200).json({ _csrf: csrf });
}
userController.getAuthenticationOptions = function (req, res, next) {
    try {
        var userid = req.payload._id;
        ctrl.get3faOptions(userid, function (options) {
            if (options.status === 200) {
                /*var securityObj = {};
                if (options.length > 0) {
                    options.forEach(function (item, index) {
                        securityObj[index] = item.option;
                    })
                }*/
                res.status(200).json(options.message)
            } else {
                res.status(options.status).json({ message: options.message })
            }
        })
    } catch (e) {
        callback({ status: 500, message: 'Internal Server Error' })
    }
}
userController.getCountryList = function (req, res, next) {
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
        res.status(500).json({ message: e.message })
    }
}
userController.extend = function (target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
userController.generateJwt = function (valobj) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    //expiry.setMinutes(expiry.getMinutes()+5);
    return jwt.sign({
        _id: valobj._id,
        email: valobj.email,
        name: valobj.name,
        phone: valobj.phone,
        userid: valobj.userid,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}
userController.verifyAuthentication = function (req, res, next) {
    try {
        if (typeof req.payload._id !== 'undefined' && req.payload._id && req.payload._id !== '') {
            var dataObj = req.body;
            var userid = req.payload._id;
            var code = dataObj.code;
            if (typeof userid !== 'undefined' && userid && userid !== '' &&
                typeof code !== 'undefined' && code && code !== '') {
                if (typeof dataObj.email !== 'undefined' && dataObj.email && dataObj.email !== '' && dataObj.email == true) {

                    Otp.findOne({
                        userid: userid,
                        code: code
                    }).exec(function (error, rows) {
                        if (error) {
                            res.status(500).json({ message: "Internal Server Error" })
                        } else {
                            if (rows === null) {
                                res.status(400).json({ message: "Invalid Code" })
                            } else {
                                var currentTmeStmp = Date.now();
                                var OTPAge = (currentTmeStmp - rows.timestamp) / 100;
                                if (OTPAge > 900000) {
                                    res.status(400).json({ message: "Code Expired" });
                                } else {
                                    res.status(200).json({ message: 'Code Verified' })
                                }
                            }
                        }
                    })
                }
                if (typeof dataObj.sms !== 'undefined' && dataObj.sms && dataObj.sms !== '' && dataObj.sms == true) {
                    Otp.findOne({
                        userid: userid,
                        code: code
                    }).exec(function (error, rows) {

                        if (error) {
                            res.status(500).json({ message: "Internal Server Error" })
                        } else {
                            if (rows === null) {
                                res.status(400).json({ message: "Invalid Code" })
                            } else {
                                var currentTmeStmp = Date.now();
                                var OTPAge = (currentTmeStmp - rows.timestamp) / 100;
                                if (OTPAge > 900000) {
                                    res.status(400).json({ message: "Code Expired" });
                                } else {
                                    res.status(200).json({ message: 'Code Verified' })
                                }
                            }
                        }
                    })
                }
                if (typeof dataObj.twofa !== 'undefined' && dataObj.twofa && dataObj.twofa !== '' && dataObj.twofa === true) {

                    var _s = dataObj.secret;
                    var method = new Function(req);
                    method.googleAuthenticator(res, function (ga) {
                        if (code) {
                            if (ga.verifyCode(_s, code)) {
                                res.status(200).json({ message: 'Code Verified' })
                            } else {
                                res.status(400).json({ message: 'Invalid Code.' })
                            }
                        } else {
                            res.status(400).json({ message: 'Code is required.' })
                        }
                    });
                }
            }
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
userController.signup = function (req, res, next) {
    try {
        if (req.body.password !== req.body.passwordrepeat) {
            res.status(400).json({ status: 400, message: "Password & confirm password doesn't match" });
        } else {
            if (req.body.email &&
                req.body.password &&
                req.body.passwordrepeat &&
                req.body.firstname &&
                req.body.surname &&
                req.body.phone) {

                const ip = req.clientIp;
                var ipdetails = geoip.lookup(ip);
                var country = (ipdetails !== null) ? ipdetails.country : 'TR';

                var userData = {
                    email: req.body.email,
                    password: req.body.password
                }
                var userprofile = {
                    profileType: 'Private person',
                    name: req.body.firstname,
                    surName: req.body.surname,
                    country: country,
                    phone: req.body.phone,
                }
                UserIdCounter.find().exec(function (error, counterIndex) {
                    var counter = [];
                    if (error || !counterIndex) {
                    } else {
                        counter = counterIndex
                    }
                    if (counter.length === 0) {
                        UserIdCounter.create({
                            '_id': 'user_id',
                            'sequence_value': 0
                        }, function (error, newcounter) {
                            if (error) return next(error);
                        })
                    }
                });
                UserIdCounter.findByIdAndUpdate('user_id', { $inc: { sequence_value: 1 } }, { new: true }, function (err, counterseqence) {
                    if (!err) {
                        userData.user_id = counterseqence.sequence_value;
                        User.create(userData, function (error, user) {
                            if (error) {
                                if (error.code && error.code === 11000) {
                                    res.status(400).json({ status: 400, message: "User already exists, please try another email." });
                                } else {
                                    res.status(500).json({ status: 500, message: error.message });
                                }
                            } else if (!error) {
                                userprofile.user_id = user._id;
                                Profile.create(userprofile, function (error, profileres) {
                                    if (error) {
                                        if (error.code && error.code === 11000) {
                                            res.status(400).json({ status: 400, message: "User already exists, please try another email." });
                                        } else {
                                            res.status(500).json({ status: 500, message: error.message });
                                        }
                                    } else if (!error) {
                                        var verifycode = uniqid();
                                        var otpcodeData = {
                                            user_id: user._id,
                                            code: verifycode,
                                            action: "emailverification",
                                        }
                                        Otpcode.create(otpcodeData);
                                        var sendGrid = new Sendgrid();
                                        var options = { email: user.email, code: verifycode };
                                        sendGrid.sendEmail(
                                            user.email,
                                            'Welcome to XTRemCoin',
                                            "views/email.ejs",
                                            options
                                        );
                                        var key = otp();
                                        smsClient.api.messages
                                            .create({
                                                body: 'Your XTRemCoin authentication key is: ' + key,
                                                to: req.body.phone,
                                                from: '+17752047475',
                                            }).then(function (data) {
                                                var otpcodeData = {
                                                    user_id: user._id,
                                                    code: key,
                                                    action: "signupsmsauthkey",
                                                }
                                                Otpcode.update({ user_id: user._id, action: "signupsmsauthkey" }, otpcodeData, {
                                                    upsert: true, setDefaultsOnInsert: true
                                                },
                                                    function (err, updated) {
                                                        if (err) {
                                                            res.status(500).json({ status: 500, message: "An anonymous error was occurred, please try again." });
                                                        } else {
                                                            res.status(200).json({ status: 200, message: 'OTP & Email Sent to you.' });
                                                        }
                                                    }
                                                );
                                            }).catch(function (err) {
                                                res.status(400).json({ status: 400, message: err.message });
                                            });
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                res.status(400).json({ status: 400, message: 'All fields required.' });
            }
        }
    }
    catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
}
userController.verifyByEmail = function (req, res, next) {
    try {
        var email = req.query.email;
        var code = req.query.code;
        if (email && code) {
            User.findOne({ email: email }, function (err, doc) {
                if (err) {
                    res.status(500).json({ status: 500, message: "Account is not registered, please signup." });
                } else {
                    if (doc.verified == 'true') {
                        res.status(200).json({ status: 200, message: "Your account is already confirmed. Please login." });
                    } else {
                        var MS_PER_MINUTE = 60000;
                        var nowdate = new Date();
                        var minus30minDate = new Date(nowdate - 30 * MS_PER_MINUTE);
                        Otpcode.findOne({
                            user_id: doc._id,
                            code: code,
                            action: "emailverification",
                            updatedAt: { $gt: minus30minDate }
                        }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                            if (otperr) {
                                res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                            } else {
                                if (otpdoc !== null && otpdoc.code == code) {
                                    doc.verified = true;
                                    User.findByIdAndUpdate(doc._id, { $set: { verified: doc.verified } }, { new: true }, function (error, result) {
                                        if (error) {
                                            res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                                        } else {
                                            res.status(200).json({ status: 200, message: "Your account has been confirmed. Now you can login using your credentials." });
                                        }
                                    });
                                } else {
                                    message = 'Link is expired and your account verification is unsucessful.';
                                    res.status(400).json({ status: 400, message: message });
                                }
                            }
                        });
                    }
                }
            });
        } else {
            message = 'Link is expired and your account verification is unsucessful.';
            res.status(400).json({ status: 400, message: message });
        }
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
}
userController.verifyByOTP = function (req, res, next) {
    try {
        var email = req.body.email;
        var otp = req.body.otp;
        if (otp && typeof otp !== 'undefined' && otp !== '' && email && typeof email !== 'undefined' && email !== '') {
            User.findOne({ email: email }, function (err, doc) {
                if (err) {
                    res.status(500).json({ status: 500, message: "Account is not registered, please signup." });
                } else {
                    Otpcode.findOne({
                        user_id: doc._id,
                        code: otp,
                        action: 'signupsmsauthkey',
                    }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                        if (otperr) {
                            res.status(500).json({ status: 500, message: 'Something is wrong, please try again.' });
                        } else {
                            if (otpdoc === null) {
                                res.status(400).json({ status: 400, message: "Key doesn't match. Please try next." });
                            } else {
                                if (otpdoc.code == otp) {
                                    Profile.update({ email: email }, { phone_verified: 1 }, function (error, verified) {
                                        if (error) {
                                            res.status(500).json({ status: 500, message: "Something is wrong, please try again." });
                                        } else {
                                            res.status(200).json({ status: 200, message: "Successfully Registered." });
                                        }
                                    })
                                } else {
                                    res.status(400).json({ status: 400, message: "Key doesn't match. Please try next." });
                                }
                            }
                        }
                    });
                }
            })
        }
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
}
userController.login = function (req, res, next) {
    try {
        if (req.body.email && req.body.password) {
            User.authenticate(req.body.email, req.body.password, function (error, user) {
                if (error || !user) {
                    res.status(400).json({ status: 400, message: 'Wrong email or password.' });
                } else {
                    if (typeof user.freeze !== 'undefined' && user.freeze) {
                        res.status(400).json({ status: 400, message: 'Your account has been freezed.<br>Please contact to Xtremcoin Support.' });
                    } else {
                        if (user.verified == 'true') {
                            Twofactor.findOne({ user_id: user._id }, function (error, result) {
                                if (result !== null && typeof result != 'undefined' && result.secret) {
                                    var isTfa = true;
                                    return res.status(200).json({ status: 200, tfa: isTfa, message: 'Two Factor Authentication is enable, Enter your code.' });
                                    // to be stored in jwt payload
                                } else {
                                    var options = {
                                        maxAge: 24 * 60 * 60 * 1000, // would expire after 24 hours
                                    }
                                    res.cookie('tfastatus', 1, options);
                                    var userObj = user;
                                    var methods = new Function(req);
                                    methods.addLoginLog(userObj);
                                    Kycdoc.findOne({ user_id: user._id }).exec(function (error, kycdata) {
                                        if (!error && typeof kycdata != 'undefined' && kycdata !== null) {
                                            if (kycdata.verified) {
                                                res.cookie('kyccheck', 1, options);
                                            } else {
                                                res.cookie('kyccheck', 0, options);
                                            }
                                        } else {
                                            res.cookie('kyccheck', 0, options);
                                        }
                                        ctrl.generateJwt(userObj, function (err, token) {
                                            if (token && token !== 'undefined') {
                                                return res.status(200).json({ status: 200, "token": token.token });
                                            }
                                        })
                                    })
                                }
                            })
                        } else {
                            res.status(400).json({ status: 400, message: 'Your account is not verified yet. Please check your inbox and verify your account.' });
                        }
                    }
                }
            });
        }
        else if (typeof req.body.phone !== 'undefined' && req.body.phone && req.body.phone !== '') {
            var phone = req.body.phone;
            const number = phoneUtil.parseAndKeepRawInput(phone);
            if (phoneUtil.isPossibleNumber(number) && phoneUtil.isValidNumber(number)) {
                phoneTest = true;
            }
            if (phoneTest) {
                Profile.findOne({ phone: phone }).exec(function (error, profiles) {
                    if (error) {
                        res.status(500).json({ status: 500, message: 'Something goes wrong, Please try again' });
                    } else {
                        if (profiles !== null) {
                            User.findOne({ _id: profiles.user_id }).exec(function (error, userdetails) {
                                if (error) {
                                    res.status(500).json({ status: 500, message: 'Something goes wrong, Please try again' });
                                } else {
                                    if (userdetails.freeze === true) {
                                        res.status(400).json({ status: 400, message: 'Your account is freezed. Please contact to Xtremcoin support.' });

                                    } else {
                                        var key = otp();
                                        smsClient.api.messages
                                            .create({
                                                body: 'Your Xtremcoin login OTP (One Time Password) is: ' + key,
                                                to: phone,
                                                from: '+17752047475',
                                            }).then(function (data) {
                                                var otpcodeData = {
                                                    user_id: userdetails._id,
                                                    code: key,
                                                    action: "loginsmsauthkey",
                                                }
                                                Otpcode.update({
                                                    user_id: profiles.user_id,
                                                    action: "loginsmsauthkey"
                                                }, otpcodeData, {
                                                        upsert: true, setDefaultsOnInsert: true
                                                    },
                                                    function (err, updated) {
                                                        if (err) {
                                                            res.status(500).json({ status: 500, message: err.message });
                                                        } else {
                                                            var pinstatus = false;

                                                            if (typeof profiles.secretPin !== 'undefined' && profiles.secretPin && profiles.secretPin !== '') {
                                                                pinstatus = true;
                                                            }

                                                            Twofactor.findOne({ user_id: profiles.user_id }, function (error, result) {
                                                                var twofastatus = false;
                                                                if (result !== null && typeof result != 'undefined' && result.secret) {
                                                                    twofastatus = true;
                                                                }
                                                                var cusObj = {
                                                                    phone: phone,
                                                                    name: profiles.name,
                                                                    pinstatus: pinstatus,
                                                                    twofastatus: twofastatus
                                                                }
                                                                res.status(200).json({ status: 200, customer: cusObj, message: "OTP sent on your number." });
                                                            })
                                                        }
                                                    }
                                                );
                                            }).catch(function (err) {
                                                res.status(400).json({ status: 400, message: err.message });
                                            });
                                    }
                                }
                            })
                        } else {
                            res.status(400).json({ status: 400, message: 'Account not existing, please register.' });
                        }
                    }
                })
            } else {
                res.status(400).json({ status: 400, message: 'Invalid Phone' });
            }
        }
        else {
            res.status(400).json({ status: 400, message: 'All fields required.' });
        }
    }
    catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
}
userController.loginVerify = function (req, res, next) {
    try {
        var phone = req.body.phone
        var otp = req.body.otp;
        var pin = req.body.pin;
        var code = req.body.code;
        if (typeof otp !== 'undefined' && otp && otp !== ''
            && typeof phone !== 'undefined' && phone && phone !== '') {
            Profile.findOne({ phone: phone }).exec(function (error, profiles) {
                if (error) {
                    res.status(500).json({ status: 500, message: 'Invalid Details.' });
                } else {
                    if (profiles !== null) {
                        var user_id = profiles.user_id;
                        if (typeof pin !== 'undefined' && pin && pin !== '') {
                            if (typeof profiles.secretPin !== 'undefined' && profiles.secretPin && profiles.secretPin !== '') {
                                if (pin == profiles.secretPin) {
                                    Otpcode.findOne({
                                        user_id: user_id,
                                        code: otp,
                                        action: 'loginsmsauthkey',
                                    }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                                        if (otperr) {
                                            res.status(500).json({ status: 500, message: 'Invalid Details.' });
                                        } else {
                                            if (otpdoc === null) {
                                                res.status(400).json({ status: 400, message: "OTP doesn't match. Please try next." });
                                            } else {
                                                if (otpdoc.code == otp) {
                                                    User.findOne({ email: email }).exec(function (error, user) {
                                                        if (!error && user !== null) {
                                                            if (typeof user.freeze !== 'undefined' && user.freeze) {
                                                                res.status(400).json({ status: 400, message: "'Your account has been freezed.Please contact to Xtremcoin Support.';" });
                                                            } else {
                                                                if (user.verified == 'true') {
                                                                    profiles.update({ phone: phone }, { phone_verified: '1' }).exec(function (error, verified) {

                                                                    })
                                                                    var options = {
                                                                        maxAge: 24 * 60 * 60 * 1000, // would expire after 24 hours
                                                                    }
                                                                    res.cookie('tfastatus', 1, options);
                                                                    var userObj = user;
                                                                    var methods = new Function(req);
                                                                    methods.addLoginLog(userObj);
                                                                    Kycdoc.findOne({ user_id: user._id }).exec(function (error, kycdata) {
                                                                        if (!error && typeof kycdata != 'undefined' && kycdata !== null) {
                                                                            if (kycdata.verified) {
                                                                                res.cookie('kyccheck', 1, options);
                                                                            } else {
                                                                                res.cookie('kyccheck', 0, options);
                                                                            }
                                                                        } else {
                                                                            res.cookie('kyccheck', 0, options);
                                                                        }
                                                                        ctrl.generateJwt(userObj, function (err, token) {
                                                                            if (token && token !== 'undefined') {
                                                                                return res.status(200).json({ status: 200, "token": token.token });
                                                                            }
                                                                        })
                                                                    })
                                                                } else {
                                                                    return res.status(400).json({ status: 400, message: 'Your account is not verified yet. Please check your inbox and verify your account.' });
                                                                }
                                                            }
                                                        }
                                                    })
                                                } else {
                                                    return res.status(400).json({ status: 400, message: "OTP doesn't match. Please try next." });
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    return res.status(400).json({ status: 400, message: "Pin doesn't match. Please try next." });
                                }
                            } else {
                                return res.status(400).json({ status: 400, message: "Pin Authentication not enabled." });
                            }
                        }
                        else if (typeof code !== 'undefined' && code && code !== '') {
                            var method = new Function(req);
                            method.googleAuthenticator(res, function (ga) {
                                if (code && user_id) {
                                    Twofactor.findOne({ user_id: user_id }, function (error, result) {
                                        if (error) {
                                            return res.status(500).json({ status: 500, message: "Something is wrong." });
                                        } else {
                                            if (result !== null && typeof result != 'undefined' && result.secret) {
                                                if (ga.verifyCode(result.secret, code)) {
                                                    Otpcode.findOne({
                                                        user_id: user_id,
                                                        code: otp,
                                                        action: 'loginsmsauthkey',
                                                    }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                                                        if (otperr) {
                                                            return res.status(500).json({ status: 500, message: 'Invalid Details.' });
                                                        } else {
                                                            if (otpdoc === null) {
                                                                return res.status(400).json({ status: 400, message: "OTP doesn't match. Please try next." });
                                                            } else {
                                                                if (otpdoc.code == otp) {
                                                                    User.findOne({ _id: user_id }).exec(function (error, user) {
                                                                        if (!error && user !== null) {
                                                                            if (typeof user.freeze !== 'undefined' && user.freeze) {
                                                                                return res.status(400).json({ status: 400, message: 'Your account has been freezed. Please contact to Xtremcoin Support.' });
                                                                            } else {
                                                                                if (user.verified == 'true') {
                                                                                    profiles.update({ phone: phone }, { phone_verified: '1' }).exec(function (error, verified) {

                                                                                    })
                                                                                    var options = {
                                                                                        maxAge: 24 * 60 * 60 * 1000, // would expire after 24 hours
                                                                                    }
                                                                                    res.cookie('tfastatus', 1, options);
                                                                                    var userObj = user;
                                                                                    var methods = new Function(req);
                                                                                    methods.addLoginLog(userObj);
                                                                                    Kycdoc.findOne({ user_id: user._id }).exec(function (error, kycdata) {
                                                                                        if (!error && typeof kycdata != 'undefined' && kycdata !== null) {
                                                                                            if (kycdata.verified) {
                                                                                                res.cookie('kyccheck', 1, options);
                                                                                            } else {
                                                                                                res.cookie('kyccheck', 0, options);
                                                                                            }
                                                                                        } else {
                                                                                            res.cookie('kyccheck', 0, options);
                                                                                        }
                                                                                        ctrl.generateJwt(userObj, function (err, token) {
                                                                                            if (token && token !== 'undefined') {
                                                                                                return res.status(200).json({ status: 200, "token": token.token });
                                                                                            }
                                                                                        })
                                                                                    })
                                                                                } else {
                                                                                    return res.status(400).json({ status: 400, message: 'Your account is not verified yet. Please check your inbox and verify your account.' });
                                                                                }
                                                                            }
                                                                        }
                                                                    })
                                                                } else {
                                                                    return res.status(400).json({ status: 400, message: "OTP doesn't match. Please try next." });
                                                                }
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    return res.status(400).json({ status: 400, message: "Invalid Code." });
                                                }
                                            } else {
                                                return res.status(400).json({ status: 400, message: "Two-Factor is not enabled." });
                                            }
                                        }
                                    });
                                } else {
                                    return res.status(400).json({ status: 400, message: "Code is Invalid." });
                                }
                            });
                        }
                        else {
                            Otpcode.findOne({
                                user_id: profiles.user_id,
                                code: otp,
                                action: 'loginsmsauthkey',
                            }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                                if (otperr) {
                                    return res.status(500).json({ status: 500, message: 'Invalid Details.' });
                                } else {
                                    if (otpdoc === null) {
                                        return res.status(400).json({ status: 400, message: "OTP doesn't match. Please try next." });
                                    } else {
                                        if (otpdoc.code == otp) {
                                            User.findOne({ _id: profiles.user_id }).exec(function (error, user) {
                                                if (!error && user !== null) {
                                                    if (typeof user.freeze !== 'undefined' && user.freeze) {
                                                        return res.status(400).json({ status: 400, message: 'Your account has been freezed. Please contact to Xtremcoin Support.' });
                                                    } else {
                                                        if (user.verified == 'true') {
                                                            var options = {
                                                                maxAge: 24 * 60 * 60 * 1000, // would expire after 24 hours
                                                            }
                                                            res.cookie('tfastatus', 1, options);
                                                            var userObj = user;
                                                            var methods = new Function(req);
                                                            methods.addLoginLog(userObj);
                                                            Kycdoc.findOne({ user_id: user._id }).exec(function (error, kycdata) {
                                                                if (!error && typeof kycdata != 'undefined' && kycdata !== null) {
                                                                    if (kycdata.verified) {
                                                                        res.cookie('kyccheck', 1, options);
                                                                    } else {
                                                                        res.cookie('kyccheck', 0, options);
                                                                    }
                                                                } else {
                                                                    res.cookie('kyccheck', 0, options);
                                                                }
                                                                ctrl.generateJwt(userObj, function (err, token) {
                                                                    if (token && token !== 'undefined') {
                                                                        return res.status(200).json({ status: 200, "token": token.token });
                                                                    }
                                                                })
                                                            })
                                                        } else {
                                                            return res.status(400).json({ status: 400, message: 'Your account is not verified yet. Please check your inbox and verify your account.' });
                                                        }
                                                    }
                                                }
                                            })
                                        } else {
                                            return res.status(400).json({ status: 400, message: "OTP doesn't match. Please try next." });
                                        }
                                    }
                                }
                            });
                        }

                    } else {
                        return res.status(400).json({ status: 400, message: 'Invalid Details.' });
                    }
                }
            })
        }
        else {
            res.status(400).json({ status: 400, message: 'Invalid Details.' });
        }
    } catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
userController.auth2FA = function (req, res, next) {
    try {
        var email = req.body.email;
        var code = req.body.code;
        if (typeof code !== 'undefined' && code && code !== '' &&
            typeof email !== 'undefined' && email && email !== '') {
            var method = new Function(req);
            method.googleAuthenticator(res, function (ga) {
                User.findOne({ email: email }, function (err, user) {
                    if (err) {
                        res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                    } else {
                        Twofactor.findOne({ user_id: user._id }, function (error, result) {
                            if (error) {
                                res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                            } else {
                                if (result !== null && typeof result != 'undefined' && result.secret) {
                                    if (ga.verifyCode(result.secret, code)) {
                                        var userObj = user;
                                        var methods = new Function(req);
                                        methods.addLoginLog(userObj);
                                        var options = {
                                            maxAge: 24 * 60 * 60 * 1000, // would expire after 24 hours
                                        }
                                        Kycdoc.findOne({ user_id: user._id }).exec(function (error, kycdata) {
                                            if (!error && typeof kycdata != 'undefined' && kycdata !== null) {
                                                if (kycdata.verified) {
                                                    res.cookie('kyccheck', 1, options);
                                                } else {
                                                    res.cookie('kyccheck', 0, options);
                                                }
                                            } else {
                                                res.cookie('kyccheck', 0, options);
                                            }
                                            ctrl.generateJwt(userObj, function (err, token) {
                                                if (token && token !== 'undefined') {
                                                    return res.status(200).json({ status: 200, "token": token.token });
                                                }
                                            })
                                        })
                                    } else {
                                        res.status(400).json({ status: 400, message: "Invalid Code." });
                                    }
                                } else {
                                    res.status(400).json({ status: 400, message: "Two-Factor is not enabled." });
                                }
                            }
                        })
                    }
                })
            })
        } else {
            res.status(400).json({ status: 400, message: "Code is Invalid." });
        }
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
userController.generateJwt = function (Obj, cb) {
    Profile.findOne({ user_id: Obj._id }).exec(function (err, user) {
        if (!err) {
            var expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);
            var returnToken = {
                'token': jwt.sign({
                    email: Obj.email,
                    user_id: user.user_id,
                    phone: user.phone,
                    expiresIn: '6d',
                }, "MY_SECRET"),
                'token_type': "Bearer"
            }
            return cb(null, returnToken);
        }
        else {
            cb(err, null)
        }
    })
}
userController.passwordForgot = function (req, res, next) {
    try {
        var email = req.body.email;
        if (email) {
            User.findOne({ email: email }, function (err, doc) {
                if (err) {
                    res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                } else {
                    if (doc === null) {
                        res.status(400).json({ status: 400, message: "Email is not registered, please signup." });
                    } else {
                        //send email
                        var code = otp();
                        var sendGrid = new Sendgrid();
                        var options = { email: email, code: code };
                        sendGrid.sendEmail(
                            email,
                            'One Time Password for your account at XTRemCoin',
                            "views/emailtemplate/forgotpassword.ejs",
                            options
                        );
                        var otpcodeData = {
                            user_id: doc._id,
                            code: code,
                            action: "passwordrecovery",
                        }
                        Otpcode.update({ user_id: doc._id, action: "passwordrecovery" }, otpcodeData, {
                            upsert: true,
                            setDefaultsOnInsert: true
                        },
                            function (err) {
                                if (err) console.log(err);
                            }
                        );
                        res.status(200).json({ status: 200, message: "We have sent you One Time Password (OTP at your email. Please check your Inbox.)" });
                        //End SendEmail
                    }
                }
            });
        } else {
            res.status(400).json({ status: 400, message: "Email is required." });
        }
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
}
userController.changePassword = function (req, res, next) {
    try {
        var email = req.body.email;
        var code = req.body.otp;
        var newpassword = req.body.password;
        var confirmnewpassword = req.body.passwordrepeat;
        if (email && code && newpassword && confirmnewpassword) {
            if (newpassword != confirmnewpassword) {
                res.status(400).json({ status: 400, message: "New password doesn't match confirm password" });
            } else {
                User.findOne({ email: email }, function (err, doc) {
                    if (err) {
                        res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                    } else {
                        if (doc === null) {
                            res.status(400).json({ status: 400, message: "Email is not registered with us, Please signup." });
                        } else {
                            var MS_PER_MINUTE = 60000;
                            var nowdate = new Date();
                            var minus30minDate = new Date(nowdate - 30 * MS_PER_MINUTE);
                            Otpcode.findOne({
                                user_id: doc._id,
                                code: code,
                                action: "passwordrecovery"
                            }).sort({ _id: -1 }).limit(1).exec(function (otperr, otpdoc) {
                                if (otperr) {
                                    res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                                } else {
                                    if (otpdoc === null) {
                                        res.status(400).json({ status: 400, message: "OTP doesn't match or it is expired." });
                                    } else {
                                        if (otpdoc.code == code) {
                                            otpdoc.remove();
                                            doc.password = newpassword;
                                            doc.passwordrepeat = newpassword;
                                            doc.save(function (error) {
                                                if (error) {
                                                    res.status(500).json({ status: 500, message: "Something bad happened, please try again." });
                                                } else {
                                                    res.status(200).json({ status: 200, message: "Your password has been changed, please login now." });
                                                }
                                            });
                                        } else {
                                            res.status(400).json({ status: 400, message: "OTP doesn't match or it is expired." });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        } else {
            res.status(400).json({ status: 400, message: "All fields are required." });
        }
    }
    catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
}
var ctrl = module.exports = userController