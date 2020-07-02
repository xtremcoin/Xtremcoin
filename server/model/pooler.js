var mongoose = require('mongoose');
var Pool = require('../model/pool');
var bcrypt = require('bcrypt');
var PusherModel = require('../model/pusher');

var PoolerSchema = new mongoose.Schema({
    txn: {
        type: Object,
        trim: true,
    },
    currency:{
        type: String,
        trim: true
    },
    exchangeCurrency:{
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        default:0
    },
    exchangeAmount:{
        type: Number,
        default:0
    },
    buyOrSell:{
        type: String,
        trim: true
    },
    rate: {
        type: Number,
        default:0
    },
    poolAt: {
        type : Date,
        default : Date.now
    }
});

PoolerSchema.post('save', function(doc) {
    if(doc && typeof doc._id!='undefined' && doc._id!==null && doc._id!=""){
        Pool.findOne({currency:doc.currency},function (error, pool) {
            var bal=pool.balance;
            switch (doc.buyOrSell){
                case "Sell":
                    bal = Number(Number(bal)+Number(doc.amount)).toFixed(8);
                    Pool.update({_id:pool._id},{balance:bal},{},function (err, rows) {});
                    break;
                case "Buy":
                    bal = Number(Number(bal)-Number(doc.amount)).toFixed(8);
                    Pool.update({_id:pool._id},{balance:bal},{},function (err, rows) {});
                    break;
            }
        });
        Pool.findOne({currency:doc.exchangeCurrency},function (error, pool) {
            var bal=pool.balance;
            switch (doc.buyOrSell){
                case "Sell":
                    bal = Number(Number(bal)-Number(doc.exchangeAmount)).toFixed(8);
                    Pool.update({_id:pool._id},{balance:bal},{},function (err, rows) {});
                    break;
                case "Buy":
                    bal = Number(Number(bal)+Number(doc.exchangeAmount)).toFixed(8);
                    Pool.update({_id:pool._id},{balance:bal},{},function (err, rows) {});
                    break;
            }
        });
        PusherModel.poolerNotification(doc);
    }
});

var Pooler = mongoose.model('Pooler', PoolerSchema);
module.exports = Pooler;