var mongoose = require('mongoose');
var CounterSchema = new mongoose.Schema({
    _id:{
        type : String
    },
    value:{
        type: Number,
        trim: true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var Counter = mongoose.model('Counter', CounterSchema);
module.exports = Counter;