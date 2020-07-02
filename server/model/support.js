var mongoose = require('mongoose');
var SupportSchema = new mongoose.Schema({
    _id: {
        type : Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    user_name:{
        type: String,
        required:true,
        trim: true
    },
    subject:{
        type: String,
        required:true,
        trim:true
    },
    review:{
        type: Number,
        trim: true,
    },
    status:{
        type: String,
        trim: true,
        required: true
    },
    readstatus:{
        type: Number,
        trim:true,
        required:true,
        default:0
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var Support = mongoose.model('supports', SupportSchema);
module.exports = Support;