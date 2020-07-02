var mongoose = require('mongoose');
var PusherModel = require('../model/pusher');

var PoolSchema = new mongoose.Schema({
    currency: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});

PoolSchema.post("update", function(doc) {
    var filter=this._conditions;
    PusherModel.poolUpdate(filter,this);
});

var Pool = mongoose.model('Pool', PoolSchema);
module.exports = Pool;