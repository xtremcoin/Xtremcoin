/**
 * Created by Laxman on 10/20/2017.
 */
/*var BitGo = require('bitgo');
var Wallet = require('../model/wallet');
var Initwallet = require('../model/initwallet');
var Ripple = require('../model/ripple');
var Webeth = require('../model/webeth');


var Transaction = require('../model/transaction');
var Cronlog = require('../model/cronlog');
var nodemailer = require('nodemailer');
const publicIp = require('public-ip');
var smtpTransport = require('nodemailer-smtp-transport');
var uniqid = require('uniqid');*/
var Sendgrid = require('../model/sendgrid');
var Loginlog = require('../model/loginlog');
var Twofactor = require('../model/twofactor');
var Balance = require('../model/balance');
var Addresshistory = require('../model/addresshistory');
var Pooler = require('../model/pooler');
var fs = require("fs");
var ejs = require("ejs");
/*const ba = require('bitcoinaverage');
//You can get an API key for free at 1forge.com
const ForexDataClient = require("forex-quotes");
var restClient = ba.restfulClient(publicKey, secretKey);
var transporter = nodemailer.createTransport({
    host: 'pro1.mail.ovh.net',
    auth: {
        user: 'noreply@xtremcoin.com',
        pass: 'XTRGeliy00!2023!@+'
    }
});
const RippleAPI = require("ripple-lib").RippleAPI;
const api = new RippleAPI({
    server: 'wss://s1.ripple.com'
});
let client = new ForexDataClient('7uTHzAbaAWomcqt64NMQVMiaAJjkDL3b');
var publicKey = 'N2U0MDljYTc1MGFhNDc2OTk3NjkyZjI5ZTFjNWE4YzM';
var secretKey = 'MDE3ODdiNjZmNGEzNDgwMDgwZWY4ZjM0NTE4YmZiMWNmMTlhNWFiZWNkNTE0MTk4YjE2YWVmNGFhODkyYmYwYQ';
var pusher = new Pusher({
    appId: '479633',
    key: 'c72c404f12b7eceb7180',
    secret: '1556f1d9473d7d58316c',
    cluster: 'eu',
    encrypted: true
});
*/
var rn = require('random-number');
var Pusher=require('pusher');


//const cryptoRandomString = require('crypto-random-string');
var dstTAG = rn.generator({
    min:  10000000
    , max:  100000000
    , integer: true
});

const ACCESS_TOKEN = "v2xcdd4382fd5747e49a2223114359b7d99fdd34611eb5ef2332c5c0f349ff195c4"; // xtremcoin_newserver
//var bitgo = new BitGo.BitGo({ accessToken: ACCESS_TOKEN, env: 'custom' });
var googleAuth=require('google_authenticator').authenticator;
var ga=new googleAuth();

