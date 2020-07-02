/**
 * Created by Laxman on 1/9/2018.
 */
var request = require('request'),
    username = "Geliyoo_Sandbox_API",
    password = "347245Ha@1+",
    url = "https://" + username + ":" + password + "@api.globaldatacompany.com";

function Kycmodel(){}
Kycmodel.prototype.getProvinces = function (country, callback) {
    request({
            url : url+"/configuration/v1/countrysubdivisions/"+country
        },
        function (error, response, body) {
            console.log(error);
            if(response.statusCode==200){
                callback(body);
            }else {
                callback(false);
            }

        }
    );
}
Kycmodel.prototype.preparePersonalDataFields = function (req, callback) {
    const [year,month,day] = req.body.dateOfBirth.split("-");
    var dataSet = {
        "AcceptTruliooTermsAndConditions": true,
        "CleansedAddress": false,
        "VerboseMode": true,
        "ConfigurationName": "Identity Verification",
        "CountryCode": req.body.country,
        "DataFields": {
            "PersonInfo": {
                "FirstGivenName": req.body.name,
                "FirstSurName": req.body.surname,
                "DayOfBirth": Number(day),
                "MonthOfBirth": Number(month),
                "YearOfBirth": Number(year),
                "Gender": req.body.gender
            },
            "Location": {
                "BuildingNumber": req.body.address,
                "City": req.body.city,
                "PostalCode": req.body.postalcode
            },
            "Communication": {
                "MobileNumber": req.body.phone,
                "EmailAddress": req.body.email
            },
        }
    };

    switch (req.body.id_type){
        case "passport":
            dataSet.DataFields.Passport = {
                "Mrz1": req.body.passportmrzline1,
                "Mrz2": req.body.passportmrzline2,
                "Number": req.body.passportnumber,
            };
            break;
        case "dl":
            dataSet.DataFields.DriverLicence = {
                "Number": req.body.dl,
                "State": req.body.dlprovince
            };
            break;
        case "naid":
            dataSet.DataFields.NationalIds = [
                {
                    "Number": req.body.nationalid,
                    "Type": "NationalID"
                }
            ];
            break;
    }
    callback(dataSet);
}
Kycmodel.prototype.getVerify = function (dataSet, callback) {
    console.log(dataSet);
    var options = {
        uri: url+"/verifications/v1/verify",
        method: 'POST',
        json: dataSet
    };
    request(options, function (error, response, body) {
        console.log(error);
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            callback(body);
        }else{
            callback(false);
        }
    });
}


module.exports = Kycmodel;
