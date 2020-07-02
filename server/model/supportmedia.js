var mongoose = require('mongoose');
var SupportMediaSchema = new mongoose.Schema({
    ticket_message_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        trim: true
    },
    file:{
        type: String,
        required:true,
        trim: true
    },
    filename:{
        type: String,
        required: true,
        trim:true
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var SupportMedia = mongoose.model('supportmedia', SupportMediaSchema);
module.exports = SupportMedia;