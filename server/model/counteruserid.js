var mongoose = require('mongoose');
var UserIdCounterSchema = new mongoose.Schema({
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
var UserIdCounter = mongoose.model('UserIdCounter', UserIdCounterSchema);
module.exports = UserIdCounter;