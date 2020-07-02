/**
 * Created by Laxman on 12/13/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var TwofactorSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        trim: true
    },
    secret: {
        type: String,
        trim: true,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});

var Twofactor = mongoose.model('Twofactor', TwofactorSchema);
module.exports = Twofactor;
