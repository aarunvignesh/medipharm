let mongoose = require("mongoose"),

enquirySchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    companyName:{
        type: String
    },
    contactNumber:{
        type: String
    },
    message:{
        type: String
    },
    postedTime:{
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model("enquiry", enquirySchema, "enquiries");