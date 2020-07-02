/**
 * Created by Laxman on 1/10/2018.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var KycSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    department:{
        type: String,
        trim: true,
    },
    kyc: {
        type: Object,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    emailVerified: {
        type: Boolean,
        default: true,
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});


var Kyc = mongoose.model('Kyc', KycSchema);
module.exports = Kyc;