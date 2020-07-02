function Utils(){}
Utils.prototype.in_array = function(a,k, callback) {
    var self = this;
    if (a.indexOf(k) >= 0) {
        return callback(true);
    } else {
        return callback(false);
    }
}
module.exports = Utils;