function Function(req){
    this.req = req;
    this.baseUrl = "http://xtremcoinlocal.com/";
}
/*Function.prototype.createXRPAddresses = function (res) {
    var currency = "XRP";
    var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            var dtIncrement = initwallet.dtIncrement+1;
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!walt || walt==null){
                        var address = initwallet.wallet_id+"?dt="+dtIncrement;
                        var walletData = {
                            email:userObj.email,
                            wallet_id: initwallet.wallet_id,
                            address:address,
                            currency:currency,
                            label: currency,
                            destinationTag:dtIncrement
                        }
                        Wallet.create(walletData,function (error, data) {
                            if(error || !data){return false;}else {
                                Initwallet.update({currency:currency},{dtIncrement:dtIncrement},{},function (e, r) {return true;});
                            }
                        });
                    }else {return false;}
                }
            });
        }
    });
}
Function.prototype.createXTRAddresses = function (res,userObj) {
    var req = this.req;
    var currency = "XTR";
    //var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!walt || walt==null){
                        var webeth = new Webeth();
                        var addresses = webeth.generateAddress(req,res);
                        if(addresses.address){
                            var address = addresses.address;
                            var secret = addresses.privateKey;
                            var walletData = {
                                email:userObj.email,
                                wallet_id: initwallet.wallet_id,
                                address:address,
                                currency:initwallet.currency,
                                label: initwallet.currency,
                                secret:secret
                            }
                            Wallet.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                        }
                    }else {return false;}
                }
            });
        }
    });
}
Function.prototype.createUSDAddresses = function (res,userObj) {
    var req = this.req;
    var currency = "USD";
    //var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!walt || walt==null){
                        var address = "usd"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                wallet_id: initwallet.wallet_id,
                                address:address,
                                currency:initwallet.currency,
                                label: initwallet.currency,
                            }
                            Wallet.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {
                                    console.log(data);
                                }
                            });
                        }
                    }else {return false;}
                }
            });
        }
    });
}
Function.prototype.createTRYAddresses = function (res,userObj) {
    var req = this.req;
    var currency = "TRY";
    //var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!walt || walt==null){
                        var address = "try"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                wallet_id: initwallet.wallet_id,
                                address:address,
                                currency:initwallet.currency,
                                label: initwallet.currency,
                            }
                            Wallet.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {
                                    console.log(data);
                                }
                            });
                        }
                    }else {return false;}
                }
            });
        }
    });
}
Function.prototype.createEURAddresses = function (res,userObj) {
    var req = this.req;
    var currency = "EUR";
    //var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!walt || walt==null){
                        var address = "eur"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                wallet_id: initwallet.wallet_id,
                                address:address,
                                currency:initwallet.currency,
                                label: initwallet.currency,
                            }
                            Wallet.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {
                                    console.log(data);
                                }
                            });
                        }
                    }else {return false;}
                }
            });
        }
    });
}
Function.prototype.createBitgoV2Addresses = function(currency,res,userObj) {
    //var userObj = this.req.session.userObj;
    var capCurrency = currency.toUpperCase();
    Wallet.findOne({email : userObj.email, currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                return false;
            }else{
                Initwallet.findOne({currency: capCurrency}, function (werr, wdocs) {
                    if(werr){
                        return false;
                    }else {
                        if (wdocs !== null){
                            var dtIncrement = wdocs.dtIncrement+1;
                            let walletId = wdocs.wallet_id;
                            bitgo.coin(currency).wallets().get({ id: walletId })
                             .then(function(wallet) {
                                 var parameters = {};
                                 //if(currency=='eth') parameters.gasPrice = 3000000000;
                                 parameters.label = capCurrency+" ("+userObj.email+")";
                             wallet.createAddress(parameters)
                             .then(function(address) {
                                 console.log(address);
                                 if(address!==null && typeof address != 'undefined' && address.index!==null){
                                     if(currency=='xrp'){
                                         var mainaddress = address.address.split("=")[0]+"="+dtIncrement;
                                     }else {
                                         var mainaddress = address.address;
                                     }
                                     var walletData = {
                                         email:userObj.email,
                                         wallet_id: walletId,
                                         address:mainaddress?mainaddress:"",
                                         addressId:address.id?address.id:"",
                                         index:address.index,
                                         chain:address.chain,
                                         currency:capCurrency,
                                         label: capCurrency
                                     }
                                     if(currency=='txrp' | currency=='xrp'){
                                         walletData.destinationTag = dtIncrement;
                                     }
                                     Wallet.create(walletData,function(wallerror,walldata){
                                         console.log(wallerror);
                                         console.log(walldata);
                                         if(currency=='xrp'){
                                             if(wallerror || !walldata){return false;}else {
                                                 Initwallet.update({currency:capCurrency},{dtIncrement:dtIncrement},{},function (e, r) {return true;});
                                             }
                                         }
                                     });
                                 }
                             });
                             });
                        }
                    }
                });
            }
        }
    });
};

Function.prototype.createBTCAddresses = function(currency,res) {
    var userObj = this.req.session.userObj;
    var capCurrency = currency.toUpperCase();
    Wallet.findOne({email : userObj.email, currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                return false;
            }else{
                Initwallet.findOne({currency: capCurrency}, function (werr, wdocs) {
                    if(werr){
                        return false;
                    }else {
                        if (wdocs !== null){
                            var walletId = wdocs.wallet_id;
                            bitgo.wallets().get({ "id": walletId }, function callback(err, wallet) {
                                if (err) {
                                    throw err;
                                }else {
                                    wallet.createAddress({ "chain": 0 }, function callback(err, address) {
                                        if(address!==null && typeof address != 'undefined' && address.address!==null){
                                            var walletData = {
                                                email:userObj.email,
                                                wallet_id: walletId,
                                                address:address.address,
                                                index:address.index,
                                                chain:address.chain,
                                                currency:capCurrency,
                                                label: capCurrency
                                            }
                                            Wallet.create(walletData);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};

Function.prototype.getWalletBalance = function(currency) {
    var userObj = this.req.session.userObj;
    var capCurrency = currency.toUpperCase();

    Wallet.findOne({email : userObj.email, currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                var passphrase = docs.passphrase;
                bitgo.coin(currency).wallets()
                    .get({ id: docs.wallet_id })
                    .then(function(wallet){
                        if(wallet._wallet.balance && wallet._wallet.balance>0){
                            var bal = wallet._wallet.balance/100000000;
                            docs.balance = bal;
                            docs.save();
                        }
                    });
            }else{
                return false;
            }
        }
    });
};*/
Function.prototype.addLoginLog = function(Obj) {
    var userObj = Obj;
    console.log(userObj);
    var agent = this.req.headers['user-agent'];
    var ip = this.req.headers['x-forwarded-for'];
    var logData = {
        user_id:userObj._id,
        ip:ip,
        userAgent:agent
    }
    if(ip !== null && typeof ip != 'undefined' && ip!=""){
        console.log(logData);
        Loginlog.create(logData);
        var sendGrid = new Sendgrid();
        var options = {email: userObj.email, ip: ip};
        sendGrid.sendEmail(
            userObj.email,
            'New Login XTRemCoin',
            "views/emailtemplate/loginlog.ejs",
            options
        );
    }
};
/*Function.prototype.updateTransactions = function(currency) {
    var userObj = this.req.session.userObj;
    var capCurrency = currency.toUpperCase();
    Wallet.findOne({email : userObj.email, currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                var wallet_id = docs.wallet_id;
                bitgo.coin(currency).wallets()
                    .get({ id: docs.wallet_id })
                    .then(function(wallet){
                        if(wallet._wallet.balance && wallet._wallet.balance>0){
                            wallet.transactions()
                                .then(function(transactions) {
                                    // print transactions
                                    Transaction.findOne({ email: userObj.email,currency:capCurrency }).sort({_id:-1}).limit(1).exec(function(txerr, txdoc){
                                        var errorFlag = false;
                                        var skipTxn = "";
                                        if(txdoc !==null && typeof txdoc != 'undefined' && txdoc.transactionId){
                                            skipTxn = txdoc.transactionId;
                                        }
                                        var totalTxn = [];
                                        var BreakException = {};
                                        try{
                                            transactions.transactions.forEach(function(txn){
                                                if (txn.id == skipTxn) throw BreakException;
                                                var fromWallet = txn.fromWallet;
                                                var toWallet = "";
                                                var from = "";
                                                var to = "";
                                                var amount = "";
                                                var date = txn.date;
                                                txn.inputs.forEach(function(input){
                                                    if(input.wallet && input.address && input.wallet == fromWallet){
                                                        from = input.address;
                                                    }
                                                });

                                                txn.outputs.forEach(function(output){
                                                    if(output.wallet && output.address && output.wallet!=fromWallet){
                                                        to = output.address;
                                                        toWallet = output.wallet;
                                                        amount = output.value/1e8;
                                                    }
                                                });
                                                var txnData = {
                                                    email:userObj.email,
                                                    fromAddress:from,
                                                    toAddress:to,
                                                    fromWallet:fromWallet,
                                                    toWallet:toWallet,
                                                    amount:amount,
                                                    transactionId:txn.id,
                                                    currency:capCurrency,
                                                    updatedAt:date
                                                };
                                                totalTxn.push(txnData);

                                            });
                                            var reverArrayObj = totalTxn.reverse();
                                            reverArrayObj.forEach(function(txn){
                                                Transaction.create(txn);
                                            });
                                        }catch (e) {
                                            if (e !== BreakException) throw e;
                                        }
                                    });
                                });

                        }
                    });
            }else{
                return false;
            }
        }
    });
};
Function.prototype.updateXRPTransaction = function(){
    api.connect().then(() => {
        var userObj = this.req.session.userObj;
        Wallet.findOne({email : userObj.email, currency: "XRP"}, function (err, docs) {
                if(err){
                    return false;
                }else {
                    if (docs !== null){
                        console.log(docs);
                        Transaction.findOne({email:userObj.email,currency:"XRP"}).sort({_id:-1}).limit(1).exec(function(txnError, txnData){
                            console.log(txnData);
                            var skipTxn = "";
                            if(txnData !==null && typeof txnData != 'undefined' && txnData.transactionId){
                                skipTxn = txnData.transactionId;
                            }
                            var address = docs.address;
                            var options = {
                                excludeFailures:true,
                            };
                            if(skipTxn) options.start = skipTxn;
                            console.log(options);
                            console.log(address);
                            return api.getTransactions(address,options).then(transaction => {
                                console.log(transaction);
                            });
                        });
                    }
                }
        });
    }).then(() => {
            return api.disconnect();
    }).catch(console.error);
};

Function.prototype.createInitialBTCWallet = function(){
    var capCurrency = "BTC";
    var passphrase = uniqid();
    var data = {
        "passphrase": passphrase,
        "label": 'XTRemCoin '+capCurrency+' Instant',
        "enterprise": '59e3d290056e594a0791ccd748e41957',
        "backupXpubProvider": "keyternal"
    }
    Initwallet.findOne({currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                return false;
            }else {
                bitgo.wallets().createWalletWithKeychains(data, function(err, result) {
                    if (err) { console.dir(err); throw new Error("Could not create wallet!"); }else {
                        if(typeof result.wallet != 'undefined'){
                            var init_wallet = {
                                wallet_id: result.wallet.wallet.id,
                                label:result.wallet.wallet.label,
                                userKeychain: result.userKeychain,
                                backupKeychain: result.backupKeychain,
                                permissions: result.wallet.wallet.permissions,
                                currency: capCurrency,
                                passphrase: passphrase,
                            }
                            Initwallet.create(init_wallet);
                        }
                    }
                });
            }
        }
    });
}

Function.prototype.createInitialOtherWallets = function(currency){
    var capCurrency = currency.toUpperCase();
    var passphrase = uniqid();
    var data = {
        "passphrase": passphrase,
        "label": 'XTRemCoin '+capCurrency+' Instant',
        "enterprise": '59e3d290056e594a0791ccd748e41957',
        "backupXpubProvider": "keyternal"
    }

    Initwallet.findOne({currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                return false;
            }else {
                bitgo.coin(currency).wallets()
                    .generateWallet(data)
                    .then(function(result) {
                        if(typeof result.wallet != 'undefined'){
                            var init_wallet = {
                                wallet_id: result.wallet._wallet.id,
                                label:result.wallet._wallet.label,
                                userKeychain: result.userKeychain,
                                backupKeychain: result.backupKeychain,
                                currency: capCurrency,
                                passphrase: passphrase,
                            }
                            Initwallet.create(init_wallet);
                        }
                    });
            }
        }
    });
}
Function.prototype.createBitcoinV2Wallets = function(currency){
    var capCurrency = currency.toUpperCase();
    var passphrase = uniqid();
    var data = {
        "passphrase": passphrase,
        "label": 'XTRemCoin '+capCurrency+' V2 Instant',
        "enterprise": '59e3d290056e594a0791ccd748e41957',
        "backupXpubProvider": "keyternal"
    }

    Initwallet.findOne({currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (docs !== null){
                return false;
            }else {
                bitgo.coin(currency).wallets()
                    .generateWallet(data)
                    .then(function(result) {
                        console.log(result);
                        if(typeof result.wallet != 'undefined'){
                            var init_wallet = {
                                wallet_id: result.wallet._wallet.id,
                                label:result.wallet._wallet.label,
                                userKeychain: result.userKeychain,
                                backupKeychain: result.backupKeychain,
                                currency: capCurrency,
                                passphrase: passphrase,
                            }
                            Initwallet.create(init_wallet);
                        }
                    });
            }
        }
    });
}
Function.prototype.updateETHAddress = function(res,next){
    var currency = this.req.body.wallet;
    var capCurrency = currency.toUpperCase();
    var walletObj = res.locals.walletObj[capCurrency];
    let walletId = walletObj.wallet_id;
    if(walletId && !walletObj.address){
        var index = walletObj.index;
        bitgo.coin(currency).wallets().get({ id: walletId })
            .then(function(wallet) {
                wallet.addresses({limit:500})
                    .then(function(addresses) {
                        var AR = addresses.addresses.reverse();
                        var BreakException = {};
                        try {
                            var matched = false;
                            AR.forEach(function (a) {
                                if (a.index == index) {
                                    var matched = true;
                                    Wallet.update({_id:walletObj._id},{address:a.address},{multi:true},function(error,rows){});
                                    var result = {
                                        address:a.address
                                    }
                                    res.send(result);
                                    throw BreakException;
                                }
                            });
                        }catch (e) {
                            if (e !== BreakException) throw e;
                        }
                    });

            });
    }else {
        res.send();
    }
}

Function.prototype.cronETHupdateAddresses = function(res,next,walletObj,currency){
    var crondata = {
        code: "ETH_UPDATE_ADDRESS",
        description: "Updating ETH address",
    }
    Cronlog.create(crondata,function(cerr,cdata){
        var capCurrency = currency.toUpperCase();
        let walletId = walletObj.wallet_id;
        if(walletId && !walletObj.address){
            var index = walletObj.index;
            bitgo.coin(currency).wallets().get({ id: walletId })
                .then(function(wallet) {
                    wallet.addresses({limit:500})
                        .then(function(addresses) {
                            var AR = addresses.addresses.reverse();
                            var BreakException = {};
                            try {
                                var matched = false;
                                AR.forEach(function (a) {
                                    if (a.index == index) {
                                        var matched = true;
                                        Wallet.update({_id:walletObj._id},{address:a.address},{multi:true},function(error,rows){});
                                        var result = {
                                            email: walletObj.email,
                                            address:a.address,
                                            addressId: walletObj.addressId
                                        }
                                        var date = new Date();
                                        if(cdata!==null && typeof cdata != 'undefined' && cdata != "")
                                        Cronlog.update({_id:cdata._id},{result:result,endAt:date},{multi:true},function(error,rows){});
                                        return result;
                                        throw BreakException;
                                    }
                                });
                                var result = {email:walletObj.email,address:"",addressId: walletObj.addressId};
                                var date = new Date();
                                Cronlog.update({_id:cdata._id},{result:result,endAt:date},{multi:true},function(error,rows){});
                                return result;
                            }catch (e) {
                                if (e !== BreakException) throw e;
                            }
                        });

                });
        }else {
            var result = {email:walletObj.email,address:"",addressId: walletObj.addressId};
            var date = new Date();
            Cronlog.update({_id:cdata._id},{result:result,endAt:date},{multi:true},function(error,rows){});
            return result;
        }
    });
}

Function.prototype.nonBtcBalance = function(res,next,walletObj){
    var crondata = {
        code: "UPDATE_NON_BTC_BALANCE",
        description: "Updating NON-BTC Balance",
    }
    Cronlog.create(crondata,function(cerr,cdata){
        var caPcurrency = walletObj.currency;
        var currency = caPcurrency.toLowerCase();
        let walletId = walletObj.wallet_id;
        bitgo.coin(currency).wallets().get({ id: walletId })
            .then(function(wallet) {
                wallet.getAddress({address: walletObj.address})
                    .then(function(address) {
                        var balance = address.coinSpecific.balance ? parseInt(address.coinSpecific.balance):walletObj.balance;
                        Wallet.update({_id:walletObj._id},{balance:balance},function(error,rows){});
                        var result = {
                            email: walletObj.email,
                            address:walletObj.address,
                            balance:balance,
                        }
                        var date = new Date();
                        if(cdata!==null && typeof cdata != 'undefined' && cdata != "")
                            Cronlog.update({_id:cdata._id},{result:result,endAt:date},{multi:true},function(error,rows){});
                        return result;
                    });
            });
    });
}
Function.prototype.btcBalance = function(res,next,walletObj){
    var crondata = {
        code: "UPDATE_BTC_BALANCE",
        description: "Updating BTC Balance",
    }
    Cronlog.create(crondata,function(cerr,cdata){
        var caPcurrency = walletObj.currency;
        var currency = caPcurrency.toLowerCase();
        let walletId = walletObj.wallet_id;
        bitgo.wallets().get({ "id": walletId }, function(err, wallet) {
            if (err) { console.log(err); }else {
                wallet.address({ address: walletObj.address }, function(err, walletAddress) {
                    var balance = walletAddress.balance?walletAddress.balance/1e8:walletObj.balance;
                    Wallet.update({_id:walletObj._id},{balance:balance},function(error,rows){});
                    var result = {
                        email: walletObj.email,
                        address:walletObj.address,
                        balance:balance,
                    }
                    var date = new Date();
                    if(cdata!==null && typeof cdata != 'undefined' && cdata != "")
                    Cronlog.update({_id:cdata._id},{result:result,endAt:date},{multi:true},function(error,rows){});
                    return result;
                });
            }
        });
    });
}

Function.prototype.btcReceivedTxn = function(res,next){
    Initwallet.findOne({currency:"BTC"},function (error, rows) {
        if(error){
            res.send();
        }else {
            if(rows!==null && typeof rows != 'undefined' && rows.wallet_id){
                var walletObj = rows;
                var caPcurrency = walletObj.currency;
                var currency = caPcurrency.toLowerCase();
                var walletId = walletObj.wallet_id;
                bitgo.wallets().get({ "id": walletId }, function callback(err, wallet) {
                    if (err) { throw err; }
                    wallet.transactions({}, function callback(err, transactions) {
                        // handle transactions
                                Wallet.find({currency:"BTC",address: {$ne: ""}},function (error, walletData) {
                                    if(error){}else {
                                        if(walletData!==null){
                                            walletData.forEach(function (wObj) {
                                                Transaction.findOne({sendOrReceive:"Received",currency:"BTC",atWallet:wObj.wallet_id,email:wObj.email}).sort({createdAt:-1}).limit(1).exec(function(txnError, txnData){
                                                    if(txnError){}else {
                                                        var skipTx = "";
                                                        if(txnData!==null){
                                                            skipTx = txnData.transactionId;
                                                        }
                                                        var totalTxn = [];
                                                        var BreakException = {};
                                                        try {
                                                            transactions.transactions.forEach(function (txn) {
                                                                if (txn.id == skipTx) throw BreakException;
                                                                txn.outputs.forEach(function (output) {
                                                                    if(output.account == wObj.address){
                                                                        var status = txn.pending?"Pending":"Completed";
                                                                        var saveData = {
                                                                            email:wObj.email,
                                                                            atAddress:output.account,
                                                                            atWallet:wObj.wallet_id,
                                                                            amount:output.value/1e8,
                                                                            fee:txn.fee/1e8,
                                                                            transactionId:txn.id,
                                                                            currency:"BTC",
                                                                            status:status,
                                                                            sendOrReceive:"Received",
                                                                            createdAt:txn.date
                                                                        }
                                                                        if(txn.instant && txn.instantId) {
                                                                            saveData.isInstant = true;
                                                                            saveData.instantId = txn.instantId;
                                                                        }
                                                                        totalTxn.push(saveData);
                                                                    }
                                                                });
                                                            });
                                                        }catch(e){
                                                            if (e !== BreakException) throw e;
                                                        }
                                                        var reverArrayObj = totalTxn.reverse();
                                                        reverArrayObj.forEach(function(txn){
                                                            Transaction.create(txn,function (error, transaction) {
                                                                if(error){console.log(error);}else {
                                                                    if(transaction!==null){
                                                                        if(transaction._id){
                                                                            Balance.create({
                                                                                email:transaction.email,
                                                                                currency:transaction.currency,
                                                                                amount:transaction.amount,
                                                                                txn_ref:transaction._id,
                                                                                in_out:"In"
                                                                            });
                                                                            var sendGrid = new Sendgrid();
                                                                            var options = {
                                                                                money:transaction.amount,
                                                                                currency:transaction.currency,
                                                                                atAddress:transaction.atAddress
                                                                            };
                                                                            sendGrid.sendEmail(
                                                                                transaction.email,
                                                                                'Received Money XTRemCoin',
                                                                                "views/emails/receiveTxn.ejs",
                                                                                options
                                                                            );
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }
                                });
                        res.send();
                    });
                });
            }else {
                res.send();
            }
        }
    });
}

Function.prototype.nonBtcReceivedTxn = function(res,next){
    Initwallet.find({wallet_id:{$ne:""},currency:{$nin:["BTC","XRP","XTR","TRY","EUR","USD"]}},function (error, rows) {
        if(error){
            res.send();
        }else {
            if(rows!==null && typeof rows != 'undefined'){
                rows.forEach(function (row) {
                    var walletObj = row;
                    var caPcurrency = walletObj.currency;
                    var currency = caPcurrency.toLowerCase();
                    let walletId = walletObj.wallet_id;
                    bitgo.coin(currency).wallets().get({ id: walletId }, function callback(err, wallet) {
                        if (err) { throw err; }else {
                            wallet.transactions({}, function callback(err, transactions) {
                                // handle transactions
                                Wallet.find({currency:caPcurrency,address: {$ne: ""}},function (error, walletData) {
                                    if(error){}else {
                                        if(walletData!==null){
                                            walletData.forEach(function (wObj) {
                                                Transaction.findOne({sendOrReceive:"Received",currency:caPcurrency,atWallet:wObj.wallet_id,email:wObj.email}).sort({createdAt:-1}).limit(1).exec(function(txnError, txnData){
                                                    if(txnError){}else {
                                                        var skipTx = "";
                                                        if(txnData!==null){
                                                            skipTx = txnData.transactionId;
                                                        }
                                                        var totalTxn = [];
                                                        var BreakException = {};
                                                        try {
                                                            transactions.transactions.forEach(function (txn) {
                                                                if (txn.id == skipTx) throw BreakException;
                                                                if(typeof txn.outputs != 'undefined') var outputs = txn.outputs;
                                                                else var outputs = txn.entries;
                                                                outputs.forEach(function (output) {
                                                                    if(output.address == wObj.address){
                                                                        var status = txn.confirmations?"Completed":"Pending";
                                                                        if(caPcurrency=='ETH'){
                                                                            var amount = output.value/1000000000000000000;
                                                                            var fee = txn.fee/1000000000000000000;
                                                                        }else if (caPcurrency=='XRP'){
                                                                            var amount = output.value/1000000;
                                                                            var fee = txn.fee/1000000;
                                                                        }else {
                                                                            var amount = output.value/1e8;
                                                                            var fee = txn.fee/1e8;
                                                                        }
                                                                        var saveData = {
                                                                            email:wObj.email,
                                                                            atAddress:output.address,
                                                                            atWallet:wObj.wallet_id,
                                                                            amount: amount,
                                                                            fee: fee,
                                                                            transactionId:txn.id,
                                                                            currency:caPcurrency,
                                                                            status:status,
                                                                            sendOrReceive:"Received",
                                                                            createdAt:txn.date
                                                                        }
                                                                        totalTxn.push(saveData);
                                                                    }
                                                                });
                                                            });
                                                        }catch(e){
                                                            if (e !== BreakException) throw e;
                                                        }
                                                        var reverArrayObj = totalTxn.reverse();
                                                        reverArrayObj.forEach(function(txn){
                                                            Transaction.create(txn,function (error, transaction) {
                                                                if(error){console.log(error);}else {
                                                                    if(transaction!==null){
                                                                        if(transaction._id){
                                                                            Balance.create({
                                                                                email:transaction.email,
                                                                                currency:transaction.currency,
                                                                                amount:transaction.amount,
                                                                                txn_ref:transaction._id,
                                                                                in_out:"In"
                                                                            });

                                                                            var sendGrid = new Sendgrid();
                                                                            var options = {
                                                                                money:transaction.amount,
                                                                                currency:transaction.currency,
                                                                                atAddress:transaction.atAddress
                                                                            };
                                                                            sendGrid.sendEmail(
                                                                                transaction.email,
                                                                                'Received Money XTRemCoin',
                                                                                "views/emails/receiveTxn.ejs",
                                                                                options
                                                                            );
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }
                                });
                                res.send();
                            });
                        }
                    });
                });
            }else {
                res.send();
            }
        }
    });
}
Function.prototype.XRPReceivedTxn = function(res,next){
    Initwallet.find({wallet_id:{$ne:""},currency:"XRP"},function (error, rows) {
        if(error){
            res.send();
        }else {
            if(rows!==null && typeof rows != 'undefined'){
                rows.forEach(function (row) {
                    var walletObj = row;
                    var caPcurrency = walletObj.currency;
                    var currency = caPcurrency.toLowerCase();
                    let walletId = walletObj.wallet_id;
                    let minLedgerVersion = walletObj.minLedgerVersion;
                    var ripple = new Ripple();
                    ripple.getPaymentTransactions(res,walletId,minLedgerVersion, function(transactions) {
                        console.log(transactions);
                        if(transactions){
                            var totalTxn = [];
                            var counter = 1;
                            transactions.forEach(function (txn) {
                                var specification = txn.specification;
                                var outcome = txn.outcome;
                                var address = specification.destination.address;
                                var tag = Number(specification.destination.tag);
                                if(typeof tag != 'undefined' && tag && address){
                                    var amount = Number(outcome.deliveredAmount.value);
                                    var fee = Number(outcome.fee);
                                    var timestamp = outcome.timestamp;

                                    var xrp_address = address+"?dt="+tag;
                                    Wallet.findOne({address:xrp_address},function (error, wallet) {
                                        if(error || !wallet){}else {
                                            if(counter==1){
                                                var minLedgV = Number(txn.outcome.ledgerVersion);
                                                Initwallet.update({currency:"XRP"},{minLedgerVersion:minLedgV},{},function (e, r) {});
                                                counter = counter+1;
                                            }
                                            var saveData = {
                                                email:wallet.email,
                                                atAddress:xrp_address,
                                                atWallet:address,
                                                amount: amount,
                                                fee: fee,
                                                transactionId:txn.id,
                                                currency:wallet.currency,
                                                status:"Completed",
                                                sendOrReceive:"Received",
                                                createdAt:timestamp
                                            }
                                            totalTxn.push(saveData);
                                            Transaction.create(saveData,function (error, transaction) {
                                                if(error){console.log(error);}else {
                                                    if(transaction!==null){
                                                        if(transaction._id){
                                                            Balance.create({
                                                                email:transaction.email,
                                                                currency:transaction.currency,
                                                                amount:transaction.amount,
                                                                txn_ref:transaction._id,
                                                                in_out:"In"
                                                            });
                                                            var sendGrid = new Sendgrid();
                                                            var options = {
                                                                money:transaction.amount,
                                                                currency:transaction.currency,
                                                                atAddress:transaction.atAddress
                                                            };
                                                            sendGrid.sendEmail(
                                                                transaction.email,
                                                                'Received Money XTRemCoin',
                                                                "views/emails/receiveTxn.ejs",
                                                                options
                                                            );
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            res.send();
                        }else res.send();
                    });

                });
            }else {
                res.send();
            }
        }
    });
}
Function.prototype.sendTxnConfirmEmail = function (template, txn) {
    if(txn._id){

        var sendGrid = new Sendgrid();
        var options = {
            confirmUrl: this.baseUrl+"wallet/transfer/"+txn._id
        };
        sendGrid.sendEmail(
            txn.email,
            'Confirm Transfer XTRemCoin',
            "views/emails/"+template,
            options
        );
    }
}
Function.prototype.sendReceiveTxnEmail = function (template, txn) {
    if(txn._id){
        var sendGrid = new Sendgrid();
        var options = {
            money:txn.amount,
            currency:txn.currency,
            atAddress:txn.atAddress
        };
        sendGrid.sendEmail(
            txn.email,
            'Received Money XTRemCoin',
            "views/emails/"+template,
            options
        );
    }
}
Function.prototype.sendBtcTxn = function (req, res, next, txn) {
    var walletObj = res.locals.walletObj[txn.currency];
    if(txn.txHash){
        var toBeMinus = txn.amount;
        var update = {status:"Pending"};

        Transaction.update({_id:txn._id},update,{},function(error,rows){
            if(error && !rows){
                req.session.msgtype = "danger"
                req.session.message = "Request is not completed.";
                return res.redirect('/users/account/#!/wallets/detail/BTC');
            }else {
                Balance.create({
                    email:walletObj.email,
                    currency:walletObj.currency,
                    amount:Number(toBeMinus),
                    txn_ref:txn._id,
                    in_out:"Out"
                });
                req.session.msgtype = "success";
                req.session.message = "Transaction is done and pending from Network.";
                return res.redirect('/users/account/#!/wallets/detail/BTC');
            }
        });
    }else {
        req.session.msgtype = "danger"
        req.session.message = "Invalid transaction hex code.";
        return res.redirect('/users/account/#!/wallets/detail/BTC');
    }
}
Function.prototype.sendBtcV1Txn = function (req, res, next, txn) {
    var walletObj = res.locals.walletObj[txn.currency];
    if(txn.txHash){
        var walletId = txn.atWallet;
        bitgo.wallets().get({ "id": walletId }, function callback(err, wallet) {
            if (err) {
                req.session.msgtype = "danger"
                req.session.message = err.error;
                return res.redirect('/users/account/#!/wallets/detail/BTC');
            }
            else {
                var params = {tx: txn.txHash};
                if(txn.isInstant)
                    params.instant = true;
                wallet.sendTransaction(params, function (err, callback) {
                    console.log(callback);
                    console.log(err);
                    if (err) {
                        req.session.msgtype = "danger"
                        req.session.message = err.error;
                        return res.redirect('/users/account/#!/wallets/detail/BTC');
                    }
                    else {
                        if(callback.tx && callback.hash){
                            var balance = walletObj.balance;
                            var toBeMinus = txn.amount;
                            var update = {transactionId:callback.hash,status:"Pending",isInstant:false};
                            if(callback.instant){
                                update.isInstant = true;
                                update.instantId = callback.instantId;
                            }
                            var latestBal = Number(balance) - Number(toBeMinus);
                            Transaction.update({_id:txn._id},update,{},function(error,rows){
                                if(error){
                                    req.session.msgtype = "danger"
                                    req.session.message = "Request is not completed.";
                                    return res.redirect('/users/account/#!/wallets/detail/BTC');
                                }else {
                                    Balance.create({
                                        email:walletObj.email,
                                        currency:walletObj.currency,
                                        amount:Number(toBeMinus),
                                        txn_ref:txn._id,
                                        in_out:"Out"
                                    });
                                    //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                                    req.session.msgtype = "success";
                                    req.session.message = "Transaction is done and pending from Network.";
                                    return res.redirect('/users/account/#!/wallets/detail/BTC');
                                }
                            });
                        }else {
                            req.session.msgtype = "danger"
                            req.session.message = "No transaction ID.";
                            return res.redirect('/users/account/#!/wallets/detail/BTC');
                        }
                    }
                });
            }
        });
    }else {
        req.session.msgtype = "danger"
        req.session.message = "Invalid transaction hex code.";
        return res.redirect('/users/account/#!/wallets/detail/BTC');
    }
}
Function.prototype.sendNonBtcTxn = function (req, res, next, txn) {
    var currency = txn.currency;
    var currencyLower = currency.toLowerCase();
    var walletObj = res.locals.walletObj[currency];
    if(txn.txHash && !txn.internal){
        var walletId = txn.atWallet;
        bitgo.coin(currencyLower).wallets().get({ id: walletId}, function callback(err, wallet) {
            if (err) {
                req.session.msgtype = "danger"
                req.session.message = err.result.error;
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }
            else {
                var params = {
                    txHex: txn.txHash,
                };
                if(currency=='ETH'){
                    var satosish = 1000000000000000000;
                }else if (currency=='XRP'){
                    var satosish = 1000000;
                }else {
                    var satosish = 1e8;
                }
                if(currency=='ETH'){
                    params = txn.signResponse;
                }
                console.log(params);
                wallet.submitTransaction(params, function (err, callback) {
                    console.log(callback);
                    console.log(err);
                    if (err) {
                        req.session.msgtype = "danger"
                        req.session.message = err.result.error;
                        return res.redirect('/users/account/#!/wallets/detail/'+currency);
                    }
                    else {
                        if(callback.txid && callback.status){
                            var balance = walletObj.balance;
                            var latestBal = balance - txn.amount;
                            Transaction.update({_id:txn._id},{transactionId:callback.txid,status:"Pending"},{},function(error,rows){
                                if(error){
                                    req.session.msgtype = "danger"
                                    req.session.message = "Request is not completed.";
                                    return res.redirect('/users/account/#!/wallets/detail/'+currency);
                                }else {
                                    Balance.create({
                                        email:walletObj.email,
                                        currency:walletObj.currency,
                                        amount:txn.amount,
                                        txn_ref:txn._id,
                                        in_out:"Out"
                                    });
                                    //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                                    req.session.msgtype = "success";
                                    req.session.message = "Transaction is done and pending from Network.";
                                    return res.redirect('/users/account/#!/wallets/detail/'+currency);
                                }
                            });
                        }else {
                            req.session.msgtype = "danger"
                            req.session.message = "No transaction ID.";
                            return res.redirect('/users/account/#!/wallets/detail/'+currency);
                        }
                    }
                });
            }
        });
    }else if(txn.internal){
        var balance = walletObj.balance;
        var latestBal = balance - txn.amount;
        Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
            if(error){
                req.session.msgtype = "danger"
                req.session.message = "Request is not completed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }else {
                Balance.create({
                    email:walletObj.email,
                    currency:walletObj.currency,
                    amount:txn.amount,
                    txn_ref:txn._id,
                    in_out:"Out"
                });
                //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                    if(receiver!==null && receiver.email){
                        var saveData = {
                            email:receiver.email,
                            atAddress:txn.atAddress,
                            atWallet:txn.atWallet,
                            amount: txn.sentAmount,
                            transactionId:txn.transactionId,
                            currency:txn.currency,
                            status:"Completed",
                            sendOrReceive:"Received",
                            createdAt:txn.createdAt,
                            internal:true
                        }
                        Transaction.create(saveData,function (error, transaction) {
                            if(error){console.log(error);}else {
                                if(transaction!==null){
                                    if(transaction._id){
                                        Balance.create({
                                            email:transaction.email,
                                            currency:transaction.currency,
                                            amount:transaction.amount,
                                            txn_ref:transaction._id,
                                            in_out:"In"
                                        });
                                        var sendGrid = new Sendgrid();
                                        var options = {
                                            money:transaction.amount,
                                            currency:transaction.currency,
                                            atAddress:transaction.atAddress
                                        };
                                        sendGrid.sendEmail(
                                            transaction.email,
                                            'Received Money XTRemCoin',
                                            "views/emails/receiveTxn.ejs",
                                            options
                                        );
                                    }
                                }
                            }
                        });
                    }
                });

                req.session.msgtype = "success";
                req.session.message = "Transaction is done and Confirmed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }
        });
    }else {
        req.session.msgtype = "danger"
        req.session.message = "Invalid transaction hex code.";
        return res.redirect('/users/account/#!/wallets/detail/'+currency);
    }
}

Function.prototype.sendXRPTxn = function (req, res, next, txn) {
    var currency = txn.currency;
    var currencyLower = currency.toLowerCase();
    var walletObj = res.locals.walletObj[currency];
    if(txn.txHash){
        var ripple = new Ripple();
        ripple.sendTransaction(req,res,txn.txHash,function (callback) {
            if(!callback.error && callback.status){
                Transaction.update({_id:txn._id},{status:callback.status,sendResponse:callback.response},{},function(error,rows){
                    if(error){
                        req.session.msgtype = "danger"
                        req.session.message = "Request is not completed.";
                        return res.redirect('/users/account/#!/wallets/detail/'+currency);
                    }else {
                        if(callback.status!="Rejected"){
                            var balance = walletObj.balance;
                            var latestBal = balance - txn.amount;
                            Balance.create({
                                email:walletObj.email,
                                currency:walletObj.currency,
                                amount:txn.amount,
                                txn_ref:txn._id,
                                in_out:"Out"
                            });
                            //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                            req.session.msgtype = "success";
                            req.session.message = "Transaction is done and pending from Network.";
                        }else {
                            req.session.msgtype = "danger"
                            req.session.message = "Transaction is rejected";
                        }
                        return res.redirect('/users/account/#!/wallets/detail/'+currency);
                    }
                });
            }else {
                req.session.msgtype = "danger"
                req.session.message = "System error! Please try again.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }
        });
    }else if(txn.internal){
        var balance = walletObj.balance;
        var latestBal = balance - txn.amount;
        Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
            if(error){
                req.session.msgtype = "danger"
                req.session.message = "Request is not completed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }else {
                Balance.create({
                    email:walletObj.email,
                    currency:walletObj.currency,
                    amount:txn.amount,
                    txn_ref:txn._id,
                    in_out:"Out"
                });
                //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                    if(receiver!==null && receiver.email){
                        var saveData = {
                            email:receiver.email,
                            atAddress:txn.atAddress,
                            atWallet:txn.atWallet,
                            amount: txn.sentAmount,
                            transactionId:txn.transactionId,
                            currency:txn.currency,
                            status:"Completed",
                            sendOrReceive:"Received",
                            createdAt:txn.createdAt,
                            internal:true
                        }
                        Transaction.create(saveData,function (error, transaction) {
                            if(error){console.log(error);}else {
                                if(transaction!==null){
                                    if(transaction._id){
                                        Balance.create({
                                            email:transaction.email,
                                            currency:transaction.currency,
                                            amount:transaction.amount,
                                            txn_ref:transaction._id,
                                            in_out:"In"
                                        });
                                        var sendGrid = new Sendgrid();
                                        var options = {
                                            money:transaction.amount,
                                            currency:transaction.currency,
                                            atAddress:transaction.atAddress
                                        };
                                        sendGrid.sendEmail(
                                            transaction.email,
                                            'Received Money XTRemCoin',
                                            "views/emails/receiveTxn.ejs",
                                            options
                                        );
                                    }
                                }
                            }
                        });
                    }
                });

                req.session.msgtype = "success";
                req.session.message = "Transaction is done and Confirmed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }
        });
    }else {
        req.session.msgtype = "danger"
        req.session.message = "Invalid transaction hex code.";
        return res.redirect('/users/account/#!/wallets/detail/'+currency);
    }
}
Function.prototype.sendXTRTxn = function (req, res, next, txn) {
    var currency = txn.currency;
    var currencyLower = currency.toLowerCase();
    var walletObj = res.locals.walletObj[currency];
    if(txn.txHash){

    }else if(txn.internal){
        var balance = walletObj.balance;
        var latestBal = balance - txn.amount;
        Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
            if(error){
                req.session.msgtype = "danger"
                req.session.message = "Request is not completed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }else {
                Balance.create({
                    email:walletObj.email,
                    currency:walletObj.currency,
                    amount:txn.amount,
                    txn_ref:txn._id,
                    in_out:"Out"
                });
                //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                    if(receiver!==null && receiver.email){
                        var saveData = {
                            email:receiver.email,
                            atAddress:txn.atAddress,
                            atWallet:txn.atWallet,
                            amount: txn.sentAmount,
                            transactionId:txn.transactionId,
                            currency:txn.currency,
                            status:"Completed",
                            sendOrReceive:"Received",
                            createdAt:txn.createdAt,
                            internal:true
                        }
                        Transaction.create(saveData,function (error, transaction) {
                            if(error){console.log(error);}else {
                                if(transaction!==null){
                                    if(transaction._id){
                                        Balance.create({
                                            email:transaction.email,
                                            currency:transaction.currency,
                                            amount:transaction.amount,
                                            txn_ref:transaction._id,
                                            in_out:"In"
                                        });
                                        var sendGrid = new Sendgrid();
                                        var options = {
                                            money:transaction.amount,
                                            currency:transaction.currency,
                                            atAddress:transaction.atAddress
                                        };
                                        sendGrid.sendEmail(
                                            transaction.email,
                                            'Received Money XTRemCoin',
                                            "views/emails/receiveTxn.ejs",
                                            options
                                        );
                                    }
                                }
                            }
                        });
                    }
                });

                req.session.msgtype = "success";
                req.session.message = "Transaction is done and Confirmed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }
        });
    }else {
        req.session.msgtype = "danger"
        req.session.message = "Invalid transaction hex code.";
        return res.redirect('/users/account/#!/wallets/detail/'+currency);
    }
}
Function.prototype.sendFiatTxn = function (req, res, next, txn) {
    var currency = txn.currency;
    var currencyLower = currency.toLowerCase();
    var walletObj = res.locals.walletObj[currency];
    if(txn.txHash){

    }else if(txn.internal){
        var balance = walletObj.balance;
        var latestBal = balance - txn.amount;
        Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
            if(error){
                req.session.msgtype = "danger"
                req.session.message = "Request is not completed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }else {
                Balance.create({
                    email:walletObj.email,
                    currency:walletObj.currency,
                    amount:txn.amount,
                    txn_ref:txn._id,
                    in_out:"Out"
                });
                //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                    if(receiver!==null && receiver.email){
                        var saveData = {
                            email:receiver.email,
                            atAddress:txn.atAddress,
                            atWallet:txn.atWallet,
                            amount: txn.sentAmount,
                            transactionId:txn.transactionId,
                            currency:txn.currency,
                            status:"Completed",
                            sendOrReceive:"Received",
                            createdAt:txn.createdAt,
                            internal:true
                        }
                        Transaction.create(saveData,function (error, transaction) {
                            if(error){console.log(error);}else {
                                if(transaction!==null){
                                    if(transaction._id){
                                        Balance.create({
                                            email:transaction.email,
                                            currency:transaction.currency,
                                            amount:transaction.amount,
                                            txn_ref:transaction._id,
                                            in_out:"In"
                                        });
                                        var sendGrid = new Sendgrid();
                                        var options = {
                                            money:transaction.amount,
                                            currency:transaction.currency,
                                            atAddress:transaction.atAddress
                                        };
                                        sendGrid.sendEmail(
                                            transaction.email,
                                            'Received Money XTRemCoin',
                                            "views/emails/receiveTxn.ejs",
                                            options
                                        );
                                    }
                                }
                            }
                        });
                    }
                });

                req.session.msgtype = "success";
                req.session.message = "Transaction is done and Confirmed.";
                return res.redirect('/users/account/#!/wallets/detail/'+currency);
            }
        });
    }else {
        req.session.msgtype = "danger"
        req.session.message = "Invalid transaction hex code.";
        return res.redirect('/users/account/#!/wallets/detail/'+currency);
    }
}

Function.prototype.btcTxnUpdateStatus = function (res, next, txn) {
    var txnId = txn.transactionId;
    var walletId = txn.atWallet;
    if(txnId && walletId){
        bitgo.wallets().get({ "id": walletId }, function callback(err, wallet) {
            if (err) { throw err; }else {
                wallet.getTransaction({ "id": txnId }, function callback(err, transaction) {
                    if(!transaction.pending){
                        Transaction.update({_id:txn._id},{status:"Completed"},{},function (error, rows) {});
                    }
                });
            }
        });
    }
}

Function.prototype.nonBtcTxnUpdateStatus = function (res, next, txn) {
    var txnId = txn.transactionId;
    if(txn.currency=='BTC' && !txn.transactionId)
        var txnId = txn.sendResponse.txid;
    var walletId = txn.atWallet;
    if(txnId && walletId){
        var caPcurrency = txn.currency;
        var currency = caPcurrency.toLowerCase();
        bitgo.coin(currency).wallets().get({ id: walletId }, function callback(err, wallet) {
            if (err) { console.log(err); }else {
                wallet.getTransaction({ "txHash": txnId }, function callback(err, transaction) {
                    if (err) { console.log(err); }else {
                        if(transaction.confirmations){
                            Transaction.update({_id:txn._id},{status:"Completed"},{},function (error, rows) {});
                        }
                    }
                });
            }
        });
    }
}

Function.prototype.updateAllBalance = function(res,next,walletObj){
        var caPcurrency = walletObj.currency;
        var currency = caPcurrency.toLowerCase();
        let walletId = walletObj.wallet_id;
    Balance.find({currency:caPcurrency,email:walletObj.email}).sort({createdAt:-1}).exec(function(txnError, txnData){
        if(txnData!==null && typeof txnData != 'undefined'){
            var globalBal = 0;
            txnData.forEach(function(txn){
                if(txn.in_out=="In"){
                    globalBal = globalBal + txn.amount;
                }else if(txn.in_out=="Out"){
                    globalBal = globalBal - txn.amount;
                }
            });
            Wallet.update({_id:walletObj._id},{balance:globalBal.toFixed(8)},function(error,rows){});
        }
    });
}
Function.prototype.getTickerPrice = function(from,to,callback){

    var method = this;
    restClient.tickerAll("global","BTC,BCH,XRP,ETH,LTC", "USD,EUR,TRY", function(response) {
        responseGlobal = JSON.parse(response);
        restClient.tickerAll("crypto","BCH,XRP,ETH,LTC", "BTC", function(response) {
            responseCrypto = JSON.parse(response);
            callback(method.extend({},responseGlobal,responseCrypto));
        });
    });
}
Function.prototype.getFiatTickerPrice = function(pair,callback){
    client.getQuotes([pair]).then(response => {
        if(typeof response!=='undefined' && response.length)
        callback(response[0]);
        else callback(null);
    });
}
Function.prototype.extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
Function.prototype.myRound = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};
Function.prototype.updateTickerPriceChangeData = function (buysellpair, tickers, callback) {
    var changeClass = (tickers[buysellpair.replace('/','')].changes.percent.day < 0)?'red':'green';
    var html = "<div class='col-xs-12'>"+
    "<div id='"+buysellpair.replace('/','')+"-stats' class='tickers-container'>"+
    "<div class='tickers-stats'>"+
    "<div class='pair'>"+
    "<label>Last Price</label>"+
    "</div>"+
    "<div class='pair-value'><span id='tick-last'>"+tickers[buysellpair.replace('/','')].last.toFixed(2)+"</span> "+buysellpair.split('/')[1]+"</div>"+
    "</div><div class='tickers-stats'>"+
    "<div class='pair'>"+
    "<label>24H Change</label>"+
    "</div>"+
    "<div class='pair-value "+changeClass+"'><span id='tick-change'>"+tickers[buysellpair.replace('/','')].changes.percent.day+"</span>%</div>"+
    "</div><div class='tickers-stats'>"+
    "<div class='pair'>"+
    "<label>24H High</label>"+
    "</div>"+
    "<div class='pair-value'><span id='tick-high'>"+tickers[buysellpair.replace('/','')].high.toFixed(2)+"</span> "+buysellpair.split('/')[1]+"</div>"+
    "</div><div class='tickers-stats'>"+
    "<div class='pair'>"+
    "<label>24H Low</label>"+
    "</div>"+
    "<div class='pair-value'><span id='tick-low'>"+tickers[buysellpair.replace('/','')].low.toFixed(2)+"</span> "+buysellpair.split('/')[1]+"</div>"+
    "</div>"+
    "<div class='tickers-stats'>"+
    "<div class='pair'>"+
    "<label>24H Volume</label>"+
    "</div>"+
    "<div class='pair-value'><span id='tick-volume'>"+tickers[buysellpair.replace('/','')].volume.toFixed(2)+"</span> "+buysellpair.split('/')[1]+"</div>"+
    "</div>"+
    "</div>"+
    "</div>";
    callback(html);
}*/

