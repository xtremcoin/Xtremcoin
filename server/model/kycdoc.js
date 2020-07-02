/**
 * Created by Laxman on 1/13/2018.
 */
var mongoose = require('mongoose');
//var _cnf = require('../_cnf.json');
//var conn = mongoose.createConnection(_cnf.mongodbURI2);
var bcrypt = require('bcrypt');

var KycdocSchema = new mongoose.Schema({
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
    identity:{
        type: String,
        trim: true,
    },
    addressproof:{
        type: String,
        trim: true,
    },
    registration:{
        type: String,
        trim: true,
    },
    bankstatement:{
        type: String,
        trim: true,
    },
    managerappointment:{
        type: String,
        trim: true,
    },
    taxdoc:{
        type: String,
        trim: true,
    },
    bankid:{
        type: String,
        trim: true,
    },
    status:{
        type: String,
        default: "Pending",
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});


var Kycdoc = mongoose.model('Kycdoc', KycdocSchema);
module.exports = Kycdoc;
