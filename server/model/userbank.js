var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserbankSchema = new mongoose.Schema({
    email: {
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
    pincode: {
        type: String,
        required:true,
        trim: true,
    },
    completeAt:{
        type : Date,
        default : Date.now
    }
});


var Userbank = mongoose.model('Userbank', UserbankSchema);
module.exports = Userbank;