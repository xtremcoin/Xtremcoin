var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require("../model/user");
var jwtmodel = require("../others/jwtmodel");

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        Users.findOne({email:username}).exec(function(error,rows){
            if (error) {
                return done(error);
            }
            // Return if user not found in database
            if (rows===null) {
                return done(null, false, {
                    message: 'Invalid Details'
                });
            }else{
                if(rows.email_verified=='0'){
                    return done(null, false, {
                        message: 'Account is not verified'
                    });
                }
                if(rows.status!=='Active'){
                    return done(null, false, {
                        message: 'Account is not active'
                    });
                }
                // Return if password is wrong
                if (!jwtmodel.validPassword(password,rows)) {
                    return done(null, false, {
                        message: 'Password is wrong'
                    });
                }
                // If credentials are correct, return the user object
                return done(null, rows);
            }
        })
    }
));