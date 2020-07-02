/**
 * Created by Laxman on 12/18/2017.
 */
var mongoose = require('mongoose');
var Wallet = require('../model/wallet');
var Pusher = require('../model/pusher');
var bcrypt = require('bcrypt');

var BalanceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    currency: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    txn_ref: {
        type: String,
        required: true,
        trim: true,
    },
    txn_type:{
        type: String,
        trim: true
    },
    in_out: {
        type: String,
        trim: true,
    },
    createdAt: {
        type : Date,
        default : Date.now
    },
});
BalanceSchema.post('save', function(doc) {
    if(doc && typeof doc._id!='undefined' && doc._id!==null && doc._id!=""){
        Wallet.findOne({email:doc.email,currency:doc.currency},function (error, wallet) {
            var bal=wallet.balance;
            switch (doc.in_out){
                case "In":
                    bal = Number(Number(bal)+Number(doc.amount)).toFixed(8);
                    Wallet.update({_id:wallet._id},{balance:bal},{},function (err, rows) {});
                    Pusher.pushMoneyNotification(doc);
                    break;
                case "Out":
                    bal = Number(Number(bal)-Number(doc.amount)).toFixed(8);
                    Wallet.update({_id:wallet._id},{balance:bal},{},function (err, rows) {});
                    break;
            }
        });
    }
});
var Balance = mongoose.model('Balance', BalanceSchema);

module.exports = Balance;

