Users = require('../model/user');
Security = require('../model/security');
Loginlog = require('../model/logs');
const Sendgrid = require('./sendgrid');
var googleAuth = require('google_authenticator').authenticator;
var macaddress = require('macaddress');
var Actions = require('../model/actions');
var ga = new googleAuth();
var device = require("device")
var useragent = require("useragent")

function Function(req) {
    this.req = req;
}

Function.prototype.googleAuthenticator = function (res, callback) {
    callback(ga);
}
Function.prototype.isGoogleAuthActive = function (userid, callback) {
    Security.findOne({userid: userid, option: 'twofa'}, function (error, res) {
        var check = false;
        if (error) {
            check = false;
        } else {
            if (res !== null && typeof res != 'undefined' && res.secret) {
                check = true;
            } else {
                check = false;
            }
        }
        callback(check);
    });
}
Function.prototype.addLoginLog = function (userinfo) {
    var userid = userinfo._id;
    var email = userinfo.email;
    var agentinfo = this.req.headers['user-agent'];
    var ip = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress;
    Actions.findOne({action: 'login'}).exec(function (error, action) {
        if (error) {
            res.status(500).json({message: "Internal Server Error"})
        } else {
            var agentparse = useragent.parse(agentinfo);
            var agent= agentparse.toAgent();
            var os = agentparse.os.toString();

            var mydevice = device(agentinfo);
            var type = mydevice.type;
            var model = mydevice.model;
            var logData = {
                userid: userid,
                ipaddress: ip,
                agent: agent+' '+os,
                description: agentinfo,
                action:action._id,
                type:type,
                model:model
            }

            if (ip !== null && typeof ip !== 'undefined' && ip !== "") {
                macaddress.one(function (err, mac) {
                    logData.macaddress = mac;
                    Loginlog.create(logData);
                    var sendGrid = new Sendgrid();
                    var options = {email: email, ip: ip, timestamp: logData.timestamp};
                    sendGrid.sendEmail(
                        email,
                        'Blockoville Notification',
                        "views/emailtemplate/loginlog.ejs",
                        options
                    );
                });
            }
        }
    })
};
Function.prototype.verifyDevice = function (user, macaddress, callback) {
    if(user.group!=='admin') {
        Loginlog.find({userid: user._id, macaddress: macaddress}).exec(function (error, result) {
            if (error) {
                callback({error: true, result: error.message})
            } else {
                if (result.length === 0) {
                    callback({error: false, result: false})
                } else {
                    callback({error: false, result: true})
                }
            }
        })
    }else{
        callback({error: false, result: true})
    }
};

module.exports = Function;