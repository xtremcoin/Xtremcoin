/**
 * Created by Laxman on 12/30/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var AddresshistorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    currency: {
        type: String,
        required: true,
    },
    secret: {
        type: Object,
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
    createdAt: {
        type : Date,
        default : Date.now
    }
});

AddresshistorySchema.index({ email: 1, currency: 1, address: 1 }, { unique: true });

var Addresshistory = mongoose.model('Addresshistory', AddresshistorySchema);
module.exports = Addresshistory;
