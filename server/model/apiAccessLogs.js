var mongoose = require('mongoose');

var AccessLogsSchema = new mongoose.Schema({
    client_ip: {
        type: String,
        required: true,
        trim: true,
    },
    endPoint: {
        type: String,
        trim: true,
    },
    quota: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

var AccessLogs = mongoose.model('AccessLogs', AccessLogsSchema);
module.exports = AccessLogs;