var mongoose = require('mongoose');
var CardSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
        trim: true
    },
    card_number:{
        type : Number,
        required: true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var Card = mongoose.model('Card', CardSchema);
module.exports = Card;