var express = require('express');
var router = express.Router();
var multer = require('multer')
var jwt = require('express-jwt');
var userCtrl = require('../controller/userController');

router.post('/signup', userCtrl.signup);
router.post('/signupverify', userCtrl.verifyByOTP);
router.get('/verify', userCtrl.verifyByEmail);
router.post('/login', userCtrl.login);
router.post('/verifyotp', userCtrl.loginVerify);
router.post('/authentication', userCtrl.auth2FA);
router.post('/forgotpassword', userCtrl.passwordForgot);
router.post('/passwordrecovery', userCtrl.changePassword);

module.exports = router;