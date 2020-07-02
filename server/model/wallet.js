/**
 * Created by Laxman on 10/13/2017.
 */
var mongoose = require('mongoose');
var PusherModel = require('../model/pusher');
var bcrypt = require('bcrypt');

var WalletSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    wallet_id: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    secret: {
        type: String,
        trim: true,
    },
    destinationTag:{
        type: Number,
        trim: true,
    },
    balance: {
        type: Number,
        required: true,
        default:0.00,
    },
    currency: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        trim: true
    },
    isHide: {
        type: Number,
        required: true,
        default: 0
    },
    index:{
        type: Number,
    },
    addressId: {
        type: String,
        trim: true,
    },
    chain: {
        type: Number,
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
});
WalletSchema.index({ email: 1, currency: 1, address: 1 }, { unique: true });
WalletSchema.post("update", function(doc) {
    var filter=this._conditions;
    PusherModel.pushWallet(filter,this);
});

var Wallet = mongoose.model('Wallet', WalletSchema);
module.exports = Wallet;
