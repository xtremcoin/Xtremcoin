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
var fs = require("fs");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = "../xtradmin/public/upload/kyc/" + req.payload.user_id;
        if (!fs.existsSync(dir)) {
            shell.mkdir('-p', dir);
        }
        cb(null, dir); // where to store it
    },
    filename: function (req, file, cb) {
        if (file.fileSize) {
            var err = new Error();
            return cb(err);
        }
        else if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|pdf)$/)) {
            var err = new Error();
            err.code = 'fieltype'; // to check on file type
            return cb(err, null);
        } else {
            var name = file.originalname.toLowerCase();
            var ext = name.substr(file.originalname.lastIndexOf('.') + 1)
            var rename = Date.now() + '.' + ext;
            cb(null, rename);
        }
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 3145728 } // Max file size: 3MB (3145728 Bytes)
}).any(); // name in form
kycController = [];
kycController.kyccheck = function (req, res, next) {
    try {
        var user_id = req.payload.user_id;
        if (user_id !== '' && typeof user_id !== undefined) {
            Kycdoc.findOne().exec(function (error, found) {
                if (error) {
                    res.status(500).json({ status: 500, message: 'Internal Server Error' });
                } else {
                    res.status(200).json({ status: 200, kyc: found.status });
                }
            })
        } else {
            res.status(500).json({ status: 500, message: 'Not a user.' });
        }
    } catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
kycController.kycprivate = function (req, res, next) {
    try {
        upload(req, res, function (err) {
            if (err) {
                shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({ message: 'File size is too large. Max limit is 3MB' });
                } else if (err.code === 'fieltype') {
                    res.status(400).json({ message: 'File type is invalid. Only accepted .png/.jpg/.jpeg/.pdf .' });
                } else {
                    res.status(400).json({ message: 'File was not able to be uploaded' });

                }
            }
            else {
                var user_id = req.payload.user_id;
                var idProof = req.body.idProof;
                var idNumber = req.body.idNumber;
                var addressProof = req.body.addressProof;
                var emailVerified = true;
                if (req.body.section == 'bank') emailVerified = false;
                errorObj = {};
                kObj = {};
                kycObj = {};
                if (typeof idProof !== undefined && idProof != null && idProof !== "")
                    kObj.idProof = idProof;
                else
                    errorObj.idProof = 'ID proof is required';
                if (typeof idNumber !== undefined && idNumber != null && idNumber !== "")
                    kObj.idNumber = idNumber;
                else
                    errorObj.idNumber = 'ID number is required';
                if (typeof addressProof !== undefined && addressProof != null && addressProof !== "")
                    kObj.addressProof = addressProof;
                else
                    errorObj.addressProof = 'Address Proof is required';
                var filesObj = req.files;
                filesObj.forEach(obj => {
                    switch (obj.fieldname) {
                        case 'fileDocumentid':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.identity = path;
                            break;
                        case 'fileDocumentaddress':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.addressproof = path;
                            break;
                        default:
                            res.status(400).json({ status: 400, message: "File Upload Failed" });
                    }
                });
                if (Object.keys(errorObj).length === 0) {
                    Profile.findOne({ user_id: user_id }).exec(function (err, profile) {
                        if (err) {
                            shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                            res.status(500).json({ status: 500, message: 'Internal Server Error' });
                        } else if (profile !== null && profile !== '' && profile.sex != '') {
                            kycObj.user_id = user_id;
                            kycObj.department = profile.profileType;
                            kycObj.kyc = kObj;
                            kycObj.emailVerified = emailVerified;
                            Kycdoc.create(kycObj, function (error, success) {
                                if (error.code && error.code === 11000) {
                                    res.status(400).json({ status: 400, message: "Kyc Submitted, Wait for approval." });
                                } else if (!error) {
                                    res.status(200).json({ status: 200, message: "KYC details are uploaded." });
                                } else {
                                    res.status(500).json({ status: 500, message: 'Internal Server Error' });
                                }
                            })
                        }
                        else {
                            shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                            res.status(400).json({ status: 400, message: 'Complete your profile first.' });
                        }
                    })
                } else {
                    shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                    res.status(400).json({ status: 400, message: errorObj });
                }
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
kycController.kyccompany = function (req, res, next) {
    try {
        upload(req, res, function (err) {
            if (err) {
                shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({ message: 'File size is too large. Max limit is 3MB' });
                } else if (err.code === 'fieltype') {
                    res.status(400).json({ message: 'File type is invalid. Only accepted .png/.jpg/.jpeg/.pdf .' });
                } else {
                    res.status(400).json({ message: 'File was not able to be uploaded' });

                }
            }
            else {
                var user_id = req.payload.user_id;
                var emailVerified = true;
                if (req.body.section == 'bank') emailVerified = false;
                var kObj = req.body;
                kycObj = {};
                var filesObj = req.files;
                filesObj.forEach(obj => {
                    switch (obj.fieldname) {
                        case 'fileDocumentId':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.identity = path;
                            break;
                        case 'fileDocumentAddress':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.addressproof = path;
                            break;
                        case 'fileDocumentBank':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.bankstatement = path;
                            break;
                        case 'fileDocumentTax':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.taxdoc = path;
                            break;
                        case 'fileDocumentAppointment':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.managerappointment = path;
                            break;
                        case 'fileDocumentRegistration':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.registration = path;
                            break;
                        default:
                            res.status(400).json({ status: 400, message: "File Upload Failed" });
                    }
                });
                Profile.findOne({ user_id: user_id }).exec(function (err, profile) {
                    if (err) {
                        shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                        res.status(500).json({ status: 500, message: 'Internal Server Error' });
                    } else if (profile !== null && profile !== '' && profile.sex != '') {
                        kycObj.user_id = user_id;
                        kycObj.department = profile.profileType;
                        kycObj.kyc = kObj;
                        kycObj.emailVerified = emailVerified;
                        console.log(kycObj);
                        Kycdoc.create(kycObj, function (error, success) {
                            if (error.code && error.code === 11000) {
                                res.status(400).json({ status: 400, message: "Kyc Submitted, Wait for approval." });
                            } else if (!error) {
                                res.status(200).json({ status: 200, message: "KYC details are uploaded." });
                            } else {
                                res.status(500).json({ status: 500, message: 'Internal Server Error' });
                            }
                        })
                    }
                    else {
                        shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                        res.status(400).json({ status: 400, message: 'Complete your profile first.' });
                    }
                })
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}
kycController.kycbank = function (req, res, next) {
    try {
        upload(req, res, function (err) {
            if (err) {
                shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({ message: 'File size is too large. Max limit is 3MB' });
                } else if (err.code === 'fieltype') {
                    res.status(400).json({ message: 'File type is invalid. Only accepted .png/.jpg/.jpeg/.pdf .' });
                } else {
                    res.status(400).json({ message: 'File was not able to be uploaded' });
                }
            }
            else {
                var user_id = req.payload.user_id;
                var emailVerified = true;
                if (req.body.section == 'bank') emailVerified = false;
                var kObj = req.body;
                kycObj = {};
                var filesObj = req.files;
                filesObj.forEach(obj => {
                    switch (obj.fieldname) {
                        case 'fileBankID':
                            var string = obj.path + "";
                            var path = string.replace('../xtradmin/public/', '');
                            kycObj.bankid = path;
                            break;
                        default:
                            res.status(400).json({ status: 400, message: "File Upload Failed" });
                    }
                });
                Profile.findOne({ user_id: user_id }).exec(function (err, profile) {
                    if (err) {
                        shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                        res.status(500).json({ status: 500, message: 'Internal Server Error' });
                    } else if (profile !== null && profile !== '' && profile.sex != '') {
                        kycObj.user_id = user_id;
                        kycObj.department = profile.profileType;
                        kycObj.kyc = kObj;
                        kycObj.emailVerified = emailVerified;
                        Kycdoc.create(kycObj, function (error, success) {
                            if (error.code && error.code === 11000) {
                                res.status(400).json({ status: 400, message: "Kyc Submitted, Wait for approval." });
                            } else if (!error) {
                                res.status(200).json({ status: 200, message: "KYC details are uploaded." });
                            } else {
                                res.status(500).json({ status: 500, message: 'Internal Server Error' });
                            }
                        })
                    }
                    else {
                        shell.rm('-rf', "../xtradmin/public/upload/kyc/" + req.payload.user_id + '/*');
                        res.status(400).json({ status: 400, message: 'Complete your profile first.' });
                    }
                })
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: 500, message: e.message });
    }
}

var ctrl = module.exports = kycController;