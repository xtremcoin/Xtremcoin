var mongoose = require('mongoose');

var ApiKeysSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    permissions: {
        type: Object,
        required: true,
        trim: true
    },
    secretkey: {
        type: String,
        required:true,
        trim: true,
    },
    appid: {
        type: String,
        required:true,
        trim: true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});


var ApiKeys = mongoose.model('ApiKeys', ApiKeysSchema);
module.exports = ApiKeys;