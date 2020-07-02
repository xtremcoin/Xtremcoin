/**
 * Created by Laxman on 11/5/2017.
 */
/**
 * Created by Laxman on 10/13/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var InitwalletSchema = new mongoose.Schema({
    wallet_id: {
        type: String,
        required: true,
        trim: true,
    },
    label: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Number,
        required: true,
        default:1,
    },
    userKeychain: {
        type: Object,
        trim: true,
    },
    backupKeychain:{
        type: Object,
        trim: true,
    },
    permissions: {
        type: String,
        trim: true
    },
    currency: {
        type: String,
        unique: true,
        required: true,
    },
    passphrase: {
        type: String,
        trim: true,
    },
    dtIncrement:{
        type: Number,
        required: true,
        default:5711452,
    },
    minLedgerVersion:{
        type: Number,
        required: true,
        default:35426179,
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
});


var Initwallet = mongoose.model('Initwallet', InitwalletSchema);
module.exports = Initwallet;

