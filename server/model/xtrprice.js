/**
 * Created by Laxman on 1/4/2018.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var XtrpriceSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    price: {
        type: Number,
        default: 0
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});

var Xtrprice = mongoose.model('Xtrprice', XtrpriceSchema);
module.exports = Xtrprice;
