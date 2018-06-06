var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    enquiryModel = require("./model/enquiry"),
    body = require("body-parser"),
    config = require("./settings"),
    mailer = require("./service/mail"),
    path = require("path");

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/')
          },
          filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
          }
    });
    var upload = multer({storage: storage});
    
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1', accessKeyId: config.aws.accessKey, secretAccessKey:config.aws.secretKey});

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

app.use(multer().single('file'));

app.post("/enquiry",(req, res) => {
    let payload = req.body;
    if(req.file){
        payload.file = `${new Buffer(req.file.buffer).toString("base64")}`
    }
    else{
        payload.file = "";
    }
    let data = new enquiryModel(payload);

    data.save((err,value)=>{
        mailer.formatEnquiryMail(value).compile().build((err, mail)=>{
            var sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
            .sendRawEmail({RawMessage: {Data: mail}})
            .promise();

              sendPromise.then(
                function(data) {
                    res.json({code:200, msg:"Saved successfully..."});
                }).catch(
                    function(err) {
                    console.error(err, err.stack);
                    res.json({code:200, msg:"Saved successfully..."});
                });
        });
     
    });
});

app.get("*",(req, res) => {
    res.redirect("/");
});



app.listen(8000);