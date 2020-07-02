/**
 * Created by Laxman on 9/27/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    user_id:{
        type: Number,
        required: true,
    },
    verified: {
        type: String,
        required: true,
        trim: true,
        default: false
    },
    freeze: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    var emailtest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailCheck = false;

    if (emailtest.test(String(username).toLowerCase())) {
        emailCheck = true;
    }
    if(emailCheck){
        User.findOne({ email: username })
            .exec(function (err, user) {
                if (err) {
                    return callback(err)
                } else if (!user) {
                    var err = new Error('User not found.');
                    err.status = 401;
                    return callback(err);
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        return callback(null, user);
                    } else {
                        return callback();
                    }
                })
            });
    }else{
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
    }
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
