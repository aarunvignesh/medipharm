var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    enquiryModel = require("./model/enquiry"),
    body = require("body-parser"),
    config = require("./settings"),
    path = require("path");

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1', accessKeyId: "AKIAIGFQASD7ZXUIIOHQ", secretAccessKey:"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"});

app.use(body.urlencoded({extended: true}));
app.use(body.json());
app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

function getDBQueryString(){
    let dbconString = "", authenticationString = "";
    if(config.db.username && config.db.password){
        authenticationString = config.db.username + ":" + config.db.password + "@";
    }
    return `mongodb://${authenticationString}${config.db.host}:${config.db.port}/${config.db.database}`
}

mongoose.connect(getDBQueryString());

mongoose.connection.on("connected", ()=>{
    console.log(">> DB Connected Successfully <<");
});

app.get("/",(req, res) => {
    res.render("index");
});

app.get("/enquiry",(req, res) => {
    res.render("enquiry");
});

app.post("/enquiry",(req, res) => {
    let data = new enquiryModel(req.body);
    data.save((err,value)=>{
        console.log(err);
        console.log(value);
        // Create the promise and SES service object
        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail({
            Destination: { /* required */
                CcAddresses: config.email.ccList,
                ToAddresses: config.email.toList
              },
              Message: { /* required */
                Body: { /* required */
                  Text: {
                   Charset: "UTF-8",
                   Data: "Hi Team, \n\nA new enquiry received \n\n"+Object.keys(req.body).map((val)=> val + " : " + req.body[val]).join(" \n\n")+"\n\n Thanks and Regards, \n GSPT Team"
                  }
                 },
                 Subject: {
                  Charset: 'UTF-8',
                  Data: 'Enquiry Email'
                 }
                },
              Source: 'pingme.team@gmail.com'
        }).promise();

        // Handle promise's fulfilled/rejected states
        sendPromise.then(
        function(data) {
            console.log(data.MessageId);
            res.json({code:200, msg:"Saved successfully..."});
        }).catch(
            function(err) {
            console.error(err, err.stack);
            res.json({code:200, msg:"Saved successfully..."});
        });
        
    });
});

app.get("*",(req, res) => {
    res.redirect("/");
});



app.listen(8000);