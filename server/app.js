var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var csrf = require('csurf');
var cors = require('cors');
var moment = require('moment');
require('./model/db');

const helmet = require('helmet')
var passport = require('passport');
require('./passport/passport');
require('./model/db')
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var userRouter = require('./routes/user');
var apiRouter = require('./routes/api');
var app = express();

app.use(passport.initialize());

app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if(typeof process.env.NODE_ENV!=='undefined' && process.env.NODE_ENV=='production') {
    var whitelist = '.xtremcoinlocal.com';
    var corsOptions = {
        origin: function (origin, callback) {
            if (typeof origin === 'undefined' || origin.indexOf(whitelist) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    }
}else{
    var whitelist = '.xtremcoinlocal.com';
    var corsOptions = {
        origin: function (origin, callback) {
            if (typeof origin === 'undefined' || origin.search("^.*"+whitelist+".*$")>-1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    }
}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf({
    cookie: {
        httpOnly: true,
        secure: false,
        key: "XSRF-TOKEN",
        path: '/',
        maxAge: 1000 * 60 * 60
    }
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/account', accountRouter);

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403).send({message: 'Unauthorized Request'})
})
// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.moment = moment;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/
module.exports = app;