/**
 * Created by Laxman on 1/5/2018.
 */
const sgMail = require('@sendgrid/mail');
var ejs = require("ejs");
sgMail.setApiKey("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");
const from = "noreply@Xtremcoin.com";
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
           });
       }
    });
}
module.exports = Sendgrid;
