var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var DepositSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required:true,
        trim: true,
    },
    last_name: {
        type: String,
        required:true,
        trim: true,
    },
    currency: {
        type: String,
        required:true,
        trim: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    depositType:{
        type: String,
        trim:true
    },
    comment:{
        type: String,
        trim:true
    },
    status: {
        type: String,
        default:"Pending"
    },
    messageId: {
        type: Number,
        default:0
    },
    startAt: {
        type : Date,
        default : Date.now
    },
    completeAt:{
        type : Date
    }
});


var Deposit = mongoose.model('Deposit', DepositSchema);
module.exports = Deposit;