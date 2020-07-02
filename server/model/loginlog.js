/**
 * Created by Laxman on 10/25/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var LoginlogSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    ip: {
        type: String,
        required: true,
        trim: true,
    },
    userAgent: {
        type: String,
        required: true,
        trim: true,
    },
    loginAt: {
        type : Date,
        default : Date.now
    }
});

var Loginlog = mongoose.model('Loginlog', LoginlogSchema);
module.exports = Loginlog;
