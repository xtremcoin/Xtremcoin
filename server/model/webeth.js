/**
 * Created by Laxman on 1/2/2018.
 */
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);
function Webeth(){}
Webeth.prototype.generateAddress = function (req, res) {
    return web3.eth.accounts.create();
}
module.exports = Webeth;