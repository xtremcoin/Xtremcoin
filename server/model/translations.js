var mongoose = require('mongoose');
var TranslationsSchema = new mongoose.Schema({
    en: {
        type: String,
        required: true,
        trim: true
    },
    try: {
        type: String,
        trim: true,
    },
    fr: {
        type: String,
        trim: true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
var Translations = mongoose.model('Translations', TranslationsSchema);
module.exports = Translations;