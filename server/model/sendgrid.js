/**
 * Created by Laxman on 1/5/2018.
 */
const sgMail = require('@sendgrid/mail');
var ejs = require("ejs");
sgMail.setApiKey("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");
const from = "noreply@xtremcoin.com";
function Sendgrid(){}
Sendgrid.prototype.prepareTemplate = function (template,options,callback) {
    ejs.renderFile(template, options, function (error, result) {
        if (error) {
            callback(false);
        } else {
            callback(result);
        }
    });
}
Sendgrid.prototype.sendEmail = function (to,subject,template,options,cc=null) {
    this.prepareTemplate(template,options,function (html) {
       if(html){
           const msg = {
               to: to,
               from: from,
               subject: subject,
               html: html,
           };
           if(cc) msg.cc = cc;
           sgMail.send(msg, (error,result)=>{
               console.log(error);
               console.log(to);
           });
       }
    });
}
module.exports = Sendgrid;
