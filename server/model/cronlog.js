/**
 * Created by Laxman on 11/8/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var CronlogSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    result: {
        type: Object,
        trim: true,
    },
    startAt: {
        type : Date,
        default : Date.now
    },
    endAt:{
        type : Date
    }
});


var Cronlog = mongoose.model('Cronlog', CronlogSchema);
module.exports = Cronlog;
