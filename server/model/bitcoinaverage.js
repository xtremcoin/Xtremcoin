const ba = require('bitcoinaverage');
const Utils = require('../model/utils');
var publicKey = 'N2U0MDljYTc1MGFhNDc2OTk3NjkyZjI5ZTFjNWE4YzM';
var secretKey = 'MDE3ODdiNjZmNGEzNDgwMDgwZWY4ZjM0NTE4YmZiMWNmMTlhNWFiZWNkNTE0MTk4YjE2YWVmNGFhODkyYmYwYQ';
var restClient = ba.restfulClient(publicKey, secretKey);
var utils = "";
function Bitcoinaverage() {
    utils = new Utils();
}
Bitcoinaverage.prototype.tickerGlobalPerSymbol = function (req, res, next, currency_pair, callback) {
    var result = "";
    restClient.tickerGlobalPerSymbol(currency_pair.toUpperCase(), function(response) {
        var data = JSON.parse(response);
        result={high:data.high,low:data.low,last:data.last,bid:data.bid,ask:data.ask,volume:data.volume,vwap:data.averages.day,open:data.open.day,timestamp:data.timestamp,display_timestamp:data.display_timestamp};
        return callback(result);
    }, function(error){
        result={"error":true,"description":"Internal Server Error."};
        return callback(result);
    });
}
Bitcoinaverage.prototype.getTickerDataPerSymbol = function (req, res, next, currency_pair, market, callback) {
    var result = "";
    restClient.getTickerDataPerSymbol(market, currency_pair.toUpperCase(), function(response) {
        var data = JSON.parse(response);
        result={high:data.high,low:data.low,last:data.last,bid:data.bid,ask:data.ask,volume:data.volume,vwap:data.averages.day,open:data.open.day,timestamp:data.timestamp,display_timestamp:data.display_timestamp};
        return callback(result);
    }, function(error){
        result={"error":true,"description":"Internal Server Error."};
        return callback(result);
    });
}

module.exports = Bitcoinaverage;