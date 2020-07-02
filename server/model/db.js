var bluebird = require('bluebird');
var _cnf = require('../_cnf.json');
var mongoose = require('mongoose');
mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/xtremcoinlocal',{useNewUrlParser: true})
    .then((asd)=> { })
.catch((das)=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/xtremcoinlocal,`)})

