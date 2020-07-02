var express = require('express');
var router = express.Router();
var multer = require('multer')
var jwt = require('express-jwt');
var accountCtrl = require('../controller/accountController');
var kycCtrl = require('../controller/kycController');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

router.get('/iskyc', auth, kycCtrl.kyccheck);
router.get('/getprofile', auth, accountCtrl.getprofile);
router.get('/countrylist', auth, accountCtrl.getCountryList);
router.post('/updateprofile', auth, accountCtrl.profileUpdate);
router.post('/updateverify', auth, accountCtrl.updateConfirm);
router.get('/get2fa', auth, accountCtrl.get2fa);
router.post('/enable2fa', auth, accountCtrl.create2fa);
router.post('/disable2fa', auth, accountCtrl.disbale2fa);
router.post('/kycp', auth, kycCtrl.kycprivate);
router.post('/kycc', auth, kycCtrl.kyccompany);
router.post('/kycb', auth, kycCtrl.kycbank);

module.exports = router;