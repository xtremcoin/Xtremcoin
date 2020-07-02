var mongoose = require('mongoose');
var AgreementsSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required:true,
        trim:true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    agreed:{
        type: Boolean,
        required:true,
        trim:true
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var Agreements = mongoose.model('agreements', AgreementsSchema);
module.exports = Agreements;