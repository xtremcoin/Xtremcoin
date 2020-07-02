/**
 * Created by Laxman on 12/29/2017.
 */
const RippleAPI = require("ripple-lib").RippleAPI;
const api = new RippleAPI({
    server: 'wss://s1.ripple.com'
});
function Ripple(){}
Ripple.prototype.prepareTransaction = function (req, res, source, destination, amount, dt, secret, callback) {
    api.connect().then(() => {
        const address = source;
        const payment = {
            "source": {
                "address": source,
                "maxAmount": {
                    "value": amount,
                    "currency": "XRP",
                }
            },
            "destination": {
                "address": destination,
                "amount": {
                    "value": amount,
                    "currency": "XRP",
                },
                "tag": Number(dt)
            }
        };
        const instructions = {maxLedgerVersionOffset:50};
        return api.preparePayment(address, payment, instructions).then(prepared =>
        {
            const txJSON = prepared.txJSON;
            var object = JSON.parse(txJSON);
            const signedTxn = api.sign(txJSON, secret);
            object.id = signedTxn.id;
            object.signedTransaction = signedTxn.signedTransaction;
            object.Fee = prepared.instructions.fee;
            object.error = false;
            callback(object);
        });
    }).then(() => {
        return api.disconnect();
    }).catch(function (error) {
        var errorObj = {"error":true,"id":""}
        callback(errorObj);
    });
}
Ripple.prototype.sendTransaction = function (req, res, signedTransaction, callback) {
    api.connect().then(() => {
        return api.submit(signedTransaction)
            .then(result => {
                var code = result.resultCode;
                var subCode = code.substring(0, 3);
                var retC = {error:false,status:"",response:result};
                if(subCode=='tes' || subCode=='ter'){
                    retC.status = "Completed";
                } else {
                    retC.status = "Rejected";
                }
                callback(retC);
            });
    }).then(() => {
        return api.disconnect();
    }).catch(function (error) {
        var retC = {error:true,status:"",response:""};
        callback(retC);
    });
}

Ripple.prototype.getPaymentTransactions = function (res, address, minLedgerVersion, callback) {
    api.connect().then(() => {
        const options = {
            excludeFailures: true,
            initiated: false,
            types: ["payment"],
            minLedgerVersion:Number(minLedgerVersion)
        };
        return api.getTransactions(address,options).then(transaction => {
            callback(transaction);
        });
    }).then(() => {
        return api.disconnect();
    }).catch(console.error);
}
Ripple.prototype.getCurrentLedgerVersion = function (callback) {
    api.connect().then(() => {
        return api.getLedger().then(ledger => {
            callback(ledger.ledgerVersion);
        });
    }).then(() => {
        return api.disconnect();
    }).catch(console.error);
}
module.exports = Ripple;