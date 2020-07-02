var mongoose = require('mongoose');
var SupportCounterSchema = new mongoose.Schema({
    _id:{
        type : String
    },
    sequence_value:{
        type: Number,
        trim: true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var SupportCounter = mongoose.model('SupportsCounter', SupportCounterSchema);
module.exports = SupportCounter;