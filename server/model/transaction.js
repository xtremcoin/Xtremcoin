/**
 * Created by Laxman on 10/17/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Pusher = require('../model/pusher');

var TransactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    atAddress: {
        type: String,
        required: true,
        trim: true,
    },
    atWallet: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    fee:{
        type: Number,
        default: 0
    },
    networkFixedFee:{
        type: Number,
        default: 0
    },
    sentAmount:{
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    transactionId: {
        type: String,
        required: true,
        trim: true,
    },
    transactionType: {
        type: String,
        trim: true,
        default: 'Payment',
    },
    txHash: {
        type: String,
        trim: true,
    },
    instantId: {
        type: String,
        trim: true
    },
    isInstant: {
        type: Boolean,
        default: false
    },
    instantFee:{
        type: Number,
        default: 0
    },
    gasLimit: {
        type: Number,
        default: 0
    },
    gasPrice: {
        type: Number,
        default: 0
    },
    sendOrReceive: {
        type: String,
        trim: true,
        default: "Send"
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    message: {
        type: String,
    },
    internal: {
        type: Boolean,
        default: false
    },
    signResponse: {
        type: Object,
        trim: true,
    },
    sendResponse: {
        type: Object,
        trim: true,
    },
    exchangeCurrency: {
        type: String,
    },
    exchnageValue: {
        type: Number,
        default: 0
    },
    exchangeFee: {
        type: Number,
        default: 0
    },
    exchangeRate: {
        type: Number,
        default: 0
    },
    executedPrice: {
        type: Number,
        default: 0
    },
    multi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type : Date,
        default : Date.now
    },
});

TransactionSchema.post('save', function(doc) {
    if(doc && typeof doc._id!='undefined' && doc._id!==null && doc._id!=""){
        if(doc.status=='Open' && (doc.sendOrReceive=='Sell' || doc.sendOrReceive=='Buy')){
            Pusher.createOrderNotification(doc);
        }
        Pusher.pushTransaction(doc);
    }
});
var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
