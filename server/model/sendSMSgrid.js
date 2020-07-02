/**
 * Created by Laxman on 1/5/2018.
 */
var accountSid = 'ACa3322748cf229b53d1b1ab924e0ac802';
var authToken = '2889dfd7f67579462d8dd839ee48ec69';
var twilio = require('twilio');
var smsClient = new twilio(accountSid, authToken);

function SendSMSgrid(){}

SendSMSgrid.prototype.sendSMS = function (phone,body) {
    if(phone && body){
        smsClient.api.messages
            .create({
                body: body,
                to: phone,
                from: '+17752047475',
            }).then(function(data) {
                console.log(data.status)
        }).catch(function(err) {
            console.log(err)
        });

    }else{
        console.log("All fields are required.")
    }
}
module.exports = SendSMSgrid;
