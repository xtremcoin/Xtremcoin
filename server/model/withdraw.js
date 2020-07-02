var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var WithdrawSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    withdrawType:{
        type: String,
        trim:true
    },
    main:{
        type: Object,
        trim: true
    },
    status: {
        type: String,
        default:"Not Confirmed"
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


var Withdraw = mongoose.model('Withdraw', WithdrawSchema);
module.exports = Withdraw;