/**
 * Created by Laxman on 1/10/2018.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var BankSchema = new mongoose.Schema({
    bankId: {
        type: Number,
        required: true,
    },
    bank: {
        type: String,
        trim: true,
    },
    domain: {
        type: String,
        trim: true,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});


var Bank = mongoose.model('Bank', BankSchema);
module.exports = Bank;
