var Pusher = require('pusher');
var Currencymap = require('../model/currencymap');
var User = require('../model/user');
var pusher = new Pusher({
    appId: '479633',
    key: 'c72c404f12b7eceb7180',
    secret: '1556f1d9473d7d58316c',
    cluster: 'eu',
    encrypted: true
});
var PusherModel={};

PusherModel.pushWallet=function (filter,Wallet) {
    if (filter) {
        this.retrieveWallet(filter,Wallet,function (obj) {
            if(obj && typeof obj.email!='undefined'){
                User.findOne({email:obj.email},function (error, user) {
                    if(!error && user){
                        var volt=obj.obj;
                        var _id=user._id;
                        //console.log(volt);
                        pusher.trigger('xtremcoin-balance', 'xtremcoin-event-balance-'+_id, {
                            "message": "connected",
                            "data": {"event":"message","data":{_wt:volt}}
                        });
                    }
                });
            }
        });
    }
}
PusherModel.retrieveWallet=function (filter,Wallet,callback) {
    var push=this;
    Wallet.findOne(filter,function (err, wt) {
        var obj="";
        if (!err && wt !== null && typeof wt != 'undefined') {
            obj = {};
            var email=wt.email;
            Currencymap.findOne({code:wt.currency},function (error, curmap) {
                var volt={_id:wt._id};
                volt.email=wt.email;
                volt.wallet_id=wt.wallet_id;
                volt.address=wt.address;
                volt.currency=wt.currency;
                volt.label=wt.label;
                volt.destinationTag=wt.destinationTag;
                volt.balance=wt.balance;
                volt.currencymap_docs=curmap;

                obj.currency=wt.currency;
                obj.wallet = volt;
                callback({obj:obj,email:email});
            })
        }else {
            callback(obj);
        }
    });
}
PusherModel.extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

PusherModel.pushMoneyNotification=function (money) {
    if (typeof money.email!='undefined') {
        User.findOne({email:money.email},function (error, user) {
            if(!error && user){
                var _id=user._id;
                var obj={
                    type:"success",
                    message:"Money "+money.amount+" "+money.currency+" received."
                }
                pusher.trigger('xtremcoin-notification', 'xtremcoin-event-notification-money-'+_id, {
                    "message": "connected",
                    "data": {"event":"message","data":{notification:obj}}
                });
            }
        });
    }
}
PusherModel.poolerNotification=function (txn) {
    console.log(txn);
    pusher.trigger('xtremcoin-pooler-notification', 'xtremcoin-event-pooler-create', {
        "message": "connected",
        "data": {"event":"message","data":txn}
    });
}
PusherModel.poolUpdate=function (filter,Pool) {
    Pool.findOne(filter,function (error, pool) {
        console.log(pool);
        if(!error && pool){
            pusher.trigger('xtremcoin-pooler-notification', 'xtremcoin-event-pool-update', {
                "message": "connected",
                "data": {"event":"message","data":pool}
            });
        }
    })
}
PusherModel.createOrderNotification=function (txn) {
    console.log(txn);
    pusher.trigger('xtremcoin-api', 'xtremcoin-event-orders-create', {
        "message": "connected",
        "data": {"event":"message","data":txn}
    });
}
PusherModel.pushTransaction=function (txn) {
    if (typeof txn.email!='undefined') {
        User.findOne({email:txn.email},function (error, user) {
            if(!error && user){
                var _id=user._id;
                pusher.trigger('xtremcoin-transaction', 'xtremcoin-event-transaction-'+_id, {
                    "message": "connected",
                    "data": {"event":"message","data":txn}
                });
            }
        });
    }
}
module.exports=PusherModel;