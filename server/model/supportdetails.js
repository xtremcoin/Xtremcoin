var mongoose = require('mongoose');
var SupportDetailsSchema = new mongoose.Schema({
    ticket_id: {
        type: Number,
        required: true,
        trim: true,
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
    message:{
        type: String,
        required: true,
        trim: true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var SupportDetails = mongoose.model('supportsdetails', SupportDetailsSchema);
module.exports = SupportDetails;