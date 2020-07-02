/**
 * Created by Laxman on 12/21/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var CurrencymapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    symbol: {
        type: String,
        trim: true,
    },
    xtremWithdrawFee: {
        type: Number,
        default: 0.00,
    },
    networkFixedFee: {
        type: Number,
        default: 0.00,
    },
    exchangeFee: {
        type: Number,
        default: 0.00,
    },
    otherExchangeFee: {
        type: Number,
        default: 0.00,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});

var Currencymap = mongoose.model('Currencymap', CurrencymapSchema);
module.exports = Currencymap;