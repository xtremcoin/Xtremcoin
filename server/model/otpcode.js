/**
 * Created by Laxman on 10/1/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var OtpcodeSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    action: {
        type: String,
        required: true,
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
});


var Otpcode = mongoose.model('Otpcode', OtpcodeSchema);
module.exports = Otpcode;
