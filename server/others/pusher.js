var Pusher = require('pusher');
var Users = require('../model/user');
var Request = require("request");
//var Kyc = require('../model/kyc');
var pusher = new Pusher({
    appId: '597972',
    key: 'afc158c9e0e0c1cece98',
    secret: 'c4f1fa7016da0c7c16ad',
    cluster: 'ap2',
    encrypted: true
});

var PusherModel = {name: "laxman"};

PusherModel.pushUser = function (user) {
    if (user) {
        pusher.trigger('blockoville', 'blockville-user', {
                "message": "connected", "data": user
            }
        );
    }
}
PusherModel.kycAddNotification = function (doc) {
    if (doc) {
        var pusstr = 'kyc-notification-add-' + doc.userid;
        pusher.trigger('blockoville', pusstr, {
                "message": "connected", "data": doc
            }
        );
        var addstr = 'kyc-notification-add';
        pusher.trigger('blockoville', addstr, {
                "message": "connected", "data": doc
            }
        );
    }
}
PusherModel.kycNotification = function (filter, Kyc) {
    if (filter) {
        this.retrieveKyc(filter, Kyc, function (obj) {
                if (obj && typeof obj.userid !== 'undefined') {
                    //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE3M2Q0ZmRmZDJhMTFlZDg5MzNjZWYiLCJlbWFpbCI6ImFkbWluQGxhcGl0cy5jb20iLCJuYW1lIjoiUGF3YW4gS3VtYXIiLCJwaG9uZSI6Iis5MTk4OTYzMzc3NDEiLCJ1c2VyaWQiOjEsImV4cCI6MTUzODI5MTY5MiwiaWF0IjoxNTM3Njg2ODkyfQ.hAzM8jtgFN0buGE62qqORqw6Bfllf2Oo9hpdAmq3g34';
                    Request.get(
                        {
                            //"headers": {"content-type": "application/json", "Authorization": "Bearer "+token},
                            //"url": "http://walletservice.com/initwallet/" + obj.userid
                            "url": process.env.WALLETMSURL+"initwallet/" + obj.userid,
                        }
                        , function (error, response, body) {
                            if (error) {
                                console.log(error)
                            }
                        })
                    var pusstr = 'kyc-notification-' + obj.userid;
                    pusher.trigger('blockoville', pusstr, {
                            "message": "connected", "data": obj
                        }
                    );
                }
            }
        );
    }
}
PusherModel.retrieveKyc = function (filter, Kyc, callback) {
    Kyc.findOne(filter, function (err, wt) {
        var obj = "";
        if (!err && wt !== null && typeof wt != 'undefined') {
            callback(wt);
        } else {
            callback(obj);
        }
    });
}
PusherModel.userCurrencyNotification = function (filter,updateField) {
    if (filter) {
        if (typeof updateField.usercurrency && updateField.usercurrency && updateField.usercurrency!=='')  {
            var pusstr = 'user-currency-' + filter._id;
            pusher.trigger('blockoville', pusstr, {
                    "message": "connected", "data": updateField
                }
            );
        }
        if (typeof updateField.avatar && updateField.avatar && updateField.avatar!=='')  {
            var pusstr = 'user-avatar-' + filter._id;
            pusher.trigger('blockoville', pusstr, {
                    "message": "connected", "data": updateField
                }
            );
        }
    }
}
PusherModel.pushSecurity = function (user) {
    if (user) {
        pusher.trigger('blockoville', 'blockville-user', {
                "message": "connected", "data": user
            }
        );
    }
}
PusherModel.securityNotification = function (filter,updateField) {
    if (filter) {
        if (typeof updateField.usercurrency && updateField.usercurrency && updateField.usercurrency!=='')  {
            var pusstr = 'user-currency-' + filter._id;
            pusher.trigger('blockoville', pusstr, {
                    "message": "connected", "data": updateField
                }
            );
        }
    }
}
module.exports = PusherModel;

