var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var userCtrl = require('../controller/userController');
/* GET home page. */
router.get('/',userCtrl.showlogin);
// common calls
router.get('/csrf',userCtrl.getCSRF); // get csrf token to authenticate post request
router.get('/authoptions', auth,userCtrl.getAuthenticationOptions);
router.post('/verifyauthentication',auth,userCtrl.verifyAuthentication)
router.get('/countrylist',userCtrl.getCountryList);


module.exports = router;
