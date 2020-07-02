var express = require('express');
var router = express.Router();
//var OrderController = require("../controllers/OrderController");
//var ApiController = require("../controllers/ApiController");
var jwt = require('express-jwt');
var app = express();
const requestIp = require('request-ip');

app.use(requestIp.mw())
app.use(function(req, res) {
    const ip = req.clientIp;
    console.log(ip);
});

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

/*router.get("/orders",OrderController.orders);
router.get("/getorders",OrderController.getorders);
router.get("/ticker/:currency_pair",ApiController.getTicker);
router.post("/auth/token",ApiController.authenticateApi);
router.get("/wallets", auth, ApiController.getWallets);
router.get('/wallet/newaddress/:currency', auth, ApiController.generateAddress);
router.get("/wallet/:wallet_id", auth, ApiController.getWalletById);
router.get("/transactions", auth, ApiController.getTransactions);
router.get("/transaction/:txn_id", auth, ApiController.getTransactionById);
router.get("/ohlcv/:symbol/:from?/:to?", ApiController.getOhlcv);
*/

module.exports=router;