/**
 * Created by Laxman on 10/6/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var ProfileSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    profileType: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    midName: {
        type: String,
        required: true,
    },
    surName: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    postal: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        trim:true
    },
    address1:{
        type: String,
        trim:true
    },
    city:{
        type: String,
        trim:true
    },
    state:{
        type: String,
        trim:true
    },
    secretPin: {
        type: Number,
        trim:true,
    },
    phone_verified:{
        type: Number,
        required: true,
        default:0
    },
    authType: {
        type: String,
    },
    acceptNews: {
        type: Number,
        default:0
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
});


var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