Function.prototype.googleAuthenticator = function (res, callback) {
    callback(ga);
}
Function.prototype.verify2FA = function (user_id,code, callback) {
    Twofactor.findOne({user_id:user_id},function (error, result) {
        var response = {error:false,message:""};
        if(result!==null && typeof result != 'undefined' && result.secret){
            if(code!==null && typeof code != 'undefined'){
                if(ga.verifyCode(result.secret,code)){
                    callback(response);
                }else {
                    response.error = true;
                    response.message = "2FA Code is Invalid.";
                    callback(response);
                }
            }else {
                response.error = true;
                response.message = "2FA Code is required.";
                callback(response);
            }
        }else {
            callback(response);
        }
    });
}
Function.prototype.isGoogleAuthActive = function (user_id, callback) {
    Twofactor.findOne({user_id:user_id},function (error, res) {
        var check = false;
        if(error){
            check = false;
        }else {
            if(res!==null && typeof res != 'undefined' && res.secret){
                check = true;
            }else {
                check = false;
            }
        }
        callback(check);
    });
}
Function.prototype.qrcodeImages = function (req, wallets, callback) {
    var qcodes={};
    for(currency in wallets){
        var wallet = wallets[currency];
        var qrcode = req.qrcode();
        qrcode.setDimension(160,160);
        qrcode.setCharset('UTF-8');
        qrcode.setCharset('UTF-8');
        qrcode.setCorrectionLevel('L',0);
        qrcode.setData(wallet?wallet.address:"No Address");
        var image = qrcode.getImage();
        qcodes[currency]=image;
    }
    callback(qcodes);
}
/*Function.prototype.createPoolerTxn = function (transaction) {
    if(typeof transaction!='undefined' && transaction!==null && transaction._id){
        var object = {}
        object.txn=transaction,object.currency=transaction.currency,object.exchangeCurrency=transaction.exchangeCurrency,object.amount=transaction.amount,object.exchangeAmount=transaction.exchnageValue,object.buyOrSell=transaction.sendOrReceive,object.rate=transaction.exchangeRate;
        Pooler.create(object);
    }
}
Function.prototype.addWebhook = function (walletId,currency,object,callback) {
    bitgo.coin(currency).wallets().get({ id: walletId })
        .then(function(wallet) {
            return wallet.addWebhook(object);
        })
        .then(function(webhook) {
            callback(webhook);
        });
}
Function.prototype.removeWebhook = function (walletId,currency,object,callback) {
    bitgo.coin(currency).wallets().get({ id: walletId })
        .then(function(wallet) {
            return wallet.removeWebhook(object);
        })
        .then(function(webhook) {
            callback(webhook);
        });
}
Function.prototype.simulateWebhook = function (walletId,currency,object,callback) {
    bitgo.coin(currency).wallets().get({ id: walletId })
        .then(function(wallet) {
            return wallet.simulateWebhook(object);
        })
        .then(function(result) {
            callback(result);
        });
}
Function.prototype.listWebhooks = function (callback) {
    var walletId = "5a15611d393b60320762732ecdf5163c";

    bitgo.coin('eth').wallets().get({ id: walletId })
        .then(function(wallet) {
            return wallet.listWebhooks();
        })
        .then(function(webhooks) {
            callback(webhooks);
        });

}
Function.prototype.getWalletAddress = function (walletId, currency, address, callback) {
    bitgo.coin(currency).wallets().get({ id: walletId })
        .then(function(wallet) {
            wallet.getAddress({address: address})
                .then(function(address) {
                    // print address
                    callback(address);
                });
        });

}
Function.prototype.getWalletTransfer = function (walletId, currency, transferId, callback) {
    bitgo.coin(currency).wallets().get({ id: walletId })
        .then(function(wallet) {
            wallet.getTransfer({ id: transferId })
                .then(function(transfer) {
                    // print address
                    callback(transfer);
                });
        });

}
Function.prototype.processTransfer = function (txn, callback) {
    if(typeof txn.outputs != 'undefined') var outputs = txn.outputs;
    else var outputs = txn.entries;
    outputs.forEach(function (output) {
        if(output.value>0){
            var status = txn.confirmations?"Completed":"Pending";
            var caPcurrency = txn.coin.toUpperCase();
            if(caPcurrency=='ETH'){
                var amount = output.value/1000000000000000000;
                var fee = Number(txn.feeString)/1000000000000000000;
            }else if (caPcurrency=='XRP'){
                var amount = output.value/1000000;
                var fee = Number(txn.feeString)/1000000;
            }else {
                var amount = output.value/1e8;
                var fee = Number(txn.feeString)/1e8;
            }
            Wallet.findOne({currency:caPcurrency,address:output.address,wallet_id:output.wallet},function (error, wallt) {
                if(!error && typeof wallt!=='undefined' && wallt!==null){
                    var saveData = {
                        email:wallt.email,
                        atAddress:output.address,
                        atWallet:wallt.wallet_id,
                        amount: amount,
                        fee: fee,
                        transactionId:txn.txid,
                        currency:caPcurrency,
                        status:status,
                        sendOrReceive:"Received",
                        createdAt:txn.date
                    }
                    Transaction.create(saveData,function (error, transaction) {
                        if(error){console.log(error);}else {
                            if(transaction!==null){
                                if(transaction._id){
                                    Balance.create({
                                        email:transaction.email,
                                        currency:transaction.currency,
                                        amount:transaction.amount,
                                        txn_ref:transaction._id,
                                        in_out:"In"
                                    });

                                    var sendGrid = new Sendgrid();
                                    var options = {
                                        money:transaction.amount,
                                        currency:transaction.currency,
                                        atAddress:transaction.atAddress
                                    };
                                    sendGrid.sendEmail(
                                        transaction.email,
                                        'Received Money XTRemCoin',
                                        "views/emails/receiveTxn.ejs",
                                        options
                                    );
                                }
                            }
                        }
                    });
                }
            });
        }
    });
    callback(true);
}
Function.prototype.generateNewAddress = function(mainwallet,xwallet) {
    var capCurrency = mainwallet.currency;
    var currency = mainwallet.currency.toLowerCase();
    let walletId = mainwallet.wallet_id;
    console.log(walletId);
    bitgo.coin(currency).wallets().get({ id: walletId })
        .then(function(wallet) {
            console.log(wallet);
            var parameters = {};
            if(currency=='eth') parameters.gasPrice = 300000000;
            wallet.createAddress(parameters)
                .then(function(address) {
                    console.log(address);
                    if(address!==null && typeof address != 'undefined' && address.index!==null){
                        var walletData = {
                            wallet_id: walletId,
                            address:address.address?address.address:"",
                            addressId:address.id?address.id:"",
                            index:address.index,
                            chain:address.chain,
                        }
                        Addresshistory.create({email:xwallet.email,address:xwallet.address,currency:xwallet.currency},function (error, data) {});
                        Wallet.update({email:xwallet.email,currency:capCurrency}, walletData, {}, function(error,rows){});
                    }
                });
        });
};
Function.prototype.sendMultiTransactionBTC = function() {
    Transaction.find({currency:"BTC",multi:true,status:"Pending"},function (error, txns) {
        if(!error && txns){
            var recipients = [];
            txns.forEach(function (txn) {
                var recp = {amount:Math.round(txn.sentAmount*1e8),address:txn.atAddress};
                recipients.push(recp);
            });
            Initwallet.findOne({currency:"BTC"},function (error, mainWallet) {
                if(!error && mainWallet && recipients.length){
                    var params = {
                        recipients: recipients,
                        walletPassphrase: mainWallet.passphrase
                    }
                    bitgo.coin("btc").wallets().get({ id: mainWallet.wallet_id })
                        .then(function(wallet) {
                            wallet.sendMany(params)
                                .then(function(transaction) {
                                    console.log(transaction);
                                    if(transaction.status=='signed'){
                                        txns.forEach(function (txn) {
                                            Transaction.update({_id:txn._id},{multi:false,sendResponse:transaction,transactionId:transaction.txid},{multi:true},function (err, rows) {});
                                        });
                                    }
                                });
                        });
                }
            });
        }
    });
};


// generate wallet new addresses
Function.prototype.generateXTRAddresses = function (res) {
    var req = this.req;
    var currency = "XTR";
    var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var webeth = new Webeth();
                        var addresses = webeth.generateAddress(req,res);
                        if(addresses.address){
                            var address = addresses.address;
                            var secret = addresses.privateKey;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                                secret:walt.secret
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address,secret:secret},{},function(error,rows){});
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateUSDAddresses = function (res) {
    var req = this.req;
    var currency = "USD";
    var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var address = "usd"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address},{},function(error,rows){});
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateTRYAddresses = function (res) {
    var req = this.req;
    var currency = "TRY";
    var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var address = "try"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address},{},function(error,rows){});
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateEURAddresses = function (res) {
    var req = this.req;
    var currency = "EUR";
    var userObj = this.req.session.userObj;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var address = "eur"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address},{},function(error,rows){});
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateBitgoV2Addresses = function(currency,res) {
    var userObj = this.req.session.userObj;
    var capCurrency = currency.toUpperCase();
    Wallet.findOne({email : userObj.email, currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (typeof docs !== 'undefined' && docs !== null && currency!=='xrp'){
                Initwallet.findOne({currency: capCurrency}, function (werr, wdocs) {
                    if(werr){
                        return false;
                    }else {
                        if (wdocs !== null){
                            var dtIncrement = wdocs.dtIncrement+1;
                            let walletId = wdocs.wallet_id;
                            bitgo.coin(currency).wallets().get({ id: walletId })
                                .then(function(wallet) {
                                    var parameters = {};
                                    //if(currency=='eth') parameters.gasPrice = 3000000000;
                                    parameters.label = docs.currency+" ("+docs.email+")";
                                    wallet.createAddress(parameters)
                                        .then(function(address) {
                                            console.log(address);
                                            if(address!==null && typeof address != 'undefined' && address.index!==null){
                                                var mainaddress = address.address;
                                                var updateData = {
                                                    address:mainaddress?mainaddress:"",
                                                    addressId:address.id?address.id:"",
                                                    index:address.index,
                                                    chain:address.chain,
                                                    label: capCurrency
                                                }
                                                var historyData = {
                                                    address:docs.address,
                                                    addressId:docs.addressId,
                                                    index:docs.index,
                                                    chain:docs.chain,
                                                    currency: capCurrency,
                                                    email: docs.email
                                                }

                                                Wallet.update({_id:docs._id},updateData,{},function(e,rows){});
                                                Addresshistory.create(historyData,function (error, data) {});
                                            }
                                        });
                                });
                        }
                    }
                });
            }
        }
    });
};

// generate wallet address functions for api
Function.prototype.generateXTRAddressesApi = function (res) {
    var req = this.req;
    var currency = "XTR";
    var userObj = this.req.payload;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var webeth = new Webeth();
                        var addresses = webeth.generateAddress(req,res);
                        if(addresses.address){
                            var address = addresses.address;
                            var secret = addresses.privateKey;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                                secret:walt.secret
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address,secret:secret},{},function(error,rows){
                                res.status(200).json({currency:currency,address:address});
                            });
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateUSDAddressesApi = function (res) {
    var req = this.req;
    var currency = "USD";
    var userObj = this.req.payload;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var address = "usd"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address},{},function(error,rows){
                                res.status(200).json({currency:currency,address:address});
                            });
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateTRYAddressesApi = function (res) {
    var req = this.req;
    var currency = "TRY";
    var userObj = this.req.payload;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var address = "try"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address},{},function(error,rows){
                                res.status(200).json({currency:currency,address:address});
                            });
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateEURAddressesApi = function (res) {
    var req = this.req;
    var currency = "EUR";
    var userObj = this.req.payload;
    Initwallet.findOne({currency:currency},function (error, initwallet) {
        if(error || !initwallet){return false;}else {
            Wallet.findOne({email:userObj.email,currency:currency},function (error, walt) {
                if(error){return false;}else {
                    if(!error && walt && walt!==null){
                        var address = "eur"+cryptoRandomString(31);
                        if(address){
                            var address = address;
                            var walletData = {
                                email:userObj.email,
                                address:walt.address,
                                currency:currency,
                            }
                            Addresshistory.create(walletData,function (error, data) {
                                if(error || !data){return false;}else {

                                }
                            });
                            Wallet.update({_id:walt._id},{address:address},{},function(error,rows){
                                res.status(200).json({currency:currency,address:address});
                            });
                        }
                    }
                }
            });
        }
    });
}
Function.prototype.generateBitgoV2AddressesApi = function(currency,res) {
    var userObj = this.req.payload;
    var capCurrency = currency.toUpperCase();
    Wallet.findOne({email : userObj.email, currency: capCurrency}, function (err, docs) {
        if(err){
            return false;
        }else {
            if (typeof docs !== 'undefined' && docs !== null && currency!=='xrp'){
                Initwallet.findOne({currency: capCurrency}, function (werr, wdocs) {
                    if(werr){
                        return false;
                    }else {
                        if (wdocs !== null){
                            var dtIncrement = wdocs.dtIncrement+1;
                            let walletId = wdocs.wallet_id;
                            bitgo.coin(currency).wallets().get({ id: walletId })
                                .then(function(wallet) {
                                    var parameters = {};
                                    //if(currency=='eth') parameters.gasPrice = 3000000000;
                                    parameters.label = docs.currency+" ("+docs.email+")";
                                    wallet.createAddress(parameters)
                                        .then(function(address) {
                                            if(address!==null && typeof address != 'undefined' && address.index!==null){
                                                var mainaddress = address.address;
                                                var updateData = {
                                                    address:mainaddress?mainaddress:"",
                                                    addressId:address.id?address.id:"",
                                                    index:address.index,
                                                    chain:address.chain,
                                                    label: capCurrency
                                                }
                                                var historyData = {
                                                    address:docs.address,
                                                    addressId:docs.addressId,
                                                    index:docs.index,
                                                    chain:docs.chain,
                                                    currency: capCurrency,
                                                    email: docs.email
                                                }

                                                Wallet.update({_id:docs._id},updateData,{},function(e,rows){});
                                                Addresshistory.create(historyData,function (error, data) {
                                                    res.status(200).json({currency:currency,address:address.address});
                                                });
                                            }
                                        });
                                });
                        }
                    }
                });
            }
        }
    });
};

Function.prototype.sendBtcTxnApi = function (req, res, next, txn) {
    var email = req.payload.email;
    var currency = txn.currency;
    Wallet.aggregate([
        {"$match": {email: email, currency: currency}},
        {
            "$lookup":
                {
                    from: "currencymaps",
                    localField: "currency",
                    foreignField: "code",
                    as: "currencymap_docs"
                }
        }
    ]).exec(function (error, walletObj) {
        if (!error && typeof walletObj != 'undefined' && walletObj && walletObj !== null) {
            if(txn.txHash){
                var toBeMinus = txn.amount;
                var update = {status:"Pending"};

                Transaction.update({_id:txn._id},update,{},function(error,rows){
                    if(error && !rows){
                        res.status(400).json({status:400,message:"Request is not completed."});
                    }else {
                        Balance.create({
                            email:walletObj.email,
                            currency:walletObj.currency,
                            amount:Number(toBeMinus),
                            txn_ref:txn._id,
                            in_out:"Out"
                        });
                        res.status(200).json({status:200,message:"Transaction is done and pending from Network."});
                    }
                });
            }else {
                res.status(400).json({status:400,message:"Invalid transaction hex code."});
            }
        }
    })

}
Function.prototype.sendNonBtcTxnApi = function (req, res, next, txn) {
    var email = req.payload.email;
    var currency = txn.currency;
    Wallet.aggregate([
        {"$match": {email: email, currency: currency}},
        {
            "$lookup":
                {
                    from: "currencymaps",
                    localField: "currency",
                    foreignField: "code",
                    as: "currencymap_docs"
                }
        }
    ]).exec(function (error, walletObj) {
        if (!error && typeof walletObj != 'undefined' && walletObj && walletObj !== null) {
            var currencyLower = currency.toLowerCase();
            if(txn.txHash && !txn.internal){
                var walletId = txn.atWallet;
                bitgo.coin(currencyLower).wallets().get({ id: walletId}, function callback(err, wallet) {
                    if (err) {
                        res.status(400).json({status:400,message:err.result.error});
                    }
                    else {
                        var params = {
                            txHex: txn.txHash,
                        };
                        if(currency=='ETH'){
                            var satosish = 1000000000000000000;
                        }else if (currency=='XRP'){
                            var satosish = 1000000;
                        }else {
                            var satosish = 1e8;
                        }
                        if(currency=='ETH'){
                            params = txn.signResponse;
                        }
                        console.log(params);
                        wallet.submitTransaction(params, function (err, callback) {
                            console.log(callback);
                            console.log(err);
                            if (err) {
                                res.status(400).json({status:400,message:err.result.error});
                            }
                            else {
                                if(callback.txid && callback.status){
                                    var balance = walletObj.balance;
                                    var latestBal = balance - txn.amount;
                                    Transaction.update({_id:txn._id},{transactionId:callback.txid,status:"Pending"},{},function(error,rows){
                                        if(error){
                                            res.status(400).json({status:400,message:"Request is not completed."});
                                        }else {
                                            Balance.create({
                                                email:walletObj.email,
                                                currency:walletObj.currency,
                                                amount:txn.amount,
                                                txn_ref:txn._id,
                                                in_out:"Out"
                                            });
                                            //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                                            res.status(200).json({status:200,message:"Transaction is done and pending from Network."});
                                        }
                                    });
                                }else {
                                    res.status(400).json({status:400,message:"No transaction ID."});
                                }
                            }
                        });
                    }
                });
            }else if(txn.internal){
                var balance = walletObj.balance;
                var latestBal = balance - txn.amount;
                Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
                    if(error){
                        res.status(400).json({status:400,message:"Request is not completed."});
                    }else {
                        Balance.create({
                            email:walletObj.email,
                            currency:walletObj.currency,
                            amount:txn.amount,
                            txn_ref:txn._id,
                            in_out:"Out"
                        });
                        //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                        Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                            if(receiver!==null && receiver.email){
                                var saveData = {
                                    email:receiver.email,
                                    atAddress:txn.atAddress,
                                    atWallet:txn.atWallet,
                                    amount: txn.sentAmount,
                                    transactionId:txn.transactionId,
                                    currency:txn.currency,
                                    status:"Completed",
                                    sendOrReceive:"Received",
                                    createdAt:txn.createdAt,
                                    internal:true
                                }
                                Transaction.create(saveData,function (error, transaction) {
                                    if(error){console.log(error);}else {
                                        if(transaction!==null){
                                            if(transaction._id){
                                                Balance.create({
                                                    email:transaction.email,
                                                    currency:transaction.currency,
                                                    amount:transaction.amount,
                                                    txn_ref:transaction._id,
                                                    in_out:"In"
                                                });
                                                var sendGrid = new Sendgrid();
                                                var options = {
                                                    money:transaction.amount,
                                                    currency:transaction.currency,
                                                    atAddress:transaction.atAddress
                                                };
                                                sendGrid.sendEmail(
                                                    transaction.email,
                                                    'Received Money XTRemCoin',
                                                    "views/emails/receiveTxn.ejs",
                                                    options
                                                );
                                            }
                                        }
                                    }
                                });
                            }
                        });
                        res.status(200).json({status:200,message:"Transaction is done and Confirmed."});
                    }
                });
            }else {
                res.status(400).json({status:400,message:"Invalid transaction hex code."});
            }
        }
    })
}
Function.prototype.sendXTRTxnApi = function (req, res, next, txn) {
    var email = req.payload.email;
    var currency = txn.currency;
    Wallet.aggregate([
        {"$match": {email: email, currency: currency}},
        {
            "$lookup":
                {
                    from: "currencymaps",
                    localField: "currency",
                    foreignField: "code",
                    as: "currencymap_docs"
                }
        }
    ]).exec(function (error, walletObj) {
        if (!error && typeof walletObj != 'undefined' && walletObj && walletObj !== null) {
            var currencyLower = currency.toLowerCase();
            if(txn.txHash){

            }else if(txn.internal){
                var balance = walletObj.balance;
                var latestBal = balance - txn.amount;
                Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
                    if(error){
                        res.status(400).json({status:400,message:"Request is not completed."});
                    }else {
                        Balance.create({
                            email:walletObj.email,
                            currency:walletObj.currency,
                            amount:txn.amount,
                            txn_ref:txn._id,
                            in_out:"Out"
                        });
                        //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                        Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                            if(receiver!==null && receiver.email){
                                var saveData = {
                                    email:receiver.email,
                                    atAddress:txn.atAddress,
                                    atWallet:txn.atWallet,
                                    amount: txn.sentAmount,
                                    transactionId:txn.transactionId,
                                    currency:txn.currency,
                                    status:"Completed",
                                    sendOrReceive:"Received",
                                    createdAt:txn.createdAt,
                                    internal:true
                                }
                                Transaction.create(saveData,function (error, transaction) {
                                    if(error){console.log(error);}else {
                                        if(transaction!==null){
                                            if(transaction._id){
                                                Balance.create({
                                                    email:transaction.email,
                                                    currency:transaction.currency,
                                                    amount:transaction.amount,
                                                    txn_ref:transaction._id,
                                                    in_out:"In"
                                                });
                                                var sendGrid = new Sendgrid();
                                                var options = {
                                                    money:transaction.amount,
                                                    currency:transaction.currency,
                                                    atAddress:transaction.atAddress
                                                };
                                                sendGrid.sendEmail(
                                                    transaction.email,
                                                    'Received Money XTRemCoin',
                                                    "views/emails/receiveTxn.ejs",
                                                    options
                                                );
                                            }
                                        }
                                    }
                                });
                            }
                        });
                        res.status(200).json({status:200,message:"Transaction is done and Confirmed."});
                    }
                });
            }else {
                res.status(400).json({status:400,message:"Invalid transaction hex code."});
            }
        }
    })
}
Function.prototype.sendFiatTxnApi = function (req, res, next, txn) {

    var email = req.payload.email;
    var currency = txn.currency;
    Wallet.aggregate([
        {"$match": {email: email, currency: currency}},
        {
            "$lookup":
                {
                    from: "currencymaps",
                    localField: "currency",
                    foreignField: "code",
                    as: "currencymap_docs"
                }
        }
    ]).exec(function (error, walletObj) {
        if (!error && typeof walletObj != 'undefined' && walletObj && walletObj !== null) {
            var currencyLower = currency.toLowerCase();
            if(txn.txHash){

            }else if(txn.internal){
                var balance = walletObj.balance;
                var latestBal = balance - txn.amount;
                Transaction.update({_id:txn._id},{status:"Completed"},{},function(error,rows){
                    if(error){
                        res.status(400).json({status:400,message:"Request is not completed."});
                    }else {
                        Balance.create({
                            email:walletObj.email,
                            currency:walletObj.currency,
                            amount:txn.amount,
                            txn_ref:txn._id,
                            in_out:"Out"
                        });
                        //Wallet.update({_id:walletObj._id},{balance:latestBal.toFixed(8)},{},function (error, rows) {});
                        Wallet.findOne({wallet_id:txn.atWallet,address:txn.atAddress,currency:txn.currency},function(error,receiver){
                            if(receiver!==null && receiver.email){
                                var saveData = {
                                    email:receiver.email,
                                    atAddress:txn.atAddress,
                                    atWallet:txn.atWallet,
                                    amount: txn.sentAmount,
                                    transactionId:txn.transactionId,
                                    currency:txn.currency,
                                    status:"Completed",
                                    sendOrReceive:"Received",
                                    createdAt:txn.createdAt,
                                    internal:true
                                }
                                Transaction.create(saveData,function (error, transaction) {
                                    if(error){console.log(error);}else {
                                        if(transaction!==null){
                                            if(transaction._id){
                                                Balance.create({
                                                    email:transaction.email,
                                                    currency:transaction.currency,
                                                    amount:transaction.amount,
                                                    txn_ref:transaction._id,
                                                    in_out:"In"
                                                });
                                                var sendGrid = new Sendgrid();
                                                var options = {
                                                    money:transaction.amount,
                                                    currency:transaction.currency,
                                                    atAddress:transaction.atAddress
                                                };
                                                sendGrid.sendEmail(
                                                    transaction.email,
                                                    'Received Money XTRemCoin',
                                                    "views/emails/receiveTxn.ejs",
                                                    options
                                                );
                                            }
                                        }
                                    }
                                });
                            }
                        });
                        res.status(200).json({status:200,message:"Transaction is done and Confirmed."});
                    }
                });
            }else {
                res.status(400).json({status:400,message:"Invalid transaction hex code."});
            }
        }
    })

}*/
module.exports = Function;
