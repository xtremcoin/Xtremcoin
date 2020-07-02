/**
 * Created by Laxman on 1/10/2018.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var KyctransactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    kyc: {
        type: Object,
        trim: true,
    },
    transaction: {
        type: Object,
        trim: true,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});


var Kyctransaction = mongoose.model('Kyctransaction', KyctransactionSchema);
module.exports = Kyctransaction;
