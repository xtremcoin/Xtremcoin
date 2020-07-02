var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var BankdetailSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required:true,
        trim: true,
    },
    city: {
        type: String,
        required:true,
        trim: true,
    },
    country: {
        type: String,
        required:true,
        trim: true,
    },
    bank: {
        type: String,
        required:true,
        trim: true,
    },
    iban:{
        type: String,
        required:true,
        trim: true,
    },
    currency: {
        type: String,
        required:true,
        trim: true,
    },
    bic: {
        type: String,
        required:true,
        trim: true,
    },
    completeAt:{
        type : Date,
        default : Date.now
    }
});


var Bankdetail = mongoose.model('Bankdetail', BankdetailSchema);
module.exports = Bankdetail;