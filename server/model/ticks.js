var mongoose = require('mongoose');
var conn = mongoose.createConnection("mongodb://localhost:27017/xtrmprice");
var TicksSchema = new mongoose.Schema({
    timestamp: {
        type : Date,
        default : Date.now
    },
    exchange: {
        type: String,
        trim: true,
    },
    symbol: {
        type: String,
        trim: true,
    },
    open: {
        type: Number,
        default: 0,
    },
    close: {
        type: Number,
        default: 0,
    },
    high: {
        type: Number,
        default: 0,
    },
    low: {
        type: Number,
        default: 0,
    },
    last: {
        type: Number,
        default: 0,
    },
    volume: {
        type: Number,
        default: 0,
    },
});


var Ticks = conn.model('Ticks', TicksSchema);
module.exports = Ticks;